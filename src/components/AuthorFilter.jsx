import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const AuthorFilter = () => {
  const { books, filters, setFilters } = useContext(AppContext)

  const allAuthors = [...new Set(books.map((b) => b.author))]

  const toggleAuthor = (author) => {
    const selected = filters.authors || []
    const updated = selected.includes(author)
      ? selected.filter((a) => a !== author)
      : [...selected, author]
    setFilters({ ...filters, authors: updated })
  }

  return (
    <div>
      {allAuthors.map((author) => (
        <button
          key={author}
          onClick={() => toggleAuthor(author)}
          style={{
            margin: '4px',
            background: filters.authors?.includes(author) ? '#ddd' : 'white'
          }}
        >
          {author}
        </button>
      ))}
    </div>
  )
}

export default AuthorFilter
