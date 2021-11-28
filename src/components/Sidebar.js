import React, { useEffect, useRef, useState } from 'react';
import { Divider } from 'rsuite';
import { RoomsProvider } from '../context/rooms.context';
// import CreateRoomBtnModal from './CreateRoomBtnModal';
import DashboardToggleandNewRoom from './dashboard/DashboardToggleandNewRoom';
import ChatRoomList from './rooms/ChatRoomList';

const Sidebar = () => {
  const topSideBarRef = useRef();
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (topSideBarRef.current) {
      setHeight(topSideBarRef.current.scrollHeight);
    }
  }, [topSideBarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSideBarRef}>
        <DashboardToggleandNewRoom />
        {/* <CreateRoomBtnModal /> */}
        <Divider> Rooms </Divider>
        <RoomsProvider />
      </div>
      <ChatRoomList aboveElHeight={height} />
    </div>
  );
};

export default Sidebar;
