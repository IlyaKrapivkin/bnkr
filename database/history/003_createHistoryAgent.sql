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

CREATE SEQUENCE IF NOT EXISTS seq_historyagent_id INCREMENT 1 START 1 MINVALUE 1;

CREATE INDEX IF NOT EXISTS ind_historyagent_date ON history_agent USING BTREE (date);

CREATE INDEX IF NOT EXISTS ind_historyagent_agentid ON history_agent USING BTREE (agent_id);

CREATE INDEX IF NOT EXISTS ind_historyagent_alive ON history_agent USING BTREE (alive);