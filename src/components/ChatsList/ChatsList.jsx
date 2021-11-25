import React, { useState } from "react";
import "./chatsList.scss";
import { TextField } from "@mui/material";
import { ChatItem } from "../ChatItem/ChatItem";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../store/chats/actions";
import { selectChats } from "../../store/chats/selectors";

// const chatsList = [
//   {
//     name: "Work",
//     id: 0,
//   },
//   {
//     name: "Crazy friends",
//     id: 1,
//   },
//   {
//     name: "Lovely family",
//     id: 2,
//   },
// ];
export const ChatsList = () => {
  const chatsList = useSelector(selectChats);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = uuidv4();
    dispatch(addChat({ name: value, id: newId }));
    setValue("");
  };
  return (
    <div className="chatsListSide">
      <h3>Chats list</h3>
      <ul className="chatsList">
        {chatsList.map((chat) => (
          <li className="chatsList_item" key={chat.id}>
            <ChatItem chat={chat} />
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <TextField value={value} onChange={handleChange} />
        <button className="addChat">Add chat</button>
      </form>
    </div>
  );
};