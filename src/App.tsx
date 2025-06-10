import Chat from './features/chat/components/Chat'
import Footer from './components/Footer'
import { SearchBarAndTagContainer } from './features/search/containers/SearchBarAndTagContainer'
import Header from './components/Header'
import { GoogleSignInButton } from './components/GoogleSignInButton'
import { GithubSignInButton } from './components/GithubSignInButton'
import { useAuth } from './context/AuthContext'

// Display the search input when login with Github or google

function App() {
  const { user, githubUser } = useAuth();

  return (
    <>
      <Header />
      <GoogleSignInButton />
      {!user && <GithubSignInButton />}
      {(user || githubUser) && <SearchBarAndTagContainer />}
      <Footer />
      <Chat />
    </>
  )
}

export default App
