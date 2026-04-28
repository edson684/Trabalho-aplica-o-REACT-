# 🚀 Space Explorer

> Aplicação React que consome APIs da NASA para explorar o universo — imagens astronômicas, fotos de Marte e asteroides próximos à Terra.

🌐 **[Acesse a aplicação online](https://space-explorer-nasa.vercel.app)** ← *(deploy no Vercel após subir no GitHub)*

---

## 📸 Prints da Aplicação

### Página Home
![Home](./docs/screenshots/home.png)

### Galeria APOD
![APOD Gallery](./docs/screenshots/apod-gallery.png)

### Detalhe APOD (Rota Dinâmica `/apod/:date`)
![APOD Detail](./docs/screenshots/apod-detail.png)

### Superfície de Marte
![Mars](./docs/screenshots/mars.png)

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
| **Mars Rover Photos** | `GET /mars-photos/api/v1/rovers/:rover/photos` | Fotos da superfície marciana |
| **NEO Feed** | `GET /neo/rest/v1/feed` | Asteroides próximos à Terra |

> **Chave gratuita:** obtenha a sua em [api.nasa.gov](https://api.nasa.gov) e substitua `DEMO_KEY` em `src/services/nasaApi.js`

---

## 🗂️ Rotas da Aplicação

| Rota | Página | Tipo |
|---|---|---|
| `/` | Home | Estática |
| `/apod` | Galeria de imagens do dia | Estática |
| `/apod/:date` | Detalhe da imagem por data | **Dinâmica** |
| `/mars` | Fotos dos rovers em Marte | Estática |
| `/neo` | Asteroides próximos | Estática |

---

## 🏗️ Arquitetura da Aplicação

```
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
   │ Mars    │                         │
   │ NEO     │    ┌───────────┐        │
   └────┬────┘    │   Hooks   │        │
        │         │           │        │
        └────────►│ useFetch  ├────────┘
                  │           │
                  └─────┬─────┘
                        │
            ┌───────────▼────────────┐
            │      NASA Open API     │
            │    api.nasa.gov        │
            │                        │
            │  • /planetary/apod     │
            │  • /mars-photos/...    │
            │  • /neo/rest/v1/feed   │
            └────────────────────────┘
```

### Fluxo de dados

```
Usuário → Página React → useFetch (hook)
             → nasaApi.js (service) → NASA API (fetch)
                                    ← JSON response
             ← setState(data)
          ← Renderiza UI com os dados
```

### Estrutura de pastas

```
space-explorer/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navegação global
│   │   └── Navbar.css
│   ├── hooks/
│   │   └── useFetch.js        # Hook genérico de fetch
│   ├── pages/
│   │   ├── Home.jsx           # Landing page
│   │   ├── Home.css
│   │   ├── APODGallery.jsx    # Galeria de imagens
│   │   ├── APOD.css
│   │   ├── APODDetail.jsx     # Detalhe por data (rota dinâmica)
│   │   ├── APODDetail.css
│   │   ├── Mars.jsx           # Fotos de Marte
│   │   ├── Mars.css
│   │   ├── NEO.jsx            # Asteroides
│   │   └── NEO.css
│   ├── services/
│   │   └── nasaApi.js         # Abstração das chamadas à API
│   ├── App.jsx                # Roteamento principal
│   ├── main.jsx               # Entry point
│   └── index.css              # Estilos globais + design tokens
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## ⚡ Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) versão 18 ou superior
- npm (vem junto com o Node)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/space-explorer.git

# 2. Entre na pasta do projeto
cd space-explorer

# 3. Instale as dependências
npm install

# 4. (Opcional) Configure sua chave da NASA
# Edite src/services/nasaApi.js e troque DEMO_KEY pela sua chave
# Obtenha grátis em: https://api.nasa.gov

# 5. Inicie o servidor de desenvolvimento
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

A aplicação está hospedada no **Vercel**. Para fazer seu próprio deploy:

```bash
# Instale a CLI do Vercel
npm i -g vercel

# Faça o deploy
vercel
```

Ou conecte seu repositório GitHub diretamente no [vercel.com](https://vercel.com) para deploy automático.

---

## 📋 Funcionalidades

- 🌌 **Galeria APOD** — Grade de imagens astronômicas com link para detalhe
- 🔍 **Detalhe APOD** — Rota dinâmica `/apod/:date` com imagem em HD e descrição
- 🔴 **Explorador de Marte** — Filtro por rover e câmera, modal de visualização
- ☄️ **Monitor de Asteroides** — Tabela de NEOs ordenados por distância, classificação de risco
- 🎨 **Design espacial** — Tema dark imersivo com animações CSS

---

## 👨‍💻 Autor

Feito com ❤️ para a disciplina de Desenvolvimento Web.

---

*Dados fornecidos pela [NASA Open API](https://api.nasa.gov) — gratuita para uso educacional.*
