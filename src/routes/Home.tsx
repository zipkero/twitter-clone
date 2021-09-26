import React, { useCallback, useEffect, useState } from "react";
import { dbService } from "../firebaseInstance";
import Tweet from "../components/Tweet";

function Home({ userInfo }: any) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState<any[]>([]);
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await dbService.add(tweet, new Date(), userInfo.uid);
      setTweet("");
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

  useEffect(() => {
    dbService.onSnapshot(setTweets);
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="...?"
          maxLength={120}
        />
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((t) => (
          <Tweet
            key={t.id}
            id={t.id}
            text={t.text}
            isOwner={t.createId === userInfo.uid}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Home;
