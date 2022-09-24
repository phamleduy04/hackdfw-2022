const router = require('express').Router();
const DB = require('../database');
const sql = new DB();
const dayjs = require('dayjs');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const data = await sql.query('SELECT * FROM doc');
  console.log(data);
  res.status(200).send('Home page!');
});

router.get('/data', async (req, res, next) => {
    const roomID = req.query.roomID;
    if (!roomID) return res.status(400).send('No roomID provided');
    const data = await sql.query(`SELECT * FROM doc WHERE roomID = ${roomID}`);
    res.json(data);
});

router.post('/update', async (req, res, next) => {
    const docID = req.body.id;
    const roomID = req.body.roomID;
    if (!docID || !roomID) return res.status(400).send('Not enough body provided');
    const check = await sql.query(`SELECT * FROM doc WHERE id = ${docID}`);
    if (!check || check.length === 0) return res.status(400).send('No such doc ID');
    if (!check[0]?.timeEnter) await sql.query(`UPDATE doc SET roomID = ${roomID}, timeEnter = '${dayjs().format('YYYY-MM-DD HH:mm:ss')}' WHERE id = ${docID}`);
    else await sql.query(`UPDATE doc SET roomID = ${roomID}, timeLeft = '${dayjs().format('YYYY-MM-DD HH:mm:ss')}' WHERE id = ${docID}`);
    res.json({ success: true});
});

module.exports = router;
