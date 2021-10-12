import React, { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService, firebaseAuth, UserInfo } from "firebaseInstance";

export default function App() {
  const [init, setInit] = useState(false);
  const [loginUserInfo, setLoginUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setLoginUserInfo(user);
      } else {
        setLoginUserInfo(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const userInfo: UserInfo = authService.getCurrentUser() as UserInfo;
    setLoginUserInfo({ ...userInfo });
  };

  return (
    <React.Fragment>
      {init ? (
        <AppRouter userInfo={loginUserInfo} refreshUser={refreshUser} />
      ) : (
        "..."
      )}
    </React.Fragment>
  );
}
