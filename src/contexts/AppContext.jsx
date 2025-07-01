import { createContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [books, setBooks] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({})

   const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', next)
      return next
    })
  }

  const addBook = (book) => setBooks((prev) => [...prev, book])
  const removeBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id))
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    )
  }

useEffect(() => {
  document.body.classList.toggle('theme-dark', theme === 'dark')
}, [theme])


useEffect(() => {
  const savedFavs = localStorage.getItem('favorites')
  if (savedFavs) setFavorites(JSON.parse(savedFavs))
}, [])

useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}, [favorites])

useEffect(() => {
  const savedBooks = localStorage.getItem('books')
  if (savedBooks) {
    setBooks(JSON.parse(savedBooks))
  } else {
    const sample = [
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
    ]
    setBooks(sample)
    localStorage.setItem('books', JSON.stringify(sample))
  }
}, [])

useEffect(() => {
  localStorage.setItem('books', JSON.stringify(books))
}, [books])

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
    favoritesOnly
  })

  if (search) setSearchQuery(search)
}, [])
    const location = useLocation()
const navigate = useNavigate()

useEffect(() => {
  const params = new URLSearchParams()

  if (searchQuery) params.set('search', searchQuery)
  if (filters.authors?.length) {
    filters.authors.forEach((author) => params.append('author', author))
  }
  if (filters.yearMin !== undefined) params.set('yearMin', filters.yearMin)
  if (filters.yearMax !== undefined) params.set('yearMax', filters.yearMax)
  if (filters.favoritesOnly) params.set('favorites', 'true')

  const newUrl = `${location.pathname}?${params.toString()}`
  navigate(newUrl, { replace: true })
}, [searchQuery, filters])



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
