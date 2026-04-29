# 🚀 Space Explorer

> Aplicação React que consome APIs da NASA para explorar o universo — imagens astronômicas e asteroides próximos à Terra.

🌐 **[Acesse a aplicação online](https://trabalhodsw-bosyowfh0-hucklouco-2981s-projects.vercel.app)**

---

## 📸 Prints da Aplicação

### Página Home
![Home](./docs/screenshots/home.png)

### Galeria APOD
![APOD Gallery](./docs/screenshots/apod-gallery.png)

### Detalhe APOD (Rota Dinâmica `/apod/:date`)
![APOD Detail](./docs/screenshots/apod-detail.png)

### Asteroides (NEO)
![NEO](./docs/screenshots/neo.png)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev) | 18.3 | Biblioteca de UI |
| [React Router DOM](https://reactrouter.com) | 6.26 | Rotas dinâmicas |
| [Vite](https://vitejs.dev) | 5.4 | Build tool e dev server |
| [NASA Open APIs](https://api.nasa.gov) | — | Fonte de dados |
| CSS Modules (custom) | — | Estilização |
| Google Fonts | — | Orbitron + Space Mono |

---

## 🌌 APIs Consumidas

| API | Endpoint | Dados |
|---|---|---|
| **APOD** | `GET /planetary/apod` | Imagem astronômica do dia |
| **NEO Feed** | `GET /neo/rest/v1/feed` | Asteroides próximos à Terra |

---

## 🗂️ Rotas da Aplicação

| Rota | Página | Tipo |
|---|---|---|
| `/` | Home | Estática |
| `/apod` | Galeria de imagens do dia | Estática |
| `/apod/:date` | Detalhe da imagem por data | **Dinâmica** |
| `/neo` | Asteroides próximos | Estática |

---

## 🏗️ Arquitetura da Aplicação

┌─────────────────────────────────────────────────────────┐
│                    SPACE EXPLORER                        │
│                   (React + Vite)                         │
└───────────────────────┬─────────────────────────────────┘
│
┌───────────▼────────────┐
│      React Router      │
│   (BrowserRouter)      │
└───────────┬────────────┘
│
┌───────────────┼───────────────┐
│               │               │
┌────▼────┐    ┌─────▼─────┐   ┌────▼────┐
│  Pages  │    │Components │   │Services │
│         │    │           │   │         │
│ Home    │    │  Navbar   │   │nasaApi  │
│ APOD    │    │           │   │         │
│ APODDet │    └───────────┘   └────┬────┘
│ NEO     │                         │
└────┬────┘    ┌───────────┐        │
│         │   Hooks   │        │
└────────►│ useFetch  ├────────┘
│           │
└─────┬─────┘
│
┌───────────▼────────────┐
│      NASA Open API     │
│    api.nasa.gov        │
│                        │
│  • /planetary/apod     │
│  • /neo/rest/v1/feed   │
└────────────────────────┘

### Fluxo de dados
Usuário → Página React → useFetch (hook)
→ nasaApi.js (service) → NASA API (fetch)
← JSON response
← setState(data)
← Renderiza UI com os dados

### Estrutura de pastas
space-explorer/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── hooks/
│   │   └── useFetch.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── APODGallery.jsx
│   │   ├── APOD.css
│   │   ├── APODDetail.jsx
│   │   ├── APODDetail.css
│   │   ├── NEO.jsx
│   │   └── NEO.css
│   ├── services/
│   │   └── nasaApi.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
└── README.md

---

## ⚡ Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) versão 18 ou superior

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/edson684/Trabalho-aplica-o-REACT-.git

# 2. Entre na pasta do projeto
cd space-explorer

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador.

### Outros comandos

```bash
# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

---

## 🚀 Deploy

Aplicação hospedada no **Vercel** com deploy automático a cada push no GitHub.

---

## 📋 Funcionalidades

- 🌌 **Galeria APOD** — Grade de imagens astronômicas com link para detalhe
- 🔍 **Detalhe APOD** — Rota dinâmica `/apod/:date` com imagem em HD e descrição
- ☄️ **Monitor de Asteroides** — Tabela de NEOs ordenados por distância, classificação de risco
- 🎨 **Design espacial** — Tema dark imersivo com animações CSS

---

*Dados fornecidos pela [NASA Open API](https://api.nasa.gov) — gratuita para uso educacional.*
