import React, { useCallback, useState } from "react";
import { dbService, storageService } from "firebaseInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <React.Fragment>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              value={newTweet}
              onChange={onChange}
              required
              placeholder="edit you tweet"
              autoFocus
              className="formInput"
            />
            <input type="submit" value="update" className="formBtn" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h4>{props.text}</h4>
          {props.url && <img alt="" width="50" src={props.url} />}
          {props.isOwner && (
            <div className="nweet__actions">
              <span onClick={onClickDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default React.memo(Tweet);
