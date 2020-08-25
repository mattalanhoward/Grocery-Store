const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");

/************************************************/
//        HTTP-GET-request: /shop
//
//        Renders the SHOP page and displays all
//        the products for shopping
/************************************************/
router.get("/", (req, res) => {
  // console.log("shop requested.");
  // fetch all the products from DB
  console.log(req.session);
  if (!req.session) {
    return res.render("shop/shop", {
      erroeMessage: "Not authorozed to view the shop",
    });
  }
  productModel
    .find()
    .then((productsFromDB) => {
      console.log(" products list from DB ...");
      // console.log(productsFromDB);
      res.render("shop/shop", { productsList: productsFromDB });
    })
    .catch((error) =>
      res.render("shop/shop", {
        erroeMessage: "Not authorozed to view the shop" + error,
      })
    );
});

/************************************************/
//        HTTP-GET-request: /shop
//
//        Renders the SHOP page and displays all
//        the products for shopping
/************************************************/

router.post("/:id", (req, res) => {
  console.log(" add to cart clicked ...");
  console.log(req.params.id);
  console.log(req.session.currentUser);

  // const productSelected =
  // console.log(productSelected);
  // cartModel
  //   .create({
  //     customerId: req.session.currentUser._id,
  //     $push: { productId: req.params.id },
  //   })
  let cartProduct = new cartModel({ customerId: req.session.currentUser._id });
  cartProduct.products.push({ productId: req.params.id });

  cartProduct
    .save()
    .then((productFromDB) => {
      console.log(productFromDB);
      res.redirect("/shop");
    })
    .catch((error) => {
      console.log(" error while adding product to cart", error);
    });
});

/********************************************** */
// export
module.exports = router;
