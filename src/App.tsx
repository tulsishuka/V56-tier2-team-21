import Chat from './features/chat/components/Chat'
import Footer from './components/Footer'
import { SearchBarAndTagContainer } from './features/search/containers/SearchBarAndTagContainer'
import Header from './components/Header'
import GithubAuth from './features/auth/components/GithubAuth'

// Display the search input when login with Github or google
const displaySearchInput = localStorage.getItem('accessToken'); // get the Github login info from localStorage

function App() {
  return (
    <>
      <Header />
      <GithubAuth />
      {displaySearchInput?.length !== 0 && <SearchBarAndTagContainer />}
      <Footer />
      <Chat />
    </>
  )
}

export default App
