ALTER TABLE agent RENAME COLUMN password TO crypt;

ALTER INDEX ind_agent_password RENAME TO ind_agent_crypt;