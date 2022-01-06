const express = require("express");

const Product = require("../models/product.model");

const User = require("../models/user.model");
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
    const page = +req.query.page || 1;

    const size = +req.query.size || 5;

    let search = req.query.search;

    // console.log("Search", search);

    //   when page is 1 we need to send product from 1 -5
    //   when page is 2 we need to send product from 6 -10
    const skip = (page - 1) * size;
    let products, totalPages;
    if (!search) {
      products = await Product.find().skip(skip).limit(size).lean().exec();

      totalPages = Math.ceil((await Product.find().countDocuments()) / size);
    } else {
      products = await Product.find({ name: search })
        .skip(skip)
        .limit(size)
        .lean()
        .exec();
      totalPages = Math.ceil((await Product.find().countDocuments()) / size);
    }

    return res.status(200).send({ products, totalPages });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
