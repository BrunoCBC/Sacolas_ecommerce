'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCarrinho } from './context/CarrinhoContext'

interface Produto {
  id: number
  titulo: string
  valor: number
  imagem_url: string
}

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const { adicionar } = useCarrinho()

  useEffect(() => {
    fetch('http://localhost:8080/produtos.php')
      .then(res => res.json())
      .then(data => setProdutos(
        data.map((p: any) => ({ ...p, valor: Number(p.valor) }))
      ))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="space-y-8">
      {/* Seção de boas-vindas */}
      <section className="bg-rose-50 p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo à Sacolas E-commerce!</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Aqui você encontra sacolas personalizadas para todos os estilos e ocasiões.  
          Escolha seu modelo favorito, personalize e receba em casa com total conforto e segurança.
        </p>
        <p className="text-gray-700 max-w-2xl mx-auto mt-2">
          Navegue por nossos produtos, adicione ao carrinho e aproveite a experiência de comprar de forma simples e rápida!
        </p>
      </section>

      <hr className="border-t my-8" style={{ borderColor: "var(--foreground)" }} />

      {/* Grid de produtos */}
      <section className="cards-container">
        {produtos.map(produto => (
          <div key={produto.id} className="card">
            <Link href={`/produtos/${produto.id}`}>
              <img
                src={produto.imagem_url}
                alt={produto.titulo}
                className="card-img rounded-xl cursor-pointer w-full h-48 object-cover"
              />
            </Link>
            <div className='card-cont'>
              <h2 className="mt-2 font-bold text-lg">{produto.titulo}</h2>
              <p className="mt-1">R$ {produto.valor.toFixed(2)}</p>

              <div className="mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => adicionar(produto.id)}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <hr className="border-t my-8" style={{ borderColor: "var(--foreground)" }} />

      {/* Seção explicativa */}
      <section className="bg-rose-50 p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Como funciona?</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          1. Escolha sua sacola favorita. <br />
          2. Adicione ao carrinho e finalize a compra. <br />
          3. Receba em casa com todo cuidado e rapidez. <br />
        </p>
      </section>
    </div>
  )
}
