TIL

---

# Getting Started

Install (and start) the following required services:

- Redis
- Mongodb

Copy `development.example.yaml` to `config/development.yaml` and edit the settings to match your machine.

```
npm i
npm start
```

# Tests

```
# unit and integration tests. Server, and all required services, must be running
npm t

# client side unit tests
npm run test:client

# server side unit tests
npm run test:server

# integration tests
npm run test:integration
```
