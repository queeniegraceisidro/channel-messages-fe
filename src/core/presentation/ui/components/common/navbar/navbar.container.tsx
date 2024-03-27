import { NavbarView } from './navbar.view'


export interface INavbarContainerViewModel { }

export const NavbarContainer: React.FC<INavbarContainerViewModel> = (props) => {

  return <NavbarView />

}