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
    .populate({ path: "customerId" })
    .populate({
      path: "products",
      populate: { path: "productId" },
    })

    .then((productsInCart) => {
      // console.log(" CART products: ");

      if (productsInCart) {
        console.log(productsInCart);
        const {
          customerId: { firstName, lastName },
          products: [...products],
        } = productsInCart;
        if (products.length === 0) {
          return res.render("shop/cart", {
            env: process.env.URL,
            currentUser: req.session.currentUser,
            infoMessage: "Cart is Empty",
          });
        }
        res.render("shop/cart", {
          currentUser: req.session.currentUser,
          firstName,
          lastName,
          products,
        });
      } else {
        // console.log(req.session.currentUser);
        return res.render("shop/cart", {
          env: process.env.URL,
          currentUser: req.session.currentUser,
          infoMessage: "Cart is Empty",
        }); // TODO: change tis message
      }
    })
    .catch(
      (error) =>
        console.log("error while displaying products from cart  cart ", error) // TODO  change this message
    );
});

/************************************************/
//        HTTP-POST-request: /cart/incQty
//
//      increases the quantity of the product
//
/************************************************/
router.get("/incQty/:id", sessionStore, (req, res) => {
  console.log(" inc quantity clicked ... ");
  console.log(req.params.id);

  cartModel
    .findOneAndUpdate(
      {
        $and: [
          { customerId: req.session.currentUser._id },
          { ordered: false },
          { "products.productId": req.params.id },
        ],
      },
      { $inc: { "products.$.quantity": 1 } },
      { new: true }
    )
    .then((resultFromDB) => {
      // console.log(" incremented result: ");
      // console.log(resultFromDB);
      if (resultFromDB) {
        const retProduct = resultFromDB.products.filter(
          (ele) => ele.productId == req.params.id
        );
        console.log(resultFromDB.products);
        return res.send(retProduct);
      } else {
        console.log(req.session.currentUser);
        return res.render("shop/cart", {
          currentUser: req.session.currentUser,
          errorMessage: "Error while updating the quantity of the product ",
        }); // TODO: change this message
      }
    })
    .catch((error) => {
      console.log("error while updating the quantity of the product", error);
      return res.render("shop/cart", {
        currentUser: req.session.currentUser,
        errorMessage:
          "Error while updating the quantity of the product " + error,
      }); // TODO: change this message
    });
});

/************************************************/
//        HTTP-POST-request: /cart/incQty
//
//      increases the quantity of the product
//
/************************************************/
router.get("/decQty/:id", sessionStore, (req, res) => {
  console.log(" dec quantity clicked ... ");
  console.log(req.params.id);

  cartModel
    .findOneAndUpdate(
      {
        $and: [
          { customerId: req.session.currentUser._id },
          { ordered: false },
          { "products.productId": req.params.id },
        ],
      },
      { $inc: { "products.$.quantity": -1 } },
      { new: true }
    )
    .then((resultFromDB) => {
      console.log(" decremented result: ");
      // console.log(resultFromDB);
      if (resultFromDB) {
        const retProduct = resultFromDB.products.filter(
          (ele) => ele.productId == req.params.id
        );
        console.log(resultFromDB.products);
        return res.send(retProduct);
      } else {
        console.log(req.session.currentUser);
        return res.render("shop/cart", {
          currentUser: req.session.currentUser,
          errorMessage:
            "Error while updating the quantity of the product " + error,
        }); // TODO: change this message
      }
    })
    .catch((error) => {
      console.log("error while updating the quantity of the product", error);
      return res.render("shop/cart", {
        currentUser: req.session.currentUser,
        errorMessage:
          "Error while updating the quantity of the product " + error,
      }); // TODO: change this message
    });
});

/************************************************/
//        HTTP-DELETE-request: /cart/delete-Product
//
//      Removes the product from the cart
//
/************************************************/
router.delete("/deleteProduct/:id", sessionStore, (req, res) => {
  console.log("Delete product from cart ");
  // console.log(req.params.id);
  cartExample = cartModel
    .findOne({
      $and: [{ customerId: req.session.currentUser._id }, { ordered: false }],
    })
    .then((responseFromDB) => {
      console.log(responseFromDB);
      if (responseFromDB) {
        return cartModel.findByIdAndUpdate(
          responseFromDB._id,
          { $pull: { products: { productId: req.params.id } } },
          { new: true }
        );
      } else {
        // How to handle this case ??
      }
    })
    .then((resultAfterDel) => {
      console.log(" response from dB after deletion ");

      if (resultAfterDel) {
        console.log(resultAfterDel);

        /***  CONFIRM WITH AGUS ONCE  */
        console.log(" propulating the records afte deletion ... ");
        return cartModel
          .findOne({
            $and: [
              { customerId: req.session.currentUser._id },
              { ordered: false },
            ],
          })
          .populate({ path: "customerId" })
          .populate({
            path: "products",
            populate: { path: "productId" },
          });
      } else {
        // How to handle this case ??
      }
    })
    .then((populatedProductInfo) => {
      console.log(" Result of propulating the records after deletion ... ");
      console.log(populatedProductInfo.products.length);
      if (!populatedProductInfo) {
        // HOW to handle this case :
        return res.render("shop/cart", {
          currentUser: req.session.currentUser,
          infoMessage: "Error while deleting the product" + error,
        });
      }
      let prodList = [];
      if (populatedProductInfo.products.length === 0) {
      } else {
        // console.log(populatedProductInfo.products[0].productId);
        console.log(" ------- ");

        populatedProductInfo.products.forEach(
          ({ quantity, productId: { _id, name, imageUrl, category, price } }) =>
            prodList.push({ _id, name, price, imageUrl, category, quantity })
        );
      }
      console.log(prodList);
      return res.send(prodList);
    })
    .catch((error) => {
      return res.render("shop/cart", {
        currentUser: req.session.currentUser,
        infoMessage: "Error while deleting the product" + error,
      });
    });
});

// router.delete("/deleteProduct/:id", sessionStore, (req, res) => {
//   console.log("Delete product from cart ");
//   console.log(req.params.id);
//    // cartModel.findByIdAndUpdate(catexample._id, {$pull:{"products.productOd: req.paramsOd"}})
//   cartExample = cartModel
//     .findOne({
//       $and: [{ customerId: req.session.currentUser._id }, { ordered: false }],
//     })
//     .then((responseFromDB) => {
//       console.log(responseFromDB);

//       if (responseFromDB) {
//         return cartModel.findByIdAndUpdate(
//           responseFromDB._id,
//           { $pull: { products: { productId: req.params.id } } },
//           { new: true }
//         );
//       } else {
//         //ERROR
//         console.log(req.session.currentUser);
//         return res.render("shop/cart", {
//           currentUser: req.session.currentUser,
//           infoMessage: "Error while deleting the product ",
//         }); // TODO: change this message
//       }
//     })
//     .then((resultAfterDel) => {
//       console.log(resultAfterDel);

//       if (resultAfterDel) {
//         console.log(resultAfterDel);
//         // return res.send(resultAfterDel);
//         // use populate here and send the populated data

//         /***  CONFIRM WITH AGUS ONCE  */
//         return cartModel
//           .findOne({
//             $and: [
//               { customerId: req.session.currentUser._id },
//               { ordered: false },
//             ],
//           })
//           .populate({ path: "customerId" })
//           .populate({
//             path: "products",
//             populate: { path: "productId" },
//           })

//         /*** ---------------  */
//       } else {
//         console.log(req.session.currentUser);
//         return res.render("shop/cart", {
//           currentUser: req.session.currentUser,
//           infoMessage: "Error while deleting the product ",
//         }); // TODO: change this message
//       }
//     });
// });

/********************************************** */
// export
module.exports = router;
