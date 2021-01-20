copy alL to: C:\Users\Dell Precision\.WebStorm2017.3\config\fileTemplates

CUSTOM COCOS-2D-JS
//===========================================
IN CCVIEW
function setDesignResolutionSize(){
	//...
	// replace this.setResolutionPolicy(resolutionPolicy); to
	if(cc.sys.isBrowser){
			this.setResolutionPolicy(3);
	}else{
		this.setResolutionPolicy(resolutionPolicy);
	}

	//...
	//comment 
	//if (result.scale && 2 === result.scale.length) {
		//this._scaleX = result.scale[0];
		//this._scaleY = result.scale[1];
	//}
	//...
}
//===========================================
IN CCRichText
//replace function
_updateRichText: function () {
        if (!this.enabled) return;
		
		var rootY = 0;
		if(this.node) rootY = this.node.y;
		
        var newTextArray = cc.htmlTextParser.parse(this.string);
		
		//.....
		
        this._layoutDirty = false;
		if(this.node) this.node.y = rootY;
    },
	
//===========================================
IN CCNode
//replace function

addChild (child, localZOrder, tag) {
        localZOrder = localZOrder === undefined ? child._localZOrder : localZOrder;
		var rootY = this.y;
		
		//.....
		
		this.y = rootY;
    },