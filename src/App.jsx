import Home from './pages/Home'
import Add from './pages/Add'
import AI from './pages/AI'
import AllChats from './pages/allChats'
import VideoCall from './pages/VideoCall'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  return(
    <>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)',
        color: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
      }}>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>Home</a>
          <SignedIn>
            <a href="/add" style={{ color: '#fff', textDecoration: 'none' }}>Add</a>
            <a href="/ai" style={{ color: '#fff', textDecoration: 'none' }}>AI</a>
            <a href="/allChats" style={{ color: '#fff', textDecoration: 'none' }}>All Chats</a>
            <a href="/videocall" style={{ color: '#fff', textDecoration: 'none' }}>Video Call</a>
          </SignedIn>
          <a href="/videoCall" style={{ color: '#fff', textDecoration: 'none' }}>Video Call</a>
        </nav>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main style={{ maxWidth: 800, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<SignedIn><Add /></SignedIn>} />
          <Route path="/ai" element={<SignedIn><AI /></SignedIn>} />
          <Route path="/allChats" element={<SignedIn><AllChats /></SignedIn>} />
          <Route path="/videocall" element={<VideoCall />} />
        </Routes>
      </main>
    </>
  )
}

export default App;