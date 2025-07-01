import { useQueryState } from '../utils/useQueryState'

const AuthorFilter = ({ options }) => {
  const [params, setParam] = useQueryState()
  const selected = params.getAll('author')

  const toggleAuthor = (author) => {
    const updated = selected.includes(author)
      ? selected.filter((a) => a !== author)
      : [...selected, author]
    setParam('author', updated)
  }

  return (
    <div>
      {options.map((author) => (
        <button
          key={author}
          onClick={() => toggleAuthor(author)}
          style={{
            background: selected.includes(author) ? '#ddd' : 'white',
            margin: '4px',
          }}
        >
          {author}
        </button>
      ))}
    </div>
  )
}

export default AuthorFilter
