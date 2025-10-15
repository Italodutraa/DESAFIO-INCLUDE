# API de Avaliação de Jogos

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

API RESTful desenvolvida como parte do desafio da Include para criar uma plataforma centralizada de avaliações de jogos. A API permite que usuários criem, leiam, atualizem e apaguem jogos e suas respectivas avaliações, com autenticação via JWT.

## Funcionalidades

-   **CRUD completo para Jogos**: Crie, liste, detalhe, atualize e remova jogos.
-   **CRUD de Avaliações (Reviews)**: Usuários autenticados podem criar e deletar suas próprias avaliações para os jogos.
-   **Autenticação de Usuários**: Sistema de registro e login com JWT para proteger rotas.
-   **Cálculo de Média**: O endpoint de detalhes de um jogo calcula a média de notas em tempo real.
-   **Validação de Dados**: Validação robusta de entrada de dados com Zod.
-   **Ambiente Dockerizado**: Configuração completa com Docker e Docker Compose para rodar a API e o banco de dados PostgreSQL de forma isolada e consistente.

## Tecnologias Utilizadas

-   **Backend**: Node.js
-   **Framework**: Express.js
-   **Linguagem**: TypeScript
-   **ORM**: Prisma
-   **Banco de Dados**: PostgreSQL
-   **Containerização**: Docker / Docker Compose
-   **Validação**: Zod
-   **Autenticação**: JSON Web Tokens (JWT) e BcryptJS

## Como Rodar o Projeto Localmente

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (v18 ou superior)
-   [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose

### 1. Clonar o Repositório

```bash
git clone https://github.com/Italodutraa/DESAFIO-INCLUDE.git
cd DESAFIO-INCLUDE
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto, copiando o exemplo de `.env.example` (se você tiver um) ou usando o modelo abaixo.

```env
# Configuração do Banco de Dados (deve ser a mesma do docker-compose.yml)
DATABASE_URL="postgresql://admin:password123@localhost:5432/game_reviews_db?schema=public"

# Chave secreta para assinatura dos tokens JWT
JWT_SECRET="SUA_CHAVE_SECRETA_FORTE_E_ALEATORIA"
```

### 3. Iniciar com Docker (Recomendado)

Este é o método mais simples e garante que o ambiente seja idêntico ao de produção.

```bash
docker-compose up --build -d
```
O comando acima irá construir a imagem da API, iniciar o container do banco de dados e rodar as migrations. A API estará disponível em `http://localhost:3000`.

### 4. Instalação Manual (Sem Docker)

1.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
2.  Garanta que você tenha uma instância do PostgreSQL rodando e que a `DATABASE_URL` no `.env` aponte para ela.
3.  Aplique as migrations do Prisma para criar as tabelas no banco:
    ```bash
    npx prisma migrate dev
    ```
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## Documentação da API

### Autenticação

#### `POST /api/auth/register`
Registra um novo usuário.

-   **Request Body:**
    ```json
    {
      "name": "Seu Nome",
      "email": "seu@email.com",
      "password": "sua_senha_forte"
    }
    ```
-   **Response (201 Created):** Objeto do usuário (sem a senha).

#### `POST /api/auth/login`
Autentica um usuário e retorna um token JWT.

-   **Request Body:**
    ```json
    {
      "email": "seu@email.com",
      "password": "sua_senha_forte"
    }
    ```
-   **Response (200 OK):**
    ```json
    {
      "token": "seu.token.jwt"
    }
    ```

### Jogos (`/api/games`)

-   `GET /`: Lista todos os jogos.
-   `GET /:id`: Retorna os detalhes de um jogo, incluindo `averageRating` e `reviewsCount`.
-   `POST /`: Cria um novo jogo.
-   `PUT /:id`: Atualiza um jogo existente.
-   `DELETE /:id`: Deleta um jogo.

### Avaliações (Reviews)

_**Nota:** Rotas que criam ou deletam reviews requerem autenticação via Bearer Token._

-   `GET /api/games/:gameId/reviews`: Lista todas as avaliações de um jogo específico.
-   `POST /api/games/:gameId/reviews`: Cria uma nova avaliação para um jogo.
-   `DELETE /api/reviews/:reviewId`: Deleta uma avaliação (apenas o autor pode deletar).

---

Feito com ❤️ por Italo Dutra