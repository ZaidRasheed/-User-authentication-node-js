import { createPool } from 'mysql2';
import env from "dotenv"
env.config();
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT id,first_name,last_name,email,password FROM users WHERE email= ?", [email], (err, data) => {
            if (err || !data.length) {
                if (err)
                    console.log(err);
                reject(false);
            }
            resolve(data);
        });
    })
}

function getUserById(id) {
    return new Promise((resolve, reject) => {
        let ID = id.toString();
        pool.query("SELECT id,first_name,last_name,email,password FROM users WHERE id= ?", [ID], (err, data) => {
            if (err || !data.length) {
                if (err)
                    console.log(err);
                reject(false);
            }
            resolve(data);
        });
    })
}

function getPosts() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT users.first_name, users.last_name, posts.id, posts.user_id, posts.title, posts.body, posts.publish_date FROM users INNER JOIN posts ON users.id = posts.user_id ORDER BY publish_date;", (err, data) => {
            if (err) {
                if (err)
                    console.log(err);
                reject(false);
            }
            resolve(data);
        });
    })
}
function getPostById(id) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT users.first_name, users.last_name, posts.img_URL, posts.id, posts.user_id, posts.title, posts.body, posts.publish_date FROM users INNER JOIN posts ON users.id = posts.user_id WHERE posts.id=?;", [id], (err, data) => {
            if (err) {
                if (err)
                    console.log(err);
                reject(false);
            }
            resolve(data);
        });
    })
}

function getCommentsByPostId(postId) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT users.first_name, users.last_name,comments.id ,comments.user_id , comments.body,comments.publish_date FROM users INNER JOIN comments ON users.id = comments.user_id INNER JOIN posts on posts.id = comments.post_id WHERE posts.id=? ORDER BY publish_date;", [postId], (err, data) => {
            if (err) {
                if (err)
                    console.log(err);
                reject(false);
            }
            resolve(data);
        });
    })
}

function getCommentsByUserId(userId) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT comments.user_id, comments.id, comments.body, comments.publish_date, comments.post_id, posts.title FROM posts INNER JOIN comments ON posts.id = comments.post_id WHERE comments.user_id=? ORDER BY comments.publish_date;", [userId], (err, data) => {
            if (err) {
                if (err)
                    console.log(err);
                reject(false);
            }
            resolve(data);
        });
    })
}

export default pool;
export { getUserByEmail, getUserById, getPosts, getCommentsByPostId, getPostById, getCommentsByUserId }