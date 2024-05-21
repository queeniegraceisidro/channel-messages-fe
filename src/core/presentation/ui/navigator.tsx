import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { DashboardContainer } from './screens/dashboard/dashboard.container'
import { LoginContainer } from './screens/login/login.container'
import { SignupContainer } from './screens/signup/signup.container'
import { ChannelContainer } from './screens/channel/channel.container'

export const Navigator = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardContainer />} />
        <Route path='/login' element={<LoginContainer />} />
        <Route path='/signup' element={<SignupContainer />} />
        <Route path='/channel' element={<ChannelContainer />} />
      </Routes>
    </BrowserRouter>
  )
}