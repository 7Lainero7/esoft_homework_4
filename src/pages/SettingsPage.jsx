import { useContext, useEffect } from 'react'
import { AppContext } from '../contexts/AppContext'
import { BookPageContext } from '../contexts/BookPageContext'
import BookCard from '../components/BookCard'
import '../styles/SettingsPage.css'

const SettingsPage = () => {
  const { theme, toggleTheme, favorites, setFavorites, setBooks } = useContext(AppContext)
  const { textSettings, setTextColor, setTextSize, toggleBold } = useContext(BookPageContext)

  const sampleBooks = [
    {
      id: 'preview1',
      title: 'Preview Book',
      author: 'Demo Author',
      year: 2020,
      isbn: '1234',
      description: 'Пример книги',
      cover: '/covers/react.jpg'
    }
  ]

  const clearFavorites = () => {
    if (confirm('Удалить все избранные книги?')) {
      setFavorites([])
      localStorage.removeItem('favorites')
    }
  }

  const loadSamples = () => {
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

  return (
    <div className="settings-page">
      <h1>⚙️ Настройки</h1>

      <section>
        <h2>🎨 Тема</h2>
        <button onClick={toggleTheme}>
          Переключить тему: {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
        </button>
        <div className={`preview-cards theme-${theme}`}>
          {sampleBooks.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </section>

      <section>
        <h2>🧹 Управление данными</h2>
        <button onClick={clearFavorites}>Сбросить избранное</button>
        <button onClick={loadSamples}>Загрузить пример книг</button>
      </section>

      <section>
        <h2>📝 Настройки текста по умолчанию</h2>
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
      </section>
    </div>
  )
}

export default SettingsPage
