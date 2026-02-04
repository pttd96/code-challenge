# a-crude-server

Requirement: Develop a backend server with ExpressJS. You are required to build a set of CRUD interface that allow a user to interact with the service. You are required to use TypeScript for this task.

1. Interface functionalities:
    1. Create a resource.
    2. List resources with basic filters.
    3. Get details of a resource.
    4. Update resource details.
    5. Delete a resource.
2. You should connect your backend service with a simple database for data persistence.
3. Provide [`README.md`](http://README.md) for the configuration and the way to run application.

## Repository structure
- `src/server.ts` — application entry point
- `src/user.routes.ts` — API route definitions
- `src/user.model.ts` — user data model
- `src/db.ts` — database helper

## Requirements
- Node (v16+ recommended)
- npm 

## Installation

Install dependencies:

```bash
npm install
```

## Running (development)

```bash
npm run dev
```

## Configuration

- The server may accept a `PORT` environment variable. Check `src/server.ts` for defaults.

## Authentication (JWT)

- **Required header**: the middleware expects an `Authorization` header with the format `Bearer <token>`.
- **Error responses**: if the header is missing or malformed the server returns `401` with `{ "error": "Missing or malformed Authorization header" }`; if the token is invalid the server returns `401` with `{ "error": "Invalid token" }`.
- **On success**: the decoded JWT payload is attached to `req.user` for downstream handlers.
- **Secret**: the middleware currently uses a hardcoded secret `"johnny"` in `src/middleware/jwt.middleware.ts`. For production, set `JWT_SECRET` via environment variables.
- **Example** (calling a protected create user route):
```bash
curl -X POST http://localhost:3000/users \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"John","score":5}'
```

## Testing the API

When the server is running, use `curl`, HTTPie, or Postman to call the routes defined in `controller/user.controller.ts`.

Examples (replace port if different):

First of all, login to get jwt token. The token is currently hardcoded.
```bash
curl -X GET http://localhost:3000/login
```
Response:
`{"jwtToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY5LCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzcwMTc0OTM0fQ.rjyrqs47vsphRvy0XF-nyzBCuxU9n6TIF-9uEjNBtMU"}`

Add the token into header for subsequence API calls.

Fetch all users
```bash
curl -X GET http://localhost:3000/users \
-H "Authorization: Bearer <jwtToken>"
```

Get by filter
Query params: name (name of user), score (score of user), and limit (number of records to return)
```bash
curl -X GET http://localhost:3000/users?name=Johnny \
  -H "Authorization: Bearer <jwtToken>" 
```

Get user by id
```bash
curl -X GET http://localhost:3000/users/{id} \
-H "Authorization: Bearer <jwtToken>"
```

Create user
```bash
curl -X POST  http://localhost:3000/users \
 -H "Authorization: Bearer <jwtToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Johnny",
    "score": 10
  }'
```

Update user by id
```bash
curl -X PUT  http://localhost:3000/users/{id} \
 -H "Authorization: Bearer <jwtToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Johnny",
    "score": 8
  }'
```

Delete user by id
```bash
curl -X DELETE http://localhost:3000/users/1 \
 -H "Authorization: Bearer <jwtToken>"
```

## Contributing
- Create a feature branch, implement changes, and open a pull request against `main`.
