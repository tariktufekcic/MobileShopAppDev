const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');

router.post('/create-product', async (req, res) => {

    const products = req.body || {};
    try {
        const createProduct = await productModel.create(products);
        res.status(200).send(createProduct);
        if(!createProduct) return res.status(200).send("Product is created.");
    } catch (e) {
        res.status(400).send(e?.message || "Something went wrong!")
    }
});

router.get('/all-products', async (req, res) => {

    try {
        const allProducts = await productModel.find();
        res.status(200).send(allProducts);
    } catch (error) {
        res.status(400).send(e?.message || "Error")
    }
});

router.put('/update-product/:id', async (req, res) => {

    const { id } = req.params;
    const updateData = req.body;

    try {

        const updateProduct = await productModel.findByIdAndUpdate(id, updateData);
        if(!updateProduct) return res.status(400).send("Fail to update.");
        
        const updatedProduct = await productModel.findById(id);
        res.status(200).send(updatedProduct);
        console.log("Updated!")
    } 
    
    catch (error) {
        res.status(400).send("Fail to update :/");
    }
});

router.delete('/delete-product/:id', async (req, res) => {

    const { id } = req.params;


    try {
        await productModel.findByIdAndDelete(id);
        res.status(200).send("PRODUCT DELETED!");
        
        
    } catch (e) {
        res.status(400).send(e?.message)
    }
});

router.get('/single-product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const singleProduct = await productModel.findById(id).populate('userId');
        res.status(200).send(singleProduct);
    } catch (e) {
        res.status(400).send(e?.message || "Something went wrong")
    }
});

router.get('/user-products/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const userProducts = await productModel.find({ userId });
        res.status(200).send(userProducts);
    } catch (e) {
        res.status(400).send(e?.message || "Something went wrong");
    }
});
router.put('/user-products/:userId', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {

        const updateProduct = await productModel.findByIdAndUpdate(id, updateData);
        if(!updateProduct) return res.status(400).send("Fail to update.");

        const updatedProduct = await productModel.findById(id);
        res.status(200).send(updatedProduct);
        console.log("Updated!")
    } 
    
    catch (error) {
        res.status(400).send("Fail to update :/");
    }
});


module.exports = router;