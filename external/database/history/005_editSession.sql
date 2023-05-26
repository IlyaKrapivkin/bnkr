ALTER TABLE session RENAME COLUMN user_id TO agent_id;

ALTER TABLE session DROP CONSTRAINT fkey_session_userid;

ALTER TABLE session ADD CONSTRAINT fkey_session_agentid FOREIGN KEY (agent_id) REFERENCES agent (id);

DROP INDEX IF EXISTS ind_session_userid;

CREATE INDEX IF NOT EXISTS ind_session_agentid ON session USING BTREE (agent_id);

ALTER TABLE session ADD CONSTRAINT ukey_session_code UNIQUE (code);