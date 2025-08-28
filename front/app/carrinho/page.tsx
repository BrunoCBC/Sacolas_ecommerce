'use client'

import { useCarrinho } from '../context/CarrinhoContext'
import { useEffect, useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

interface Produto {
  id: number
  titulo: string
  valor: number
  imagem_url: string
}

export default function CarrinhoPage() {
  const { carrinho, adicionar, diminuir, remover } = useCarrinho()
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/produtos.php')
      .then(res => res.json())
      .then(data => setProdutos(
        data.map((p: any) => ({ ...p, valor: Number(p.valor) }))
      ))
      .catch(err => console.error(err))
  }, [])

  const itensCarrinho = produtos
    .filter(p => carrinho.some(c => c.produtoId === p.id))
    .map(p => {
      const quantidade = carrinho.find(c => c.produtoId === p.id)?.quantidade || 0
      return { ...p, quantidade }
    })

  const total = itensCarrinho.reduce(
    (acc, produto) => acc + produto.valor * produto.quantidade,
    0
  )

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Carrinho</h1>

      {itensCarrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-4 cards-container mb-4">
            {itensCarrinho.map(produto => (
              <Card key={produto.id} className="flex flex-col md:flex-row items-center justify-between p-4">
                
                {/* Esquerda: imagem */}
                <img
                  src={produto.imagem_url}
                  alt={produto.titulo}
                  className="card-img w-32 h-32 object-cover rounded-lg mb-2 md:mb-0"
                />

                {/* Centro: infos */}
                <div className="flex-1 md:ml-4">
                  <h2 className="font-bold">{produto.titulo}</h2>

                  <div className="btn-quant flex items-center mt-2">
                    <button className="btn btn-primary" onClick={() => diminuir(produto.id)}>-</button>
                    <span className="mx-2">{produto.quantidade}</span>
                    <button className="btn btn-primary" onClick={() => adicionar(produto.id)}>+</button>
                  </div>

                  <p className="mt-2 font-medium">
                    R$ {(produto.valor * produto.quantidade).toFixed(2)}
                  </p>
                </div>

                {/* Direita: remover */}
                <button
                  className="btn btn-danger mt-2 md:mt-0 md:ml-4"
                  onClick={() => remover(produto.id)}
                >
                  Remover
                </button>
              </Card>
            ))}
          </div>

          <div className="cart-total">
            Total: R$ {total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  )
}
