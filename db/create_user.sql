INSERT INTO fc_users(username, password)
VALUES($1, $2)
RETURNING *;