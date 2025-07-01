// utils/useQueryState.js
import { useSearchParams } from 'react-router-dom'

export const useQueryState = () => {
  const [params, setParams] = useSearchParams()

  const setParam = (key, value) => {
    const newParams = new URLSearchParams(params)
    if (value === undefined || value === '' || value === false) {
      newParams.delete(key)
    } else {
      if (Array.isArray(value)) {
        newParams.delete(key)
        value.forEach((v) => newParams.append(key, v))
      } else {
        newParams.set(key, value)
      }
    }
    setParams(newParams)
  }

  return [params, setParam]
}
