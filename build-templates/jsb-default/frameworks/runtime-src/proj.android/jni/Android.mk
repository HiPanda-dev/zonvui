LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE := cocos2djs_shared

LOCAL_MODULE_FILENAME := libcocos2djs

ifeq ($(USE_ARM_MODE),1)
LOCAL_ARM_MODE := arm
endif

LOCAL_SRC_FILES := hellojavascript/main.cpp \
../../Classes/AppDelegate.cpp \
../../Classes/PluginFacebookJS.cpp \
../../Classes/PluginFacebookJS.hpp \
../../Classes/PluginFacebookJSHelper.cpp \
../../Classes/PluginFacebookJSHelper.h \
../../Classes/SDKBoxJSHelper.cpp \
../../Classes/SDKBoxJSHelper.h \
../../Classes/PluginOneSignalJS.cpp \
../../Classes/PluginOneSignalJSHelper.cpp

LOCAL_CPPFLAGS := -DSDKBOX_ENABLED \
-DSDKBOX_COCOS_CREATOR
LOCAL_LDLIBS := -landroid \
-llog
LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes

LOCAL_STATIC_LIBRARIES := cocos2d_js_static
LOCAL_WHOLE_STATIC_LIBRARIES := PluginFacebook \
sdkbox \
PluginOneSignal

LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 \
-DCOCOS2D_JAVASCRIPT

include $(BUILD_SHARED_LIBRARY)
$(call import-add-path, $(LOCAL_PATH))


$(call import-module, scripting/js-bindings/proj.android)
$(call import-module, ./sdkbox)
$(call import-module, ./pluginfacebook)
$(call import-module, ./pluginonesignal)
