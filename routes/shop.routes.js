const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");
const e = require("express");

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
  console.log(" productID from req params: ", req.params.id);
  console.log(" userID from req session: ", req.session.currentUser._id);

  /********************* */
  let addNewCart = false;
  let addNewProduct = false;

  cartModel
    .find({ customerId: req.session.currentUser._id })
    .then((customerCarts) => {
      // then -1
      console.log(" then -1 ", customerCarts);
      console.log(customerCarts.length);
      /** check whether any carts created for the client
       */
      if (customerCarts.length === 0) {
        /**
          If no carts for the client in DB => adda a new cart for the customer
         */
        addNewCart = true;
      } else {
        if (!addNewCart) {
          /**
           *  get a list of carts which are ordered
           */
          const cusotmersOrderedCarts = customerCarts.filter(
            (eachCart) => eachCart.ordered
          );
          console.log(
            " carts of customer which were delivered : ",
            cusotmersOrderedCarts
          );
          // Chek whether all the carts of customer are order-confirmed and delivered
          if (cusotmersOrderedCarts.length === customerCarts.length) {
            addNewCart = true;
          } else {
            // So, there are still some carts which are not checked-out and delivered
            const customerUncheckedCart = customerCarts.filter(
              (eachCart) => !eachCart.ordered
            );
            console.log(
              "carts of customer which are NOT checked out : ",
              customerUncheckedCart
            );
            console.log(customerUncheckedCart[0].products);
            ProductsFromUncheckedCart = customerUncheckedCart[0].products.filter(
              (product) => product.productId == req.params.id
            );
            console.log(
              "Products from Unchecked-out-Cart:  ",
              ProductsFromUncheckedCart
            );

            if (ProductsFromUncheckedCart.length === 0) {
              addNewProduct = true;
            } else {
              // increment the product quantity ;
              return cartModel.findOneAndUpdate(
                {
                  $and: [
                    { customerId: req.session.currentUser._id },
                    { ordered: false },
                    { "products.productId": req.params.id },
                  ],
                },
                { $inc: { "products.$.quantity": 1 } },
                { new: true }
              );
            }
          }
        }
      }
      //  create a new cart record for the customer
      if (addNewCart) {
        let cartProduct = new cartModel({
          customerId: req.session.currentUser._id,
        });
        cartProduct.products.push({ productId: req.params.id });
        return cartProduct.save();
      }
      //  Add a new product to the customer unchecked -out Cart.
      if (addNewProduct) {
        // add a new product to the product array
        console.log(" Adding a new product to un-cheked-out cart");
        return cartModel.findOneAndUpdate(
          {
            $and: [
              { customerId: req.session.currentUser._id },
              { ordered: false },
            ],
          },
          { $push: { products: { productId: req.params.id } } },
          { new: true }
        );
      }
    })
    .then((newCartCreated) => {
      // then -2
      console.log("then-2 :  new cart record added .... ", newCartCreated);
    })
    .catch((error) =>
      console.log("error while addidn products to cart ", error)
    );
  /********************* */
  // let cartProduct = new cartModel({ customerId: req.session.currentUser._id });
  // cartProduct.products.push({ productId: req.params.id });

  // cartProduct
  //   .save()
  //   .then((productFromDB) => {
  //     // console.log(productFromDB);
  //     res.redirect("/shop");
  //   })
  //   .catch((error) => {
  //     console.log(" error while adding product to cart", error);
  //   });
});

/********************************************** */
// export
module.exports = router;
