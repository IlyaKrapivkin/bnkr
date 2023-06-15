module.exports = `
INSERT INTO verify
(
  login,
  code
)
VALUES
(
  $1,
  $2
)
RETURNING id;

--$1::VARCHAR
--$2::VARCHAR
`;