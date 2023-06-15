DROP SEQUENCE IF EXISTS seq_agent_id;
DROP SEQUENCE IF EXISTS seq_verify_id;
DROP SEQUENCE IF EXISTS seq_session_id;
DROP SEQUENCE IF EXISTS seq_historyagent_id;
DROP SEQUENCE IF EXISTS seq_historysession_id;

ALTER SEQUENCE agent_id_seq RENAME TO seq_agent_id;
ALTER SEQUENCE auth_id_seq RENAME TO seq_verify_id;
ALTER SEQUENCE session_id_seq RENAME TO seq_session_id;
ALTER SEQUENCE history_agent_id_seq RENAME TO seq_historyagent_id;
ALTER SEQUENCE history_session_id_seq RENAME TO seq_historysession_id;