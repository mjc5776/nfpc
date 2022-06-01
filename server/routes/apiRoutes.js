const express = require('express');
const router = express.Router();
const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const fsPromises = require('fs').promises;
const path = require('path');



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

  router.get('/players/appearances', async (req, res) => { 

    let playerId = req.query.param;
    let data = await db.sequelize.query(
    "SELECT dbo.Player.PlayerID, dbo.Compensation.RequestID, dbo.Player.FirstName, dbo.Player.LastName," +
    " dbo.Compensation.CompValue FROM dbo.Player INNER JOIN dbo.Request ON dbo.Player.PlayerID = dbo.Request.PlayerID INNER JOIN" +
    " dbo.Compensation ON dbo.Player.PlayerID = dbo.Compensation.PlayerID INNER JOIN" +
    " dbo.LeagueYear ON dbo.Compensation.LeagueYearID = dbo.LeagueYear.LeagueYearID INNER JOIN" +
    " dbo.RequestStatus ON dbo.Request.RequestID = dbo.RequestStatus.RequestID WHERE (dbo.LeagueYear.Active = 1)" +
    " GROUP BY dbo.Player.PlayerID, dbo.Player.FirstName, dbo.Player.LastName, dbo.Compensation.CompValue," +
    " dbo.Compensation.RequestID, dbo.RequestStatus.RequestStatus" +
    ` HAVING dbo.Player.PlayerID = ${playerId} AND ((dbo.RequestStatus.RequestStatus = 1) OR (dbo.RequestStatus.RequestStatus = 3))`
      ,
      {
        nest: true,
      }
    );
  
    res.json(data);
  });

  router.get('/players/YTD', async (req, res) => { 

    let playerId = req.query.param;
    let data = await db.sequelize.query(
    "SELECT dbo.Player.PlayerID, dbo.Player.FirstName +' '+ dbo.Player.LastName as FullName,  CAST(CASE WHEN [RookieYear] = [ContractSignYear] THEN 32500 END AS MONEY) AS CompMaxPerYear," +
    " CASE WHEN dbo.Player.SigningType = 'Selection List Signing' OR dbo.Player.SigningType = 'Undrafted Rookie Signing' OR" +
    " dbo.Player.SigningType = 'Reserve, Selection List' THEN 'Yes' ELSE 'No' END AS RookieContract, SUM(CASE WHEN [CompValue] IS NULL THEN 0 ELSE [CompValue] END) AS YTDComp," +
    " COUNT(dbo.Compensation.RequestID) AS Appearances" +
    " FROM dbo.Compensation INNER JOIN dbo.LeagueYear ON dbo.Compensation.LeagueYearID = dbo.LeagueYear.LeagueYearID RIGHT OUTER JOIN" +
    " dbo.Player ON dbo.Compensation.PlayerID = dbo.Player.PlayerID" +
    "  GROUP BY dbo.Player.RookieYear, dbo.Player.ContractSignYear, dbo.Player.PlayerID, dbo.LeagueYear.Active, dbo.Player.SigningType, dbo.Player.FirstName, dbo.Player.LastName," +
    " CASE WHEN SigningType = 'Selection List Signing' OR SigningType = 'Undrafted Rookie Signing' OR" +
    " SigningType = 'Reserve, Selection List' THEN 'Yes' ELSE 'No' END" + 
    ` HAVING (dbo.LeagueYear.Active = 1) AND (dbo.Player.PlayerID = ${playerId})`
      ,
      {
        nest: true,
      }
    );
  
    res.json(data);
  });


  router.get('/player/request/detail/:ID', async (req, res) => { 

    
    let data = await db.sequelize.query(
    "SELECT dbo.Request.RequestID, dbo.Request.PlayerID, dbo.Request.RequestTitle, dbo.Request.ReqDescription," +
    " dbo.PDType.PDType, dbo.PlayerDeliverable.PDDate, dbo.Compensation.Compensation," +
    " dbo.Compensation.CompValue, dbo.RequestStatus.RequestStatus" +
    " FROM dbo.PlayerDeliverable INNER JOIN" +
    " dbo.Request ON dbo.PlayerDeliverable.RequestID = dbo.Request.RequestID INNER JOIN" +
    " dbo.Compensation ON dbo.Request.RequestID = dbo.Compensation.RequestID INNER JOIN" +
    " dbo.PDType ON dbo.PlayerDeliverable.PDType = dbo.PDType.PDTypeID INNER JOIN" +
    " dbo.LeagueYear ON dbo.Compensation.LeagueYearID = dbo.LeagueYear.LeagueYearID INNER JOIN" +
    " dbo.RequestStatus ON dbo.Request.RequestID = dbo.RequestStatus.RequestID" +
    " WHERE(dbo.LeagueYear.Active = 1) AND (dbo.RequestStatus.RequestStatus = 1) OR (dbo.LeagueYear.Active = 1)" +
    ` AND (dbo.RequestStatus.RequestStatus = 3) AND (dbo.Request.PlayerID = (:ID))` +
    " ORDER BY dbo.PlayerDeliverable.PDDate DESC"
      ,
      {
        nest: true,
        replacements: {
          ID: req.params.ID
        },
      }
    );
  
    res.json(data);
    
  });


  router.get('/player/request/pending', async (req, res) => { 

    
    let data = await db.sequelize.query(
      "SELECT dbo.Request.RequestDate, dbo.Request.RequestUser, dbo.Player.FirstName + ' ' + dbo.Player.LastName AS PlayerName," +
      " dbo.PDType.PDType, dbo.Request.RequestTitle, dbo.Request.ReqDescription, dbo.PlayerDeliverable.PDDate," +
      " dbo.PlayerDeliverable.PDLocation, dbo.PlayerDeliverable.PDTime + ' ' + dbo.PlayerDeliverable.PDQty AS PDTime," +
      " dbo.PlayerDeliverable.PDComments, dbo.ClubDeliverable.FMV, dbo.Request.RequestID, dbo.ClubDeliverable.CDType," +
      " dbo.Player.PlayerID, dbo.RequestStatus.RequestStatus, dbo.RequestStatus.Comments AS RQStatusComments" +
      " FROM dbo.Request INNER JOIN dbo.Player ON dbo.Request.PlayerID = dbo.Player.PlayerID INNER JOIN" +
      " dbo.PlayerDeliverable ON dbo.Request.RequestID = dbo.PlayerDeliverable.RequestID INNER JOIN" +
      " dbo.ClubDeliverable ON dbo.Request.RequestID = dbo.ClubDeliverable.RequestID INNER JOIN" +
      " dbo.PDType ON dbo.PlayerDeliverable.PDType = dbo.PDType.PDTypeID INNER JOIN" +
      " dbo.RequestStatus ON dbo.Request.RequestID = dbo.RequestStatus.RequestID WHERE (dbo.RequestStatus.RequestStatus = 0)"
      ,
      {
        nest: true,
        replacements: {
          ID: req.params.ID
        },
      }
    );
  
    res.json(data);
    
  });

  router.get('/player/request/paid', async (req, res) => { 

    
    let data = await db.sequelize.query(
      "SELECT dbo.Request.RequestDate, dbo.Compensation.CompDate, dbo.Request.RequestUser, dbo.Compensation.CompValue," +
      " dbo.Compensation.ChkNbr, dbo.Player.FirstName + ' ' + dbo.Player.LastName AS PlayerName, dbo.Request.AcctNum," +
      " dbo.RequestStatus.RequestStatus, dbo.RequestStatus.UpdatedBy, dbo.Compensation.CompensationID, dbo.PlayerDeliverable.PDDate," +
      " dbo.Request.RequestTitle, dbo.Request.RequestID FROM dbo.RequestStatus INNER JOIN dbo.Request INNER JOIN" +
      " dbo.Player ON dbo.Request.PlayerID = dbo.Player.PlayerID INNER JOIN dbo.PlayerDeliverable ON dbo.Request.RequestID = dbo.PlayerDeliverable.RequestID" +
      " INNER JOIN dbo.ClubDeliverable ON dbo.Request.RequestID = dbo.ClubDeliverable.RequestID INNER JOIN" +
      " dbo.PDType ON dbo.PlayerDeliverable.PDType = dbo.PDType.PDTypeID ON dbo.RequestStatus.RequestID = dbo.Request.RequestID" +
      " LEFT OUTER JOIN dbo.Compensation INNER JOIN dbo.CDType ON dbo.Compensation.Compensation = dbo.CDType.CDTypeID" +
      " ON dbo.Request.RequestID = dbo.Compensation.RequestID WHERE RequestStatus = 3"
      ,
      {
        nest: true,
        
      }
    );
  
    res.json(data);
    
  });

  router.get('/player/request/approved', async (req, res) => { 

    
    let data = await db.sequelize.query(
      "SELECT dbo.Request.RequestDate, dbo.Compensation.CompDate, dbo.Request.RequestUser, dbo.Compensation.CompValue," +
      " dbo.Compensation.ChkNbr, dbo.Player.FirstName + ' ' + dbo.Player.LastName AS PlayerName, dbo.Request.AcctNum," +
      " dbo.RequestStatus.RequestStatus, dbo.RequestStatus.UpdatedBy, dbo.Compensation.CompensationID, dbo.PlayerDeliverable.PDDate," +
      " dbo.Request.RequestTitle, dbo.Request.RequestID FROM dbo.RequestStatus INNER JOIN dbo.Request INNER JOIN" +
      " dbo.Player ON dbo.Request.PlayerID = dbo.Player.PlayerID INNER JOIN dbo.PlayerDeliverable ON dbo.Request.RequestID = dbo.PlayerDeliverable.RequestID" +
      " INNER JOIN dbo.ClubDeliverable ON dbo.Request.RequestID = dbo.ClubDeliverable.RequestID INNER JOIN" +
      " dbo.PDType ON dbo.PlayerDeliverable.PDType = dbo.PDType.PDTypeID ON dbo.RequestStatus.RequestID = dbo.Request.RequestID" +
      " LEFT OUTER JOIN dbo.Compensation INNER JOIN dbo.CDType ON dbo.Compensation.Compensation = dbo.CDType.CDTypeID" +
      " ON dbo.Request.RequestID = dbo.Compensation.RequestID WHERE RequestStatus = 1"
      ,
      {
        nest: true,
        
      }
    );
  
    res.json(data);
    
  });

  router.post('/request/new', async (req, res) => {
    console.log('RequestBody', req.body);
  
     try {
  
      let request = {
         PlayerID: req.body.PlayerID,
         RequestDate: req.body.RequestDate,
         RequestUser: req.body.RequestUser,
         RequestUserEmail: req.body.RequestEmail,
         RequestTitle: req.body.RequestTitle,
         ReqDescription: req.body.ReqDescription,
         AcctNum:req.body.AcctNum 
      };
  
      const appReq = await db.Request.create(request);
      

      let playerDeliver = {
        RequestID: appReq.RequestID,
        PDType: req.body.PDType,
        PDTime: req.body.PDTime,
        PDQty: req.body.PDQty,
        PDDate: req.body.PDDate,
        PDLocation: req.body.PDLocation,
        PDComments: req.body.PDComments,
      }
      const pd = await db.PlayerDeliverable.create(playerDeliver);
      
      let clubDeliver = {
        RequestID: appReq.RequestID,
        CDType: req.body.CDType,
        FMV: req.body.FMV,
        CDComments: req.body.CDComments,
      }

      const cd = await db.ClubDeliverable.create(clubDeliver);

      let reqStatus = {
        RequestID: appReq.RequestID,
        RequestStatus: 0
      }

      const status = await db.RequestStatus.create(reqStatus);

    } catch (e) {
      console.log(e);
      res.status(400).json();
    }
  });


  
 
  
  
  




















module.exports = router;