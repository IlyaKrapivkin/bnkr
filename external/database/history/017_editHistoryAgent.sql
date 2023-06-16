ALTER TABLE history_agent RENAME COLUMN date TO moment;

ALTER INDEX ind_historyagent_date RENAME TO ind_historyagent_moment;

ALTER TABLE history_agent RENAME COLUMN password TO crypt;