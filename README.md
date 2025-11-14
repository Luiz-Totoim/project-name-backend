# NewsExplorer Backend API

Backend Node.js + Express + MongoDB com autenticação JWT para o projeto NewsExplorer.

## 🚀 Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs (hash de senhas)
- Celebrate/Joi (validação)
- Winston (logging)
- Helmet (segurança)
- Rate Limiting

## 📦 Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` baseado em `.env.example`:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
MONGO_URL=mongodb://localhost:27017/newsexplorer
JWT_SECRET=sua-chave-secreta-super-segura
PORT=3001
NODE_ENV=development
```

### 3. MongoDB

Certifique-se de que o MongoDB está rodando localmente ou use MongoDB Atlas (cloud).

**Local:**
```bash
mongod
```

**Atlas:** Use a string de conexão fornecida pelo MongoDB Atlas no `.env`.

### 4. Rodar o servidor

**Desenvolvimento (com hot reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor estará disponível em `http://localhost:3001`

## 📋 Rotas da API

### Autenticação (públicas)

#### POST /api/signup
Cria um novo usuário.

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123",
  "name": "Nome do Usuário"
}
```

**Resposta (201):**
```json
{
  "_id": "...",
  "email": "usuario@email.com",
  "name": "Nome do Usuário"
}
```

#### POST /api/signin
Autentica e retorna JWT.

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usuários (protegidas - requer token)

#### GET /api/users/me
Retorna informações do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "_id": "...",
  "email": "usuario@email.com",
  "name": "Nome do Usuário"
}
```

### Artigos (protegidas - requer token)

#### GET /api/articles
Lista todos os artigos salvos pelo usuário.

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta (200):**
```json
[
  {
    "_id": "...",
    "keyword": "react",
    "title": "Título do artigo",
    "text": "Descrição...",
    "date": "2025-11-14",
    "source": "Nome da Fonte",
    "link": "https://...",
    "image": "https://...",
    "owner": "..."
  }
]
```

#### POST /api/articles
Salva um novo artigo.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "keyword": "react",
  "title": "Título do artigo",
  "text": "Descrição do artigo",
  "date": "2025-11-14",
  "source": "Nome da Fonte",
  "link": "https://exemplo.com/artigo",
  "image": "https://exemplo.com/imagem.jpg"
}
```

**Resposta (201):**
```json
{
  "_id": "...",
  "keyword": "react",
  "title": "Título do artigo",
  ...
}
```

#### DELETE /api/articles/:articleId
Remove um artigo salvo (apenas o dono pode deletar).

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "_id": "...",
  "keyword": "react",
  ...
}
```

## 🔒 Segurança

- ✅ Senhas armazenadas com hash (bcryptjs)
- ✅ JWT para autenticação stateless
- ✅ Helmet para headers de segurança
- ✅ Rate limiting (100 req/15min por IP)
- ✅ CORS configurado
- ✅ Validação de entrada (Celebrate/Joi)

## 📝 Scripts

```bash
npm start          # Inicia servidor (produção)
npm run dev        # Inicia servidor com nodemon (dev)
npm run lint       # Verifica ESLint
```

## ✅ Checklist de Deploy

- [ ] Configurar variáveis de ambiente no servidor
- [ ] `MONGO_URL` apontando para MongoDB Atlas ou servidor
- [ ] `JWT_SECRET` forte e único em produção
- [ ] `NODE_ENV=production`
- [ ] Certificar HTTPS configurado
- [ ] Testar todas as rotas

## 🌐 Deploy

### Railway/Render/Heroku

1. Criar novo projeto
2. Conectar repositório GitHub
3. Adicionar variáveis de ambiente:
   - `MONGO_URL`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy automático

## 📁 Estrutura de Arquivos

```
├── app.js                  # Entry point
├── config/
│   └── index.js           # Configurações
├── controllers/
│   ├── users.js           # Lógica de usuários
│   └── articles.js        # Lógica de artigos
├── middlewares/
│   ├── auth.js            # Autenticação JWT
│   ├── errorHandler.js    # Tratamento de erros
│   ├── logger.js          # Winston logger
│   ├── rateLimiter.js     # Rate limiting
│   └── validation.js      # Validação Celebrate
├── models/
│   ├── user.js            # Schema User
│   └── article.js         # Schema Article
├── routes/
│   ├── index.js           # Router principal
│   ├── auth.js            # Rotas de auth
│   ├── users.js           # Rotas de users
│   └── articles.js        # Rotas de articles
└── utils/
    ├── constants.js       # Constantes
    └── errors/            # Classes de erro customizadas
```

## 🐛 Troubleshooting

**Erro de conexão MongoDB:**
- Verifique se MongoDB está rodando
- Confira a string de conexão no `.env`

**Token inválido:**
- Verifique se o JWT_SECRET é o mesmo entre requisições
- Token expira em 7 dias

**Erro 409 (Conflict):**
- Email já cadastrado

**Erro 401 (Unauthorized):**
- Token ausente ou inválido
- Credenciais incorretas
