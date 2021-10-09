import React, { useCallback, useState } from "react";
import { dbService, storageService } from "firebaseInstance";

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

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dbService.update(props.id, newTweet);
    setEditing(false);
  }, []);

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <div>
      {editing ? (
        <React.Fragment>
          <form onSubmit={onSubmit}>
            <input value={newTweet} onChange={onChange} required />
            <input type="submit" value="update" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h4>{props.text}</h4>
          {props.url && <img alt="" width="100" src={props.url} />}
          {props.isOwner && (
            <React.Fragment>
              <button onClick={onClickDelete}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default React.memo(Tweet);
