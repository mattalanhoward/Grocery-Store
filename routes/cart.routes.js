const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");

const sessionStore = require("./session.middleware");

/************************************************/
//        HTTP-GET-request: /cart
//
//        Renders the CART page and displays all
//        the products in the CART
/************************************************/
router.get("/", sessionStore, (req, res) => {
  console.log(req.session.req.session.currentUser._id);
  cartModel
    .findOne({
      $and: [{ customerId: req.session.currentUser._id }, { ordered: false }],
    })
    // .populate("customerId ")
    .populate({ path: "customerId" })
    .populate({
      path: "products",
      populate: { path: "productId" },
    })
    .then((productsInCart) => {
      console.log(" CART products: ");
      console.log(productsInCart);
      // console.log(productsInCart.products);

      const {
        customerId: { firstName, lasttName },
        products: [...products],
      } = productsInCart;
      res.render("shop/cart", {
        currentUser: req.session.currentUser,
        firstName,
        lasttName,
        products,
      });
    })
    .catch((error) =>
      console.log("error while addidn products to cart ", error)
    );
});

/************************************************/
//        HTTP-GET-request: /cart/removeProduct
//
//        Renders the CART page and displays all
//        the products in the CART
/************************************************/

/********************************************** */
// export
module.exports = router;
