import React, { useEffect, useState } from "react";
import { dbService } from "../firebaseInstance";
import Tweet from "../components/Tweet";
import TweetFactory from "../components/TweetFactory";

function Home({ userInfo }: any) {
  const [tweets, setTweets] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = dbService.onSnapshot(setTweets);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <React.Fragment>
      <TweetFactory userInfo={userInfo} />
      <div>
        {tweets.map((t) => (
          <Tweet
            key={t.id}
            id={t.id}
            text={t.text}
            url={t.url}
            isOwner={t.createId === userInfo.uid}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Home;
