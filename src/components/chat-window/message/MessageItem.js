/* eslint-disable */
import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../ProfileAvatar';

const MessageItem = ({ message }) => {
  const { Author, createdAt, text } = message;

  return (
    <li className="padded mb-1">
      <div className="d-flex align-item-center font-bolder mb-1">
        <ProfileAvatar
          src={Author.avatar}
          name={Author.name}
          className="ml-1"
          size="xs"
        />
        <span className="ml-2">{Author.name}</span>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
      </div>
      <div>
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
