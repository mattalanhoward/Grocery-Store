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
      // console.log(" CART products: ");

      if (productsInCart) {
        console.log(productsInCart);
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
      } else {
        console.log(req.session.currentUser);
        return res.render("shop/cart", {
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
      console.log(" inc remented result: ");
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
          infoMessage: "Error while updating the quantityof the product ",
        }); // TODO: change this message
      }
    })
    .catch((error) => console.log("error while deletign the products ", error));
});

/************************************************/
//        HTTP-DELETE-request: /cart/delete-Product
//
//      Removes the product from the cart
//
/************************************************/
router.delete("/deleteProduct/:id", sessionStore, (req, res) => {
  console.log("Delete product from cart ");
  console.log(req.params.id);
  // We have a user in currentUser in the sesion
  // catexample = cartModel.findOne({customerId: session, ordered: false})
  // cartModel.findByIdAndUpdate(catexample._id, {$pull:{"products.productOd: req.paramsOd"}})
  cartExample = cartModel
    .findOne({
      $and: [{ customerId: req.session.currentUser._id }, { ordered: false }],
    })

    .then((responseFromDB) => {
      console.log(responseFromDB);

      return cartModel.findByIdAndUpdate(
        responseFromDB._id,
        { $pull: { products: { productId: req.params.id } } },
        { new: true }
      );
    })
    .then((resultAfterDel) => {
      console.log(resultAfterDel);

      if (resultAfterDel) {
        console.log(resultAfterDel);
        return res.send(resultAfterDel);
      } else {
        console.log(req.session.currentUser);
        return res.render("shop/cart", {
          currentUser: req.session.currentUser,
          infoMessage: "Error while updating the quantityof the product ",
        }); // TODO: change this message
      }
    });
});

/********************************************** */
// export
module.exports = router;
