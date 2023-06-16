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
VALUES
(
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7
)
RETURNING id;

--$1::INTEGER
--$2::BOOLEAN
--$3::VARCHAR
--$4::VARCHAR
--$5::VARCHAR
--$6::VARCHAR
--$7::VARCHAR
`;