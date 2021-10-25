import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
`;

export const FactoryContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    margin-bottom: 20px;
    width: 100%;
`;

export const FactoryAttachmentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
        height: 80px;
        width: 80px;
        border-radius: 40px;
    }
`;

export const FactoryClearContainer = styled.div`
    color: #04aaff;
    cursor: pointer;
    text-align: center;
`;

export const FactoryInput = styled.input`
    flex-grow: 1;
    height: 40px;
    padding: 0px 20px;
    color: white;
    border: 1px solid #04aaff;
    border-radius: 20px;
    font-weight: 500;
    font-size: 12px;
`;

export const FactorySubmit = styled.input`
    position: absolute;
    right: 0;
    background-color: #04aaff;
    height: 40px;
    width: 40px;
    padding: 10px 0px;
    text-align: center;
    border-radius: 20px;
    color: white;
`;

export const FactoryInputLabel = styled.label`
    color: #04aaff;
    cursor: pointer;

    span {
        margin-right: 10px;
        font-size: 12px;
    }
`;

export const ProfileForm = styled.form`
    border-bottom: 1px solid rgba(255, 255, 255, 0.9);
    padding-bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const ProfileLogout = styled.span`
    cursor: pointer;
    width: 100%;
    padding: 7px 20px;
    text-align: center;
    color: white;
    border-radius: 20px;
    background-color: tomato;
    margin-top: 50px;
`;

export const FactoryForm = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

export const AuthFormContainer = styled.form`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
`;

export const AuthBtnsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 320px;
`;

export const AuthBtn = styled.button`
    cursor: pointer;
    border-radius: 20px;
    border: none;
    padding: 10px 0px;
    font-size: 12px;
    text-align: center;
    width: 150px;
    background: white;
`;

export const AuthInput = styled.input`
    max-width: 320px;
    width: 100%;
    padding: 10px;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 1);
    margin-bottom: 10px;
    font-size: 12px;
    color: black;
`;

export const AuthSubmitBtn = styled.input`
    max-width: 320px;
    width: 100%;
    padding: 10px;
    border-radius: 30px;
    margin-bottom: 10px;
    font-size: 12px;
    text-align: center;
    background: #04aaff;
    color: white;
    margin-top: 10px;
    cursor: pointer;
`;

export const AuthSwitchError = styled.span`
    color: tomato;
    text-align: center;
    font-weight: 500;
    font-size: 12px;
`;

export const AuthSwitchSpan = styled.span`
    color: #04aaff;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 50px;
    display: block;
    font-size: 12px;
    text-decoration: underline;
`;

export const FormInput = styled.input`
    width: 100%;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid black;
    text-align: center;
    background-color: white;
    color: black;
`;

export const FormBtn = styled.input`
    cursor: pointer;
    width: 100%;
    padding: 7px 20px;
    text-align: center;
    color: white;
    border-radius: 20px;
    background-color: #04aaff;
`;

export const TweetContainer = styled.div`
    margin-bottom: 20px;
    background-color: white;
    width: 100%;
    max-width: 320px;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    color: rgba(0, 0, 0, 0.8);

    h4 {
        font-size: 14px;
    }

    img {
        right: -10px;
        top: 20px;
        position: absolute;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-top: 10px;
    }
`;

export const TweetEditForm = styled.form`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
`;

export const TweetActionsContainer = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;

    span {
        cursor: pointer;
    }

    span:first-child {
        margin-right: 10px;
    }
`;

export const TweetToggleBtn = styled.button`
    cursor: pointer;
    width: 100%;
    padding: 7px 20px;
    text-align: center;
    color: white;
    border-radius: 20px;

    background-color: tomato;
`;
