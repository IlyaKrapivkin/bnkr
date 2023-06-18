module.exports = `
SELECT
  id,
  alive,
  crypt,
  alias,
  email,
  phone
FROM
  agent
WHERE login = $1
ORDER BY id DESC;

--$1::VARCHAR
`;