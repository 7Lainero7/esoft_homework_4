import AuthorFilter from './AuthorFilter'
import ResetFiltersButton from './ResetFiltersButton'
import YearFilter from './YearFilter'
import FavoritesToggle from './FavoritesToggle'

const FiltersPanel = () => {
  return (
    <div className="filters-panel">
      <h3>Фильтры</h3>
      <AuthorFilter />
      <YearFilter />
      <FavoritesToggle />
      <ResetFiltersButton />
    </div>
  )
}

export default FiltersPanel
