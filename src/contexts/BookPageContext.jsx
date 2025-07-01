import { createContext, useState, useEffect } from 'react'

export const BookPageContext = createContext()

export const BookPageProvider = ({ children }) => {
  const [textSettings, setTextSettings] = useState({
    color: 'black',
    size: 'medium',
    bold: false
  })

  const setTextColor = (color) => {
    setTextSettings((prev) => ({ ...prev, color }))
  }

  const setTextSize = (size) => {
    setTextSettings((prev) => ({ ...prev, size }))
  }

  const toggleBold = () => {
    setTextSettings((prev) => ({ ...prev, bold: !prev.bold }))
  }
  useEffect(() => {
  const saved = localStorage.getItem('textSettings')
  if (saved) setTextSettings(JSON.parse(saved))
    }, [])

  useEffect(() => {
  localStorage.setItem('textSettings', JSON.stringify(textSettings))
  }, [textSettings])


  return (
    <BookPageContext.Provider
      value={{
        textSettings,
        setTextColor,
        setTextSize,
        toggleBold
      }}
    >
      {children}
    </BookPageContext.Provider>
  )
}
