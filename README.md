# ML Model Serving Platform

Uma plataforma web para o ciclo completo de vida de modelos de Machine Learning: upload de datasets, treinamento, avaliação de métricas e disponibilização via API REST para inferência.

O projeto vai além do treinamento em notebook — o objetivo é demonstrar como um modelo treinado se transforma em um produto de software real, integrando backend, banco de dados, containerização e deploy em nuvem.

## Status

🚧 Em desenvolvimento ativo.

| Feature | Status |
| --- | --- |
| Setup do projeto (FastAPI + Next.js + Tailwind + Docker) | ✅ |
| Layout inicial (Sidebar, Navbar, páginas vazias) | ✅ |
| Banco de dados + migrations (Alembic) | ✅ |
| Upload de datasets | ✅ |
| Treinamento de modelos (Logistic Regression, Random Forest) | ✅ |
| Avaliação de métricas (Accuracy, Precision, Recall, F1) | ✅ |
| API de predição | ⏳ |
| Deploy na AWS | ⏳ |

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
- **Infraestrutura:** Docker, Docker Compose, AWS

## Funcionalidades principais

- Upload de datasets em CSV, com extração automática de metadados (colunas, número de linhas)
- Treinamento de modelos de classificação (Logistic Regression e Random Forest)
- Avaliação de performance (Accuracy, Precision, Recall, F1-Score)
- Serialização de modelos treinados com Joblib
- API REST para inferência em tempo real *(em desenvolvimento)*
- Histórico de predições persistido em PostgreSQL *(em desenvolvimento)*

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
│       ├── main.py              # monta a aplicação e registra as rotas
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
│       │   └── training_service.py
│       ├── models/               # tabelas do banco (SQLAlchemy)
│       │   ├── dataset.py
│       │   └── model.py
│       ├── schemas/              # formato de entrada/saída da API (Pydantic)
│       │   ├── dataset.py
│       │   └── model.py
│       └── ml/
│           └── train.py          # treino, avaliação e serialização (scikit-learn/joblib)
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── lib/
│   │   └── api.ts                # chamadas HTTP centralizadas ao backend
│   └── app/
│       ├── layout.tsx            # layout raiz (Sidebar + Navbar)
│       ├── page.tsx              # home
│       ├── upload/page.tsx       # upload e listagem de datasets
│       ├── train/page.tsx        # treino de modelos
│       ├── models/page.tsx       # listagem de modelos e métricas
│       └── predict/page.tsx
│   └── components/
│       ├── Sidebar.tsx
│       └── Navbar.tsx
│
├── docker-compose.yml
├── .env.example
└── README.md
```

## Roadmap / Próximos passos

- [x] Dataset Management: upload de CSV, listagem e metadados básicos
- [x] Configuração do Alembic (migrations)
- [x] Training: treino de modelos e persistência via Joblib
- [x] Métricas: Accuracy, Precision, Recall, F1-Score
- [ ] Prediction API: inferência em tempo real
- [ ] Deploy na AWS
- [ ] Autenticação e gerenciamento de usuários
- [ ] Versionamento de modelos
- [ ] Tuning de hiperparâmetros com GridSearchCV
- [ ] Suporte a novos algoritmos de classificação
- [ ] Monitoramento de modelos e experiment tracking
- [ ] Integração com [DataDestro](https://datadestro.com) para pré-processamento automatizado de dados

## Autor

**Artur Destro**
[GitHub](https://github.com/ArturDestro)
