import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Drawer,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import firebase from 'firebase/app';
import { isOfflineForDatabase } from '../../context/profile.context';
import { useMediaQuery, useModalState, useModalStatenew } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';
import DashBoard from './Slider';


const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Chat name is required'),
  description: StringType().isRequired('Description is required'),
});

const INITIAL_FORM = {
  name: '',
  description: '',
};

const DashboardToggleandNewRoom = () => {
  const { isOpen, open, close } = useModalState();
  const is992px = useMediaQuery('(max-width: 992px)');

  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        Alert.info('Signed Out', 4000);
        close();
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  }, [close]);

  const { isOOpen, oopen, cclose } = useModalStatenew();

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setIsLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
    };

    try {
      await database.ref(`rooms`).push(newRoomData);
      Alert.info(`${formValue.name} has been created`, 4000);

      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="text-blue">Chat-Room</h2>
        <p className="text-blue">By Surya</p>
        <Button className="mr-3 mt-3" color="violet" onClick={open}>
          <Icon icon="dashboard" /> Dashboard
        </Button>
        <Button className="ml-3 mt-3" color="violet" onClick={oopen}>
          <Icon icon="avatar"> New Room</Icon>
        </Button>
        <Modal show={isOOpen} onHide={cclose}>
          <Modal.Header>
            <Modal.Title>New Chat Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              fluid
              onChange={onFormChange}
              formValue={formValue}
              model={model}
              ref={formRef}
            >
              <FormGroup>
                <ControlLabel>Room Name</ControlLabel>
                <FormControl name="name" placeholder="Enter chat room name..." />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  rows={5}
                  name="description"
                  placeholder="Enter room description..."
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="primary"
              onClick={onSubmit}
              disabled={isLoading}
            >
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Drawer full={is992px} show={isOpen} onHide={close} placement="left">
        <DashBoard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggleandNewRoom;
