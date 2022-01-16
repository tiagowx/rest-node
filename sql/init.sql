CREATE  IF NOT EXISTS "uuid-ossp";
CREATE EXTENCION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS app_auth_user(
  uuid uuid DEFAULT uuid_generate_v4(),
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (uuid)
)

INSERT INTO app_auth_user (username, password) values ('tiago', crypt('admin','my_salt'));
