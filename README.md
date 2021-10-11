<h1 align="center">Backend Bate Papo UOL</h1>

## 🔖 Sobre

Backend de projeto de um bate papo inspirado no Bate Papo Uol, desenvolvido para treinar a construição de APIs com NodeJS + Express. Todas as rotas recebem requisições no formato JSON, também é trabalhado o uso de informações no Headers e query params.

## 🛠 Tecnologias utilizadas

O projeto foi desenvolvido usando as seguintes tecnologias:

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)

## 🛣️ Rotas

- http://localhost:4000/participants -> Cadastrar Usuário (POST)
- http://localhost:4000/participants -> Retorna a lista de todos os participantes (GET)
- http://localhost:4000/messages -> Enviar uma mensagem (POST)
- http://localhost:4000/messages -> Listar as mensagens salvas na API (GET)
- http://localhost:4000/status -> Atualizar status de usuário logado no bate papo (POST)

## 📦 Como baixar o projeto

```bash

  # Clonar repositório
  $ git clone https://github.com/samuelfcf/backend-bate-papo-uol

  # Entrar no diretório
  $ cd backend-bate-papo-uol

  # Instalar dependências
  $ yarn install

  # Iniciar o projeto
  $ npx nodemon server.js
```

## Desenvolvido por Samuel Felipe Castro Fernandes
