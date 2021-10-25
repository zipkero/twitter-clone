import React, { useCallback, useState } from "react";
import { authService } from "../firebaseInstance";
import { useHistory } from "react-router-dom";

function Profile({ userInfo, refreshUser }: any) {
  const [newDisplayName, setNewDisplayName] = useState(
    userInfo.displayName || ""
  );
  const history = useHistory();
  const onLogout = useCallback(async () => {
    await authService.logout();
    history.push("/");
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfo.displayName != newDisplayName) {
      await authService.updateProfile(newDisplayName);
      refreshUser();
    }
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          onChange={onChange}
          value={newDisplayName}
          placeholder="Display Name"
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          placeholder="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span onClick={onLogout} className="formBtn cancelBtn logOut">
        Log out
      </span>
    </div>
  );
}

export default Profile;
