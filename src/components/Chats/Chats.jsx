import { useCallback } from "react";
import { Form } from "../Form/Form";
import { MessagesList } from "../MessagesList/MessagesList";
import { ChatsList } from "../ChatsList/ChatsList";
import { Navigate, useParams } from "react-router";
import { connect } from "react-redux";
import { addMessageWithReply } from "../../store/messages/actions";
import "./chats.scss";
import { getChatMsgsListRefById } from "../../services/firebase";
import { push } from "firebase/database";

function Chats({ msgs, sendMessage }) {
  const { chatId } = useParams();

  const handleSend = useCallback(
    (nextMessage) => {
      push(getChatMsgsListRefById(chatId), nextMessage);
    },
    [chatId]
  );

  if (!msgs[chatId]) {
    return <Navigate replace to="/chats" />;
  }

  return (
    <div className="chats">
      <ChatsList />
      <div>
        <MessagesList messages={msgs[chatId]} />

        <div className="form">
          <Form onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default Chats;

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {
  sendMessage: addMessageWithReply,
};

export const ConnectedChats = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats);
