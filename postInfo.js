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

const getClickUserPosts = (request, response, pool) => {
    let items = [];
    let username = request.body.username;
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('SELECT * FROM "postInfo" WHERE "username"=$1 ORDER BY "postTime" DESC', [username], (err, table) => {
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
    let url = request.body.url;
    let values = [postID, title, content, postTime, email, username, url];
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('INSERT INTO "postInfo" ("postID", "title", "content", "postTime", "userEmail", "username", "url") VALUES ($1, $2, $3, $4, $5, $6, $7)', values, (err, table) => {
                done();
                response.send({values : values});
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
    let postID = request.body.postID;
    let comment = request.body.comment;
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            if (comment) {
                db.query('DROP TABLE "' + postID + '"', (err, table) => {
                    if (err) {
                        return console.log(err);
                    } else {
                        console.log('DROP SUCCEFUL');
                    }
                });
            }
            db.query('DELETE FROM "postInfo" WHERE "postID"=$1', [postID], (err, table) => {
                db.release();
                if (err) {
                    return console.log(err);
                } else {
                    console.log('DELETE SUCCEFUL');
                }
            });
            response.send({delete:'SUCCEFUL'});
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
    getClickUserPosts,
}

