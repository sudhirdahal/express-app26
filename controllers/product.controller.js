/* const products = [
    { id: 101, name: 'Laptop', price: 999 },
    { id: 102, name: 'Mechanical Keyboard', price: 150 }
]; */

const Product = require('../models/product.model');

// GET all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetches EVERYTHING from the DB
        res.status(200).json({ status: 'success', data: { products } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST a new product
/* exports.createProduct = async (req, res) => {
    try {
        // Create it in the database
        const newProduct = await Product.create(req.body);
        
        // After creating, redirect to the view page!
        res.redirect('/api/v1/products/view');
    } catch (err) {
        res.status(400).json({ message: "Check your data format!" });
    }
}; */

exports.createProduct = async (req, res) => {
    try {
        console.log("Incoming Body:", req.body); // Debugging: See what the form sent
        if (!req.body || !req.body.name) {
            return res.status(400).send("Form data is missing!");
        }
        await Product.create({
            name: req.body.name,
            price: Number(req.body.price) // Ensure it's a number!
        });
        res.redirect('/api/v1/products/view');
    } catch (err) {
        console.log(err);
        res.status(400).send("Error: " + err.message);
        // This will catch errors if 'price' isn't a valid number
        //res.status(400).render('error', { message: "Invalid product data" });
    }
};

// RENDER the EJS page
/* exports.getProductsPage = async (req, res) => {
    const products = await Product.find();
    res.render('products', { products });
}; */

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        // Redirect back to the view to see it's gone!
        res.redirect('/api/v1/products/view');
    } catch (err) {
        res.status(500).send("Could not delete product");
    }
};


exports.getProductsPage = async (req, res) => {
    try {
        const { search, sort } = req.query; // Destructure both parameters
        let query = {};
        let sortOption = { createdAt: -1 }; // Default: Newest first

        // 1. Handle Filtering
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // 2. Handle Sorting
        if (sort === 'price_asc') sortOption = { price: 1 };
        if (sort === 'price_desc') sortOption = { price: -1 };

        // 3. Execute Query with Sort
        const products = await Product.find(query).sort(sortOption);
        
        res.render('products', { 
            products, 
            searchTerm: search,
            currentSort: sort 
        });
    } catch (err) {
        res.status(500).send("Error loading products");
    }
};

/* exports.getProductsPage = async (req, res) => {
    try {
        const searchTerm = req.query.search; // Extract ?search=... from URL
        let query = {};

        if (searchTerm) {
            // Use Regex for a "fuzzy" search (case-insensitive)
            query = { name: { $regex: searchTerm, $options: 'i' } };
        }

        const products = await Product.find(query);
        
        // Pass the searchTerm back so the input field can keep the text
        res.render('products', { products, searchTerm });
    } catch (err) {
        res.status(500).send("Search error");
    }
}; */

/* exports.getProductsPage = (req, res) => { */
/*     const products = [
        { id: 101, name: 'Laptop', price: 999 },
        { id: 102, name: 'Mechanical Keyboard', price: 150 }
    ]; */

    // 'products' refers to the filename views/products.ejs
    /* res.render('products', { 
        products: products 
    });
};
 */
/* exports.getAllProducts = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: { products }
    });
}; */

/* exports.createProduct = (req, res) => { */
/*     In a real app, you'd save req.body to a Database
    const newProduct = req.body; */

    // 1. Get data from the request body
    /* const { name, price } = req.body;
 */
    // 2. Create a new object (In a real app, this is where db.save() happens)
    /* const newProduct = {
        id: Math.floor(Math.random() * 1000), // Generate a random ID
        name,
        price
    }; */

    // 3. Add to our mock array
    /* products.push(newProduct);

    res.status(201).json({
        status: 'success',
        message: 'Product added!',
        data: { product: newProduct }
    });
}; */