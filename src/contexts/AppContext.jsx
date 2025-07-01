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

        setBooks([
    {
      id: '1',
      title: 'React в действии',
      author: 'Mark Thomas',
      year: 2019,
      isbn: '1234567890',
      description: 'Погружение в современные интерфейсы.',
      cover: '/covers/react.jpg'
    },
    {
      id: '2',
      title: 'JavaScript глубже',
      author: 'David Flanagan',
      year: 2020,
      isbn: '9876543210',
      description: 'Магия JS изнутри.',
      cover: '/covers/js.png'
    }
  ])
  }, [])
  
  // 1. Загружаем тему из localStorage при запуске
useEffect(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) setTheme(savedTheme)
}, [])

// 2. Сохраняем тему при её изменении
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])

// 3. Загружаем избранное
useEffect(() => {
  const savedFavs = localStorage.getItem('favorites')
  if (savedFavs) setFavorites(JSON.parse(savedFavs))
}, [])

// 4. Сохраняем избранное
useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}, [favorites])

// 5. Загружаем книги
useEffect(() => {
  const savedBooks = localStorage.getItem('books')
  if (savedBooks) {
    setBooks(JSON.parse(savedBooks))
  } else {
    const sample = [ /* твои моковые книги */ ]
    setBooks(sample)
    localStorage.setItem('books', JSON.stringify(sample))
  }
}, [])

// 6. Сохраняем книги при изменении
useEffect(() => {
  localStorage.setItem('books', JSON.stringify(books))
}, [books])

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
