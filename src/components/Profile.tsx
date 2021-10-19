import React, { useCallback, useState } from "react";
import { authService, dbService } from "../firebaseInstance";
import { useHistory } from "react-router-dom";

function Profile({ userInfo, refreshUser }: any) {
  const [newDisplayName, setNewDisplayName] = useState(userInfo.displayName);
  const history = useHistory();
  const onLogout = useCallback(async () => {
    await authService.logout();
    history.push("/");
  }, []);

  const getMyTweets = async () => {
    const tweets = await dbService.get(userInfo.uid);
    console.log(tweets);
  };

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
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={newDisplayName}
          placeholder="Display Name"
        />
        <input type="submit" placeholder="Update Profile" />
      </form>
      <button onClick={onLogout}>Log out</button>
    </React.Fragment>
  );
}

export default Profile;
