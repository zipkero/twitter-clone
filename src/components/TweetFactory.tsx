import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../firebaseInstance";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

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
      await storageService.upload(ref, file as File, async (url: string) => {
        await dbService.add(tweet, new Date(), userInfo.uid, url);
        setAttachment(null);
        setTweet("");
        setFile(null);
      });
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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          value={tweet}
          onChange={onChange}
          className="factoryInput__input"
          type="text"
          placeholder="...?"
          maxLength={120}
        />

        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add Photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
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
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
            alt=""
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
}

export default TweetFactory;
