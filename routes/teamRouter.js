const router = require('express').Router();
const getAllTeams = require('../controller/teamCotroller')

router.get('/api/v1/teams', getAllTeams);

module.exports = router;