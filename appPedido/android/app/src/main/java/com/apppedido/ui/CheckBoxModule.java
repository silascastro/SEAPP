package com.apppedido.ui;

import android.view.View;
import android.widget.CheckBox;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.checkbox.ReactCheckBoxManager;

import javax.annotation.Nonnull;

public class CheckBoxModule extends SimpleViewManager<CheckBox> {

    private static final String REACT_CLASS = "RCTCheckBoxView";

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nonnull
    @Override
    protected CheckBox createViewInstance(@Nonnull ThemedReactContext reactContext) {
        CheckBox checkBox = new CheckBox(reactContext);
        return checkBox;
    }


}
