import { useState } from 'react';
import Navbar from './component/Navbar';
import Posts from './component/Posts';
import Login from './component/Login';
import Register from './component/Register';
import './App.scss';
import Settings from './component/Settings';
import { AuthProvider } from './contexts/AuthContext';
import NewPost from './component/NewPost';

const App = () => {

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [newPost, setNewPost] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen relative">
        {isLoggingIn && <Login setIsLoggingIn={setIsLoggingIn} />}
        {isRegistering && <Register setIsRegistering={setIsRegistering} />}
        {openSettings && <Settings setOpenSettings={setOpenSettings} />}
        {newPost && <NewPost setNewPost={setNewPost} />}
        <Navbar setIsLoggingIn={setIsLoggingIn} setIsRegistering={setIsRegistering} setOpenSettings={setOpenSettings} setNewPost={setNewPost} />
        <Posts />
      </div>
    </AuthProvider>
  );
}

export default App;
