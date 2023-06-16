ALTER TABLE verify RENAME COLUMN date TO moment;

ALTER INDEX ind_verify_date RENAME TO ind_verify_moment;