import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

const YearFilter = () => {
  const { books, filters, setFilters } = useContext(AppContext)

  const years = books.map((b) => b.year)
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)

  const yearMin = filters.yearMin ?? minYear
  const yearMax = filters.yearMax ?? maxYear

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value)
    setFilters({ ...filters, yearMin: newMin })
  }

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value)
    setFilters({ ...filters, yearMax: newMax })
  }

  return (
    <div style={{ margin: '1rem 0' }}>
      <p>Год выпуска: {yearMin} — {yearMax}</p>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={yearMin}
          onChange={handleMinChange}
        />
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={yearMax}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  )
}

export default YearFilter
