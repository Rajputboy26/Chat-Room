/* eslint-disable arrow-body-style */
import React from 'react';
import { Button, Drawer, Icon } from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import DashBoard from './Dashboard';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <DashBoard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
