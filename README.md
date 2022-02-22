# iCard API

Backend API server for iCard APP, go to [iCard](https://adoring-volhard-7e0798.netlify.app/) and enjoy the APP

# Local Setup

## Creating ROLE

- enter psql by type `psql` in terminal;
- enter `CREATE ROLE businesscard WITH LOGIN password 'businesscard'`;

## Creating The DB

- enter `CREATE DATABASE businesscard OWNER businesscard`;

## Setup

- Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=businesscard
PGDATABASE=businesscard
PGPASSWORD=businesscard
PGPORT=5432
JWT_SECRET=[enter your JSON Web Token key]
```

## Seeding

Run the development server with `npm start` in the Host environment.

Both of these achieve the same result.

- Make a `GET` request to `/api/debug/reset` with `curl http://localhost:8001/api/debug/reset`.
- Use the browser to navigate to `http://localhost:8001/api/debug/reset`.

## Run The Server

Running the server normally

```sh
npm start
```
