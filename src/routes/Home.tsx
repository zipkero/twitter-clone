import React, { useEffect } from "react";
import { dbService, UserInfo } from "../firebaseInstance";
import Tweet from "../components/Tweet";
import TweetFactory from "../components/TweetFactory";
import { Container } from "styled";
import { useSelector } from "react-redux";
import { ITweetItem } from "store/common";
import { tweetActionCreator } from "store/tweet";

function Home() {
    const state = useSelector((state) => state);
    const [user, tweet] = [state.user, state.tweet];

    const userInfo = user.user_info;

    useEffect(() => {
        const unsubscribe = dbService.onSnapshot((items: ITweetItem[]) => {
            tweetActionCreator.getList(items);
        });
        return () => {
            unsubscribe && unsubscribe();
        };
    }, []);

    return (
        <Container>
            <TweetFactory userInfo={userInfo} />
            <div
                style={{
                    marginTop: 30,
                }}
            >
                {tweet.items.map((t) => (
                    <Tweet
                        key={t.id}
                        id={t.id}
                        text={t.text}
                        url={t.url}
                        isOwner={t.createId === userInfo?.uid}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Home;
