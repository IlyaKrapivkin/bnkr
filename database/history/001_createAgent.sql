CREATE TABLE IF NOT EXISTS "agent" (
  id BIGINT NOT NULL,
  alive BOOLEAN NOT NULL DEFAULT TRUE,
  login VARCHAR (64) NOT NULL,
  password VARCHAR (1024) NOT NULL,
  alias VARCHAR (64) NOT NULL,
  email VARCHAR (256) NULL,
  phone VARCHAR (32) NULL,
  CONSTRAINT pkey_agent_id PRIMARY KEY (id)
);

CREATE SEQUENCE IF NOT EXISTS seq_agent_id INCREMENT 1 START 1 MINVALUE 1;

CREATE INDEX IF NOT EXISTS ind_agent_alive ON "agent" USING BTREE (alive);

CREATE INDEX IF NOT EXISTS ind_agent_login ON "agent" USING BTREE (login);

CREATE INDEX IF NOT EXISTS ind_agent_password ON "agent" USING BTREE (password);

CREATE INDEX IF NOT EXISTS ind_agent_email ON "agent" USING BTREE (email);

CREATE INDEX IF NOT EXISTS ind_agent_phone ON "agent" USING BTREE (phone);