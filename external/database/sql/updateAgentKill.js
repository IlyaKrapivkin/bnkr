module.exports = `
UPDATE
  agent
SET
  alive = FALSE
WHERE id = ANY ($1::BIGINT[]);

--$1::BIGINT[]
`;