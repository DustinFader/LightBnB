# LightBnB

To intall and run.
```
git clone git@github.com:DustinFader/LightBnB.git
cd LightBnB_WebApp-master
npm i
npm run local
```
Site will be available at http://localhost:3000

If you need to re/create the database.
```
startpostgres
psql -while in the project folder
CREATE DATABASE lightbnb
\c lightbnb
\i migrations/01_schema.sql
\i seeds/01_seeds.sql
\i seeds/02_seeds.sql
```