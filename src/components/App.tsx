import React, { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { firebaseAuth, UserInfo } from "firebaseInstance";
import { User } from "firebase/auth";

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

  return (
    <React.Fragment>
      {init ? <AppRouter userInfo={loginUserInfo} /> : "..."}
      <footer>&copy; {new Date().getFullYear()} Twitter Clone</footer>
    </React.Fragment>
  );
}
