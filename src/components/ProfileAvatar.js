/* eslint-disable arrow-body-style */
import React from 'react';
import { Avatar } from 'rsuite';
import { getNameInitial } from '../misc/helper';

const ProfileAvatar = ({ name, ...avatarProps }) => {
  return (
    <Avatar circle {...avatarProps}>
      {getNameInitial(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
