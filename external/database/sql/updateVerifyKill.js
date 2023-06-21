module.exports = `
UPDATE
  verify
SET
  alive = FALSE
WHERE login = $1
AND alive = TRUE;

--$1::VARCHAR
`;