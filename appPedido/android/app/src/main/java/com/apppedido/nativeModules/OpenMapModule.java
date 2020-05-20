package com.apppedido.nativeModules;

import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class OpenMapModule extends ReactContextBaseJavaModule {
    public OpenMapModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void show(int lat, int lng,String address, String city, String uf) {
        //Uri.parse("http://maps.google.com/maps?daddr="+lat+","+lng));
        Intent intent = new Intent(android.content.Intent.ACTION_VIEW,
        Uri.parse("google.navigation:q="+address+","+city+" - "+uf));
        intent.setPackage("com.google.android.apps.maps");

        if(intent.resolveActivity(getReactApplicationContext().getPackageManager())!= null){
            getReactApplicationContext().startActivity(intent);
        }
    }


    @Nonnull
    @Override
    public String getName() {
        return "OpenMapModule";
    }
}
