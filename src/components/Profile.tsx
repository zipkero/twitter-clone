import React, { useCallback, useState } from "react";
import { authService, UserInfo } from "../firebaseInstance";
import { useHistory } from "react-router-dom";
import {
    Container,
    FormBtn,
    FormInput,
    ProfileForm,
    ProfileLogout,
} from "styled";
import { useDispatch, useSelector } from "react-redux";
import { userActionCreator } from "store/user";

const Profile = () => {
    const state = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const [newDisplayName, setNewDisplayName] = useState(
        state.user_info?.displayName || ""
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
        if (state.user_info?.displayName != newDisplayName) {
            await authService.updateProfile(newDisplayName);
            dispatch(userActionCreator.refreshUser());
        }
    };
    return (
        <Container>
            <ProfileForm onSubmit={onSubmit}>
                <FormInput
                    type="text"
                    onChange={onChange}
                    value={newDisplayName}
                    placeholder="Display Name"
                    autoFocus
                />
                <FormBtn
                    type="submit"
                    placeholder="Update Profile"
                    style={{
                        marginTop: 10,
                    }}
                />
            </ProfileForm>
            <ProfileLogout onClick={onLogout}>Log out</ProfileLogout>
        </Container>
    );
};

export default Profile;
