const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");

const sessionStore = require("./session.middleware");

/************************************************/
//        HTTP-GET-request: /shop
//
//        Renders the SHOP page and displays all
//        the products for shopping
/************************************************/
router.get("/", sessionStore, (req, res) => {
  // fetch all the products from DB
  productModel
    .find()
    .then((productsFromDB) => {
      // console.log(productsFromDB.length);
      if (productsFromDB) {
        // console.log(" products list from DB ...");
        if (productsFromDB.length === 0) {
          return res.render("shop/shop", {
            currentUser: req.session.currentUser,
            errorMessage: "SHOP is Empty",
          });
        }
        res.render("shop/shop", {
          currentUser: req.session.currentUser,
          productsList: productsFromDB,
        });
      } else {
        // console.log(req.session.currentUser);
        return res.render("shop/shop", {
          currentUser: req.session.currentUser,
          errorMessage: "SHOP is Empty",
        });
      }
    })
    .catch((error) =>
      res.render("shop/shop", {
        erroeMessage: "Not authorozed to view the shop" + error,
      })
    );
});

/************************************************/
//        HTTP-GET-request: /categories/vegetables
//
//        Renders the SHOP page and displays all
//        the products for shopping
/************************************************/
router.get("/fruits", sessionStore, (req, res) => {
  // fetch all the products from DB
  productModel
    .find({ category: "fruits" })
    .then((productsFromDB) => {
      // console.log(productsFromDB.length);
      if (productsFromDB) {
        // console.log(" products list from DB ...");
        if (productsFromDB.length === 0) {
          return res.render("shop/shop", {
            currentUser: req.session.currentUser,
            errorMessage: "There are no fruits in the SHOP",
          });
        }
        res.render("shop/shop", {
          currentUser: req.session.currentUser,
          productsList: productsFromDB,
        });
      } else {
        // console.log(req.session.currentUser);
        return res.render("shop/shop", {
          currentUser: req.session.currentUser,
          errorMessage: "There are no fruits in the SHOP",
        });
      }
    })
    .catch((error) =>
      res.render("shop/shop", {
        erroeMessage: "Not authorozed to view the Fruits page" + error,
      })
    );
});

/************************************************/
//        HTTP-GET-request: /categories/vegetables
//
//        Renders the SHOP page and displays all
//        the products for shopping
/************************************************/
router.get("/vegetables", sessionStore, (req, res) => {
  // fetch all the products from DB
  productModel
    .find({ category: "vegetables" })
    .then((productsFromDB) => {
      // console.log(productsFromDB.length);
      if (productsFromDB) {
        // console.log(" products list from DB ...");
        if (productsFromDB.length === 0) {
          return res.render("shop/shop", {
            currentUser: req.session.currentUser,
            errorMessage: "There are no vegetables in the SHOP",
          });
        }
        res.render("shop/shop", {
          currentUser: req.session.currentUser,
          productsList: productsFromDB,
        });
      } else {
        // console.log(req.session.currentUser);
        return res.render("shop/shop", {
          currentUser: req.session.currentUser,
          errorMessage: "There are no vegetables in the SHOP",
        });
      }
    })
    .catch((error) =>
      res.render("shop/shop", {
        erroeMessage: "Not authorozed to view the vegetables page" + error,
      })
    );
});

/************************************************/
//        HTTP-GET-request: /categories/breads
//
//        Renders the SHOP page and displays all
//        the breads for shopping
/************************************************/
router.get("/breads", sessionStore, (req, res) => {
  // fetch all the products from DB
  productModel
    .find({ category: "breads" })
    .then((productsFromDB) => {
      // console.log(productsFromDB.length);
      if (productsFromDB) {
        // console.log(" products list from DB ...");
        if (productsFromDB.length === 0) {
          return res.render("shop/shop", {
            currentUser: req.session.currentUser,
            errorMessage: "There are no breads in the SHOP",
          });
        }
        res.render("shop/shop", {
          currentUser: req.session.currentUser,
          productsList: productsFromDB,
        });
      } else {
        console.log(req.session.currentUser);
        return res.render("shop/shop", {
          currentUser: req.session.currentUser,
          errorMessage: "There are no breads in the SHOP",
        });
      }
    })
    .catch((error) =>
      res.render("shop/shop", {
        erroeMessage: "Not authorozed to view the breads page" + error,
      })
    );
});

/************************************************/
//        HTTP-GET-request: /categories/meat
//
//        Renders the SHOP page and displays all
//        the meat for shopping
/************************************************/
router.get("/meat", sessionStore, (req, res) => {
  // fetch all the products from DB
  productModel
    .find({ category: "meat" })
    .then((productsFromDB) => {
      // console.log(productsFromDB.length);
      if (productsFromDB) {
        // console.log(" products list from DB ...");
        if (productsFromDB.length === 0) {
          return res.render("shop/shop", {
            currentUser: req.session.currentUser,
            errorMessage: "There are no meat products in the SHOP",
          });
        }
        res.render("shop/shop", {
          currentUser: req.session.currentUser,
          productsList: productsFromDB,
        });
      } else {
        // console.log(req.session.currentUser);
        return res.render("shop/shop", {
          currentUser: req.session.currentUser,
          errorMessage: "There are no meat products in the SHOP",
        });
      }
    })
    .catch((error) =>
      res.render("shop/shop", {
        erroeMessage: "Not authorozed to view the meat page" + error,
      })
    );
});

/************************************************/
//        HTTP-POST-request: /shop
//
//        Adds the prodcuts to the shopping cart
//        the products for shopping
/************************************************/

router.post("/:id", sessionStore, (req, res) => {
  console.log(" add to cart clicked ...");
  console.log(" productID from req params: ", req.params);
  // console.log(" userID from req session: ", req.session.currentUser._id);
  console.log(req.headers.referer);
  const reqUri = req.headers.referer;
  let redirectUri = "";

  if (reqUri.includes("fruits")) {
    redirectUri = "/categories/fruits";
  } else if (reqUri.includes("vegetables")) {
    redirectUri = "/categories/vegetables";
  } else if (reqUri.includes("breads")) {
    redirectUri = "/categories/breads";
  } else if (reqUri.includes("meat")) {
    redirectUri = "/categories/meat";
  } else {
    redirectUri = "/shop";
  }

  /********************* */
  let addNewCart = false;
  let addNewProduct = false;

  cartModel
    .find({ customerId: req.session.currentUser._id })
    .then((customerCarts) => {
      // then -1
      // console.log(" then -1 ", customerCarts);
      // console.log(customerCarts.length);
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
          // console.log(
          // " carts of customer which were delivered : ",
          // cusotmersOrderedCarts
          // );
          // Chek whether all the carts of customer are order-confirmed and delivered
          if (cusotmersOrderedCarts.length === customerCarts.length) {
            addNewCart = true;
          } else {
            // So, there are still some carts which are not checked-out and delivered
            const customerUncheckedCart = customerCarts.filter(
              (eachCart) => !eachCart.ordered
            );
            // console.log(
            //   "carts of customer which are NOT checked out : ",
            //   customerUncheckedCart
            // );
            // console.log(customerUncheckedCart[0].products);
            ProductsFromUncheckedCart = customerUncheckedCart[0].products.filter(
              (product) => product.productId == req.params.id
            );
            // console.log(
            //   "Products from Unchecked-out-Cart:  ",
            //   ProductsFromUncheckedCart
            // );

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
        // console.log(" Adding a new product to un-cheked-out cart");
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
      // console.log("then-2 :  new cart record added .... ", newCartCreated);
      if (newCartCreated) {
        res.redirect(redirectUri);
      } else {
        res.render(redirectUri, { errorMessage: "Some network problem " }); // TODO: change this message
      }
    })
    .catch((error) =>
      console.log("error while addidn products to cart ", error)
    );
});

/********************************************** */
// export
module.exports = router;
