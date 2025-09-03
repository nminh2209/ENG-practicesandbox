import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Home } from './pages/Home'
import { Vocabulary } from './pages/Vocabulary'
import { Grammar } from './pages/Grammar'
import { Listening } from './pages/Listening'
import { Reading } from './pages/Reading'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50" style={{ width: '100%' }}>
        <Navigation />
        <main className="container mx-auto px-4 py-8" style={{ width: '100%', maxWidth: '1400px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/listening" element={<Listening />} />
            <Route path="/reading" element={<Reading />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
