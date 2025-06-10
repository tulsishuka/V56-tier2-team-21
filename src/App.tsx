import Chat from './features/chat/components/Chat'
import Footer from './components/Footer'
import { SearchBarAndTagContainer } from './features/search/containers/SearchBarAndTagContainer'
import Header from './components/Header'
import GithubAuth from './features/auth/components/GithubAuth'
import Login from './features/auth/Login'
import { GoogleSignInButton } from './components/GoogleSignInButton'
import { GithubSignInButton } from './components/GithubSignInButton'
import { useAuth } from './context/AuthContext'

// Display the search input when login with Github or google
// const displaySearchInput = localStorage.getItem('accessToken'); // get the Github login info from localStorage

function App() {
  const { user, signInWithGoogle, signOut, githubUser } = useAuth();

  const displayLoginButtons = !githubUser && !user;

  console.log('user', user)
  console.log('githubUser', githubUser)

  return (
    <>
      <Header />
      <GoogleSignInButton />
      {!user && <GithubSignInButton />}
      {/* <GithubAuth /> */}
      {/* <Login /> */}
      {/* {displaySearchInput?.length !== 0 && <SearchBarAndTagContainer />} */}
      <Footer />
      <Chat />
    </>
  )
}

export default App
