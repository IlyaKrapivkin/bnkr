module.exports = `
SELECT
  id
FROM
  agent
WHERE login = $1
AND alive = TRUE;

--$1::VARCHAR
`;