const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const adminSession = require("./adminSessionMWare");

const mongoose = require("mongoose");
const fileUploader = require("../configs/cloudinary.config");

/************************************************/
//        HTTP-GET-request: /product/create
//         uploads  products
//        Renders the  product-upload
/************************************************/
router.get("/create", adminSession, (req, res) => {
  console.log(" create product requested ");
  res.render("product/product-create", {
    cartCnt: req.session.cartCount,
    currentUser: req.session.currentUser,
  });
});

/************************************************/
//        HTTP-GET-POSTrequest: /product/create
//         uploads  products
//        Renders the  product-upload
/************************************************/
router.post(
  "/create",
  adminSession,
  fileUploader.single("productImage"),
  (req, res) => {
    console.log(" create product POST requested ");
    console.log(req.body);
    console.log(req.file);
    const { productname: name, category, price } = req.body;
    // let modifyPrice = parseInt(price, 2).toFixed(2);
    // console.log(modifyPrice);
    productModel
      .create({ name, category, price, imageUrl: req.file.path })
      .then((resultFromDB) => {
        console.log(" successfulyy created product", resultFromDB);

        res.render("product/product-create", {
          cartCnt: req.session.cartCount,
          currentUser: req.session.currentUser,
          successMessage: "New Product added to shop successfully!!",
        });
      })
      .then((error) => console.log(" Error in creating product", error));
  }
);

/************************************************/
//        HTTP-GET-request: /product/list
//         view all the products for editing
//        Renders the  product lists page
/************************************************/
router.get("/list", adminSession, (req, res) => {
  // console.log(" list product requested ");

  productModel
    .find()
    .then((productsFromDB) => {
      // console.log(productsFromDB);
      if (productsFromDB) {
        // console.log(" products list from DB ...");
        if (productsFromDB.length === 0) {
          return res.render("product/product-view", {
            cartCnt: req.session.cartCount,
            currentUser: req.session.currentUser,
            envUrl: process.env.URL,
            errorMessage: "SHOP is Empty",
          });
        }
        res.render("product/product-view", {
          cartCnt: req.session.cartCount,
          currentUser: req.session.currentUser,
          envUrl: process.env.URL,
          productsList: productsFromDB,
        });
      } else {
        // console.log(req.session.currentUser);
        return res.render("product/product-view", {
          cartCnt: req.session.cartCount,
          currentUser: req.session.currentUser,
          envUrl: process.env.URL,
          errorMessage: "SHOP is Empty",
        });
      }
    })
    .catch((error) =>
      res.render("product/product-view", {
        erroeMessage: "Not authorozed to list the products in the shop" + error,
      })
    );
});

/************************************************/
//        HTTP-GET-request: /product/list
//         view all the products for editing
//        Renders the  product lists page
/************************************************/
router.delete("/deleteProduct/:id", adminSession, (req, res) => {
  productModel
    .findByIdAndDelete({ _id: req.params.id })
    .then((resAfterDel) => {
      if (resAfterDel) {
        return res.send({
          resAfterDel,
          cartCnt: req.session.cartCount,
          currentUser: req.session.currentUser,
          envUrl: process.env.URL,
        });
      }
    })
    .catch((error) =>
      console.log(" error while deeting product from db:", error)
    );
});

// /product/editProduct"
/************************************************/
//        HTTP-GET-request: /product/editProduct
//         editing  products
//        Renders the  product-editing page
/************************************************/
router.get("/edit/:id", adminSession, (req, res) => {
  console.log(" Editing product requested ", req.params.id);
  const { id } = req.params;
  productModel
    .findById(id)
    .then((productToEdit) => {
      // console.log(" result from DB", productToEdit);
      res.render("product/product-edit", {
        cartCnt: req.session.cartCount,
        currentUser: req.session.currentUser,
        productToEdit,
      });
    })
    .catch((error) =>
      console.log(`Error while getting a single prodcut for edit: ${error}`)
    );
});

/************************************************/
//        HTTP-POST-request: /product/editProduct
//         editing  products
//        Renders the  product-editing page
/************************************************/
router.post("/edit", fileUploader.single("image"), (req, res) => {
  console.log(" post edit entered ", req.body);
  const { productId: id } = req.body;
  const { productname: name, price, category } = req.body;
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = req.body.existingImage;
  }

  console.log(imageUrl);
  productModel
    .findByIdAndUpdate(id, { name, price, category, imageUrl }, { new: true })
    .then((updatedResDB) => {
      // console.log(updatedResDB);

      res.render("product/product-edit", {
        cartCnt: req.session.cartCount,
        currentUser: req.session.currentUser,
        envUrl: process.env.URL,
        productToEdit: updatedResDB,
        successMessage: "Product updated successfully ",
      });
    })
    .catch((error) =>
      console.log(`Error while updating a single movie: ${error}`)
    );
});

/********************** */
module.exports = router;
