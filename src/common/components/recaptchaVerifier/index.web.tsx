import React, { useEffect } from "react";
import firebase from "firebase";

export default function RecaptchaVerifier() {
  useEffect(() => {
    (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      elementId,
      {
        size: "invisible",
        callback: (response: any) => {
          console.log(
            "🚀 ~ file: OtpVerifier.tsx ~ line 91 ~ init ~ response",
            response
          );
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      }
    );
  }, []);

  return <div id={elementId} />;
}

const elementId = "sign-in-button";
