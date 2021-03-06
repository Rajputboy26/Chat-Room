// /* eslint-disable  */
// ye video k hissab se index.js h
import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import { getUserUpdates } from '../../misc/helper';
import EditableInput from '../EditableInput';
import ProfilePicBtn from './ProfilePicBtn';
import ProviderBlock from './ProviderBlock';

const DashBoard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async newNickName => {
    try {
      const updates = await getUserUpdates(
        profile.uid,
        'name',
        newNickName,
        database
      );

      await database.ref().update(updates);

      Alert.success('Nickname has been updated', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <ProfilePicBtn />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Footer>{' '}
    </>
  );
};

export default DashBoard;
