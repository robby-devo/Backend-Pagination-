const express = require("express");

const Product = require("../models/product.model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.get("", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    return res.status(201).send(products);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
