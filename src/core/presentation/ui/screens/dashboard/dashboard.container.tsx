import { useState } from 'react';
import DashboardView from './dashboard.view'

export interface IDashboardContainerViewModel {
  children?: React.ReactNode
}

export const DashboardContainer: React.FC<IDashboardContainerViewModel> = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return <DashboardView
    children={props.children}
    showModal={open}
    handleCreateModalShow={handleOpen}
    handleCreateModalClose={handleClose}
  />
}