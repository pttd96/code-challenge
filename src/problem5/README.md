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

## Testing the API

When the server is running, use `curl`, HTTPie, or Postman to call the routes defined in `src/user.routes.ts`.

Examples (replace port if different):

Fetch all users
```bash
curl http://localhost:3000/users
```

Get user by id
```bash
curl -X GET http://localhost:3000/users/1
```

Get user by filter (name or score or both)
```bash
curl -X GET http://localhost:3000/users? \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Johnny",
    "score": 10
  }'
```

Create user
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Johnny",
    "score": 10
  }'
```

Delete user by id
```bash
curl -X DELETE http://localhost:3000/users/1 
```

## Contributing
- Create a feature branch, implement changes, and open a pull request against `main`.
