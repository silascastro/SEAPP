package com.apppedido;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.telephony.TelephonyManager;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.UUID;

import javax.annotation.Nonnull;

public class LoginModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext mReactContext;
    private SharedPreferences login = null;
    private SharedPreferences user = null;
    private SharedPreferences password = null;

    public LoginModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        login = reactContext.getSharedPreferences("login_app_pedidos", Context.MODE_PRIVATE);
        user = reactContext.getSharedPreferences("user_app_pedidos", Context.MODE_PRIVATE);
        password = reactContext.getSharedPreferences("password_app_pedidos", Context.MODE_PRIVATE);
    }

    @Nonnull
    @Override
    public String getName() {
        return "LoginModule";
    }

    @ReactMethod
    public void login(int name, String password) {
        SharedPreferences.Editor editor = login.edit();
        editor.putInt("login_app_pedidos", 1);
        editor.apply();

        setUser(name);
        setPassword(password);
        //Log.d("LoginStatus", String.valueOf(login.getInt("login", Context.MODE_PRIVATE)));
    }

    @ReactMethod
    public void logoff() {
        SharedPreferences.Editor editor = login.edit();
        editor.putInt("login_app_pedidos", 0);
        editor.apply();
        removelogin();
    }

    @ReactMethod
    public void setUser(int name) {
        SharedPreferences.Editor editor = user.edit();
        editor.putInt("user_app_pedidos", name);
        editor.apply();

    }

    public int getUserFromShared(){
        return user.getInt("user_app_pedidos", Context.MODE_PRIVATE);
    }

    @ReactMethod
    public void setPassword(String pass) {
        SharedPreferences.Editor editor = password.edit();
        editor.putString("password_app_pedidos", pass);
        editor.apply();
    }

    @ReactMethod
    public void setPermission(){
/*
        WritableMap params = Arguments.createMap();
        params.putInt("login",loginStatus);
        ReactApplicationContext mContext = getReactApplicationContext();
        sendLoginStatus(mContext,"permissionStatus", params);*/
    }


    public void sendPermissionStatus(ReactContext reactContext, String eventName, @Nullable WritableMap params){
        reactContext.
                getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void getImei() {
        TelephonyManager telephonyManager = (TelephonyManager) mReactContext.getSystemService(Context.TELEPHONY_SERVICE);
        @SuppressLint("MissingPermission") String imei = telephonyManager.getDeviceId();

        WritableMap params = Arguments.createMap();
        params.putString("imei",imei);
        ReactApplicationContext mContext = getReactApplicationContext();
        sendImei(mContext,"imei", params);
    }

    public void sendImei(ReactContext reactContext, String eventName, @Nullable WritableMap params){
        reactContext.
                getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


    public void removelogin(){
        SharedPreferences.Editor editor = user.edit();
        editor.putInt("login_app_pedidos",0);
        editor.apply();

        SharedPreferences.Editor editor2 = password.edit();
        editor.putString("password_app_pedidos",null);
        editor2.apply();
    }


    @ReactMethod
    public void getLoginStatus(){
        int loginStatus = login.getInt("login_app_pedidos",Context.MODE_PRIVATE);
        WritableMap params = Arguments.createMap();
        params.putInt("login",loginStatus);
        ReactApplicationContext mContext = getReactApplicationContext();
        sendLoginStatus(mContext,"LoginStatus", params);
    }


    public void sendLoginStatus(ReactContext reactContext, String eventName, @Nullable WritableMap params){
        reactContext.
                getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

     @ReactMethod
    public void getUser(){
        int user = getUserFromShared();
        WritableMap params = Arguments.createMap();
        params.putInt("user",user);
        ReactApplicationContext mContext = getReactApplicationContext();
        sendUser(mContext,"userData", params);
    }

    public void sendUser(ReactContext reactContext, String eventName, @Nullable WritableMap params){
        reactContext.
            getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }


}
