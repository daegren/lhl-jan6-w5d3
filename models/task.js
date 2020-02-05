module.exports = (db) => {
  const forProjectId = (projectId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks WHERE project_id = $1;', [projectId])
        .then(res => {
          resolve(res.rows);
        })
        .catch(err => reject(err));
    });
  };

  return { forProjectId };
};
