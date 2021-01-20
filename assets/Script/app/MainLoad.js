var Base64 = require('Base64');
var GameConfig = require('GameConfig');
var Alert = require('Alert');
var i18n = require('i18n');
var CustomAction = require('CustomAction');
cc.Class({
  extends: cc.Component,

  properties: {
    clientKey: "",
    upStatus: "",
    isTest: true,
    isDebug: true,
    progressBar: cc.ProgressBar,
    alert: Alert,
    txtVersion: cc.Label,

    manifestUrl: {
      type: cc.Asset,
      default: null
    },
    _updating: false,
    _canRetry: false,
    _storagePath: ''
  },

  // use this for initialization
  onLoad: function() {

    // if (!cc.sys.isNative) this.loadMainScene();
    // else {
    //   this.setupHotUpdate();
    //   this.hotUpdate();
    // }

    //fake
    this.loadMainScene();
  },

  hotUpdate: function() {
    console.log('XXXXXXXX-> hotUpdate ' + this._updating);
    if (this._am && !this._updating) {
      this.txtVersion.string = 'update...';
      this._am.setEventCallback(this.updateCb.bind(this));

      if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
        // Resolve md5 url
        var url = this.manifestUrl.nativeUrl;
        if (cc.loader.md5Pipe) {
          url = cc.loader.md5Pipe.transformURL(url);
        }
        this._am.loadLocalManifest(url);
      }

      this._failCount = 0;
      this._am.update();
      this._updating = true;
    }
  },

  checkCb: function(event) {
    switch (event.getEventCode()) {
      case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
        this.txtVersion.string = "No local manifest file found, update skipped.";
        break;
      case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
      case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
        this.txtVersion.string = "Fail to download manifest file, update skipped.";
        break;
      case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
        this.txtVersion.string = "Already up to date with the latest remote version.";
        this.loadMainScene();
        break;
      case jsb.EventAssetsManager.NEW_VERSION_FOUND:
        this.txtVersion.string = 'New version found';
        this.hotUpdate();
        // this.panel.checkBtn.active = false;
        // this.panel.fileProgress.progress = 0;
        // this.panel.byteProgress.progress = 0;
        break;
      default:
        return;
    }

    this._am.setEventCallback(null);
    this._checkListener = null;
    this._updating = false;
  },

  updateCb: function(event) {
    var needRestart = false;
    var failed = false;

    switch (event.getEventCode()) {
      case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
        this.txtVersion.string = 'No local manifest file found, hot update skipped.';
        failed = true;
        break;
      case jsb.EventAssetsManager.UPDATE_PROGRESSION:
        // this.panel.byteProgress.progress = event.getPercent();
        // this.panel.fileProgress.progress = event.getPercentByFile();

        // this.panel.fileLabel.string = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
        // this.panel.byteLabel.string = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
        this.progressBar.progress = event.getDownloadedBytes() / event.getTotalBytes();
        var msg = event.getMessage();
        if (msg) {
          this.txtVersion.string = 'Updated file: ' + msg;
        }
        break;
      case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
      case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
        this.txtVersion.string = 'Fail to download manifest file, hot update skipped.';
        failed = true;
        break;
      case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
        this.txtVersion.string = 'Already up to date with the latest remote version.';
        failed = true;
        break;
      case jsb.EventAssetsManager.UPDATE_FINISHED:
        this.txtVersion.string = 'Update finished. ' + event.getMessage();
        needRestart = true;
        break;
      case jsb.EventAssetsManager.UPDATE_FAILED:
        this.txtVersion.string = 'Update failed. ' + event.getMessage();
        // this.panel.retryBtn.active = true;
        this._updating = false;
        this._canRetry = true;
        break;
      case jsb.EventAssetsManager.ERROR_UPDATING:
        this.txtVersion.string = 'Asset update error: ' + event.getAssetId() + ', ' + event.getMessage();
        break;
      case jsb.EventAssetsManager.ERROR_DECOMPRESS:
        this.txtVersion.string = event.getMessage();
        break;
      default:
        break;
    }
    console.log('XXXXXXXX-> updateCb ');
    if (failed) {
      console.log('XXXXXXXX-> not needRestart ');
      this._am.setEventCallback(null);
      this._updateListener = null;
      this._updating = false;
      this.loadMainScene();
    }

    if (needRestart) {
      console.log('XXXXXXXX-> needRestart ');
      this._am.setEventCallback(null);
      this._updateListener = null;
      // Prepend the manifest's search path
      var searchPaths = jsb.fileUtils.getSearchPaths();
      var newPaths = this._am.getLocalManifest().getSearchPaths();
      console.log(JSON.stringify(newPaths));
      Array.prototype.unshift.apply(searchPaths, newPaths);
      // This value will be retrieved and appended to the default search path during game startup,
      // please refer to samples/js-tests/main.js for detailed usage.
      // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
      cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
      jsb.fileUtils.setSearchPaths(searchPaths);

      cc.audioEngine.stopAll();
      cc.game.restart();
    }
  },


  checkHotUpdate: function() {
    if (this._updating) {
      this.txtVersion.string = 'Checking or updating ...';
      return;
    }
    if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
      // Resolve md5 url
      var url = this.manifestUrl.nativeUrl;
      if (cc.loader.md5Pipe) {
        url = cc.loader.md5Pipe.transformURL(url);
      }
      this._am.loadLocalManifest(url);
    }
    if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
      this.txtVersion.string = 'Failed to load local manifest ...';
      return;
    }
    this._am.setEventCallback(this.checkCb.bind(this));
    this._am.checkUpdate();
    this._updating = true;
  },

  setupHotUpdate: function() {
    this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'dkm');
    cc.log('Storage path for remote asset : ' + this._storagePath);
    this.versionCompareHandle = function(versionA, versionB) {
      cc.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
      console.log('XXXXXXXX-> ' + "JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
      var vA = versionA.split('.');
      var vB = versionB.split('.');
      for (var i = 0; i < vA.length; ++i) {
        var a = parseInt(vA[i]);
        var b = parseInt(vB[i] || 0);
        if (a === b) {
          continue;
        } else {
          return a - b;
        }
      }
      if (vB.length > vA.length) {
        return -1;
      } else {
        return 0;
      }
    };

    // Init with empty manifest url for testing custom manifest
    this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);
    this._am.setVerifyCallback(function(path, asset) {
      // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
      var compressed = asset.compressed;
      // Retrieve the correct md5 value.
      var expectedMD5 = asset.md5;
      // asset.path is relative path and path is absolute.
      var relativePath = asset.path;
      // The size of asset file, but this value could be absent.
      var size = asset.size;
      if (compressed) {
        // panelInfo.string = "Verification passed : " + relativePath;
        return true;
      } else {
        // panelInfo.string = "Verification passed : " + relativePath + ' (' + expectedMD5 + ')';
        return true;
      }
    });

    if (cc.sys.os === cc.sys.OS_ANDROID) {
      // Some Android device may slow down the download process when concurrent tasks is too much.
      // The value may not be accurate, please do more test and find what's most suitable for your game.
      this._am.setMaxConcurrentTask(2);
      // this.panelInfo.string = "Max concurrent tasks count have been limited to 2";
    }
  },

  loadMainScene: function() {
    this.progressBar.progress = 0
    cc.loader.onProgress = function(completedCount, totalCount, item) {
      var percent = 0;
      if (totalCount > 0) {
        percent = completedCount / totalCount;
      }
      if (this.progressBar && percent !== 0) this.progressBar.progress = (percent <= 0.1) ? 0.1 : percent;
    }.bind(this);

    cc.director.preloadScene('ZonScene', function(err) {
      cc.director.loadScene('ZonScene');
    }.bind(this));
  },

  onDestroy: function () {
        if (this._updateListener) {
            this._am.setEventCallback(null);
            this._updateListener = null;
        }
    }
});
