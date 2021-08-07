/* eslint-disable arrow-body-style */
import React, { createContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { transformToWrrWithId } from '../misc/helper';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref('rooms');

    roomListRef.on('value', snap => {
      const data = transformToWrrWithId(snap.val());
      setRooms(data);
    });

    return () => {
      roomListRef.off();
    };
  }, []);
  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};
