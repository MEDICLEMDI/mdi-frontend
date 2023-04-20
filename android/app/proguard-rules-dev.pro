## Facebook
-keep class com.facebook.react.devsupport.** { *; }
-keep class com.facebook.flipper.** { *; }

-dontwarn com.facebook.react.devsupport.**
-dontwarn com.facebook.flipper.**

-keep public class com.nhn.android.naverlogin.** {
       public protected *;
}

-keep class com.kakao.sdk.**.model.* { <fields>; }
-keep class * extends com.google.gson.TypeAdapter