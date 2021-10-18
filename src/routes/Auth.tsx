import React, { useCallback, useState } from "react";
import { authService } from "../firebaseInstance";
import AuthForm from "../components/AuthForm";

function Auth() {
  const onSocialClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      await authService.signInWithPopup(e.currentTarget.name);
    },
    []
  );

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Auth;
