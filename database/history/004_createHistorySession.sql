CREATE TABLE IF NOT EXISTS history_session (
  id BIGINT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id BIGINT NOT NULL,
  alive BOOLEAN,
  code VARCHAR (256),
  CONSTRAINT pkey_historysession_id PRIMARY KEY (id),
  CONSTRAINT fkey_historysession_sessionid FOREIGN KEY (session_id) REFERENCES session (id)
);

CREATE SEQUENCE IF NOT EXISTS seq_historysession_id INCREMENT 1 START 1 MINVALUE 1;

CREATE INDEX IF NOT EXISTS ind_historysession_date ON history_session USING BTREE (date);

CREATE INDEX IF NOT EXISTS ind_historysession_sessionid ON history_session USING BTREE (session_id);

CREATE INDEX IF NOT EXISTS ind_historysession_alive ON history_session USING BTREE (alive);