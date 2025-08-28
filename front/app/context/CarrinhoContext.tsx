'use client'

import { createContext, useState, ReactNode, useContext } from 'react'

interface ItemCarrinho {
  produtoId: number
  quantidade: number
}

interface CarrinhoContextProps {
  carrinho: ItemCarrinho[]
  adicionar: (produtoId: number) => void
  diminuir: (produtoId: number) => void
  remover: (produtoId: number) => void
  totalItens: number
}

const CarrinhoContext = createContext<CarrinhoContextProps | undefined>(undefined)

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])

  const adicionar = (produtoId: number) => {
    setCarrinho(prev => {
      const item = prev.find(i => i.produtoId === produtoId)
      if (item) {
        return prev.map(i => i.produtoId === produtoId ? { ...i, quantidade: i.quantidade + 1 } : i)
      }
      return [...prev, { produtoId, quantidade: 1 }]
    })
  }

  const diminuir = (produtoId: number) => {
    setCarrinho(prev => {
      return prev.map(i => {
        if (i.produtoId === produtoId) {
          const novaQtd = i.quantidade - 1
          return novaQtd > 0 ? { ...i, quantidade: novaQtd } : null
        }
        return i
      }).filter(Boolean) as ItemCarrinho[]
    })
  }  

  const remover = (produtoId: number) => {
    setCarrinho(prev => prev.filter(i => i.produtoId !== produtoId))
  }

  const totalItens = carrinho.reduce((acc, i) => acc + i.quantidade, 0)

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionar, remover, diminuir, totalItens }}>
      {children}
    </CarrinhoContext.Provider>
  )  
}

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext)
  if (!context) throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider')
  return context
}
