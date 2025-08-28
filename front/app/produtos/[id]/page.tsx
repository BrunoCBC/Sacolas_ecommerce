'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useCarrinho } from '../../context/CarrinhoContext'
import Card from '../../components/ui/Card'

interface Produto {
  id: number
  titulo: string
  descricao: string
  valor: number
  categoria: string
  imagem_url: string
}

export default function ProdutoPage() {
  const params = useParams()
  const [produto, setProduto] = useState<Produto | null>(null)
  const { adicionar } = useCarrinho()

  useEffect(() => {
    fetch(`http://localhost:8080/produtos.php?id=${params.id}`)
      .then(res => res.json())
      .then((data: any) => {
        const p = Array.isArray(data) ? data[0] : data
        setProduto({ ...p, valor: Number(p.valor) })
      })
      .catch(err => console.error(err))
  }, [params.id])

  if (!produto) return <p>Carregando...</p>

  return (
    <Card className="max-w-3xl mx-auto p-6 mt-4">
      <img
        src={produto.imagem_url}
        alt={produto.titulo}
        className="card-img w-full max-h-80 object-cover rounded-lg"
      />

      <h1 className="text-2xl font-bold mt-4">{produto.titulo}</h1>
      <p className="text-gray-500">{produto.categoria}</p>
      <p className="mt-2 text-gray-700">{produto.descricao}</p>

      <p className="mt-4 text-lg font-semibold">
        R$ {produto.valor.toFixed(2)}
      </p>

      <div className="mt-4">
        <button
            className="btn btn-primary"
            onClick={() => adicionar(produto.id)}
          >
            Adicionar ao carrinho
        </button>
      </div>
    </Card>
  )
}
