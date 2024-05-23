import React, { useState } from 'react'
import BaseLayoutView from "./base-layout.view"


export interface IBaseLayoutContainerViewModel {
  children?: React.ReactNode
  currentPage: string
  inviteCode?: string
}

export const BaseLayoutContainer: React.FC<IBaseLayoutContainerViewModel> = (props) => {
  const [open, setOpen] = useState(true)
  const toggleSidebar = () => {
    setOpen(!open);
  };
  return <BaseLayoutView
    children={props.children}
    onToggleSidebar={toggleSidebar}
    sidebarOpen={open}
    currentPage={props.currentPage}
    inviteCode={props.inviteCode}
  />
}