module.exports = `
SELECT
  agn.id,
  ssn.id AS ssn_id,
  agn.login,
  agn.password,
  agn.alias,
  agn.email,
  agn.phone
FROM
  session ssn
INNER JOIN agent agn ON (
  agn.id = ssn.agent_id
  AND agn.alive = TRUE
)
WHERE ssn.code = $1
AND ssn.alive = TRUE;

--$1::VARCHAR
`;