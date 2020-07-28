const router = require('express').Router();
const Product = require("../models/product");


const upload = require("../middlewares/upload-photo");




// Post Request - create a new product

router.post('/products', upload.single("photo"), async(req, res) => {
  try{
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;
    product.categoryID = req.body.categoryID;
    product.protypeID = req.body.protypeID;

    await product.save();
    res.json ({
      status: true,
      message: "Successfully Saved"
    });
  } catch (err) {
    res.stats(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get Request - get all products

router.get('/products', async(req, res) =>{
  try{
    let products = await Product.find().populate('category protype condition').exec();
    res.json({
      success: true,
      products: products
    });
  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});




// get Request - get single product


router.get('/products/:id', async(req, res) =>{
  try{
    let product = await Product.findOne({ _id: req.params.id }).populate('category protype condition').exec();
    res.json({
      success: true,
      product: product
    });
  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


// put Request - update single product
router.put('/products/:id', upload.single("photo"), async(req, res) =>{
  try{
    let product = await Product.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        title: req.body.title,
        price: req.body.price,
        category: req.body.categoryID,
        description: req.body.description,
        stockQuantity: req.body.stockQuantity,
        protype: req.body.protypeID,
        condition: req.body.conditionID,
        photo: req.file.location
      }
    },
  { upsert: true }
);
    res.json({
      success: true,
      updatedProduct: product
    });


  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// delete Request - delete single product


router.delete('/products/:id', async(req, res) =>{
  try{
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if(deletedProduct){
      res.json({
        success: true,
        message: "Succesfully Deleted"
      });
    }

  } catch(err){
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});













module.exports = router;
