import React, { useEffect, useState } from "react";
import "./chatsList.scss";
import { TextField } from "@mui/material";
import { ChatItem } from "../ChatItem/ChatItem";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { selectChats } from "../../store/chats/selectors";
import { addChatWithFb, initChatsTracking } from "../../store/chats/actions";

export const ChatsList = () => {
  const chatsList = useSelector(selectChats);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(initChatsTracking());
  }, [dispatch]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = uuidv4();
    dispatch(addChatWithFb({ name: value, id: newId }));
    setValue("");
  };
  return (
    <div className="chatsListSide">
      <h3>Chats list</h3>
      <div className="chatsList">
        {chatsList.map((chat) => (
          <div className="chatsList_item" key={chat.id}>
            <ChatItem chat={chat} />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <TextField value={value} onChange={handleChange} />
        <button className="addChat">Add chat</button>
      </form>
    </div>
  );
};
