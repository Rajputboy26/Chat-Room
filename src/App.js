import React from 'react';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import { Switch } from 'react-router';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/home/Home';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
import { RoomsProvider } from './context/rooms.context';

function App() {
  return (
    <RoomsProvider>
      <ProfileProvider>
        <Switch>
          <PublicRoute path="/signin">
            <SignIn />
          </PublicRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </ProfileProvider>
    </RoomsProvider>
  );
}

export default App;
