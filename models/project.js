module.exports = (db) => {
  const all = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM projects')
        .then(res => {
          resolve(res.rows);
        })
        .catch(err => reject(err));
    });
  };

  return { all };
};
