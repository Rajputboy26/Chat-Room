/* eslint-disable */
import React from 'react';
import TimeAgo from 'timeago-react';
import PresenceDot from '../../PresenceDot';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageItem = ({ message }) => {
  const { Author, createdAt, text } = message;

  return (
    <li className="padded mb-1">
      <div className="d-flex align-item-center font-bolder mb-1">
        <PresenceDot uid={Author.uid} />
        <ProfileAvatar
          src={Author.avatar}
          name={Author.name}
          className="ml-1"
          size="xs"
        />
        <ProfileInfoBtnModal
          profile={Author}
          appearance="link"
          className="p-0 ml-1 text-black"
        />
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
