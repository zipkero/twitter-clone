import React, { useCallback, useState } from "react";
import {
    AuthFormContainer,
    AuthInput,
    AuthSubmitBtn,
    AuthSwitchError,
    AuthSwitchSpan,
} from "styled";
import { useDispatch, useSelector } from "react-redux";
import { userActionCreator, UserState } from "store/user";
import { rootState } from "store";

function AuthForm() {
    const state = useSelector<rootState>((state) => state?.user) as UserState;
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

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

            if (newAccount) {
                dispatch(userActionCreator.createUser(email, password));
            } else {
                dispatch(userActionCreator.signInUser(email, password));
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
                {state.error && (
                    <AuthSwitchError>{state.error}</AuthSwitchError>
                )}
            </AuthFormContainer>
            <AuthSwitchSpan onClick={toggleAccount}>
                {newAccount ? "sign in" : "sign up"}
            </AuthSwitchSpan>
        </React.Fragment>
    );
}

export default AuthForm;
