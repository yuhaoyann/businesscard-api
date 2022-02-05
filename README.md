# BusinessCard  API

Install dependencies with `npm install`.

## Creating ROLE

enter psql by type `psql` in terminal;
enter `CREATE ROLE businesscard WITH LOGIN password 'businesscard'`;
## Creating The DB
enter `CREATE DATABASE businesscard OWNER businesscard`;

## Setup

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=businesscard
PGDATABASE=businesscard
PGPASSWORD=businesscard
PGPORT=5432
```

## Seeding

Run a the development server with `npm start` in the Host environment. We are only using vagrant for `psql` this week.

Both of these achieve the same result.

- Make a `GET` request to `/api/debug/reset` with `curl http://localhost:8001/api/debug/reset`.
- Use the browser to navigate to `http://localhost:8001/api/debug/reset`.

## Run The Server

Running the server normally

```sh
npm start
```



## Api

### USERS

`GET /api/users`

Response

```json
[
{
id: 1,
first_name: "Helen",
last_name: "Smith"
},
{
id: 2,
first_name: "Welid",
last_name: "Semir"
},
{
id: 3,
first_name: "Laila",
last_name: "Negash"
}
]
```

### Cards

`GET /api/cards`

Response:

```json
[
{
id: 1,
photo: null,
email: "helen@gmail.com",
phone: "226-555-6789",
facebook: null,
github: "helen-sm",
linkedln: "helusm1",
instagram: "helen-sm",
bio: null
},
{
id: 2,
photo: null,
email: "welid@gmail.com",
phone: "647-544-6892",
facebook: null,
github: "welid-semir",
linkedln: "wildoms",
instagram: "welid-semir",
bio: null
},
]
```

`PUT /api/cards/:id`



`DELETE /api/cars/:id`



