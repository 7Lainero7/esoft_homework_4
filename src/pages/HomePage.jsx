import { useContext, useMemo } from 'react'
import { AppContext } from '../contexts/AppContext'
import SearchBar from '../components/SearchBar'
import FiltersPanel from '../components/FiltersPanel'
import BookCard from '../components/BookCard'
import '../styles/HomePage.css'

const HomePage = () => {
  const { books, searchQuery, filters } = useContext(AppContext)

  const filteredBooks = useMemo(() => {
    const query = searchQuery.toLowerCase()

    return books
      .filter((book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      )
      .filter((book) => {
        if (filters.authors?.length && !filters.authors.includes(book.author)) return false
        if (filters.favoritesOnly && !filters.favorites.includes(book.id)) return false
        if (filters.yearMin && book.year < filters.yearMin) return false
        if (filters.yearMax && book.year > filters.yearMax) return false
        return true
      })
  }, [books, searchQuery, filters])

  return (
    <div className="home-container">
      <header className="header">
        <h1>📚 BookShelf</h1>
        <SearchBar />
      </header>

      <div className="main-content">
        <FiltersPanel />
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
