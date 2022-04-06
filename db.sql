CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(30) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  vatNo int,
  deleted BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  company_id integer REFERENCES companies (id) NOT NULL,
  title VARCHAR(30) NOT NULL,
  description VARCHAR,
  deleted BOOLEAN DEFAULT FALSE NOT NULL
);