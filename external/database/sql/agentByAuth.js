module.exports = `
SELECT
  agn.id,
  ath.id AS ath_id,
  agn.login,
  agn.crypt,
  agn.alias,
  agn.email,
  agn.phone
FROM
  auth ath
INNER JOIN agent agn ON (
  agn.id = ath.agent_id
  AND agn.alive = TRUE
)
WHERE ath.code = $1
AND ath.alive = TRUE;

--$1::VARCHAR
`;