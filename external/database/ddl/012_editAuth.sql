ALTER TABLE auth RENAME TO verify;

ALTER TABLE verify RENAME CONSTRAINT pkey_auth_id TO pkey_verify_id;

ALTER TABLE verify RENAME CONSTRAINT ckey_auth_score TO ckey_verify_score;

ALTER INDEX ind_auth_date RENAME TO ind_verify_date;

ALTER INDEX ind_auth_alive RENAME TO ind_verify_alive;

ALTER INDEX ind_auth_login RENAME TO ind_verify_login;

ALTER INDEX ind_auth_code RENAME TO ind_verify_code;