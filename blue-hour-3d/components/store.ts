import { create } from 'zustand'
type PortfolioState={active:string;setActive:(id:string)=>void}
export const usePortfolio=create<PortfolioState>(set=>({active:'home',setActive:active=>set({active})}))
