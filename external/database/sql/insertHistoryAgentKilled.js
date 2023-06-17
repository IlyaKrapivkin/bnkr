module.exports = `
INSERT INTO history_agent
(
  agent_id,
  alive,
  login,
  crypt,
  alias,
  email,
  phone
)
SELECT
  *,
  FALSE,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
FROM UNNEST ($1::BIGINT[]);

--$1::BIGINT[]
`;