# NewsExplorer Backend

API REST com autenticação JWT para salvar artigos de notícias.

## Stack
- Node.js 18.x + Express 5
- MongoDB (Mongoose)
- JWT (jsonwebtoken) + bcrypt
- Validação: Celebrate/Joi
- Segurança: Helmet, CORS, rate limiting
- Logs: Winston

## Endpoints

### Autenticação (públicos)
- `POST /api/signup` - criar usuário
  - Body: `{ "name": "string", "email": "email", "password": "string>=8" }`
- `POST /api/signin` - login
  - Body: `{ "email": "email", "password": "string" }`
  - Response: `{ "token": "JWT..." }`

### Usuários (protegidos)
- `GET /api/users/me` - perfil do usuário logado
  - Header: `Authorization: Bearer <token>`

### Artigos (protegidos)
- `GET /api/articles` - listar artigos salvos
- `POST /api/articles` - salvar artigo
  - Body: `{ "keyword", "title", "text", "date", "source", "link", "image" }`
- `DELETE /api/articles/:articleId` - deletar artigo

### Health Check
- `GET /healthz` - status e DB readiness

## Variáveis de Ambiente

```env
NODE_ENV=production
PORT=3001
MONGO_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net/<db>?retryWrites=true&w=majority
JWT_SECRET=<secure-random-string>
CORS_ORIGINS=https://seu-frontend.com,http://localhost:3000
```

**Dev local**: use `MONGO_URL=memory` para rodar com mongodb-memory-server (não persistente).

## Deploy no Render

### 1. Criar serviço via Blueprint
- Acesse: [Render Blueprints](https://dashboard.render.com/select-repo?type=blueprint)
- Conecte o GitHub e selecione `Luiz-Totoim/project-name-backend`
- Confirme as configurações do `render.yaml`:
  - Build: `npm ci`
  - Start: `node app.js`
  - Health check: `/healthz`
  - Plan: Free
- **Variáveis** (vêm do blueprint, mas revise):
  - `MONGO_URL`: default `memory` (trocar por Atlas depois)
  - `JWT_SECRET`: gerado automaticamente
  - `CORS_ORIGINS`: `https://luiz-totoim.github.io,http://localhost:3000`
  - `NODE_ENV`: `production`
- Clique em **Apply** para criar

### 2. Aguardar deploy
- Build leva ~2-3 min
- Health check em `/healthz` deve ficar **Healthy**

### 3. Copiar URL pública
- Ex: `https://project-name-backend.onrender.com`
- Testar: `curl https://<sua-url>/healthz`

### 4. (Opcional) Trocar para MongoDB Atlas
- No Render  Environment  editar `MONGO_URL`
- Colar string SRV do Atlas
- Salvar e aguardar redeploy automático

## Scripts

```bash
npm start          # produção
npm run dev        # dev com nodemon
npm run lint       # ESLint
npm run lint:fix   # fix automático
```

## Estrutura

```
 app.js                 # Entry point
 config/
    index.js          # Env config
 controllers/          # Lógica de negócio
 middlewares/
    auth.js           # JWT verificação
    errorHandler.js   # Error handler central
    validation.js     # Celebrate schemas
 models/               # Mongoose schemas
 routes/               # Express routers
 utils/
    errors/           # Custom error classes
 render.yaml           # Blueprint Render
```

## Testes Manuais (após deploy)

```bash
BASE=https://<sua-url>.onrender.com

# Health
curl $BASE/healthz

# Signup
curl -X POST $BASE/api/signup \\
  -H 'Content-Type: application/json' \\
  -d '{\"name\":\"Test\",\"email\":\"test@ex.com\",\"password\":\"Secret123!\"}'

# Signin
curl -X POST $BASE/api/signin \\
  -H 'Content-Type: application/json' \\
  -d '{\"email\":\"test@ex.com\",\"password\":\"Secret123!\"}'

# Me (use token do signin)
curl $BASE/api/users/me -H 'Authorization: Bearer <TOKEN>'

# Artigos
curl -X POST $BASE/api/articles \\
  -H 'Authorization: Bearer <TOKEN>' \\
  -H 'Content-Type: application/json' \\
  -d '{\"keyword\":\"tech\",\"title\":\"Hello\",\"text\":\"...\",\"date\":\"2025-11-14\",\"source\":\"Test\",\"link\":\"https://example.com\",\"image\":\"https://example.com/i.jpg\"}'
```

## Licença
ISC