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

  const find = (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM projects WHERE id = $1 LIMIT 1;', [id])
        .then(res => {
          if (res.rows.length === 0) {
            reject('Unable to find project');
            return;
          }

          resolve(res.rows[0]);
        })
        .catch(err => reject(err));
    });
  };

  return { all, find };
};
