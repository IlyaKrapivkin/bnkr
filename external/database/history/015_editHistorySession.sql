ALTER TABLE history_session RENAME TO history_auth;

ALTER TABLE history_auth RENAME COLUMN session_id TO auth_id;

ALTER TABLE history_auth RENAME COLUMN date TO moment;

ALTER TABLE history_auth RENAME CONSTRAINT pkey_historysession_id TO pkey_historyauth_id;

ALTER TABLE history_auth RENAME CONSTRAINT fkey_historysession_sessionid TO fkey_historyauth_authid;

ALTER SEQUENCE seq_historysession_id RENAME TO seq_historyauth_id;

ALTER INDEX ind_historysession_date RENAME TO ind_historyauth_moment;

ALTER INDEX ind_historysession_sessionid RENAME TO ind_historyauth_authid;

ALTER INDEX ind_historysession_alive RENAME TO ind_historyauth_alive;