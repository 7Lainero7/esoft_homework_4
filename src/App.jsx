import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookPage from './pages/BookPage'
import SettingsPage from './pages/SettingsPage'
import { BookPageProvider } from './contexts/BookPageContext'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book/:id" element={<BookPage />} />
      <Route
        path="/settings"
        element={
          <BookPageProvider>
            <SettingsPage />
          </BookPageProvider>
        }
      />
    </Routes>
  )
}

export default App
