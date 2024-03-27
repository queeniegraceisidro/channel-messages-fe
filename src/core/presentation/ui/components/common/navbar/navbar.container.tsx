import { NavbarView } from './navbar.view'


export interface INavbarContainerViewModel {
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

export const NavbarContainer: React.FC<INavbarContainerViewModel> = (props) => {

  return <NavbarView
    onToggleSidebar={props.onToggleSidebar}
    sidebarOpen={props.sidebarOpen}
  />

}