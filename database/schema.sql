CREATE TABLE IF NOT EXISTS agent (
  id BIGINT NOT NULL,
  alive BOOLEAN NOT NULL DEFAULT TRUE,
  login VARCHAR (64) NOT NULL,
  password VARCHAR (1024) NOT NULL,
  alias VARCHAR (64) NOT NULL,
  email VARCHAR (256) NULL,
  phone VARCHAR (32) NULL,
  CONSTRAINT pkey_agent_id PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS history_agent (
  id BIGINT NOT NULL,
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

CREATE TABLE IF NOT EXISTS session (
  id BIGINT NOT NULL,
  alive BOOLEAN NOT NULL DEFAULT TRUE,
  user_id BIGINT NOT NULL,
  code VARCHAR (256) NOT NULL,
  CONSTRAINT pkey_session_id PRIMARY KEY,
  CONSTRAINT fkey_session_userid FOREIGN KEY (user_id) REFERENCES agent (id)
);

CREATE TABLE IF NOT EXISTS history_session (
  id BIGINT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id BIGINT NOT NULL,
  alive BOOLEAN,
  code VARCHAR (256),
  CONSTRAINT pkey_historysession_id PRIMARY KEY (id),
  CONSTRAINT fkey_historysession_sessionid FOREIGN KEY (session_id) REFERENCES session (id)
);



CREATE SEQUENCE IF NOT EXISTS seq_agent_id INCREMENT 1 START 1 MINVALUE 1;

CREATE SEQUENCE IF NOT EXISTS seq_historyagent_id INCREMENT 1 START 1 MINVALUE 1;

CREATE SEQUENCE IF NOT EXISTS seq_session_id INCREMENT 1 START 1 MINVALUE 1;

CREATE SEQUENCE IF NOT EXISTS seq_historysession_id INCREMENT 1 START 1 MINVALUE 1;



CREATE INDEX IF NOT EXISTS ind_agent_alive ON agent USING BTREE (alive);

CREATE INDEX IF NOT EXISTS ind_agent_login ON agent USING BTREE (login);

CREATE INDEX IF NOT EXISTS ind_agent_password ON agent USING BTREE (password);

CREATE INDEX IF NOT EXISTS ind_agent_email ON agent USING BTREE (email);

CREATE INDEX IF NOT EXISTS ind_agent_phone ON agent USING BTREE (phone);

CREATE INDEX IF NOT EXISTS ind_historyagent_date ON history_agent USING BTREE (date);

CREATE INDEX IF NOT EXISTS ind_historyagent_agentid ON history_agent USING BTREE (agent_id);

CREATE INDEX IF NOT EXISTS ind_historyagent_alive ON history_agent USING BTREE (alive);

CREATE INDEX IF NOT EXISTS ind_session_userid ON session USING BTREE (user_id);

CREATE INDEX IF NOT EXISTS ind_session_alive ON session USING BTREE (alive);

CREATE INDEX IF NOT EXISTS ind_session_code ON session USING BTREE (code);

CREATE INDEX IF NOT EXISTS ind_historysession_date ON history_session USING BTREE (date);

CREATE INDEX IF NOT EXISTS ind_historysession_sessionid ON history_session USING BTREE (session_id);

CREATE INDEX IF NOT EXISTS ind_historysession_alive ON history_session USING BTREE (alive);