# Guia de Instalação e Execução

O objetivo é desenvolver a estrutura do banco e rotas (API) de um aplicativo de lista de tarefas (to do list) utilizando Express e como banco o PostgreSQL. | TASCOM BOOTCAMP

## Pré-requisitos

- Node.js (v16+)
- PostgreSQL
- NPM ou Yarn

## Configuração e Execução

### 1. Backend

1. **Configuração do Banco de Dados**:
   - Acesse a pasta `backend`
   - Crie um arquivo `config/config.json` baseado no `config/config.json.example`:

   ```json
   {
     "development": {
       "username": "seu_usuario_postgres",
       "password": "sua_senha",
       "database": "taskmanager_db",
       "host": "127.0.0.1",
       "dialect": "postgres"
     }
   }

2. **Instalação de dependências:**:
    ```bash
    - Backend
    cd backend
    npm install

    - Frontend
    cd frontend
    npm install
    
3. **Executar as migrações:**:
    ```bash
    cd backend
    npx sequelize-cli db:migrate

4. **Inicie:**:
    ```bash
    - Backend
    cd backend
    node server.js

    - Frontend
    cd frontend
    npm run dev
   
