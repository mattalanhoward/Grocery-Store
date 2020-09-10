// require mongoose
const mongoose = require("mongoose");
const Product = require("../models/product.model");
require("../configs/db.config");

const products = [
  {
    name: "Apples",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/apples_koxwvr.jpg",
    category: "fruits",
    price: 0.71,
  },
  {
    name: "Bananas",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207905/bananas_h8cxow.jpg",
    category: "fruits",
    price: 1.59,
  },
  {
    name: "Kiwi",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/kiwi_qvqps6.jpg",
    category: "fruits",
    price: 0.50,
  },
  {
    name: "Mango",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/mango_wpuacv.jpg",
    category: "fruits",
    price: 1.89,
  },
  {
    name: "Melon",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/melon_mocasz.jpg",
    category: "fruits",
    price: 2.49,
  },
  {
    name: "Oranges",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/oranges_hckhc1.jpg",
    category: "fruits",
    price: 2.99,
  },
  {
    name: "Pears",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/pears_gbeg2b.jpg",
    category: "fruits",
    price: 0.34,
  },
  {
    name: "Strawberries",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/strawberries_kav3b0.jpg",
    category: "fruits",
    price: 2.49,
  },
  {
    name: "White Grapes",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/white-grape_noothv.jpg",
    category: "fruits",
    price: 2.19,
  },
  {
    name: "Watermelon",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/watermelon_vptbdy.jpg",
    category: "fruits",
    price: 3.99,
  },
  {
    name: "Peppers",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/peppers_piqb6s.jpg",
    category: "vegetables",
    price: 2.49,
  },
  {
    name: "Vine Tomatoes",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/tomatoes_r5rkgo.jpg",
    category: "vegetables",
    price: 0.99,
  },
  {
    name: "Courgette",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/courgette_kfv1re.jpg",
    category: "vegetables",
    price: 0.79,
  },
  {
    name: "Eggplant",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/eggplant_asotkv.jpg",
    category: "vegetables",
    price: 0.79,
  },
  {
    name: "Butternut Squash",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/squash_fktthu.jpg",
    category: "vegetables",
    price: 1.99,
  },
  {
    name: "Celery",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/celery_gdhpeh.jpg",
    category: "vegetables",
    price: 0.95,
  },
  {
    name: "Green Beans",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/green-beans_q5kuuh.jpg",
    category: "vegetables",
    price: 0.99,
  },
  {
    name: "Broccoli",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/broccoli_dealip.jpg",
    category: "vegetables",
    price: 0.79,
  },
  {
    name: "Cauliflower",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/cauliflower_ipxf3v.jpg",
    category: "vegetables",
    price: 1.99,
  },
  {
    name: "Asparagus",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/asparagus_g7gawm.jpg",
    category: "vegetables",
    price: 3.99,
  },  
  {
    name: "Roast Beef",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1599307961/farm-grocery/roast-beef_ugfc86.jpg",
    category: "meat",
    price: 9.81,
  },
  {
    name: "Hamburger",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1599307961/farm-grocery/hamburger_x5xnto.jpg",
    category: "meat",
    price: 2.99,
  },
  {
    name: "Chicken - whole",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1599307961/farm-grocery/whole-chicken_me0v7w.jpg",
    category: "meat",
    price: 2.99,
  },
  {
    name: "Salmon",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1599307961/farm-grocery/salmon_roie9x.jpg",
    category: "meat",
    price: 5.50,
  },
  {
    name: "Beef Steak",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1599307961/farm-grocery/beef-steak_ym3hq1.jpg",
    category: "meat",
    price: 4.37,
  },
  {
    name: "Multigrain Bread",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1599492628/multigrain_tkslfq.jpg",
    category: "breads",
    price: 2.19,
  },
  {
    name: "Raisin Bread",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1599492628/raisen_fuprus.jpg",
    category: "breads",
    price: 2.19,
  },
  {
    name: "Sunflower Bread",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1599492628/sunflower-bread_u2aca8.jpg",
    category: "breads",
    price: 1.99,
  },
  {
    name: "Krenten Bollen",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1599492628/krenten-bollen_qg1g8m.jpg",
    category: "breads",
    price: 1.49,
  },
  {
    name: "Dark Bread",
    imageUrl:
      "https://res.cloudinary.com/dcod1zxnl/image/upload/v1599492628/dark-bread_gmbgda.jpg",
    category: "breads",
    price: 1.04,
  },


];

Product.create(products)
  .then((productsFromDB) => {
    console.log(`Created ${productsFromDB.length} products`);
    //close db after file creation
    mongoose.connection.close();
  })
  .catch((error) => console.log(`Error while creating products: ${error}`));

//node ./bin/seeds
