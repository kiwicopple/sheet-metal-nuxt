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

```bash
# Building locally
mv .env .env.dev && mv .env.prod .env
npm run build && mv .env .env.prod && mv .env.dev .env


```