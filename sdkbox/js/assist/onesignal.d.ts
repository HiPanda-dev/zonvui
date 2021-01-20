declare module sdkbox {     module PluginOneSignal {        /**        *  initialize the plugin instance.        */        export function init() : boolean;
        /**        * Set listener to listen for onesignal events        */        export function setListener(listener : object) : object;
        /**        * Get the listener        */        export function getListener() : object;
        /**        * Remove the listener, and can't listen to events anymore        */        export function removeListener() : object;
        /**        * Only use if you set "auto_register":false in sdkbox_config.json (iOS only)        */        export function registerForPushNotifications() : object;
        /**        * Enable logging to help debug if you run into an issue setting up OneSignal. This selector        * is static so you can call it before OneSignal init. The following options are available        * with increasingly more information;        * sdkbox::OneSignalLogNone, sdkbox::OneSignalLogFatal, sdkbox::OneSignalLogError,        * sdkbox::OneSignalLogWarn, sdkbox::OneSignalLogInfo, sdkbox::OneSignalLogDebug,        * sdkbox::OneSignalLogVerbose        */        export function setLogLevel(logLevel : number , visualLogLevel : number) : object;
        /**        * Tag a user based on an app event of your choosing so later you can create segments on        * onesignal.com to target these users.        *        * callback: `onSendTag`        */        export function sendTag(key : string , value : string) : object;
        /**        * Set email        */        export function setEmail(email : string) : object;
        /**        * Retrieve a list of tags that have been set on the user from the OneSignal server.        *        * callback: `onGetTags`        */        export function getTags() : object;
        /**        * Deletes a tag that was previously set on a user with sendTag        */        export function deleteTag(key : string) : object;
        /**        * Lets you retrieve the OneSignal user id and the Google registration id. Your handler is        * called after the device is successfully registered with OneSignal.        *        * callback: `onIdsAvailable`        */        export function idsAvailable() : object;
        /**        * By default this is false and notifications will not be shown when the user is in your app,        * instead the NotificationOpenedHandler is fired. If set to true notifications will be shown        * as native alert boxes if a notification is received when the user is in your app. The        * NotificationOpenedHandler is then fired after the alert box is closed.        */        export function enableInAppAlertNotification(enable : boolean) : object;
        /**        * You can call this method with false to opt users out of receiving all notifications through        * OneSignal. You can pass true later to opt users back into notifications.        */        export function setSubscription(enable : boolean) : object;
        /**        * Allows you to send notifications from user to user or schedule ones in the future to be        * delivered to the current device.        *        * callback: `onPostNotification`        */        export function postNotification(jsonString : string) : object;
        /**        * Prompts the user for location permissions. This allows for geotagging so you can send        * notifications to users based on location.        *        * Note: Make sure you also have the required location permission in your AndroidManifest.xml.        */        export function promptLocation() : object;
        /**        * For GDPR users, your application should call this method before initialization of the SDK.        * If you pass in true, your application will need to call provideConsent(true) before the        * OneSignal SDK gets fully initialized.        *        * @param enabled [description]        */        export function setRequiresUserPrivacyConsent(enabled : boolean) : object;
        /**        * If you set the SDK to require the user's privacy consent, your application can use this        * method once the user does or doesn't provide privacy consent to use the OneSignal SDK.        *        * @param enabled [description]        */        export function consentGranted(enabled : boolean) : object;
        /**        * You can use this property to check if the OneSignal SDK is waiting for the user to        * provide privacy consent.        *        * @return [description]        */        export function requiresUserPrivacyConsent() : boolean;
    }     module OneSignalListener {        export function onSendTag(success : boolean , key : string , message : string) : object;
        export function onGetTags(jsonString : string) : object;
        export function onIdsAvailable(userId : string , pushToken : string) : object;
        export function onPostNotification(success : boolean , message : string) : object;
        export function onNotification(isActive : boolean , message : string , additionalData : string) : object;
        export function onNotificationOpened(message : string) : object;
        export function onNotificationReceived(message : string) : object;
    }}