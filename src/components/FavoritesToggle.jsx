import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const FavoritesToggle = () => {
  const { filters, setFilters } = useContext(AppContext)

  const toggle = () => {
    setFilters({ ...filters, favoritesOnly: !filters.favoritesOnly })
  }

  return (
    <div style={{ margin: '1rem 0' }}>
      <label>
        <input
          type="checkbox"
          checked={filters.favoritesOnly || false}
          onChange={toggle}
        />
        {' '}Показать только избранные
      </label>
    </div>
  )
}

export default FavoritesToggle
