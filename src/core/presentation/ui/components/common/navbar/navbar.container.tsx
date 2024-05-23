import { toast } from 'react-toastify'
import NavbarController from './navbar.controller'
import { NavbarView } from './navbar.view'


export interface INavbarContainerViewModel {
  onToggleSidebar: () => void
  sidebarOpen: boolean
  currentPage: string
  inviteCode?: string
}

export const NavbarContainer: React.FC<INavbarContainerViewModel> = (props) => {
  const controller = new NavbarController()
  const handleLogout = async () => {
    controller.logout()
    toast.success('Successfully Logout!')
  };

  return <NavbarView
    onToggleSidebar={props.onToggleSidebar}
    sidebarOpen={props.sidebarOpen}
    currentPage={props.currentPage}
    handleLogout={handleLogout}
    inviteCode={props.inviteCode}
  />

}