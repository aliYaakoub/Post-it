import { useState } from 'react';
import Navbar from './component/Navbar';
import Posts from './component/Posts';
import Login from './component/Login';
import Register from './component/Register';
import './App.scss';
import Settings from './component/Settings';

const App = () => {

  const [user, setUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="min-h-screen relative">
      {isLoggingIn && <Login setUser={setUser} setIsLoggingIn={setIsLoggingIn} isLoggingIn={isLoggingIn} />}
      {isRegistering && <Register setUser={setUser} setIsRegistering={setIsRegistering} isRegistering={isRegistering} />}
      {openSettings && <Settings username={user.username} openSettings={openSettings} setOpenSettings={setOpenSettings} />}
      <Navbar user={user} setIsLoggingIn={setIsLoggingIn} setIsRegistering={setIsRegistering} setOpenSettings={setOpenSettings} />
      <Posts />
    </div>
  );
}

export default App;
