import React, { useCallback, useState } from "react";
import { authService } from "../firebaseInstance";
import {
    AuthFormContainer,
    AuthInput,
    AuthSubmitBtn,
    AuthSwitchError,
    AuthSwitchSpan,
} from "styled";

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
            <AuthFormContainer onSubmit={onSubmit}>
                <AuthInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <AuthInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <AuthSubmitBtn
                    type="submit"
                    value={newAccount ? "Create Account" : "Log in"}
                />
                {error && <AuthSwitchError>{error}</AuthSwitchError>}
            </AuthFormContainer>
            <AuthSwitchSpan onClick={toggleAccount}>
                {newAccount ? "sign in" : "sign up"}
            </AuthSwitchSpan>
        </React.Fragment>
    );
}

export default AuthForm;
