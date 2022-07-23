require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json());


// Get all table
app.get("/table", async (req, res) => {
  try {
    let {limit, page, filterColumn, filterCondition, filterValue, sortColumn} = req.query;

    page = page || 1;
    limit = limit || 5;
    let offset = limit * (page - 1);

    // Create query for sort
    let sortQuery = "";
    if (sortColumn) {
      sortQuery = `ORDER BY ${sortColumn}`;
    }

    // Create query for filter
    let filterQuery = "";
    if (filterColumn && filterCondition && filterValue) {
      if (filterCondition === "less") {
        filterQuery = `WHERE ${filterColumn} < '${filterValue}'`
      }
      if (filterCondition === "greater") {
        filterQuery = `WHERE ${filterColumn} > '${filterValue}'`
      }
      if (filterCondition === "equal") {
        filterQuery = `WHERE ${filterColumn} = '${filterValue}'`
      }
      if (filterColumn === "name" && filterCondition === "contain") {
        filterQuery = `WHERE strpos(${filterColumn}, '${filterValue}') > 0`
      }
    }

    const results = await db.query(`
        SELECT *
        FROM some_table ${filterQuery} ${sortQuery}
        LIMIT ${limit} OFFSET ${offset}
    `);

    const rowCountResults= await db.query(`
        SELECT COUNT(*)
        FROM some_table ${filterQuery} ${sortQuery}
    `)
    const pageCount = Math.ceil( rowCountResults.rows[0].count / limit)

    res.status(200).json({
      pageCount,
      table: results.rows,
    });
  } catch (e) {
    console.error(e);
  }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
