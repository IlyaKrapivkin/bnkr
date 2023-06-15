module.exports = `
UPDATE
  verify
SET
  alive = FALSE,
  score = score + 1,
  alive = $2
WHERE id = $1
AND alive = TRUE;

--$1::INTEGER
--$2::BOOLEAN
`;