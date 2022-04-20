const express = require('express');
const router = express.Router();
const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;



router.get('/players', async (req, res) => { 
    let data = await db.sequelize.query(
    "SELECT PlayerID, FirstName, LastName, UPPER(FirstName+' '+LastName) as FullName," + 
	" CASE WHEN SigningType = 'Selection List Signing' OR SigningType = 'Undrafted Rookie Signing'" +
    " OR SigningType = 'Reserve, Selection List' THEN 'R' END as RookieContract" +
    " FROM dbo.Player" +
    " Where Archive IS NULL or Archive = '' or Archive = 0" +
    " Order By FirstName, LastName"
      ,
      {
        nest: true,
      }
    );
  
    res.json(data);
  });
  




















module.exports = router;