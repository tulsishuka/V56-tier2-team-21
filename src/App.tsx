import Chat from './features/chat/components/Chat'
import Footer from './components/Footer'
import { SearchBarAndTagContainer } from './features/search/containers/SearchBarAndTagContainer'
import { Header } from './components/Header'

function App() {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <Header />
      <SearchBarAndTagContainer />
      <Footer />
      <Chat />
    </div>
  )
}

export default App
