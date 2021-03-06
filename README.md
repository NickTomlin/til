TIL
---

Learn things with your friends.

Note: This application is in an extremely rough state; things probably won't work out for you, sorry :|. See the TODO section for missing/broken features. Good luck.

# Getting Started

To authenticate your application with github you'll need create an [application](https://developer.github.com/guides/basics-of-authentication/#registering-your-app) and add the `client_id` and `client_secret` to `config/development.yaml` (and `production.yaml`) if you intend to deploy.

```
github-id: your-client-id
github-secret: your-client-secret
```

## Using a local machine

Install (and start) the following required services:

- Redis
- Mongodb

Copy `development.example.yaml` to `config/development.yaml` and edit the settings to match your machine.

```
npm i
npm start
```

## Using Docker (experimental)

- OSX users: [OSX installation instructions](http://docs.docker.com/installation/mac/)
- install [docker-compose](https://docs.docker.com/compose/install/) (this will have you install docker if it is not already on your system)

```
docker-compose up
```

You can run commands (e.g. gulp/tests) on the `web` instance with `docker-compose run web`:

```
docker-compose run web npm test
```

Current issues:
- logs do not properly forward to the `/log` directory
- unit tests are broken if you've installed karma phantomjs locally (you'll need to wipe out `node_modules` and allow docker-compose to install the files for you using the docker container's arch)

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


# TODO

- Support more authentication methods (not just Github)
- Better pagination on client/server
- API versioning
- Rework UI
- Add tags (e.g. `#vim`) to TILs
