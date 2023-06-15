ALTER TABLE session RENAME TO auth;

ALTER TABLE auth RENAME CONSTRAINT pkey_session_id TO pkey_auth_id;

ALTER TABLE auth RENAME CONSTRAINT fkey_session_agentid TO fkey_auth_agentid;

ALTER TABLE auth RENAME CONSTRAINT ukey_session_code TO ukey_auth_code;

ALTER SEQUENCE seq_session_id RENAME TO seq_auth_id;

ALTER INDEX ind_session_agentid RENAME TO ind_auth_agentid;

ALTER INDEX ind_session_alive RENAME TO ind_auth_alive;

ALTER INDEX ind_session_code RENAME TO ind_auth_code;