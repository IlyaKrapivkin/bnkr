module.exports = `
UPDATE
  verify
SET
  score = score + 1,
  alive = $1,
WHERE id = $2
AND alive = TRUE;

--$1::INTEGER
--$2::BOOLEAN
`;