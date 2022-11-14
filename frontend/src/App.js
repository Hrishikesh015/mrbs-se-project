
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer'
import LandingPageScreen from './screens/LandingPageScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import HomePageScreen from './screens/HomePageScreen'
import BookingPageScreen from './screens/BookingPageScreen.js'


const App = ({}) => {
  return (
    <Router>
      <Header />
      <main className='py-3 bg-gray'>
        <Container>
          <Route exact path='/' component={LandingPageScreen}/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/register' component={RegisterScreen}/>
          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/forgotpassword' component={ForgotPasswordScreen}/>
          <Route path='/homepage' component={HomePageScreen}/>
          <Route path='/meetingRooms/:id' component={BookingPageScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App