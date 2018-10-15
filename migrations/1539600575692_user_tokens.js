exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createView("user_tokens", 
    {
      columns: ["user_id", "user_data", "token_id", "token_key"]
    },
    `
      SELECT users.id, users.data, tokens.id, tokens.key 
      FROM users 
        JOIN tokens ON tokens.user_id = users.id
    `
  )
};

exports.down = (pgm) => {

};
