import AuthorFilter from './AuthorFilter'
import ResetFiltersButton from './ResetFiltersButton'

const FiltersPanel = () => {
  return (
    <div className="filters-panel">
      <h3>Фильтры</h3>
      <AuthorFilter options={['Mark Tielens Thomas', 'David Flanagan']} />
      {/* Можно добавить RangeSlider и ToggleFavorites */}
      <ResetFiltersButton />
    </div>
  )
}

export default FiltersPanel
