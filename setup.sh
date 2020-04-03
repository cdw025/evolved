cp .env.sample .env
psql -U postgres
createdb [DATABASE NAME]
npm install
npx knex migrate:latest
npx knex seed:run
