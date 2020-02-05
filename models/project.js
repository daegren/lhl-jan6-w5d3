module.exports = (db) => {
  /**
   * Returns all projects from the DB
   */
  const all = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM projects')
        .then(res => {
          resolve(res.rows);
        })
        .catch(err => reject(err));
    });
  };

  // /**
  //  * Returns all projects from the database
  //  */
  // const all2 = () =>
  //   db.query('SELECT * FROM projects')
  //     .then(res => res.rows);

  /**
   * Find a single project from the database
   * @param {number} id The id of the project to find
   */
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

  /**
   * Create a new project with the given name
   * @param {string} name The name of the project
   */
  const create = (name) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO projects (name) VALUES ($1) RETURNING *;', [name])
        .then(res => {
          resolve(res.rows[0]);
        })
        .catch(err => reject(err));
    });
  };

  /**
   * Updates the given project id with the new name
   * @param {number} id The id of the project
   * @param {*} name The new name of the project
   */
  const update = (id, name) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE projects SET name = $1 WHERE id = $2', [name, id])
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  /**
   * Deletes the given project from the database
   * @param {number} id The id of the project
   */
  const remove = (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM projects WHERE id = $1;', [id])
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return { all, find, create, update, remove };
};
