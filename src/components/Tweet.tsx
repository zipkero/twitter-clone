import React, { useCallback, useState } from "react";
import { dbService, storageService } from "firebaseInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import {FormBtn, FormInput, TweetActionsContainer, TweetContainer, TweetEditForm, TweetToggleBtn} from "styled";

interface ITweetProps {
    id: string;
    text: string;
    isOwner: boolean;
    url: string;
}

function Tweet(props: ITweetProps) {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(props.text);

    const onClickDelete = useCallback(async () => {
        if (confirm("삭제하시겠습니까?")) {
            await dbService.delete(props.id);
            if (props.url) {
                await storageService.delete(props.url);
            }
        }
    }, []);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTweet(e.target.value);
    }, []);

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            await dbService.update(props.id, newTweet);
            setEditing(false);
        },
        []
    );

    const toggleEditing = () => setEditing((prev) => !prev);

    return (
        <TweetContainer>
            {editing ? (
                <React.Fragment>
                    <TweetEditForm onSubmit={onSubmit}>
                        <FormInput
                            value={newTweet}
                            onChange={onChange}
                            required
                            placeholder="edit you tweet"
                            autoFocus
                        />
                        <FormBtn type="submit" value="update" />
                    </TweetEditForm>
                    <TweetToggleBtn
                        onClick={toggleEditing}
                    >
                        Cancel
                    </TweetToggleBtn>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <h4>{props.text}</h4>
                    {props.url && <img alt="" width="50" src={props.url} />}
                    {props.isOwner && (
                        <TweetActionsContainer >
                            <span onClick={onClickDelete}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </TweetActionsContainer>
                    )}
                </React.Fragment>
            )}
        </TweetContainer>
    );
}

export default React.memo(Tweet);
