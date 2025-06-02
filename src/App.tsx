import Chat from './features/chat/components/Chat'
import Footer from './components/Footer'
import { SearchBarAndTagContainer } from './features/search/containers/SearchBarAndTagContainer'

function App() {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <SearchBarAndTagContainer />
      <Footer />
      <Chat />
    </div>
  )
}

export default App
