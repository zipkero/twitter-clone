import React, { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../firebaseInstance";

function TweetFactory({ userInfo }: any) {
  const fileRef = useRef<any>(null);
  const [tweet, setTweet] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [attachment, setAttachment] = useState<string | null>(null);
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
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

  const onClearAttachment = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAttachment(null);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={tweet}
        onChange={onChange}
        type="text"
        placeholder="...?"
        maxLength={120}
      />
      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        onChange={onFileChange}
      />
      <input type="submit" value="tweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
}

export default TweetFactory;
