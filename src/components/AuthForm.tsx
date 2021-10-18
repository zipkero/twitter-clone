import React, { useCallback, useState } from "react";
import { authService } from "../firebaseInstance";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      switch (e.target.name) {
        case "email":
          setEmail(e.target.value);
          break;
        case "password":
          setPassword(e.target.value);
          break;
      }
    },
    [setEmail, setPassword]
  );

  const toggleAccount = useCallback(
    () => setNewAccount((prev) => !prev),
    [setNewAccount]
  );
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        let data;
        if (newAccount) {
          data = await authService.createUser(email, password);
        } else {
          data = await authService.signIn(email, password);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [email, password]
  );
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default AuthForm;
