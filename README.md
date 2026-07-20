# ML Model Serving Platform

Uma plataforma web para o ciclo completo de vida de modelos de Machine Learning: upload de datasets, treinamento, avaliação de métricas e disponibilização via API REST para inferência.

O projeto vai além do treinamento em notebook — o objetivo é demonstrar como um modelo treinado se transforma em um produto de software real, integrando backend, banco de dados, containerização e deploy em nuvem.

## Status

🚧 Em desenvolvimento ativo.

| Feature | Status |
| --- | --- |
| Setup do projeto (FastAPI + Next.js + Docker) | ✅ |
| Upload de datasets | ⏳ |
| Treinamento de modelos | ⏳ |
| Avaliação de métricas | ⏳ |
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

- Upload de datasets em CSV
- Treinamento de modelos de classificação (Logistic Regression e Random Forest)
- Avaliação de performance (Accuracy, Precision, Recall, F1-Score)
- Serialização de modelos treinados com Joblib
- API REST para inferência em tempo real
- Histórico de predições persistido em PostgreSQL

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

4. Acesse:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend (docs): [http://localhost:8000/docs](http://localhost:8000/docs)

## Estrutura do projeto

```
mlplat/
├── backend/        # API FastAPI, serviços e integração com ML
├── frontend/        # Aplicação Next.js
├── docker-compose.yml
└── README.md
```

## Roadmap / Próximos passos

- [ ] Autenticação e gerenciamento de usuários
- [ ] Versionamento de modelos
- [ ] Tuning de hiperparâmetros com GridSearchCV
- [ ] Suporte a novos algoritmos de classificação
- [ ] Monitoramento de modelos e experiment tracking
- [ ] Integração com [DataDestro](#) para pré-processamento automatizado de dados

## Autor

**Artur Destro**
[GitHub](https://github.com/ArturDestro)
