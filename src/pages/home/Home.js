/* eslint-disable  */
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Button, Col, Grid, Row } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import { RoomsProvider } from '../../context/rooms.context';
import { useMediaQuery } from '../../misc/custom-hooks';
import { useRooms } from '../../context/rooms.context';
import Chat from './Chat';

const Home = () => {
  const room = useRooms();
  const isDesktop = useMediaQuery('(min-width: 992px)');

  const { isExact } = useRouteMatch();

  const canRenderSidebar = isDesktop || isExact;

  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {canRenderSidebar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}

          <Switch>
            <Route exact path="/chat/:chatId">
              <Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>
            <Route exact path="/">
              {isDesktop && (
                <Col xs={24} md={16} className="h-100">
                  <h6 className="text-center mt-page">
                    {room.length > 0 ? 'Select Room' : 'Create Room'}
                  </h6>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
