cp .env.sample .env
psql -U postgres
createdb [DATABASE NAME]
npm install
knex migrate:latest
knex seed:run
