module.exports = (db) => {
  /**
   * Finds all tasks for the given project
   * @param {number} projectId project id to use for tasks
   */
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
