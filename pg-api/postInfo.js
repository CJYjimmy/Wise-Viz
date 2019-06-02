const getTableData = (request, response, pool) => {
    let items = [];
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('SELECT * FROM "postInfo" ORDER BY "postTime" DESC', (err, table) => {
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

const checkEmail = (request, response, pool) => {
    let item = [];
    let email = request.body.email;
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('SELECT * FROM "postInfo" WHERE "email"=$1 ', [email], (err, table) => {
                done();
                item = table.rows;
                response.send(item);
                if (err) {
                    return console.log(err);
                } else {
                    console.log('GET TARGET EMAIL SUCCEFUL');
                }
            })
        }
    })
}

const postTableData = (request, response, pool) => {
    let postID = request.body.postID;
    let title = request.body.title;
    let content = request.body.content;
    let postTime = request.body.postTime;
    let email = request.body.email;
    let username = request.body.username;
    let values = [postID, title, content, postTime, email, username];
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('INSERT INTO "postInfo" ("postID", "title", "content", "postTime", "userEmail", "username") VALUES ($1, $2, $3, $4, $5, $6)', values, (err, table) => {
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

const deleteTableData = (request, response, pool) => {
    let email = request.body.email;
    let postTime = request.body.postTime;
    let values = [email, postTime];
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('DELETE FROM "postInfo" WHERE "userEmail"=$1 AND "postTime"=$2', values, (err, table) => {
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

const putTableData = (request, response, pool) => {
    let email = request.body.email;
    let postTime = request.body.postTime;
    let title = request.body.title;
    let content = request.body.content;
    let values = [email, postTime, title, content];
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('UPDATE "postInfo" SET "title"=$3, "content"=$4 WHERE "userEmail"=$1 AND "postTime"=$2', values, (err, table) => {
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

module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData,
    checkEmail,
}

