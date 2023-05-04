CREATE TABLE "session" (
  id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  alive BOOLEAN NOT NULL DEFAULT TRUE,
  code VARCHAR(256) NOT NULL,
  CONSTRAINT pkey_session_id PRIMARY KEY,
  CONSTRAINT fkey_session_userid FOREIGN KEY (user_id) REFERENCES "agent" (id)
);

CREATE SEQUENCE IF NOT EXISTS seq_session_id INCREMENT 1 START 1 MINVALUE 1;

CREATE INDEX IF NOT EXISTS ind_session_userid ON "session" USING BTREE (user_id);

CREATE INDEX IF NOT EXISTS ind_session_alive ON "session" USING BTREE (alive);

CREATE INDEX IF NOT EXISTS ind_session_code ON "session" USING BTREE (code);