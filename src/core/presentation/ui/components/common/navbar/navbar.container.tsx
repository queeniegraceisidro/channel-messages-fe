import { toast } from 'react-toastify'
import NavbarController from './navbar.controller'
import { NavbarView } from './navbar.view'
import { useState } from 'react'


export interface INavbarContainerViewModel {
  onToggleSidebar: () => void
  sidebarOpen: boolean
  currentPage: string
  inviteCode?: string
}

export const NavbarContainer: React.FC<INavbarContainerViewModel> = (props) => {
  const controller = new NavbarController()
  const [tooltipText, setTooltipText] = useState<string>('Click to copy the Code');

  const handleLogout = async () => {
    controller.logout()
    toast.success('Successfully Logout!')
  };

  const handleCopyInviteCode = (inviteCode: string) => {
    setTooltipText('Successfully copied invite code')
    navigator.clipboard.writeText(inviteCode)
    setTimeout(() => {
      setTooltipText('Click to copy the Code')
    }, 1000);
  }

  return <NavbarView
    onToggleSidebar={props.onToggleSidebar}
    sidebarOpen={props.sidebarOpen}
    currentPage={props.currentPage}
    handleLogout={handleLogout}
    inviteCode={props.inviteCode}
    handleCopyInviteCode={handleCopyInviteCode}
    tooltipText={tooltipText}
  />

}