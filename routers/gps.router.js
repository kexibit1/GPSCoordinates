const router = require('express').Router();
const db = require('../db');

// endpoint для сохранения координат в БД
router.post('/postGPS', async (req, res) => {
    // Берем данные из запроса
    const {id, latitude, longitude} = req.body;
    // Формируем сегодняшную дату в формате "Год-месяц-день"
    const todayDate = new Date().toISOString().slice(0, 10);
    db.query('INSERT INTO gps_coordinates (id, latitude, longitude, timeofcreation) VALUES ($1, $2, $3, $4)', [id, latitude, longitude, todayDate], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Coordinates saved');
        }
    })
});

// Берем данные по ID юзера
router.get('/getGPS', async (req, res) => {
    // Берем данные из запроса
    const {id, startDate, lastDate} = req.body;
    // Если присутсвует начальная дата, но отсутствует конечная
    if (startDate && !lastDate) {
        db.query("SELECT * FROM gps_coordinates WHERE id = ($1) AND timeofcreation >= ($2)::date", [id,startDate], (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result.rows);
        })
    //    Если присутствует конечная дата, но отсутствует начальная
    } else if (!startDate && lastDate) {
        db.query("SELECT * FROM gps_coordinates WHERE id = ($1) AND timeofcreation <= ($2)::date", [id,lastDate], (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result.rows);
        })
    //    Если присутствует начальная и конечная дата
    } else if (startDate && lastDate) {
        db.query("SELECT * FROM gps_coordinates WHERE id = ($1) AND timeofcreation >= ($2)::date AND timeofcreation <= ($3)::date", [id,startDate, lastDate], (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result.rows);
        })
    //    Если отсутствуют ограничительные даты в запросе
    } else {
        db.query("SELECT * FROM gps_coordinates WHERE id = ($1)", [id], (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result.rows);
        })
    }
});


module.exports = router;