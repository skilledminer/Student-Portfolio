import { createContext } from "react"
import type { PortfolioData } from "./portfolio-data"

// Create a context for portfolio data
export const PortfolioContext = createContext<{
  portfolioData: PortfolioData
  updatePortfolioData: (newData: Partial<PortfolioData>) => void
  unsavedChanges: boolean
  saveChanges: () => void
}>({
  portfolioData: {} as PortfolioData,
  updatePortfolioData: () => {},
  unsavedChanges: false,
  saveChanges: () => {},
})
