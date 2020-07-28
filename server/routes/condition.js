const router = require('express').Router();
const Condition = require("../models/condition");


//Post Request

router.post('/conditions', async(req, res) =>  {
  try{
    const condition = new Condition();
    condition.type = req.body.type;

    await condition.save();

    res.json({
      success: true,
      message: "Successfuly created a new condition"
    });
  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


//Get Request
router.get('/conditions', async(req, res) =>{
  try{
    let conditions = await Condition.find();
    res.json({
      success: true,
      conditions: conditions
    });
  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});




module.exports = router;
