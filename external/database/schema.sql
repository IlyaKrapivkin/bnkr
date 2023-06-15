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

CREATE INDEX IF NOT EXISTS ind_historyagent_date ON history_agent USING BTREE (date);

CREATE INDEX IF NOT EXISTS ind_historyagent_agentid ON history_agent USING BTREE (agent_id);

CREATE INDEX IF NOT EXISTS ind_historyagent_alive ON history_agent USING BTREE (alive);



CREATE TABLE IF NOT EXISTS session (
  id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  alive BOOLEAN NOT NULL DEFAULT TRUE,
  agent_id BIGINT NOT NULL,
  code VARCHAR (256) NOT NULL,
  CONSTRAINT pkey_session_id PRIMARY KEY,
  CONSTRAINT fkey_session_agentid FOREIGN KEY (agent_id) REFERENCES agent (id),
  CONSTRAINT ukey_session_code UNIQUE (code)
);

CREATE INDEX IF NOT EXISTS ind_session_agentid ON session USING BTREE (agent_id);

CREATE INDEX IF NOT EXISTS ind_session_alive ON session USING BTREE (alive);

CREATE INDEX IF NOT EXISTS ind_session_code ON session USING BTREE (code);



CREATE TABLE IF NOT EXISTS history_session (
  id BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id BIGINT NOT NULL,
  alive BOOLEAN,
  code VARCHAR (256),
  CONSTRAINT pkey_historysession_id PRIMARY KEY (id),
  CONSTRAINT fkey_historysession_sessionid FOREIGN KEY (session_id) REFERENCES session (id)
);

CREATE INDEX IF NOT EXISTS ind_historysession_date ON history_session USING BTREE (date);

CREATE INDEX IF NOT EXISTS ind_historysession_sessionid ON history_session USING BTREE (session_id);

CREATE INDEX IF NOT EXISTS ind_historysession_alive ON history_session USING BTREE (alive);



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

CREATE INDEX IF NOT EXISTS ind_verify_date ON verify USING BTREE (date);

CREATE INDEX IF NOT EXISTS ind_verify_alive ON verify USING BTREE (alive);

CREATE INDEX IF NOT EXISTS ind_verify_login ON verify USING BTREE (login);

CREATE INDEX IF NOT EXISTS ind_verify_code ON verify USING BTREE (code);