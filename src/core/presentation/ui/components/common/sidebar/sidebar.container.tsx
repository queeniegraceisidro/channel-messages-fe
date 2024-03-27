import { SidebarView } from './sidebar.view'


export interface ISidebarContainerViewModel {
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

export const SidebarContainer: React.FC<ISidebarContainerViewModel> = (props) => {

  return <SidebarView
    onToggleSidebar={props.onToggleSidebar}
    sidebarOpen={props.sidebarOpen}
  />
}