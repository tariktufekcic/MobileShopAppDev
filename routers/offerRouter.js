const express = require('express');
const router = express.Router();
const Offer = require('../models/offerModel');
const productModel = require('../models/productModel');


router.post('/create-offer', async (req, res) => {
    const { productId, userId, offerText } = req.body;

    try {
        const product = await productModel.findById(productId);
        if (!product) return res.status(404).send('Product not found');

        const newOffer = new Offer({ productId, userId, offerText });
        await newOffer.save();

        res.status(200).send(newOffer);
    } catch (error) {
        res.status(400).send(error.message || 'Something went wrong');
    }
});


router.get('/offers/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const offers = await Offer.find({ productId }).populate('userId', 'username');
        res.status(200).send(offers);
    } catch (error) {
        res.status(400).send(error.message || 'Something went wrong');
    }
});


router.put('/offer/:offerId', async (req, res) => {
    const { offerId } = req.params;
    const { status } = req.body;

    try {
        const offer = await Offer.findByIdAndUpdate(offerId, { status }, { new: true });
        if (!offer) return res.status(404).send('Offer not found');

        res.status(200).send(offer);
    } catch (error) {
        res.status(400).send(error.message || 'Something went wrong');
    }
});


router.delete('/offer/:offerId', async (req, res) => {
    try {
        await Offer.findByIdAndDelete(req.params.offerId);
        res.status(200).send({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete offer' });
    }
});

router.put('/offer-d/:offerId', async (req, res) => {
    const { offerId } = req.params;
    const { isDeleted } = req.body;

    try {
        const offer = await Offer.findByIdAndUpdate(offerId, { isDeleted: isDeleted }, { new: true });
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete offer', error });
    }
});


module.exports = router;
