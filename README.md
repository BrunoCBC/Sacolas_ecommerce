# Sacolas E-commerce

Loja de sacolas personalizadas feita com **Next.js (front)**, **PHP/MySQL (API)** e **Docker**.

---

## Pré-requisitos

- Docker e Docker Compose
- Node.js (para rodar localmente se necessário)

---

## Estrutura do projeto

/
├─ api/ # API PHP
├─ db/ # Banco de dados MySQL
├─ front/ # Frontend Next.js
└─ docker-compose.yml

## Como rodar

1. Build e start dos containers Docker:

```bash
docker-compose up --build
```

Isso vai levantar:

MySQL (db) na porta 3306

API PHP (php) na porta 8080

Frontend (front) na porta 3000

Frontend acessível em: http://localhost:3000
API acessível em: http://localhost:8080/produtos.php

==============

# Comandos úteis

Para reiniciar somente o frontend:

```bash
docker-compose restart front
```

Para reiniciar todos os serviços:

```bash
docker-compose restart
```