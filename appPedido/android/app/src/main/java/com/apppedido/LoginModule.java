package com.apppedido;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nonnull;

public class LoginModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext mReactContext;
    private SharedPreferences login = null;
    private SharedPreferences user = null;
    private SharedPreferences password = null;

    public LoginModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        login = reactContext.getSharedPreferences("login",Context.MODE_PRIVATE);
        user = reactContext.getSharedPreferences("user",Context.MODE_PRIVATE);
        password = reactContext.getSharedPreferences("password",Context.MODE_PRIVATE);
    }

    @Nonnull
    @Override
    public String getName() {
        return "LoginModule";
    }

    @ReactMethod
    public void login(String name,String password){
        SharedPreferences.Editor editor = login.edit();
        editor.putInt("login",1);
        editor.apply();

        setUser(name);
        setPassword(password);
        //Log.d("LoginStatus", String.valueOf(login.getInt("login", Context.MODE_PRIVATE)));
    }

    @ReactMethod
    public void logoff(){
        SharedPreferences.Editor editor = login.edit();
        editor.putInt("login",0);
        editor.apply();

        removelogin();
    }

    @ReactMethod
    public void setUser(String name){
        SharedPreferences.Editor editor = user.edit();
        editor.putString("user",name);
        editor.apply();
    }

    @ReactMethod
    public void setPassword(String pass){
        SharedPreferences.Editor editor = password.edit();
        editor.putString("password",pass);
        editor.apply();
    }


    public void removelogin(){
        SharedPreferences.Editor editor = user.edit();
        editor.putString("login",null);
        editor.apply();

        SharedPreferences.Editor editor2 = password.edit();
        editor.putString("password",null);
        editor2.apply();
    }


    @ReactMethod
    public void getLoginStatus(){
        int loginStatus = login.getInt("login",Context.MODE_PRIVATE);
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



}
