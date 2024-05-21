import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { DashboardContainer } from './screens/dashboard/dashboard.container'
import { LoginContainer } from './screens/login/login.container'

export const Navigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardContainer />} />
        <Route path='/login' element={<LoginContainer />} />
      </Routes>
    </BrowserRouter>
  )
}