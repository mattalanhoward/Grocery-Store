# express-boilerplate

Boilerplate with bootstrap cdn

## Setup

1.  npm install to install the node_modules
2.  create a .env file based on this information
    PORT=3000
    ENV=development
    DB_NAME=myDatabase
    CLOUDINARY_NAME= cloudinaryName
    CLOUDINARY_KEY= cloudinaryKey
    CLOUDINARY_SECRET= cloudinarySecret
    MONGODB_URI= MongoDB_URL
    SESS_SECRET= SecretKeyForPasswordEncryption
    SENDGRIDAPIKEY = sendGridAPIKeyForEmailFunctionality

# Project Name

Farm Grocer

## Description

This is an online grocery store in which the user can register / login / and shop the products.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

- **Homepage** - homepage with login / register

- **Register** - user can register with website by entering their basic info.

- **Login** - once registration is complete, user can login with their email and password.

- **Edit profile** - user can update profile information.

- **Logout** - user can log out.

- **Shop page** - user can scroll through items and add to cart.

- **Cart page** - user can view items in cart, modify quantity or delete items.

- **Checkout page** - user can view the order summary.

- **Admin - Home page** - Admin can view prducts in shop.

- **Admin - Create product page** - Admin can upload a new product to shop.

- **Admin - view products page** - Admin can view,edit and delete products in the shop.

- **Admin - Edit products page** - Admin can edit a product details in the shop.

## Backlog

List of other features outside of the MVPs scope

- About page ( info about developers [Sunitha and Matthew] )
- Customer email invoice
- Admin authentication and Login
- Admin upload product route
- Admin List/edit/delete products from Shop
- Cart icon
- Fruit/Vegetable/Breads/Meat Categories

## ROUTES:

- GET /

  - renders index.hbs

- GET /register

  - renders register.hbs with form for user to register

- POST /register

  - body:
    - firstname
    - lastname
    - email
    - password
    - address
    - phone number

- GET /login

  - renders login.hbs with form for login
    - email
    - password

- POST /login

  - renders the home page with access to shop, edit-profile,categories,cart ( if user is customer)
  - renders the home page with access to edit-profile,upload product, view all products (For editing and deleting) ( if user is shop-owner)

- GET /edit-profile

  - renders edit-profile.hbs

- POST /edit-profile

  - renders the edit-profile page to edit the profile information.
    - firstname
    - lastname
    - email
    - password
    - address
    - phone number

- GET /shop

  - renders shop.hbs with all products listed

- POST /shop

  - product id

- GET cart/:id (cartId of the user which is not checked-out)

  - renders cart.hbs

- GET cart/incQty/:id (cartId of the user which is not checked-out)

  - renders cart.hbs with incremented quantity of the product

- GET cart/decQty/:id (cartId of the user which is not checked-out)

  - renders cart.hbs with decremented quantity of the product

- GET cart/deleteProduct/:id (cartId of the user which is not checked-out)

  - renders cart.hbs without the prodcut that was deleted

- GET check-out/:cartid (cartId of the user which is not checked-out)

  - renders checkout.hbs with the Summary of the products ordered.

- GET /product/create

  - renders product-create.hbs where the shop-owner can add new products to the shop.

- GET /product/list

  - renders product-view.hbs where the shop-owner can view all the products in the shop and he can edit or delete the products.

- GET /product/deleteProduct/:id (productID to be deleted)

  - renders product-view.hbs without the product that was deleted.

- GET /product/edit/:id (productID to be edited)

  - renders product-edit.hbs where shop-owner can edit the product details.

- POST /product/edit/

  -renders product-edit.hbs with updated details of the product and a link to view the shop.

## Models

User Model:

1.                  First name : String , required
2.                  Last name: String , required
3.                  Password: String , required
4.                  Email-id: String , required, unique
5.                  Address : String , required
6.                  Phone number : String , required
7.                  isAdmin : Boolean {true/false}

Product Model:

1.                  Name
2.                  Image
3.                  Category ( fruits/ vegetables)
4.                  Price per KG

Cart Model:

1.                  Customer Id ( Object ID)
2.                  Ordered {true,false}
3.                  Array [ ProductID -> ObjectID , Quantity ]
4.                  Date Of purchase

## Links

### Trello

https://trello.com/b/WO64dOTc/project-2-grocery-store

### Git

https://github.com/mattalanhoward/Grocery-Store

[Deploy Link](https://farm-grocer.herokuapp.com/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1YozWgY7repnfUxIVvK1ln1pKCKhr4ztbdy3X9AwB0ls/edit#slide=id.p)
