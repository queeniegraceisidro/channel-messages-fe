import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { DashboardContainer } from './screens/dashboard/dashboard.container'

export const Navigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardContainer />} />
      </Routes>
    </BrowserRouter>
  )
}