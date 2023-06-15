CREATE TABLE IF NOT EXISTS agent (
  id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  alive BOOLEAN NOT NULL DEFAULT TRUE,
  login VARCHAR (64) NOT NULL,
  password VARCHAR (1024) NOT NULL,
  alias VARCHAR (64) NOT NULL,
  email VARCHAR (256) NULL,
  phone VARCHAR (32) NULL,
  CONSTRAINT pkey_agent_id PRIMARY KEY
);

CREATE SEQUENCE IF NOT EXISTS seq_agent_id INCREMENT 1 START 1 MINVALUE 1;

CREATE INDEX IF NOT EXISTS ind_agent_alive ON agent USING BTREE (alive);

CREATE INDEX IF NOT EXISTS ind_agent_login ON agent USING BTREE (login);

CREATE INDEX IF NOT EXISTS ind_agent_password ON agent USING BTREE (password);

CREATE INDEX IF NOT EXISTS ind_agent_email ON agent USING BTREE (email);

CREATE INDEX IF NOT EXISTS ind_agent_phone ON agent USING BTREE (phone);



CREATE TABLE IF NOT EXISTS history_agent (
  id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  agent_id BIGINT NOT NULL,
  alive BOOLEAN,
  login VARCHAR (64),
  password VARCHAR (1024),
  alias VARCHAR (64),
  email VARCHAR (256),
  phone VARCHAR (32),
  CONSTRAINT pkey_historyagent_id PRIMARY KEY (id),
  CONSTRAINT fkey_historyagent_agentid FOREIGN KEY (agent_id) REFERENCES agent (id)
);

CREATE SEQUENCE IF NOT EXISTS seq_historyagent_id INCREMENT 1 START 1 MINVALUE 1;

CREATE INDEX IF NOT EXISTS ind_historyagent_date ON history_agent USING BTREE (date);

CREATE INDEX IF NOT EXISTS ind_historyagent_agentid ON history_agent USING BTREE (agent_id);

CREATE INDEX IF NOT EXISTS ind_historyagent_alive ON history_agent USING BTREE (alive);



CREATE TABLE IF NOT EXISTS auth (
  id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  alive BOOLEAN NOT NULL DEFAULT TRUE,
  agent_id BIGINT NOT NULL,
  code VARCHAR (256) NOT NULL,
  CONSTRAINT pkey_auth_id PRIMARY KEY,
  CONSTRAINT fkey_auth_agentid FOREIGN KEY (agent_id) REFERENCES agent (id),
  CONSTRAINT ukey_auth_code UNIQUE (code)
);

CREATE SEQUENCE IF NOT EXISTS seq_auth_id INCREMENT 1 START 1 MINVALUE 1;

CREATE INDEX IF NOT EXISTS ind_auth_agentid ON auth USING BTREE (agent_id);

CREATE INDEX IF NOT EXISTS ind_auth_alive ON auth USING BTREE (alive);

CREATE INDEX IF NOT EXISTS ind_auth_code ON auth USING BTREE (code);



CREATE TABLE IF NOT EXISTS history_auth (
  id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  moment TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  auth_id BIGINT NOT NULL,
  alive BOOLEAN,
  code VARCHAR (256),
  CONSTRAINT pkey_historyauth_id PRIMARY KEY (id),
  CONSTRAINT fkey_historyauth_authid FOREIGN KEY (auth_id) REFERENCES auth (id)
);

CREATE SEQUENCE IF NOT EXISTS seq_historyauth_id INCREMENT 1 START 1 MINVALUE 1;

CREATE INDEX IF NOT EXISTS ind_historyauth_moment ON history_auth USING BTREE (moment);

CREATE INDEX IF NOT EXISTS ind_historyauth_authid ON history_auth USING BTREE (auth_id);

CREATE INDEX IF NOT EXISTS ind_historyauth_alive ON history_auth USING BTREE (alive);



CREATE TABLE IF NOT EXISTS verify (
  id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  alive BOOLEAN NOT NULL DEFAULT TRUE,
  score INTEGER NOT NULL DEFAULT 0,
  login VARCHAR (64) NOT NULL,
  code VARCHAR (32) NOT NULL,
  CONSTRAINT pkey_verify_id PRIMARY KEY (id),
  CONSTRAINT ckey_verify_score CHECK (score >= 0)
);

CREATE SEQUENCE IF NOT EXISTS seq_verify_id INCREMENT 1 START 1 MINVALUE 1;

CREATE INDEX IF NOT EXISTS ind_verify_date ON verify USING BTREE (date);

CREATE INDEX IF NOT EXISTS ind_verify_alive ON verify USING BTREE (alive);

CREATE INDEX IF NOT EXISTS ind_verify_login ON verify USING BTREE (login);

CREATE INDEX IF NOT EXISTS ind_verify_code ON verify USING BTREE (code);