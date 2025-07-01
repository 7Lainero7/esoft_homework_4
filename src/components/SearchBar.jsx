import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(AppContext)

  return (
    <input
      type="text"
      placeholder="🔍 Поиск по названию или автору"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
    />
  )
}

export default SearchBar
