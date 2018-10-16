# Sheet Metal

Turn your Google Sheets into Restful APIs.

## Getting Started

Set env vars in `.env`

```bash
npm install # install dependencies
mv .env_sample .env # add your own config
npm run migrate up # run migrations (you'll need to create a Database first, and put the settings in .env)

npm run dev # serve with hot reload at localhost:3000
npm start # build for production and launch server
```


## Developers

#### Contributions

Are welcomed.

#### Database helpers

```bash
# Example: create a migration file
npm run migrate create table name

```

## Deploy

#### Run migrations

```bash
mv .env .env.dev && mv .env.prod .env && \
npm run migrate up && \
mv .env .env.prod && mv .env.dev .env
```

#### Building locally and deploy (temp, until CI implemented)

```bash
npm run build # Build locally using .env.prod
npm start # Run using .env.prod
```
