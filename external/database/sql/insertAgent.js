module.exports = `
INSERT INTO agent
(
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
  $6
)
RETURNING id;

--$1::VARCHAR
--$2::VARCHAR
--$3::VARCHAR
--$4::VARCHAR
--$5::VARCHAR
--$6::VARCHAR
`;