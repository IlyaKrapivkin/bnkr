module.exports = `
UPDATE
  agent
SET
  alive = TRUE,
WHERE id = $1;

--$1::INTEGER
`;