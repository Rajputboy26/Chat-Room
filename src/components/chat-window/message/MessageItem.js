import React, { memo } from 'react';
import TimeAgo from 'timeago-react';
import { Button } from 'rsuite';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import PresenceDot from '../../PresenceDot';
import { useCurrentRoom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';
import { useHover } from '../../../misc/custom-hooks';
import IconBtnControl from './IconBtnControl';

const MessageItem = ({ message, handleAdmin }) => {
  const { Author, createdAt, text } = message;

  const [selfRef, isHovered] = useHover();

  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(Author.uid);
  const isAuthor = auth.currentUser.uid === Author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
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
        >
          {canGrantAdmin && (
            <Button block onClick={() => handleAdmin(Author.uid)} color="blue">
              {isMsgAuthorAdmin
                ? 'Remove admin permission'
                : 'Give Admin permission'}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
        <IconBtnControl
          // eslint-disable-next-line no-constant-condition
          {...(true ? { color: 'red' } : {})}
          isVisible
          iconName="heart"
          tooltip="Like this message"
          onClick={() => {}}
          badgeContent={5}
        />
      </div>
      <div>
        <span className="word-breal-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
