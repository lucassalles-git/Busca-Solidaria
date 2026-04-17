# Busca Solidária

Um serviço backend simples para gerenciar registros de pessoas desaparecidas durante enchentes, com armazenamento em SQLite.

## 📌 Descrição

Este projeto é uma API REST feita com Node.js, Express e SQLite para registrar, listar, consultar, atualizar e remover dados de desaparecidos.

## 🛠️ Tecnologias

- Node.js 18.x
- Express 5
- SQLite
- sqlite3
- cors
- nodemon (desenvolvimento)

## 📦 Instalação

1. Clone o projeto ou copie os arquivos para uma pasta local.
2. Abra o terminal na pasta do projeto.
3. Execute:

```bash
npm install
```

## ▶️ Execução

Para iniciar o servidor em modo normal:

```bash
npm start
```

Para executar em modo de desenvolvimento com recarga automática:

```bash
npm run dev
```

Por padrão, o servidor roda em `http://localhost:3000`.

## Endpoints

### GET /

Retorna uma página HTML simples com informações sobre o serviço.

### GET /desaparecidos

Retorna a lista de todos os desaparecidos cadastrados.

### GET /desaparecidos/:id

Retorna os dados de um desaparecido específico pelo `id`.

### POST /desaparecidos

Cadastra um novo desaparecido.

Exemplo de corpo da requisição (JSON):

```json
{
  "nome": "João da Silva",
  "idade": 35,
  "descricao": "Cabelos castanhos, usa óculos",
  "ultima_vezVisto": "Praça Central"
}
```

### PUT /desaparecidos/:id

Atualiza o status, abrigo e endereço de um desaparecido pelo `id`.

Exemplo de corpo da requisição (JSON):

```json
{
  "abrigo": "Ginásio Municipal",
  "endereco": "Rua das Flores, 123"
}
```

### DELETE /desaparecidos/:id

Remove o registro de um desaparecido pelo `id`.

## 🗄️ Banco de dados

O banco de dados é criado automaticamente no arquivo `database.db` na primeira execução.

A tabela `desaparecidos` contém os campos:

- `id`
- `nome`
- `idade`
- `status`
- `descricao`
- `ultima_vezVisto`
- `abrigo`
- `endereco`
- `data_cadastro`

O projeto também popula a tabela com registros iniciais, caso o banco esteja vazio.

## 🎯 Observações

- A rota `POST /desaparecidos` cria um novo registro.
- O servidor usa CORS para permitir requisições de frontends externos.

## 👩‍💻 Projeto educacional

Este projeto foi desenvolvido para fins de aprendizado em back-end com Node.js
