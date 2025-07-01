import { createContext, useState, useEffect } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [books, setBooks] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({})

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const addBook = (book) => setBooks((prev) => [...prev, book])
  const removeBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id))
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const authors = params.getAll('author')
    const yearMin = params.get('yearMin')
    const yearMax = params.get('yearMax')
    const favoritesOnly = params.get('favorites') === 'true'
    const search = params.get('search')

    setFilters({
      authors,
      yearMin: yearMin ? parseInt(yearMin) : undefined,
      yearMax: yearMax ? parseInt(yearMax) : undefined,
      favoritesOnly,
    })

    if (search) setSearchQuery(search)
  }, [])

  return (
    <AppContext.Provider
      value={{
        theme,
        books,
        favorites,
        searchQuery,
        filters,
        toggleTheme,
        addBook,
        removeBook,
        toggleFavorite,
        setSearchQuery,
        setFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
