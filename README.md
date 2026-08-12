# ML Model Serving Platform

Uma plataforma web para o ciclo completo de vida de modelos de Machine Learning: upload de datasets, treinamento, avaliação de métricas e disponibilização via API REST para inferência.

O projeto vai além do treinamento em notebook — o objetivo é demonstrar como um modelo treinado se transforma em um produto de software real, integrando backend, banco de dados, containerização e deploy em nuvem.

## Demo

🔗 **Aplicação no ar:** [http://18.222.139.172:3000](http://18.222.139.172:3000)
📄 **Documentação da API (Swagger):** [http://18.222.139.172:8000/docs](http://18.222.139.172:8000/docs)

> A aplicação está hospedada em uma instância EC2 (AWS) e pode não estar disponível permanentemente. Veja a seção [Como rodar localmente](#como-rodar-localmente) para executar o projeto por conta própria.

## Status

✅ Projeto completo — todas as fases do ciclo de vida de ML implementadas e em produção.

| Feature | Status |
| --- | --- |
| Setup do projeto (FastAPI + Next.js + Tailwind + Docker) | ✅ |
| Layout inicial (Sidebar, Navbar, páginas vazias) | ✅ |
| Banco de dados + migrations (Alembic) | ✅ |
| Upload de datasets | ✅ |
| Treinamento de modelos (Logistic Regression, Random Forest) | ✅ |
| Avaliação de métricas (Accuracy, Precision, Recall, F1) | ✅ |
| API de predição (com histórico e probabilidade) | ✅ |
| Deploy na AWS (EC2 + Docker Compose) | ✅ |

## Arquitetura

```
                Frontend (Next.js)
                        │
                        ▼
                 FastAPI Backend
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
 Dataset Service   Training Service   Prediction Service
        │               │                │
        ▼               ▼                ▼
     PostgreSQL     Scikit-Learn      Joblib Models
                        │
                        ▼
                   Docker + AWS
```

## Tech Stack

- **Backend:** FastAPI, SQLAlchemy, Alembic
- **Machine Learning:** Scikit-Learn, Pandas, Joblib
- **Frontend:** Next.js, Tailwind CSS
- **Banco de dados:** PostgreSQL
- **Infraestrutura:** Docker, Docker Compose, AWS EC2

## Funcionalidades principais

- Upload de datasets em CSV, com extração automática de metadados (colunas, número de linhas)
- Treinamento de modelos de classificação (Logistic Regression e Random Forest)
- Avaliação de performance (Accuracy, Precision, Recall, F1-Score)
- Serialização de modelos treinados com Joblib
- API REST para inferência em tempo real, com probabilidade/confiança do resultado
- Histórico de predições persistido em PostgreSQL
- Deploy completo em nuvem (AWS EC2), com build de produção otimizado

## Como rodar localmente

### Pré-requisitos

- Docker e Docker Compose instalados

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/ArturDestro/ML_plataform.git
   cd ML_plataform
   ```

2. Copie o arquivo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

3. Suba os containers:
   ```bash
   docker compose up --build
   ```

   > Em desenvolvimento local, um arquivo `docker-compose.override.yml` (não versionado) habilita hot-reload no frontend e aponta a API para `localhost`. Sem esse arquivo, o projeto sobe usando a configuração de produção (build otimizado do Next.js).

4. Aplique as migrations do banco (primeira vez apenas):
   ```bash
   docker compose exec backend alembic upgrade head
   ```

5. Acesse:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend (Swagger docs): [http://localhost:8000/docs](http://localhost:8000/docs)
   - Health check: [http://localhost:8000/health](http://localhost:8000/health)

## Estrutura do projeto

```
mlplat/
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── alembic.ini
│   └── app/
│       ├── main.py              # monta a aplicação, CORS e registra as rotas
│       ├── alembic/              # migrations do banco de dados
│       ├── core/
│       │   ├── config.py        # variáveis de ambiente (Pydantic Settings)
│       │   └── database.py      # engine, sessão e conexão SQLAlchemy
│       ├── api/
│       │   └── routes/
│       │       ├── datasets.py
│       │       ├── training.py
│       │       └── predictions.py
│       ├── services/             # lógica de negócio
│       │   ├── dataset_service.py
│       │   ├── training_service.py
│       │   └── prediction_service.py
│       ├── models/               # tabelas do banco (SQLAlchemy)
│       │   ├── dataset.py
│       │   ├── model.py
│       │   └── prediction.py
│       ├── schemas/              # formato de entrada/saída da API (Pydantic)
│       │   ├── dataset.py
│       │   ├── model.py
│       │   └── prediction.py
│       └── ml/
│           ├── train.py          # treino, avaliação e serialização (scikit-learn/joblib)
│           └── predict.py        # carrega modelo salvo e executa inferência
│
├── frontend/
│   ├── Dockerfile                # build de produção (next build + next start)
│   ├── package.json
│   ├── lib/
│   │   └── api.ts                # chamadas HTTP centralizadas ao backend
│   └── app/
│       ├── layout.tsx            # layout raiz (Sidebar + Navbar)
│       ├── page.tsx              # home
│       ├── upload/page.tsx       # upload e listagem de datasets
│       ├── train/page.tsx        # treino de modelos
│       ├── models/page.tsx       # listagem de modelos e métricas
│       └── predict/page.tsx      # formulário dinâmico de predição
│   └── components/
│       ├── Sidebar.tsx
│       └── Navbar.tsx
│
├── docker-compose.yml            # configuração base (usada em produção)
├── docker-compose.override.yml   # sobrescreve para dev local (não versionado)
├── .env.example
└── README.md
```

## Deploy

A aplicação está hospedada em uma instância **EC2 (t3.small)** na AWS, rodando os três serviços (frontend, backend, banco de dados) via Docker Compose. Pontos importantes da configuração de produção:

- O frontend roda com build otimizado do Next.js (`next build` + `next start`), não em modo desenvolvimento.
- A variável `NEXT_PUBLIC_API_URL` é injetada como *build argument* do Docker, já que variáveis `NEXT_PUBLIC_*` do Next.js precisam existir no momento do build, não apenas em runtime.
- CORS configurado no backend para aceitar requisições da origem pública do frontend.
- Banco de dados PostgreSQL e modelos treinados (`.joblib`) persistidos em volumes Docker nomeados.

## Roadmap / Próximos passos

- [x] Dataset Management: upload de CSV, listagem e metadados básicos
- [x] Configuração do Alembic (migrations)
- [x] Training: treino de modelos e persistência via Joblib
- [x] Métricas: Accuracy, Precision, Recall, F1-Score
- [x] Prediction API: inferência em tempo real, com histórico e probabilidade
- [x] Deploy na AWS (EC2 + Docker Compose)
- [ ] Autenticação e gerenciamento de usuários
- [ ] Versionamento de modelos
- [ ] Tuning de hiperparâmetros com GridSearchCV
- [ ] Suporte a novos algoritmos de classificação
- [ ] Monitoramento de modelos e experiment tracking
- [ ] Integração com [DataDestro](https://datadestro.com) para pré-processamento automatizado de dados

## Autor

**Artur Destro**
[GitHub](https://github.com/ArturDestro)
