const express = require('express');
const router = express.Router();
const mysql = require('../controllers/auth')
const mysqlq = require('../controllers/authce')
const mysqll = require('../controllers/authlei')

router.get('/', (req,res)=>{
    res.render('pages/');
});

router.get('/codigoBarras', (req,res)=>{
    res.render('pages/codigoBarras')
});

router.get('/catalogoElec', (req,res)=>{
    res.render('pages/catalogoElec')
});

router.get('/codigoLei', (req,res)=>{
    res.render('pages/codigoLei')
});

router.get('/tabla', (req,res)=>{
    res.render('pages/tabla')
});

router.get('/data', mysql.mysqls)
router.get('/datar', mysql.mysqlr)
router.get('/datarc', mysql.mysqlrc)

router.get('/tablaCe', (req,res)=>{
    res.render('pages/tablace')
});

router.get('/dataceI', mysqlq.mysqlcei)
router.get('/dataceR', mysqlq.mysqlcer)
router.get('/dataceRC', mysqlq.mysqlcerc)

router.get('/tablaLei', (req,res)=>{
    res.render('pages/tablalei')
});

router.get('/dataleiI', mysqll.mysqlleii)
router.get('/dataleiR', mysqll.mysqlleir)

module.exports = router;
