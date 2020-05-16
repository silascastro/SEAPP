package com.apppedido;

import android.app.Application;

import com.apppedido.nativeModules.ToastPackage;
import com.apppedido.ui.CheckBoxPackage;
import com.facebook.react.ReactApplication;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

//modulos de terceiros
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
                                                                                                                                                                                                                                              new MainReactPackage(),
            new RNTextInputMaskPackage(),
            new AsyncStoragePackage(),
            new RNScreensPackage(),
            new RNGestureHandlerPackage(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ),
            new ReanimatedPackage(),
            new LoginPackage(),
            new CheckBoxPackage(),
          new ToastPackage(),
          new VectorIconsPackage(),
          new MapsPackage(),
          new GeolocationPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native e                                                                                                   xopackage */ false);
  }
}
