import React, { useState } from "react";
import { authService } from "../firebaseInstance";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = await authService.signInWithPopup(e.currentTarget.name);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUser(email, password);
      } else {
        data = await authService.signIn(email, password);
      }
      console.log(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "sign in" : "sign up"}</span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Auth;
