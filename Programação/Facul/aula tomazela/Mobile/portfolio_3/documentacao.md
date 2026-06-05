# SISTEMA DE GESTÃO MOBILE
## Documentação Técnica Completa
### Ionic 7 + Angular 17 · Node.js + Express · MySQL 8.0

---

## SUMÁRIO

1. [Visão Geral](#1-visão-geral)
2. [Stack Tecnológica](#2-stack-tecnológica)
3. [Arquitetura do Sistema](#3-arquitetura-do-sistema)
4. [Estrutura de Pastas](#4-estrutura-de-pastas)
5. [Banco de Dados](#5-banco-de-dados)
6. [Casos de Uso](#6-casos-de-uso)
7. [Middlewares](#7-middlewares)
8. [API REST — Endpoints](#8-api-rest--endpoints)
9. [Frontend — Páginas e Serviços](#9-frontend--páginas-e-serviços)
10. [Variáveis de Ambiente](#10-variáveis-de-ambiente)
11. [Dependências](#11-dependências)
12. [Prompt para GitHub Copilot](#12-prompt-para-github-copilot)

---

## 1. VISÃO GERAL

Sistema mobile de gestão comercial com autenticação JWT, cadastro de entidades, registro de vendas com controle de estoque, contas a receber e relatórios gerenciais.

**Módulos do sistema:**

| Módulo | Descrição |
|--------|-----------|
| Login | Autenticação via e-mail e senha com JWT |
| Usuários | CRUD de usuários do sistema |
| Produtos | CRUD de produtos com controle de estoque |
| Clientes | CRUD de clientes com CPF único |
| Vendas | Registro de vendas com múltiplos itens |
| Receber | Gestão de contas a receber geradas pelas vendas |
| Relatórios | Relatórios de vendas, recebíveis e top produtos |

---

## 2. STACK TECNOLÓGICA

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Mobile / Frontend | Ionic | 7.x |
| Framework JS | Angular | 17.x |
| Backend | Node.js + Express | 20.x / 4.x |
| Banco de Dados | MySQL | 8.0 |
| Autenticação | JWT (jsonwebtoken) | 9.x |
| Hash de senha | bcryptjs | 2.x |
| Query Builder | Knex.js | 3.x |
| Driver MySQL | mysql2 | 3.x |
| Validação backend | Joi | 17.x |
| Log de requisições | Morgan | 1.x |
| Storage mobile | @capacitor/preferences | 5.x |

---

## 3. ARQUITETURA DO SISTEMA

```
┌──────────────────────────────────────────────────────┐
│                   MOBILE CLIENT                       │
│               Ionic 7 + Angular 17                    │
│                                                       │
│  [Login] ──► [Dashboard] ──► [Módulos]               │
│                                                       │
│  AuthGuard ─── bloqueia rotas sem token              │
│  TokenInterceptor ─── injeta JWT em todo request     │
│  Services ─── HttpClient → API REST                  │
└──────────────────────┬───────────────────────────────┘
                       │  HTTPS · JSON · Bearer JWT
                       │
┌──────────────────────▼───────────────────────────────┐
│                  BACKEND — API REST                   │
│              Node.js 20 + Express 4                   │
│                                                       │
│  logger ──► auth ──► validate ──► Controller         │
│                                       │               │
│                                     Model             │
│                                       │               │
│                               errorHandler           │
└──────────────────────┬───────────────────────────────┘
                       │  mysql2 Pool (Knex)
                       │
┌──────────────────────▼───────────────────────────────┐
│                  BANCO DE DADOS                       │
│                  MySQL 8.0                            │
│                                                       │
│   users · products · clients                         │
│   sales · sale_items · receivables                   │
└──────────────────────────────────────────────────────┘
```

### Fluxo de Autenticação

```
1. App envia POST /api/auth/login { email, password }
2. Backend: bcrypt.compare(password, hash)
3. Backend: jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
4. App recebe { token, user } → salva em @capacitor/preferences
5. TokenInterceptor injeta: Authorization: Bearer <token>
6. auth.js middleware: jwt.verify(token) → req.user → next()
7. Se 401: interceptor chama logout() → redireciona /login
```

---

## 4. ESTRUTURA DE PASTAS

### 4.1 Backend

```
backend/
├── .env
├── .env.example
├── package.json
├── knexfile.js
└── src/
    ├── app.js                        # Entry point Express
    ├── config/
    │   └── database.js               # Instância Knex / Pool mysql2
    ├── controllers/
    │   ├── authController.js         # login
    │   ├── userController.js         # CRUD usuários
    │   ├── productController.js      # CRUD produtos
    │   ├── clientController.js       # CRUD clientes
    │   ├── saleController.js         # criar, listar, cancelar vendas
    │   ├── receivableController.js   # listar, registrar pagamento
    │   └── reportController.js       # relatórios
    ├── middlewares/
    │   ├── auth.js                   # verifica JWT
    │   ├── validate.js               # fábrica de validação Joi
    │   ├── errorHandler.js           # handler global de erros (último)
    │   └── logger.js                 # log de requisições (morgan)
    ├── models/
    │   ├── User.js
    │   ├── Product.js
    │   ├── Client.js
    │   ├── Sale.js
    │   ├── SaleItem.js
    │   └── Receivable.js
    ├── routes/
    │   ├── index.js                  # agrega todas as rotas
    │   ├── auth.js
    │   ├── users.js
    │   ├── products.js
    │   ├── clients.js
    │   ├── sales.js
    │   ├── receivables.js
    │   └── reports.js
    └── schemas/                      # schemas Joi
        ├── userSchema.js
        ├── productSchema.js
        ├── clientSchema.js
        └── saleSchema.js
```

### 4.2 Frontend (Ionic / Angular)

```
frontend/
├── ionic.config.json
├── capacitor.config.ts
├── package.json
└── src/
    ├── main.ts
    ├── environments/
    │   ├── environment.ts            # apiUrl dev
    │   └── environment.prod.ts       # apiUrl prod
    ├── theme/
    │   └── variables.scss            # customização Ionic CSS vars
    └── app/
        ├── app.module.ts
        ├── app-routing.module.ts
        ├── app.component.ts
        ├── core/
        │   ├── guards/
        │   │   └── auth.guard.ts     # bloqueia rotas sem token
        │   ├── interceptors/
        │   │   └── token.interceptor.ts  # injeta Bearer token
        │   └── services/
        │       ├── auth.service.ts
        │       ├── user.service.ts
        │       ├── product.service.ts
        │       ├── client.service.ts
        │       ├── sale.service.ts
        │       ├── receivable.service.ts
        │       └── report.service.ts
        ├── models/
        │   ├── user.model.ts
        │   ├── product.model.ts
        │   ├── client.model.ts
        │   ├── sale.model.ts
        │   └── receivable.model.ts
        ├── pages/
        │   ├── login/
        │   │   ├── login.module.ts
        │   │   ├── login-routing.module.ts
        │   │   ├── login.page.ts
        │   │   ├── login.page.html
        │   │   └── login.page.scss
        │   ├── dashboard/
        │   │   ├── dashboard.module.ts
        │   │   ├── dashboard.page.ts
        │   │   ├── dashboard.page.html
        │   │   └── dashboard.page.scss
        │   ├── users/
        │   │   ├── list/ (list.page.ts · .html · .scss)
        │   │   └── form/ (form.page.ts · .html · .scss)
        │   ├── products/
        │   │   ├── list/
        │   │   └── form/
        │   ├── clients/
        │   │   ├── list/
        │   │   └── form/
        │   ├── sales/
        │   │   ├── list/
        │   │   └── create/
        │   ├── receivables/
        │   │   └── list/
        │   └── reports/
        │       ├── reports.module.ts
        │       ├── reports.page.ts
        │       ├── reports.page.html
        │       └── reports.page.scss
        └── shared/
            └── components/
                └── header/          # componente de cabeçalho reutilizável
```

---

## 5. BANCO DE DADOS

### 5.1 Diagrama Entidade-Relacionamento

```
users ─────────────────────────────────────────────────┐
  │ id (PK)                                             │
  └──────────────< sales                               │
                    │ id (PK)                          │
                    │ client_id (FK) ◄─── clients      │
                    │ user_id   (FK) ─────────────────►┘
                    │ total
                    │ status
                    │
                    ├──────< sale_items
                    │           │ product_id (FK) ◄─── products
                    │           │ quantity
                    │           │ unit_price
                    │           │ subtotal (GENERATED)
                    │
                    └──────> receivables
                                │ client_id (FK) ◄─── clients
                                │ amount
                                │ due_date
                                │ paid_at
                                │ status
```

### 5.2 DDL Completo — schema.sql

```sql
-- =====================================================
-- Banco: gestao_db
-- Charset: utf8mb4 | Engine: InnoDB
-- =====================================================

CREATE DATABASE IF NOT EXISTS gestao_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE gestao_db;

-- -----------------------------------------------------
-- Tabela: users
-- Usuários do sistema (login e operações)
-- -----------------------------------------------------
CREATE TABLE users (
  id         INT            NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100)   NOT NULL,
  email      VARCHAR(100)   NOT NULL,
  password   VARCHAR(255)   NOT NULL,
  active     TINYINT(1)     NOT NULL DEFAULT 1,
  created_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: products
-- Produtos disponíveis para venda
-- -----------------------------------------------------
CREATE TABLE products (
  id          INT            NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)   NOT NULL,
  description TEXT,
  price       DECIMAL(10,2)  NOT NULL,
  stock       INT            NOT NULL DEFAULT 0,
  active      TINYINT(1)     NOT NULL DEFAULT 1,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
                             ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT chk_price CHECK (price >= 0),
  CONSTRAINT chk_stock CHECK (stock >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: clients
-- Clientes que realizam compras
-- -----------------------------------------------------
CREATE TABLE clients (
  id         INT            NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100)   NOT NULL,
  email      VARCHAR(100),
  phone      VARCHAR(20),
  cpf        VARCHAR(14),
  address    TEXT,
  active     TINYINT(1)     NOT NULL DEFAULT 1,
  created_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_clients_cpf (cpf)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: sales
-- Cabeçalho da venda
-- -----------------------------------------------------
CREATE TABLE sales (
  id         INT            NOT NULL AUTO_INCREMENT,
  client_id  INT            NOT NULL,
  user_id    INT            NOT NULL,
  total      DECIMAL(10,2)  NOT NULL,
  status     ENUM('pending','completed','cancelled')
                            NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_sales_client FOREIGN KEY (client_id)
    REFERENCES clients(id) ON UPDATE CASCADE,
  CONSTRAINT fk_sales_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: sale_items
-- Itens de cada venda
-- -----------------------------------------------------
CREATE TABLE sale_items (
  id          INT            NOT NULL AUTO_INCREMENT,
  sale_id     INT            NOT NULL,
  product_id  INT            NOT NULL,
  quantity    INT            NOT NULL,
  unit_price  DECIMAL(10,2)  NOT NULL,
  subtotal    DECIMAL(10,2)  GENERATED ALWAYS AS
                             (quantity * unit_price) STORED,
  PRIMARY KEY (id),
  CONSTRAINT fk_items_sale FOREIGN KEY (sale_id)
    REFERENCES sales(id) ON DELETE CASCADE,
  CONSTRAINT fk_items_product FOREIGN KEY (product_id)
    REFERENCES products(id) ON UPDATE CASCADE,
  CONSTRAINT chk_quantity CHECK (quantity > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Tabela: receivables
-- Contas a receber geradas pelas vendas
-- -----------------------------------------------------
CREATE TABLE receivables (
  id         INT            NOT NULL AUTO_INCREMENT,
  sale_id    INT            NOT NULL,
  client_id  INT            NOT NULL,
  amount     DECIMAL(10,2)  NOT NULL,
  due_date   DATE           NOT NULL,
  paid_at    TIMESTAMP      NULL DEFAULT NULL,
  status     ENUM('open','paid','overdue')
                            NOT NULL DEFAULT 'open',
  created_at TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_recv_sale FOREIGN KEY (sale_id)
    REFERENCES sales(id) ON DELETE CASCADE,
  CONSTRAINT fk_recv_client FOREIGN KEY (client_id)
    REFERENCES clients(id) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Índices adicionais para performance
-- -----------------------------------------------------
CREATE INDEX idx_sales_client   ON sales(client_id);
CREATE INDEX idx_sales_status   ON sales(status);
CREATE INDEX idx_recv_status    ON receivables(status);
CREATE INDEX idx_recv_due       ON receivables(due_date);
CREATE INDEX idx_items_sale     ON sale_items(sale_id);
CREATE INDEX idx_items_product  ON sale_items(product_id);
```

---

## 6. CASOS DE USO

### UC-01 — Login

| Campo | Descrição |
|-------|-----------|
| **ID** | UC-01 |
| **Nome** | Login no Sistema |
| **Ator** | Qualquer usuário |
| **Pré-condição** | Usuário cadastrado e `active = 1` no banco |
| **Fluxo Principal** | 1. Usuário abre o app → 2. Informa e-mail e senha → 3. Toca "Entrar" → 4. `POST /api/auth/login` → 5. Backend valida com bcrypt → 6. Retorna JWT 24h → 7. App salva token em `@capacitor/preferences` → 8. Navega para `/dashboard` |
| **Fluxo Alternativo** | Credenciais inválidas: retorna 401, exibe `IonToast` de erro; usuário inativo: retorna 403 |
| **Pós-condição** | Token JWT armazenado; `AuthGuard` libera rotas protegidas |

---

### UC-02 — Logout

| Campo | Descrição |
|-------|-----------|
| **ID** | UC-02 |
| **Nome** | Logout |
| **Ator** | Usuário autenticado |
| **Pré-condição** | Token válido em storage |
| **Fluxo Principal** | 1. Toca "Sair" no menu → 2. `AuthService.logout()` remove token do storage → 3. Redireciona para `/login` |
| **Pós-condição** | Token removido; `AuthGuard` bloqueia todas as rotas protegidas |

---

### UC-03 — Cadastrar Usuário

| Campo | Descrição |
|-------|-----------|
| **ID** | UC-03 |
| **Nome** | Cadastrar Usuário |
| **Ator** | Usuário autenticado |
| **Pré-condição** | Estar logado com token válido |
| **Fluxo Principal** | 1. Acessa "Usuários" → 2. Toca FAB "+" → 3. Preenche nome, e-mail, senha → 4. Toca "Salvar" → 5. `POST /api/users` → 6. Backend verifica e-mail único, gera hash bcrypt, insere → 7. Modal fecha; lista atualizada |
| **Fluxo Alternativo** | E-mail duplicado: retorna 409, exibe mensagem de e-mail já cadastrado |
| **Pós-condição** | Novo usuário ativo no banco |

---

### UC-04 — Editar / Inativar Usuário

| Campo | Descrição |
|-------|-----------|
| **ID** | UC-04 |
| **Nome** | Editar ou Inativar Usuário |
| **Ator** | Usuário autenticado |
| **Pré-condição** | Usuário alvo existente |
| **Fluxo Principal — Editar** | 1. Lista → desliza item → toca "Editar" → 2. Modal com campos preenchidos → 3. Altera dados → 4. `PUT /api/users/:id` → 5. Lista atualizada |
| **Fluxo Principal — Inativar** | 1. Lista → desliza item → toca "Inativar" → 2. `PATCH /api/users/:id/toggle` → 3. `active` invertido → 4. Badge atualizado na lista |
| **Pós-condição** | Registro atualizado; usuário inativo não consegue mais logar |

---

### UC-05 — Cadastrar Produto

| Campo | Descrição |
|-------|-----------|
| **ID** | UC-05 |
| **Nome** | Cadastrar Produto |
| **Ator** | Usuário autenticado |
| **Pré-condição** | Estar logado |
| **Fluxo Principal** | 1. Acessa "Produtos" → 2. Toca FAB "+" → 3. Preenche nome, descrição, preço, estoque → 4. `POST /api/products` → 5. Joi valida preço ≥ 0 e estoque ≥ 0 → 6. Produto criado; lista atualizada |
| **Fluxo Alternativo** | Campos inválidos (preço negativo, nome vazio): retorna 422 com array de erros de validação |
| **Pós-condição** | Produto disponível para seleção na criação de vendas |

---

### UC-06 — Cadastrar Cliente

| Campo | Descrição |
|-------|-----------|
| **ID** | UC-06 |
| **Nome** | Cadastrar Cliente |
| **Ator** | Usuário autenticado |
| **Pré-condição** | Estar logado |
| **Fluxo Principal** | 1. Acessa "Clientes" → 2. Toca FAB "+" → 3. Preenche nome, CPF, telefone, e-mail, endereço → 4. `POST /api/clients` → 5. Backend verifica CPF único → 6. Cliente criado |
| **Fluxo Alternativo** | CPF duplicado: retorna 409; CPF com formato inválido: Joi retorna 422 |
| **Pós-condição** | Cliente disponível para seleção em novas vendas |

---

### UC-07 — Registrar Venda

| Campo | Descrição |
|-------|-----------|
| **ID** | UC-07 |
| **Nome** | Registrar Venda |
| **Ator** | Usuário autenticado |
| **Pré-condição** | Ao menos um cliente ativo e um produto ativo com estoque > 0 |
| **Fluxo Principal** | 1. Acessa "Vendas" → "Nova Venda" → 2. Seleciona cliente → 3. Adiciona itens: produto + quantidade → 4. Total calculado em tempo real no frontend → 5. Toca "Confirmar" → 6. `POST /api/sales` → 7. Backend em transação: insere `sale`, insere `sale_items`, decrementa `stock` de cada produto, insere `receivable` com `due_date = hoje + 30 dias` → 8. Retorna 201 com `{id, total}` |
| **Fluxo Alternativo** | Estoque insuficiente para algum item: retorna 422 `{error: "Estoque insuficiente: <produto>"}` — transação revertida |
| **Pós-condição** | Venda com `status = pending`; recebível com `status = open`; estoque decrementado |

---

### UC-08 — Cancelar Venda

| Campo | Descrição |
|-------|-----------|
| **ID** | UC-08 |
| **Nome** | Cancelar Venda |
| **Ator** | Usuário autenticado |
| **Pré-condição** | Venda com `status = pending` |
| **Fluxo Principal** | 1. Lista de vendas → toca "Cancelar" → 2. `IonAlert` de confirmação → 3. `PATCH /api/sales/:id/cancel` → 4. Backend em transação: `status → cancelled`, restaura `stock` de cada item, deleta `receivable` vinculado |
| **Fluxo Alternativo** | Venda já `completed` ou `cancelled`: retorna 422, exibe toast de erro |
| **Pós-condição** | Estoque restaurado; recebível removido; venda cancelada |

---

### UC-09 — Registrar Recebimento

| Campo | Descrição |
|-------|-----------|
| **ID** | UC-09 |
| **Nome** | Registrar Recebimento (Contas a Receber) |
| **Ator** | Usuário autenticado |
| **Pré-condição** | Recebível com `status = open` ou `status = overdue` |
| **Fluxo Principal** | 1. Acessa "Receber" → 2. Filtra por segmento (abertos / vencidos) → 3. Toca "Receber" no item → 4. `IonAlert` de confirmação → 5. `PATCH /api/receivables/:id/pay` → 6. Backend: `paid_at = NOW()`, `status → paid`, atualiza venda vinculada: `status → completed` |
| **Pós-condição** | Recebível marcado como pago; venda concluída |

---

### UC-10 — Gerar Relatórios

| Campo | Descrição |
|-------|-----------|
| **ID** | UC-10 |
| **Nome** | Consultar Relatórios |
| **Ator** | Usuário autenticado |
| **Pré-condição** | Estar logado; dados existentes no banco |
| **Fluxo Principal** | 1. Acessa "Relatórios" → 2. Seleciona aba via `IonSegment`: Vendas / A Receber / Top Produtos → 3. Define filtros (datas para vendas, status para recebíveis) → 4. Toca "Buscar" → 5. Exibe resultados em cards e listas |

| Sub-relatório | Endpoint | Filtros | Retorno |
|--------------|----------|---------|---------|
| Vendas por Período | `GET /api/reports/sales` | `?start=&end=` | Total vendido + contagem por data |
| Contas a Receber | `GET /api/reports/receivables` | `?status=` | Contagem e total por status |
| Top Produtos | `GET /api/reports/top-products` | `?limit=5` | Produtos mais vendidos por quantidade e receita |

| **Pós-condição** | Dados exibidos em tela; nenhuma alteração no banco |

---

## 7. MIDDLEWARES

### 7.1 `auth.js` — Verificação JWT

```
POSIÇÃO NA CADEIA: antes dos controllers, depois de logger
ENTRADA: req.headers.authorization

LÓGICA:
  1. Se header ausente → 401 { error: "Token não fornecido" }
  2. Extrai token de "Bearer <token>"
  3. jwt.verify(token, process.env.JWT_SECRET)
     → sucesso: atribui payload decodificado a req.user → next()
     → falha (expirado/inválido): 401 { error: "Token inválido ou expirado" }

ROTAS EXCLUÍDAS: POST /api/auth/login
```

### 7.2 `validate.js` — Validação de Schema Joi

```
PADRÃO: fábrica de middlewares
ASSINATURA: validate(schema) => (req, res, next)

LÓGICA:
  1. Recebe schema Joi como parâmetro
  2. const { error } = schema.validate(req.body, { abortEarly: false })
  3. Se error → 422 { errors: error.details.map(d => d.message) }
  4. Sem erro → next()

USO NAS ROTAS:
  router.post('/', auth, validate(userSchema), userController.create)
```

### 7.3 `errorHandler.js` — Handler Global de Erros

```
POSIÇÃO NA CADEIA: último middleware em app.js
ASSINATURA: (err, req, res, next) — 4 parâmetros obrigatórios

LÓGICA:
  1. console.error(err.stack)
  2. statusCode = err.statusCode || 500
  3. message = err.message || "Erro interno do servidor"
  4. res.status(statusCode).json({ error: message })

NOTA: Qualquer controller pode fazer next(err) ou
      lançar erro com err.statusCode customizado
```

### 7.4 `logger.js` — Log de Requisições

```
POSIÇÃO NA CADEIA: primeiro middleware em app.js
IMPLEMENTAÇÃO: morgan('dev') via require('morgan')

FORMATO (dev):
  METHOD /path STATUS ms - bytes

EXEMPLO:
  POST /api/auth/login 200 45ms - 312b
  GET /api/sales 401 2ms - 42b
```

---

## 8. API REST — ENDPOINTS

**Base URL:** `http://localhost:3000/api`
**Auth:** Bearer JWT no header `Authorization` (exceto `/auth/login`)
**Content-Type:** `application/json`

### 8.1 Autenticação

| Método | Rota | Auth | Request Body | Response (200) |
|--------|------|------|-------------|----------------|
| `POST` | `/auth/login` | ✗ | `{ email, password }` | `{ token: string, user: { id, name, email } }` |

### 8.2 Usuários — `/users`

| Método | Rota | Auth | Body | Response |
|--------|------|------|------|----------|
| `GET` | `/users` | ✓ | — | `[ { id, name, email, active, created_at } ]` |
| `GET` | `/users/:id` | ✓ | — | `{ id, name, email, active }` |
| `POST` | `/users` | ✓ | `{ name, email, password }` | `201 { id, name, email }` |
| `PUT` | `/users/:id` | ✓ | `{ name, email }` | `{ message: "Atualizado" }` |
| `PATCH` | `/users/:id/toggle` | ✓ | — | `{ active: 0 \| 1 }` |

### 8.3 Produtos — `/products`

| Método | Rota | Auth | Body | Response |
|--------|------|------|------|----------|
| `GET` | `/products` | ✓ | — | `[ { id, name, price, stock, active } ]` |
| `GET` | `/products/:id` | ✓ | — | `{ id, name, description, price, stock, active }` |
| `POST` | `/products` | ✓ | `{ name, description, price, stock }` | `201 { id, name }` |
| `PUT` | `/products/:id` | ✓ | `{ name, description, price, stock }` | `{ message: "Atualizado" }` |
| `PATCH` | `/products/:id/toggle` | ✓ | — | `{ active: 0 \| 1 }` |

### 8.4 Clientes — `/clients`

| Método | Rota | Auth | Body | Response |
|--------|------|------|------|----------|
| `GET` | `/clients` | ✓ | — | `[ { id, name, cpf, phone, active } ]` |
| `GET` | `/clients/:id` | ✓ | — | `{ id, name, email, phone, cpf, address, active }` |
| `POST` | `/clients` | ✓ | `{ name, email, phone, cpf, address }` | `201 { id, name }` |
| `PUT` | `/clients/:id` | ✓ | `{ name, email, phone, address }` | `{ message: "Atualizado" }` |
| `PATCH` | `/clients/:id/toggle` | ✓ | — | `{ active: 0 \| 1 }` |

### 8.5 Vendas — `/sales`

| Método | Rota | Auth | Body | Response |
|--------|------|------|------|----------|
| `GET` | `/sales` | ✓ | — | `[ { id, client_name, total, status, created_at } ]` |
| `GET` | `/sales/:id` | ✓ | — | `{ id, client, total, status, items: [ {product, quantity, unit_price, subtotal} ] }` |
| `POST` | `/sales` | ✓ | `{ client_id, items: [ { product_id, quantity } ] }` | `201 { id, total }` |
| `PATCH` | `/sales/:id/cancel` | ✓ | — | `{ status: "cancelled" }` |

### 8.6 Recebíveis — `/receivables`

| Método | Rota | Auth | Query | Response |
|--------|------|------|-------|----------|
| `GET` | `/receivables` | ✓ | `?status=open\|paid\|overdue` | `[ { id, client_name, amount, due_date, status } ]` |
| `PATCH` | `/receivables/:id/pay` | ✓ | — | `{ status: "paid", paid_at: timestamp }` |

### 8.7 Relatórios — `/reports`

| Método | Rota | Auth | Query | Response |
|--------|------|------|-------|----------|
| `GET` | `/reports/sales` | ✓ | `?start=YYYY-MM-DD&end=YYYY-MM-DD` | `[ { date, count, total } ]` |
| `GET` | `/reports/receivables` | ✓ | `?status=` (opcional) | `{ open: { count, total }, paid: { count, total }, overdue: { count, total } }` |
| `GET` | `/reports/top-products` | ✓ | `?limit=5` | `[ { product_name, quantity_sold, revenue } ]` |

### Códigos de Status HTTP

| Código | Uso |
|--------|-----|
| 200 | Sucesso |
| 201 | Recurso criado |
| 400 | Requisição malformada |
| 401 | Não autenticado |
| 403 | Acesso negado |
| 404 | Não encontrado |
| 409 | Conflito (duplicado) |
| 422 | Falha de validação |
| 500 | Erro interno |

---

## 9. FRONTEND — PÁGINAS E SERVIÇOS

### 9.1 Rotas Angular (`app-routing.module.ts`)

```typescript
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard',   loadChildren: () => import('./pages/dashboard/dashboard.module') },
      { path: 'users',       loadChildren: () => import('./pages/users/users.module') },
      { path: 'products',    loadChildren: () => import('./pages/products/products.module') },
      { path: 'clients',     loadChildren: () => import('./pages/clients/clients.module') },
      { path: 'sales',       loadChildren: () => import('./pages/sales/sales.module') },
      { path: 'receivables', loadChildren: () => import('./pages/receivables/receivables.module') },
      { path: 'reports',     loadChildren: () => import('./pages/reports/reports.module') },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
```

### 9.2 Serviços Angular

| Serviço | Métodos |
|---------|---------|
| `AuthService` | `login(email, password)` · `logout()` · `getToken()` · `isAuthenticated(): boolean` · `getUser()` |
| `UserService` | `getAll()` · `getById(id)` · `create(data)` · `update(id, data)` · `toggle(id)` |
| `ProductService` | `getAll()` · `getById(id)` · `create(data)` · `update(id, data)` · `toggle(id)` |
| `ClientService` | `getAll()` · `getById(id)` · `create(data)` · `update(id, data)` · `toggle(id)` |
| `SaleService` | `getAll()` · `getById(id)` · `create(data)` · `cancel(id)` |
| `ReceivableService` | `getAll(status?)` · `pay(id)` |
| `ReportService` | `getSales(start, end)` · `getReceivables(status?)` · `getTopProducts(limit?)` |

### 9.3 Interfaces TypeScript (models/)

```typescript
// user.model.ts
export interface User {
  id: number;
  name: string;
  email: string;
  active: number;
  created_at?: string;
}

// product.model.ts
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  active: number;
}

// client.model.ts
export interface Client {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  cpf?: string;
  address?: string;
  active: number;
}

// sale.model.ts
export interface SaleItem {
  product_id: number;
  quantity: number;
  unit_price?: number;
  subtotal?: number;
  product_name?: string;
}
export interface Sale {
  id?: number;
  client_id: number;
  client_name?: string;
  total?: number;
  status?: 'pending' | 'completed' | 'cancelled';
  items: SaleItem[];
  created_at?: string;
}

// receivable.model.ts
export interface Receivable {
  id: number;
  sale_id: number;
  client_id: number;
  client_name?: string;
  amount: number;
  due_date: string;
  paid_at?: string;
  status: 'open' | 'paid' | 'overdue';
}
```

### 9.4 Componentes Ionic por Página

| Página | Componentes Ionic principais |
|--------|------------------------------|
| **Login** | `IonPage` · `IonContent` · `IonItem` · `IonInput` · `IonButton` · `IonToast` |
| **Dashboard** | `IonPage` · `IonGrid` · `IonRow` · `IonCol` · `IonCard` · `IonIcon` · `IonCardHeader` |
| **List (Usuários/Produtos/Clientes)** | `IonList` · `IonItemSliding` · `IonItem` · `IonLabel` · `IonBadge` · `IonFab` · `IonSearchbar` |
| **Form (cadastro/edição)** | `IonHeader` · `IonToolbar` · `IonBackButton` · `IonList` · `IonItem` · `IonLabel` floating · `IonInput` · `IonTextarea` · `IonButton` |
| **Vendas — Criar** | `IonSelect` · `IonSelectOption` · `IonItem` · `IonInput` · `IonButton` · `IonChip` · `IonCard` |
| **Vendas — Lista** | `IonList` · `IonItem` · `IonBadge` · `IonButton` · `IonAlert` |
| **Receber** | `IonSegment` · `IonSegmentButton` · `IonList` · `IonItem` · `IonBadge` · `IonButton` · `IonAlert` |
| **Relatórios** | `IonSegment` · `IonDatetime` · `IonCard` · `IonList` · `IonItem` · `IonLabel` |

### 9.5 AuthGuard

```typescript
// auth.guard.ts
// canActivate: busca token em @capacitor/preferences
// Decodifica JWT e verifica expiração (exp * 1000 > Date.now())
// Se válido → retorna true
// Se inválido/ausente → router.navigate(['/login']) → retorna false
```

### 9.6 TokenInterceptor

```typescript
// token.interceptor.ts
// Clona req injetando header: Authorization: Bearer <token>
// Intercepta 401 → AuthService.logout() → router.navigate(['/login'])
```

### 9.7 Paleta de Cores e Badges

| Status | Badge Color | Ionic Color |
|--------|-------------|-------------|
| `open` | Amarelo | `warning` |
| `paid` | Verde | `success` |
| `overdue` | Vermelho | `danger` |
| `pending` | Cinza | `medium` |
| `completed` | Verde | `success` |
| `cancelled` | Vermelho | `danger` |
| `active` | Verde | `success` |
| `inactive` | Cinza | `medium` |

---

## 10. VARIÁVEIS DE AMBIENTE

### Backend — `.env`

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=sua_senha_aqui
DB_NAME=gestao_db
JWT_SECRET=chave_secreta_longa_e_aleatoria_minimo_32_chars
JWT_EXPIRES_IN=24h
```

### Frontend — `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Frontend — `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://sua-api-producao.com/api'
};
```

---

## 11. DEPENDÊNCIAS

### Backend — `package.json`

```json
{
  "name": "gestao-backend",
  "version": "1.0.0",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "joi": "^17.11.0",
    "jsonwebtoken": "^9.0.2",
    "knex": "^3.1.0",
    "morgan": "^1.10.0",
    "mysql2": "^3.6.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### Frontend — principais (`package.json`)

```json
{
  "name": "gestao-frontend",
  "dependencies": {
    "@angular/core": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/router": "^17.0.0",
    "@ionic/angular": "^7.6.0",
    "@capacitor/core": "^5.6.0",
    "@capacitor/preferences": "^5.0.7",
    "ionicons": "^7.2.2"
  }
}
```

### Instalação

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
ionic serve            # browser
ionic cap run android  # android
```

---

## 12. PROMPT PARA GITHUB COPILOT

> **Instruções:** Abra o GitHub Copilot Chat, cole o bloco abaixo na íntegra e envie.

---

```
Build a full-stack mobile management system. Generate ALL files listed.

## STACK
- Frontend: Ionic 7 + Angular 17, lazy-loaded pages, standalone NOT used (NgModule pattern)
- Backend: Node.js 20 + Express 4, CommonJS (require)
- Database: MySQL 8.0 via mysql2 + Knex.js
- Auth: JWT (jsonwebtoken) + bcryptjs
- Validation: Joi

## BACKEND — generate all files

### src/app.js
Express app: cors, morgan('dev'), express.json(), mount routes from ./routes/index.js, register errorHandler last, listen on process.env.PORT || 3000.

### src/config/database.js
Knex instance: client mysql2, connection from .env (DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME), pool min:2 max:10. Export knex instance.

### src/middlewares/auth.js
Extract Bearer token from Authorization header. jwt.verify with JWT_SECRET. On success: req.user = payload, next(). On fail: res.status(401).json({error}).

### src/middlewares/validate.js
Factory: validate(schema) returns (req,res,next). schema.validate(req.body,{abortEarly:false}). On error: res.status(422).json({errors: details.map(d=>d.message)}). Else next().

### src/middlewares/errorHandler.js
(err,req,res,next). console.error(err.stack). res.status(err.statusCode||500).json({error: err.message||'Erro interno'}).

### src/routes/index.js
Mount: /auth, /users, /products, /clients, /sales, /receivables, /reports.

### Auth route + controller
POST /api/auth/login: find user by email (knex), bcrypt.compare, jwt.sign({id,name,email}, JWT_SECRET, {expiresIn:'24h'}), return {token, user:{id,name,email}}. 401 if not found or inactive. 401 if wrong password.

### Users route + controller
All routes require auth middleware.
GET /users → select all active, exclude password
GET /users/:id → single user
POST /users → validate(userSchema): {name required, email required email, password min 6}. Check email unique (409 if exists). bcrypt.hash(password,10). Insert.
PUT /users/:id → update name and email
PATCH /users/:id/toggle → flip active field (1→0 or 0→1)

### Products route + controller
All routes require auth.
GET /products → all active
GET /products/:id
POST /products → validate: {name required, price number min 0, stock integer min 0}. Insert.
PUT /products/:id → update all fields
PATCH /products/:id/toggle → flip active

### Clients route + controller
All routes require auth.
GET /clients → all active
GET /clients/:id
POST /clients → validate: {name required, cpf optional but if present format XX.XXX.XXX/XXXX-XX or digits only}. Check cpf unique (409). Insert.
PUT /clients/:id → update name, email, phone, address
PATCH /clients/:id/toggle → flip active

### Sales route + controller
All routes require auth.
GET /sales → join client name, order by created_at desc
GET /sales/:id → include items array joined with product name
POST /sales → body: {client_id, items:[{product_id, quantity}]}.
  Use knex transaction:
  1. For each item: select product, check stock >= quantity (if not: rollback, 422 error with product name)
  2. Calculate total = sum(quantity * price)
  3. Insert into sales (client_id, user_id=req.user.id, total, status='pending')
  4. Insert each item into sale_items (sale_id, product_id, quantity, unit_price=product.price)
  5. Decrement stock for each product
  6. Insert into receivables (sale_id, client_id, amount=total, due_date=today+30days, status='open')
  7. Commit. Return 201 {id, total}
PATCH /sales/:id/cancel →
  Check status is 'pending' (422 if not).
  Transaction: set status='cancelled', restore stock for each item, delete receivable.

### Receivables route + controller
All routes require auth.
GET /receivables → optional query ?status=. Join client name. If no status: return open and overdue.
PATCH /receivables/:id/pay → set paid_at=NOW(), status='paid'. Update parent sale status='completed'.

### Reports route + controller
All routes require auth.
GET /reports/sales?start=&end= → SELECT DATE(created_at) as date, COUNT(*) as count, SUM(total) as total FROM sales WHERE status != 'cancelled' AND created_at BETWEEN start AND end GROUP BY date ORDER BY date.
GET /reports/receivables?status= → SELECT status, COUNT(*) as count, SUM(amount) as total FROM receivables GROUP BY status (filter by status if provided).
GET /reports/top-products?limit=5 → SELECT p.name, SUM(si.quantity) as quantity_sold, SUM(si.subtotal) as revenue FROM sale_items si JOIN products p ON p.id=si.product_id JOIN sales s ON s.id=si.sale_id WHERE s.status != 'cancelled' GROUP BY p.id ORDER BY quantity_sold DESC LIMIT limit.

### .env.example
PORT=3000, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, JWT_SECRET, JWT_EXPIRES_IN=24h

### schema.sql
Full DDL for: users, products, clients, sales, sale_items, receivables with all FK constraints and indexes as specified above.

## FRONTEND — generate all files

### app-routing.module.ts
/login → LoginPageModule (no guard)
All other paths: canActivate AuthGuard
/dashboard, /users, /products, /clients, /sales, /receivables, /reports — all lazy loaded.
** → redirect to /login.

### app.module.ts
Import IonicModule.forRoot(), HttpClientModule, AppRoutingModule.
Provide HTTP_INTERCEPTORS with TokenInterceptor (multi: true).

### core/guards/auth.guard.ts
Implements CanActivate. Get token from Preferences.get({key:'token'}). Decode with atob on payload section. Check exp > Date.now()/1000. If valid return true. Else router.navigate(['/login']), return false.

### core/interceptors/token.interceptor.ts
Implements HttpInterceptor. Get token from localStorage OR Preferences (sync if possible, else store token in memory on login). Clone request with Authorization: Bearer token header. Catch 401 errors: call AuthService.logout(), redirect to /login.

### core/services/auth.service.ts
login(email,password): POST apiUrl/auth/login. On success: store token and user in Preferences. Return observable.
logout(): clear Preferences token and user. Navigate to /login.
getToken(): return stored token.
isAuthenticated(): check token exists.
getUser(): return stored user object.

### core/services/ — one service per entity
Each service: constructor(private http: HttpClient). private apiUrl = environment.apiUrl + '/entity'.
Methods matching the API endpoints described above.
Return typed Observables using the interfaces.

### models/ — TypeScript interfaces
User, Product, Client, Sale, SaleItem, Receivable interfaces as described in the documentation.

### pages/login
HTML: IonPage > IonContent (fullscreen) centered with logo placeholder (large IonIcon person-circle), title "Sistema Gestão", IonList > IonItem for email IonInput + IonItem for password IonInput (type password), IonButton full "Entrar", IonToast for error.
TS: FormGroup with email and password. onLogin(): call AuthService.login, navigate to /dashboard on success, show toast on error.

### pages/dashboard
HTML: IonPage > IonHeader (title Dashboard) > IonContent > IonGrid. 6 IonCards (2 per row) for: Usuários, Produtos, Clientes, Vendas, Receber, Relatórios. Each card: IonIcon + title + subtitle count (fetched from API). Tap navigates to respective route.
TS: fetch summary counts from each service on ionViewWillEnter.

### pages/users, pages/products, pages/clients (list + form pattern)
List page: IonHeader with title and back button. IonSearchbar (filters list). IonList with IonItemSliding: IonItem shows name + IonBadge active/inactive. IonItemOptions: Edit button + Toggle button. IonFab bottom-right "+" opens form modal.
Form page (opened as IonModal): IonHeader with title (Novo/Editar) + close button. IonList with IonItem > IonLabel floating + IonInput for each field. IonButton "Salvar".
TS: form uses FormGroup + FormControl. On save: call service create or update, dismiss modal, reload list.

### pages/sales/list
IonHeader title "Vendas". IonFab "Nova Venda" navigates to /sales/create. IonList: each item shows client name, total formatted as R$ currency, date, IonBadge status color-coded. IonItemSliding with "Cancelar" option (shows IonAlert confirm before calling cancel).

### pages/sales/create
IonHeader "Nova Venda". IonItem IonSelect for client (active only). Section "Itens": IonItem IonSelect product + IonInput quantity per item. IonButton "Adicionar Item". Dynamic list of added items with IonChip showing product+qty + remove button. IonCard showing total in real time. IonButton "Confirmar Venda" (disabled if no client or no items).
TS: items array, compute total as sum(product.price * qty), on confirm call SaleService.create.

### pages/receivables/list
IonHeader "Contas a Receber". IonSegment with open/overdue/paid. IonList filtered by segment: each item shows client name, amount (R$), due_date, IonBadge status. IonButton "Receber" visible only for open/overdue (shows IonAlert confirm).

### pages/reports
IonHeader "Relatórios". IonSegment: Vendas / A Receber / Top Produtos.
Vendas tab: two IonDatetime inputs (start/end), IonButton "Buscar", IonList with date + count + total per row, IonCard with grand total.
A Receber tab: IonCard grid showing open/paid/overdue counts and totals.
Top Produtos tab: IonList ranked, showing product name, quantity sold, revenue.

### theme/variables.scss
Set --ion-color-primary: #3880ff. Override card border-radius to 12px. Set default font to system-ui.

## ALSO GENERATE
1. capacitor.config.ts (appId: com.gestao.app, appName: GestaoApp)
2. ionic.config.json
3. environments/environment.ts and environment.prod.ts

Generate backend first, then frontend. Use TypeScript for Angular files. Use CommonJS (require/module.exports) for all Node.js files.
```