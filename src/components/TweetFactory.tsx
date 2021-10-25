import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../firebaseInstance";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
    FactoryAttachmentContainer,
    FactoryClearContainer,
    FactoryContainer,
    FactoryForm,
    FactoryInput,
    FactoryInputLabel,
    FactorySubmit,
} from "styled";

function TweetFactory({ userInfo }: any) {
    const fileRef = useRef<any>(null);
    const [tweet, setTweet] = useState("");

    const [file, setFile] = useState<File | null>(null);
    const [attachment, setAttachment] = useState<string | null>(null);
    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (tweet == "") {
                return;
            }
            const path = `${userInfo.uid}/${uuidv4()}`;
            const ref = storageService.ref(path);
            await storageService.upload(
                ref,
                file as File,
                async (url: string) => {
                    await dbService.add(tweet, new Date(), userInfo.uid, url);
                    setAttachment(null);
                    setTweet("");
                    setFile(null);
                }
            );
        },
        [tweet, userInfo, setTweet]
    );
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setTweet(e.target.value);
        },
        [setTweet]
    );

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = e;
        const theFile = files?.[0];
        const reader = new FileReader();
        if (theFile) {
            setFile(theFile);
            reader.onloadend = (e) => {
                setAttachment(e.target?.result as string);
            };
            reader.readAsDataURL(theFile);
            fileRef.current.value = "";
        }
    };

    const onClearAttachment = (e: React.MouseEvent<HTMLDivElement>) => {
        setAttachment(null);
    };

    return (
        <FactoryForm onSubmit={onSubmit}>
            <FactoryContainer>
                <FactoryInput
                    value={tweet}
                    onChange={onChange}
                    type="text"
                    placeholder="...?"
                    maxLength={120}
                />

                <FactorySubmit type="submit" value="&rarr;" />
            </FactoryContainer>
            <FactoryInputLabel htmlFor="attach-file">
                <span>Add Photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </FactoryInputLabel>
            <input
                type="file"
                id="attach-file"
                ref={fileRef}
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <FactoryAttachmentContainer>
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                        alt=""
                    />
                    <FactoryClearContainer onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </FactoryClearContainer>
                </FactoryAttachmentContainer>
            )}
        </FactoryForm>
    );
}

export default TweetFactory;
