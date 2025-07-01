import { useSearchParams } from 'react-router-dom'

const ResetFiltersButton = () => {
  const [, setParams] = useSearchParams()

  const reset = () => {
    setParams({})
  }

  return <button onClick={reset}>Сбросить фильтры</button>
}

export default ResetFiltersButton
