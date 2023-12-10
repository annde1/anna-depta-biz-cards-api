import { Router } from "express";
// import connection from "../database/connect";

const router = Router();
// const con = connection("lec4");

// router.get("/", (req, res) => {
//   con.query("SELECT * FROM people", (err, result) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     res.json(result);
//   });
// });

// router.post("/", (req, res) => {
//   const { firstName, lastName } = req.body;

//   const sql = `
//                INSERT INTO people(first_name, last_name)
//                VALUES('${firstName}', '${lastName}')
//                `;

//   con.query(sql, (err, result) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     res.json(result);
//   });
// });

export { router as peopleRouter };
