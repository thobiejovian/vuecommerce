const router = require('express').Router();
const Protype = require("../models/protype");


//Post Request

router.post('/protypes', async(req, res) =>  {
  try{
    const protype = new Protype();
    protype.type = req.body.type;

    await protype.save();

    res.json({
      success: true,
      message: "Successfuly created a new Product Type"
    });
  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});




//Get Request
router.get('/protypes', async(req, res) =>{
  try{
    let protypes = await Protype.find();
    res.json({
      success: true,
      protypes: protypes
    });
  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
