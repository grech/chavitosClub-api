# Chavitos Club API

TypeScript/Express API that powers contract management, service discovery, and pricing suggestions for the Chavitos Club platform. The service orchestrates domain logic, persistence, and integrations with MySQL to create and confirm event contracts with automated upsell recommendations.

## Features
- Contract creation with validation, customer deduplication, and atomic persistence.
- Dynamic pricing suggestions that bundle services into packages to maximize customer savings.
- Service availability lookup filtered by event date.
- Transactional MySQL access layer with reusable query helpers.
- Layered architecture (Presentation → Application → Domain → Infrastructure) aligned with clean architecture principles.
- Centralized environment configuration with runtime validation.

## Tech Stack
- **Runtime:** Node.js (recommend v20 LTS) + TypeScript
- **Framework:** Express 5
- **Database:** MySQL (via `mysql2/promise`)
- **Tooling:** `ts-node-dev`, `typescript`, `rimraf`
- **Config:** `dotenv`, `env-var`

## Project Architecture
```
src
├── app.ts                    # Application entry point
├── config                    # MySQL pool, transactions, env parsing
├── presentation              # HTTP layer (Express routers/controllers)
│   └── http
│       ├── contractos        # Contract endpoints
│       └── servicios         # Service catalog endpoints
├── application               # Use cases, DTOs, and coordination logic
├── domain                    # Entities, value objects, domain contracts
└── infrastructure            # MySQL repositories, adapters, raw queries
```

**Lifecycle overview**
1. Request hits an Express router in `presentation/http`.
2. Controllers validate input using DTO factories from `application/dtos`.
3. Application services execute use cases and coordinate repositories.
4. Repositories in `infrastructure` run parameterized queries through shared `execQuery` helpers.
5. Domain entities shape data exchanged between layers.

## Getting Started
### Prerequisites
- Node.js v20 LTS (or later) and npm.
- MySQL instance with the expected schema (see `src/infrastructure/querys` for table references).

### Installation
```bash
npm install
```

### Environment
Create a `.env` file at the project root:
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
USER_DB=myuser
PASS_DB=secret
DB=chavitos_club
```

Environment variables are validated at startup by `env-var`; missing or malformed values will stop the process.

### Running Locally
- **Development:** `npm run dev` (uses `ts-node-dev` with auto-reload).
- **Production build:** `npm run build` (outputs `dist/`).
- **Start built app:** `npm start` (builds then runs `dist/app.js`).

No automated tests are defined yet (`npm test` is a placeholder).

## API Surface
| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| `POST` | `/api/contratos/crear` | Creates a draft contract, persists customer/event/services, and optionally emits a pricing suggestion snapshot. |
| `POST` | `/api/contratos/confirmSuggestion` | Applies a previously generated suggestion, replacing individual services with packages and recalculating totals. |
| `GET`  | `/api/servicios/list?eventDate=YYYY-MM-DD` | Returns available services for the provided date. |

All responses are JSON. Validation errors surface with HTTP 400, while domain-specific failures bubble up through `CustomError`.

## Development Notes
- Database calls run inside `withTransaction` when a use case mutates multiple tables to ensure atomicity.
- New repositories should follow the interface-first pattern defined under `src/domain` or `src/infrastructure/repositories`.
- Shared SQL lives in `src/infrastructure/querys`; prefer adding new statements there instead of inline strings.

## Production Considerations
- Configure proper CORS restrictions in `src/presentation/server.ts` before exposing the API publicly.
- Ensure MySQL connection pooling settings in `src/config/db.ts` match the deployment environment.
- Add structured logging and health checks as needed for observability.

