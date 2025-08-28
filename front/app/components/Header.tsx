'use client'
import { useCarrinho } from '../context/CarrinhoContext'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Header() {
  const { totalItens } = useCarrinho()

  return (
    <header className="flex justify-between items-center px-6">
      <Link href="/" className="flex items-center gap-2">
        <h1 className="font-bold text-2xl">Sacolas E-commerce</h1>
      </Link>

      <Link href="/carrinho" className="header-cart">
        <img src="/cart.png" alt="Carrinho" />
        {totalItens > 0 && (
          <span className="cart-badge">{totalItens}</span>
        )}
      </Link>
    </header>
  )
}
