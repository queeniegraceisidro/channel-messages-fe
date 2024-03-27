import { SidebarView } from './sidebar.view'


export interface ISidebarContainerViewModel { }

export const SidebarContainer: React.FC<ISidebarContainerViewModel> = (props) => {

  return <SidebarView />

}