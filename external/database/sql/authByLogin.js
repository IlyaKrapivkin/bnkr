module.exports = `
SELECT
  id,
  login,
  code
FROM
  auth
WHERE login = $1
AND alive = TRUE
ORDER BY id DESC
LIMIT 1;

--$1::VARCHAR
`;