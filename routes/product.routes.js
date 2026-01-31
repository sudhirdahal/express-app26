const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth'); // Import the guard

// A public route for the visual page
router.get('/view', productController.getProductsPage);

router.route('/')
    .get(productController.getAllProducts)
    .post(auth, productController.createProduct);

router.post('/submit-form', productController.createProduct);

router.post('/delete/:id', productController.deleteProduct);


module.exports = router;