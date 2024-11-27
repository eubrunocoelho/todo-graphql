# TODO - GRAPHQL API

## Sumário

- **[Resumo](#resumo)**
- **[Schemas](#schemas)**
    - **[Usuários](#usuários)**
    - **[Autenticação](#autenticação)**
    - **[Tarefas](#tarefas)**
- **[Tecnologias](#tecnologias)**
    - **[Construção da API](#construção-da-api)**
    - **[Banco de Dados](#banco-de-dados)**
    - **[IDEs, versionamento](#ides-versionamento)**

## Resumo

**API GraphQL** desenvolvido à fim de fixação de conhecimento em `TypeScript`, `Node.js`, `GraphQL` e `MongoDB`. É uma **API** de pendências onde as tarefas estão disponibilizadas apenas para seus próprios usuários, contando também com um sistema de autenticação **JWT** para garantir a segurança dos dados.

## Schemas

### Usuários

-   **Cadastrar usuário:**

```graphql
mutation {
    createUser(userInput: { 
        name: "João Elias",
        email: "elias.joao666@gmail.com",
        password: "secret123"
    }) {
        _id name email
    }
}
```

-   **Atualizar senha:**

```graphql
mutation {
    updateUser(
        ID: "666999dc123456aaabbbccCC",
        userInput: {
            password: "123secret"
        }
    )
}
```

### Autenticação

-   **Autenticar usuário:**

```graphql
{
    signIn(
        email: "elias.joao666@gmail.com",
        password: "123secret"
    ) {
        _id name email token
    }
}
```

### Tarefas

-   **Cadastrar tarefa:**

```graphql
mutation {
    createTask(
        taskInput: {
            name: "Documentação da API",
            description: "Terminar documentação da API",
            status: TO_DO
        }
    ) {
        _id name description status user {
            _id email name
        }
    }
}
```

-   **Atualizar tarefa:**

```graphql
mutation {
    updateTask (
        ID: "555999dc123456aaabbbccCC",
        taskInput: {
            name: "Documentação da API",
            description: "Terminar documentação da API",
            status: DONE
        }
    )
}
```

- **Buscar todas as tarefas:**

```graphql
query {
  allTasks {
    _id name description status createdAt updatedAt user {
      _id name email
    }
  }
}
```

- **Buscar apenas uma tarefa:**

```graphql
{
  findTask(
    ID: "555999dc123456aaabbbccCC"
    ) {
        _id name description status createdAt updatedAt user {
            _id name email
        }
    }
}
```

- **Deletar uma tarefa:**

```graphql
mutation {
  deleteTask(ID: "555999dc123456aaabbbccCC")
}
```

## Tecnologias

### Construção da API
- [Node.js](https://nodejs.org/pt)
- [TypeScript](https://www.typescriptlang.org)
- [GraphQL](https://graphql.org)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server)
- [class-validator](https://www.npmjs.com/package/class-validator) & [class-transformer](https://www.npmjs.com/package/class-transformer)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)

### Banco de Dados
- [MongoDB](https://www.mongodb.com/pt-br)
- [Mongoose](https://mongoosejs.com)


### IDEs, Versionamento
- [Visual Studio Code](https://code.visualstudio.com)
- [Insomnia](https://insomnia.rest)
- [Git](https://git-scm.com)
- [GitHub](https://github.com)

<hr />
Feito por <strong><a href="https://eubrunocoelho.vercel.app">Bruno Coelho</a></strong>.