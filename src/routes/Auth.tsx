import React, { useCallback } from "react";
import { authService } from "firebaseInstance";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { AuthBtn, AuthBtnsContainer, AuthContainer } from "styled";

function Auth() {
    const onSocialClick = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>) => {
            await authService.signInWithPopup(e.currentTarget.name);
        },
        []
    );

    return (
        <AuthContainer>
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{
                    marginBottom: 30,
                }}
            />

            <AuthForm />
            <AuthBtnsContainer>
                <AuthBtn
                    name="google"
                    onClick={onSocialClick}
                >
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </AuthBtn>
            </AuthBtnsContainer>
        </AuthContainer>
    );
}

export default Auth;
