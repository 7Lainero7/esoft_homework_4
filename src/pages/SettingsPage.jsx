import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const SettingsPage = () => {
  const {
    theme,
    toggleTheme,
    setFilters,
    setSearchQuery,
    setBooks,
    setFavorites,
  } = useContext(AppContext)

  const resetFavorites = () => {
    if (window.confirm('Уверены, что хотите сбросить избранное?')) {
      setFavorites([])
    }
  }

  const loadSampleBooks = () => {
    const sample = [
      {
        id: '1',
        title: 'React в действии',
        author: 'Mark Tielens Thomas',
        year: 2018,
        isbn: '9781617293856',
        description: 'Практический подход к созданию SPA на React.',
        cover: '/covers/react.jpg',
      },
      {
        id: '2',
        title: 'JavaScript: Полное руководство',
        author: 'David Flanagan',
        year: 2020,
        isbn: '9781491952023',
        description: 'Классика JavaScript, обновлённая.',
        cover: '/covers/js.jpg',
      },
    ]
    setBooks(sample)
    setSearchQuery('')
    setFilters({})
  }

  return (
    <div className="settings-page">
      <h1>⚙️ Настройки</h1>

      <section>
        <h2>Тема</h2>
        <button onClick={toggleTheme}>
          Переключить на {theme === 'light' ? 'тёмную' : 'светлую'} тему
        </button>
        <div className={`theme-preview ${theme}`}>
          <div className="book-card">📘 Пример книги</div>
        </div>
      </section>

      <section>
        <h2>Управление данными</h2>
        <button onClick={resetFavorites}>Сбросить избранное</button>
        <button onClick={loadSampleBooks}>Загрузить пример книг</button>
      </section>

      <section>
        <h2>Настройки чтения по умолчанию</h2>
        <p>🔜 Тут можно внедрить сохранение дефолтных значений для BookPage</p>
      </section>
    </div>
  )
}

export default SettingsPage
