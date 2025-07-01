import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { Link } from 'react-router-dom'

const BookCard = ({ book }) => {
  const { favorites, toggleFavorite } = useContext(AppContext)
  const isFavorite = favorites.includes(book.id)

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`}>
        <img src={book.cover || '/placeholder.jpg'} alt={book.title} />
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.year}</p>
      </Link>
      <button onClick={() => toggleFavorite(book.id)}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  )
}
export default BookCard
