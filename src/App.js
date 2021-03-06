import { useState } from 'react';
import Navbar from './component/Navbar';
import Posts from './component/Posts/Posts';
import Login from './component/users/Login';
import Register from './component/users/Register';
import Settings from './component/users/Settings';
import { AuthProvider } from './contexts/AuthContext';
import NewPost from './component/Posts/NewPost';
// import Filters from './component/Filters';
// import UserPosts from './component/Posts/UserPosts';
import SelectedUser from './component/Posts/SelectedUser';
import './App.scss';

const App = () => {

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [newPost, setNewPost] = useState(false);
  // const [usernameFilter, setUsernameFilter] = useState('');
  // const [showFiltered, setShowFiltered] = useState(false);
  const [selectedUserPosts, setSelectedUserPosts] = useState('');

  // useEffect(()=>{
  //   if(usernameFilter.length === 0){
  //     setShowFiltered(false)
  //   }
  //   else{
  //     setShowFiltered(true)
  //   }
  // },[usernameFilter])

  return (
    <AuthProvider>
      <div className="min-h-screen relative">
        {isLoggingIn && <Login setIsLoggingIn={setIsLoggingIn} />}
        {isRegistering && <Register setIsRegistering={setIsRegistering} />}
        {openSettings && <Settings setOpenSettings={setOpenSettings} />}
        {newPost && <NewPost setNewPost={setNewPost} />}
        <Navbar setIsLoggingIn={setIsLoggingIn} setIsRegistering={setIsRegistering} setOpenSettings={setOpenSettings} setNewPost={setNewPost} />
        {/* {!selectedUserPosts && <Filters usernameFilter={usernameFilter} setUsernameFilter={setUsernameFilter} />} */}
        {selectedUserPosts ? 
          <SelectedUser setSelectedUserPosts={setSelectedUserPosts} selectedUserPosts={selectedUserPosts} />
          :
          <Posts setSelectedUserPosts={setSelectedUserPosts} />
        }
      </div>
    </AuthProvider>
  );
}

export default App;
