import { useAppSelector } from '../../../../presenters/store/hooks';
import { SidebarView } from './sidebar.view'


export interface ISidebarContainerViewModel {
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

export const SidebarContainer: React.FC<ISidebarContainerViewModel> = (props) => {
  const channels = useAppSelector(state => state.channelState.channels);
  return <SidebarView
    onToggleSidebar={props.onToggleSidebar}
    sidebarOpen={props.sidebarOpen}
    channels={channels}
  />
}