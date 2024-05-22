import { useEffect, useState } from 'react';
import DashboardView from './dashboard.view'
import DashboardController from './dashboard.controller';

export interface IDashboardContainerViewModel {
  children?: React.ReactNode
}

export const DashboardContainer: React.FC<IDashboardContainerViewModel> = (props) => {
  const [open, setOpen] = useState(false);
  const [joinChannelOpen, setJoinChannelOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleJoinChannelOpen = () => setJoinChannelOpen(true);
  const handleJoinChannelClose = () => setJoinChannelOpen(false);

  useEffect(() => {
    const controller = new DashboardController()
    const handleInitalized = async () => {
      await controller.getUserChannels()
    }
    handleInitalized()
  }, [])


  return <DashboardView
    children={props.children}
    showModal={open}
    showJoinChannelModel={joinChannelOpen}
    handleCreateModalShow={handleOpen}
    handleCreateModalClose={handleClose}
    handleJoinModalShow={handleJoinChannelOpen}
    handleJoinModalClose={handleJoinChannelClose}
  />
}