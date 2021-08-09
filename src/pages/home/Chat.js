/* eslint-disable */
import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import Bottom from '../../components/chat-window/bottom/Bottom';
import Message from '../../components/chat-window/message/Message';
import Top from '../../components/chat-window/top/Top';
import { useRooms } from '../../context/rooms.context';

const Chat = () => {
  const { chatId } = useParams();

  const rooms = useRooms();

  if (!rooms) {
    return (
      <Loader center verticle="true" size="md" content="Loading" speed="slow" />
    );
  }

  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom) {
    return <h6 className="text-center mt-page">Chat {chatId} not found</h6>;
  }

  return (
    <>
      <div className="chat-top">
        <Top />
      </div>
      <div className="chat-middle">
        <Message />
      </div>
      <div className="chat-bottom">
        <Bottom />
      </div>
    </>
  );
};

export default Chat;
