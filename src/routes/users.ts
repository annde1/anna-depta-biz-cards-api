import { Router } from "express";
import mysql2 from "mysql2";

// //New Router Object

// const connection = mysql2.createConnection({
//   //host, port, username, password, db
//   host: "127.0.0.1",
//   port: 3306,
//   user: "root",
//   password: "1234",
//   database: "sakila",
// });
const userRouter = Router();
// userRouter.get("/", (req, res) => {
//   connection.query("SELECT * FROM customer", (err, result) => {
//     if (err) {
//       res.status(500).json(err);
//     } else {
//       res.json(result);
//     }
//   });
//   res.json({ users: [] });
// });
// userRouter.post("/", (req, res) => {
//   const { firstName, lastName, email } = req.body;
//   const sql = `INSERT INTO customer(
//   store_id, first_name, last_name, email, address_id
// )
// VALUES (1, ${firstName}, ${lastName}, ${email}, 1)`;
//   connection.query(sql, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });
export { userRouter };
