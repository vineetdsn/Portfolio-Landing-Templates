import { create } from 'zustand'

type PortfolioState = {
  active: string;
  setActive: (id: string) => void;
}

export const usePortfolio = create<PortfolioState>((set) => ({
  active: 'workspace',
  setActive: (active) => set({ active })
}))
