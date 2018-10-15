exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "varchar(50)", // this is the Google ID that is on auth
      notNull: true,
      primaryKey: true
    },
    data: { type: "JSON", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  })
  pgm.createIndex("users", "id", { unique: true })
};

exports.down = (pgm) => {

};
