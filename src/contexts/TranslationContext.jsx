import React, { createContext, useState, useTransition } from "react"
import { useTranslation } from "react-i18next"

const TranslationContext = createContext()

export const TranslationProvider = ({ children }) => {
  const { t } = useTranslation()

  return (
    <TranslationContext.Provider value={t}>
      {children}
    </TranslationContext.Provider>
  )
}

export default TranslationContext
