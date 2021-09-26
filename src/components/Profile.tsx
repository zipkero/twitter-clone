import React from "react";
import { authService } from "../firebaseInstance";
import { useHistory } from "react-router-dom";

function Profile() {
  const history = useHistory();
  const onLogout = () => {
    authService.logout();
    history.push("/");
  };
  return (
    <React.Fragment>
      <button onClick={onLogout}>Log out</button>
    </React.Fragment>
  );
}

export default Profile;
