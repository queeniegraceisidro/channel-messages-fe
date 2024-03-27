import DashboardView from './dashboard.view'

export interface IDashboardContainerViewModel {
  children?: React.ReactNode
}

export const DashboardContainer: React.FC<IDashboardContainerViewModel> = (props) => {

  return <DashboardView
    children={props.children}
  />
}