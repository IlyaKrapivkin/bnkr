module.exports = `
SELECT
  id,
  code,
  moment
FROM
  verify
WHERE login = $1
AND alive = TRUE
ORDER BY id DESC
LIMIT 1;

--$1::VARCHAR
`;