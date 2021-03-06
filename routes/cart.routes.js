const express = require("express");
const router = express.Router();

const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");

const sessionStore = require("./session.middleware");
const sendEmail = require("../configs/email");
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
        // console.log(productsInCart);
        const {
          _id: cartId,
          customerId: { firstName, lastName },
          products: [...products],
        } = productsInCart;
        if (products.length === 0) {
          return res.render("shop/cart", {
            cartCnt: req.session.cartCount,
            envUrl: process.env.URL,
            currentUser: req.session.currentUser,
            infoMessage: "Cart is Empty",
          });
        }
        res.render("shop/cart", {
          cartCnt: req.session.cartCount,
          envUrl: process.env.URL,
          currentUser: req.session.currentUser,
          cartId,
          firstName,
          lastName,
          products,
        });
      } else {
        // console.log(req.session.currentUser);
        return res.render("shop/cart", {
          cartCnt: req.session.cartCount,
          envUrl: process.env.URL,
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
  // console.log(" inc quantity clicked ... ");
  // console.log(req.params.id);

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
      // console.log(resultFromDB);
      if (resultFromDB) {
        const retProduct = resultFromDB.products.filter(
          (ele) => ele.productId == req.params.id
        );
        // console.log(resultFromDB.products);
        req.session.cartCount++;
        return res.send({ retProduct, cartCnt: req.session.cartCount });
      } else {
        // console.log(req.session.currentUser);
        return res.render("shop/cart", {
          cartCnt: req.session.cartCount,
          envUrl: process.env.URL,
          currentUser: req.session.currentUser,
          errorMessage: "Error while updating the quantity of the product ",
        }); // TODO: change this message
      }
    })
    .catch((error) => {
      // console.log("error while updating the quantity of the product", error);
      return res.render("shop/cart", {
        cartCnt: req.session.cartCount,
        envUrl: process.env.URL,
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
      // console.log(" decremented result: ");

      if (resultFromDB) {
        const retProduct = resultFromDB.products.filter(
          (ele) => ele.productId == req.params.id
        );
        console.log(retProduct);
        req.session.cartCount--;
        // return res.send(retProduct);
        return res.send({ retProduct, cartCnt: req.session.cartCount });
      } else {
        // console.log(req.session.currentUser);
        return res.render("shop/cart", {
          cartCnt: req.session.cartCount,
          envUrl: process.env.URL,
          currentUser: req.session.currentUser,
          errorMessage:
            "Error while updating the quantity of the product " + error,
        }); // TODO: change this message
      }
    })
    .catch((error) => {
      return res.render("shop/cart", {
        cartCnt: req.session.cartCount,
        envUrl: process.env.URL,
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
  // console.log("Delete product from cart ");
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
      // console.log(" response from dB after deletion ");

      if (resultAfterDel) {
        console.log(resultAfterDel);

        /***  CONFIRM WITH AGUS ONCE  */
        // console.log(" propulating the records afte deletion ... ");
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
      // console.log(" Result of propulating the records after deletion ... ");
      // console.log(populatedProductInfo.products.length);
      if (!populatedProductInfo) {
        // HOW to handle this case :
        return res.render("shop/cart", {
          cartCnt: req.session.cartCount,
          envUrl: process.env.URL,
          currentUser: req.session.currentUser,
          infoMessage: "Error while deleting the product" + error,
        });
      }
      let prodList = [];
      if (populatedProductInfo.products.length === 0) {
      } else {
        // console.log(populatedProductInfo.products[0].productId);
        // console.log(" ------- ");

        populatedProductInfo.products.forEach(
          ({ quantity, productId: { _id, name, imageUrl, category, price } }) =>
            prodList.push({ _id, name, price, imageUrl, category, quantity })
        );
      }
      console.log(prodList);
      const finalProdCnt = prodList.reduce(
        (counter, ele) => counter + ele.quantity,
        0
      );
      console.log(finalProdCnt);
      req.session.cartCount = finalProdCnt;
      return res.send({ prodList, cartCnt: req.session.cartCount });
      // return res.send(prodList);
    })
    .catch((error) => {
      return res.render("shop/cart", {
        cartCnt: req.session.cartCount,
        envUrl: process.env.URL,
        currentUser: req.session.currentUser,
        infoMessage: "Error while deleting the product" + error,
      });
    });
});

/************************************************/
//        HTTP-GET-request: /cart/check-out
//
//      Check Out,  send invoice, update cart as delivered
//
/************************************************/
router.get("/check-out/:cartid", sessionStore, (req, res) => {
  // console.log(" checkout clicked ");
  // console.log(req.params.cartid);

  cartModel
    .findByIdAndUpdate(
      req.params.cartid,
      { $set: { purchaseDate: new Date(), ordered: true } },
      { new: true }
    )
    .then((updatedRecord) => {
      // console.log("updated the ordered to true");
      // console.log(updatedRecord);
      const { _id: cartId } = updatedRecord;
      return cartModel
        .findOne({ _id: cartId })
        .populate({ path: "customerId" })
        .populate({
          path: "products",
          populate: { path: "productId" },
        });
    })
    .then((populatedResult) => {
      console.log(" result for placing order");

      // SEND EMAIL
      sendEmail.sendWelcomeEmail(populatedResult);
      const {
        _id: cartId,
        customerId: { firstName, lastName, address, email, phoneNumber },
        products: [...products],
      } = populatedResult;

      req.session.cartCount = 0;
      res.render("shop/checkout", {
        cartCnt: req.session.cartCount,
        envUrl: process.env.URL,
        currentUser: req.session.currentUser,
        cartId,
        firstName,
        lastName,
        address,
        email,
        phoneNumber,
        products,
      });
    })
    .catch((error) => {
      return res.render("shop/cart", {
        cartCnt: req.session.cartCount,
        envUrl: process.env.URL,
        currentUser: req.session.currentUser,
        errorMessage: "Error while placing order" + error,
      });
    });
});

/********************************************** */
// export
module.exports = router;
