'use client'

import { ReactNode } from 'react'
import { CarrinhoProvider } from './context/CarrinhoContext'
import Header from './components/Header'
import './globals.css'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Sacolas E-commerce</title>
        <meta name="description" content="Loja de sacolas personalizadas" />
      </head>

      <body className="flex flex-col min-h-screen">
        <CarrinhoProvider>
          <Header />

          <main className="flex-1 p-6 max-w-7xl mx-auto">
            {children}
          </main>

          <footer className="bg-rose-50 text-gray-700 mt-6">
            <div className="footer-container">
              
              {/* Sobre */}
              <div className="footer-col">
                <h3>Sacolas E-commerce</h3>
                <p>
                  Loja fictícia de sacolas personalizadas. Criada para demonstrar um layout moderno e responsivo com Next.js + Tailwind.
                </p>
              </div>

              {/* Links rápidos */}
              <div className="footer-col">
                <h3>Links</h3>
                <ul>
                  <li><a href="#">Início</a></li>
                  <li><a href="#">Produtos</a></li>
                  <li><a href="#">Carrinho</a></li>
                  <li><a href="#">Contato</a></li>
                </ul>
              </div>

              {/* Contato */}
              <div className="footer-col">
                <h3>Contato</h3>
                <ul>
                  <li>Email: contato@sacolasfake.com</li>
                  <li>Telefone: (11) 99999-9999</li>
                  <li>Endereço: Rua Exemplo, 123 - São Paulo/SP</li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              © 2025 Sacolas E-commerce. Todos os direitos reservados.
            </div>
          </footer>
        </CarrinhoProvider>
      </body>
    </html>
  )
}
