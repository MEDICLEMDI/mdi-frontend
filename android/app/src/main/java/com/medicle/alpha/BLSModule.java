package com.medicle.alpha;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BLSModule extends ReactContextBaseJavaModule {
    static {
        System.loadLibrary("mobile_app");
    }

    @Override
    public String getName() {
        return "BLSModule";
    }

    public BLSModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void androidVerifyJson(String s, Promise promise) {
        try {
            promise.resolve(verifyJson(s));
        } catch(Exception e) {
            promise.reject("Error at BLSModule:androidVerifyJson", e);
        }
    }

    private static native String verifyJson(String name);
}