module.exports = `
UPDATE
  agent agn
SET
crypt = (
  CASE WHEN $1::VARCHAR IS NULL
  THEN agn.crypt
  ELSE $1::VARCHAR END
),
alias = (
  CASE WHEN $2::VARCHAR IS NULL
  THEN agn.alias
  ELSE $2::VARCHAR END
),
email = (
  CASE WHEN $3::VARCHAR IS NULL
  THEN agn.email
  ELSE $3::VARCHAR END
),
phone = (
  CASE WHEN $4::VARCHAR IS NULL
  THEN agn.phone
  ELSE $4::VARCHAR END
)
WHERE id = $5;

--$1::VARCHAR
--$2::VARCHAR
--$3::VARCHAR
--$4::VARCHAR
--$5::BIGINT
`;