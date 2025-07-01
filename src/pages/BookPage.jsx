import { useParams, useNavigate } from 'react-router-dom'
import { createContext, useState, useEffect, useContext, useParams } from 'react'
import { AppContext } from '../contexts/AppContext'
import { BookPageProvider, BookPageContext } from '../contexts/BookPageContext'

const BookContent = ({ book }) => {
  const { favorites, toggleFavorite } = useContext(AppContext)
  const { textSettings, setTextColor, setTextSize, toggleBold } = useContext(BookPageContext)
  const isFavorite = favorites.includes(book.id)

  const textStyle = {
    color: textSettings.color,
    fontSize:
      textSettings.size === 'small'
        ? '14px'
        : textSettings.size === 'large'
        ? '20px'
        : '16px',
    fontWeight: textSettings.bold ? 'bold' : 'normal'
  }

  return (
    <div className="book-page">
      <button onClick={() => window.history.back()}>← Назад</button>

      <div className="book-info">
        <img src={book.cover || '/placeholder.jpg'} alt={book.title} />
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
        <p>{book.year} • ISBN {book.isbn}</p>
        <p>{book.description}</p>
        <button onClick={() => toggleFavorite(book.id)}>
          {isFavorite ? '❤️ В избранном' : '🤍 В избранное'}
        </button>
      </div>

      <div className="text-settings">
        <h3>⚙️ Настройки текста:</h3>
        <label>
          Цвет:
          <input type="radio" name="color" value="black" onChange={() => setTextColor('black')} /> black
          <input type="radio" name="color" value="sepia" onChange={() => setTextColor('saddlebrown')} /> sepia
          <input type="radio" name="color" value="darkblue" onChange={() => setTextColor('darkblue')} /> dark blue
        </label>
        <label>
          Размер:
          <select value={textSettings.size} onChange={(e) => setTextSize(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <label>
          <input type="checkbox" checked={textSettings.bold} onChange={toggleBold} />
          Жирный шрифт
        </label>
      </div>

      <div className="book-text" style={textStyle}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <p>Curabitur quis mauris nec libero euismod imperdiet...</p>
        <p>Aliquam erat volutpat. Donec nec justo non elit eleifend luctus.</p>
      </div>
    </div>
  )
}

const BookPage = () => {
  const { id } = useParams()
  const { books } = useContext(AppContext)
  const book = books.find((b) => b.id === id)

  if (!book) return <div>Книга не найдена 😢</div>

  return (
    <BookPageProvider>
      <BookContent book={book} />
    </BookPageProvider>
  )
}

export default BookPage
