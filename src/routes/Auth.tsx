import React, {useCallback} from "react";
import {authService} from "firebaseInstance";
import AuthForm from "../components/AuthForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle, faTwitter} from "@fortawesome/free-brands-svg-icons";

function Auth() {
    const onSocialClick = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>) => {
            await authService.signInWithPopup(e.currentTarget.name);
        },
        []
    );

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{
                    marginBottom: 30,
                }}
            />

            <AuthForm/>
            <div className="authBtns">
                <button name="google" onClick={onSocialClick} className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle}/>
                </button>
            </div>
        </div>
    );
}

export default Auth;
