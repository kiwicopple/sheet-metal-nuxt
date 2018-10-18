# Sheet Metal

Turn your Google Sheets into Restful APIs.

## Developers

#### Getting started

```bash
### Fork t
git clone https://github.com/kiwicopple/sheet-metal
git remote set-url origin git://new.url.here # set your own origin
git remote add upstream https://github.com/kiwicopple/sheet-metal
git pull upstream master

### Configure
npm install # install dependencies
mv .env_sample .env # add your own config to .env
npm run migrate up # run database migrations (you'll need to create a Database first, and put the settings in .env)

### Run
npm run dev # serve with hot reload at localhost:3000
npm start # build for production and launch server
```

#### Contributions

Are welcomed.

#### Database helpers

```bash
# Example: create a migration file
npm run migrate create table name
```

## Deploy

Create a `.env.prod`

#### Run migrations

```bash
## @TODO: fix - add prod vars
mv .env .env.dev && mv .env.prod .env && \
npm run migrate up && \
mv .env .env.prod && mv .env.dev .env
```

#### Building locally and deploy (temp, until CI implemented)

```bash
npm run build # Build locally using .env.prod
npm start # Run using .env.prod
```
