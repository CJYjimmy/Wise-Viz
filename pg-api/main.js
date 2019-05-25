const getTableData = (request, response, pool) => {
    let items = [];
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('SELECT * FROM "userInfo"', (err, table) => {
                done();
                items = table.rows;
                response.send(items);
                if (err) {
                    return console.log(err);
                } else {
                    console.log('GET SUCCEFUL');
                }
            })
        }
    })
}

const checkUsernameUnique = (request, response, pool) => {
    let item = [];
    let userName = request.body.userName;
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('SELECT * FROM "userInfo" WHERE "userName"=$1', [userName], (err, table) => {
                done();
                item = table.rows;
                response.send(item);
                if (err) {
                    return console.log(err);
                } else {
                    console.log('GET TARGET USERNAME SUCCEFUL');
                }
            })
        }
    })
}

const postTableData = (request, response, pool) => {
    let userName = request.body.userName;
    let password = request.body.password;
    let values = [userName, password];
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('INSERT INTO "userInfo" ("userName", "password") VALUES ($1, $2)', values, (err, table) => {
                done();
                if (err) {
                    return console.log(err);
                } else {
                    console.log('INSERT SUCCEFUL');
                }
            })
        }
    })
}

const putTableData = (request, response, pool) => {
    let userName = request.body.userName;
    let password = request.body.password;
    let values = [userName, password];
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('UPDATE "userInfo" SET "password"=$2 WHERE "userName"=$1', values, (err, table) => {
                done();
                if (err) {
                    return console.log(err);
                } else {
                    console.log('PUT SUCCEFUL');
                }
            })
        }
    })
}

const deleteTableData = (request, response, pool) => {
    let userName = request.body.userName;
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('DELETE FROM "userInfo" WHERE "userName"=$1', userName, (err, table) => {
                done();
                if (err) {
                    return console.log(err);
                } else {
                    console.log('DELETE SUCCEFUL');
                }
            })
        }
    })
}

module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData,
    checkUsernameUnique
}
