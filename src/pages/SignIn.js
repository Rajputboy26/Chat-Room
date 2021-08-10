/* eslint-disable arrow-body-style */
import React from 'react';
import firebase from 'firebase/app';
import { Col, Container, Grid, Icon, Panel, Button, Row, Alert } from 'rsuite';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
  const signInWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed IN', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  const onFacebook = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };
  const onGoogle = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat-Room</h2>
                <p>By Surya</p>
              </div>
              <div className="mt-3">
                <Button block color="blue" onClick={onFacebook}>
                  <Icon icon="facebook" /> Facebook
                </Button>
                <Button block color="red" onClick={onGoogle}>
                  <Icon icon="google" /> Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
