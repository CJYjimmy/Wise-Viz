const createTable = (request, response, pool) => {
    let id = request.body.id;
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('UPDATE "postInfo" SET "comment"=$2 WHERE "postID"=$1', [id, true], (err, table) => {
                if (err) {
                    return console.log(err);
                } else {
                    console.log('GET SUCCEFUL');
                }
            })
            db.query('CREATE TABLE "' + id + '" ( "commentID" varchar NOT NULL, "time" varchar NOT NULL , "user" varchar NOT NULL, "content" varchar NOT NULL, PRIMARY KEY ("commentID"), FOREIGN KEY ("user") REFERENCES "userInfo" ("userName") ON UPDATE CASCADE )', (err, table) => {
                db.release();
                if (err) {
                    return console.log(err);
                } else {
                    console.log('CREATE TABLE SUCCEFUL');
                }
            })
            response.send({ table: id});
        }
    })
}

const getTableData = (request, response, pool) => {
    let items = [];
    let id = request.body.id;
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('SELECT * FROM "' + id + '" ORDER BY "time" DESC', (err, table) => {
                done();
                items = table.rows;
                response.send(items);
                if (err) {
                    return console.log(err);
                } else {
                    console.log('GET COMMENT DATA SUCCEFUL');
                }
            })
        }
    })
}

const postTableData = (request, response, pool) => {
    let id = request.body.id;
    let commentID = request.body.commentID;
    let time = request.body.time;
    let content = request.body.content;
    let user = request.body.user;
    let value = [commentID, time, user, content]
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query('INSERT INTO "' + id + '" ("commentID", "time", "user", "content") VALUES ($1, $2, $3, $4)', value, (err, table) => {
                done();
                response.send({ item:commentID });
                if (err) {
                    return console.log(err);
                } else {
                    console.log('POST COMMENT SUCCEFUL');
                }
            })
        }
    })
}

module.exports = {
    createTable,
    getTableData,
    postTableData
}