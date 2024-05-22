import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { DashboardContainer } from './screens/dashboard/dashboard.container'
import { LoginContainer } from './screens/login/login.container'
import { SignupContainer } from './screens/signup/signup.container'
import { ChannelContainer } from './screens/channel/channel.container'
import { useAppSelector } from '../presenters/store/hooks'

export const Navigator = () => {
  const currentUser = useAppSelector(state => state.authState.user);

  const PrivateRoute: React.FC<{ element: any }> = (props) => {
    const userInfo = currentUser;
    let invalidUser = false
    if (userInfo === null) {
      invalidUser = true
    }
    return invalidUser ? <Navigate to='/' /> : props.element
  }

  const AlreadyLoggedInRoute: React.FC<{ element: any }> = (props) => {
    const userInfo = currentUser;
    let alreadyLoggedIn = false
    if (userInfo !== null) {
      alreadyLoggedIn = true
    }
    return alreadyLoggedIn ? <Navigate to='/dashboard' /> : props.element
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AlreadyLoggedInRoute element={<LoginContainer />} />} />
        <Route path='/dashboard' element={<PrivateRoute element={<DashboardContainer />} />} />
        <Route path='/signup' element={<AlreadyLoggedInRoute element={<SignupContainer />} />} />
        <Route path='/channel/:channelName' element={<PrivateRoute element={<ChannelContainer />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}