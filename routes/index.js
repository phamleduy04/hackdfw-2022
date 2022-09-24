const router = require('express').Router();
const DB = require('../database');
const sql = new DB();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const data = await sql.get();
  console.log(data);
  res.status(200).send('Home page!');
});

router.get('/info', (req, res, next) => {
    const id = req.query.id;
    res.status(200).send(`Info page for id: ${id}`);
});
module.exports = router;
