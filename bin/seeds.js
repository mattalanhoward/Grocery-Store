// require mongoose
const mongoose = require("mongoose");

const Product = require("../models/product.model");

// require db configuration
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
    price: 0.5,
  },
  // {
  //   name: "Mango",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/mango_wpuacv.jpg",
  //   category: "fruits",
  //   price: 1.89
  // },
  // {
  //   name: "Melon",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/melon_mocasz.jpg",
  //   category: "fruits",
  //   price: 2.49
  // },
  // {
  //   name: "Oranges",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/oranges_hckhc1.jpg",
  //   category: "fruits",
  //   price: 2.99
  // },
  // {
  //   name: "Pears",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/pears_gbeg2b.jpg",
  //   category: "fruits",
  //   price: .34
  // },
  // {
  //   name: "Strawberries",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/strawberries_kav3b0.jpg",
  //   category: "fruits",
  //   price: 2.49
  // },
  // {
  //   name: "White Grapes",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/white-grape_noothv.jpg",
  //   category: "fruits",
  //   price: 2.19
  // },
  // {
  //   name: "Watermelon",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/watermelon_vptbdy.jpg",
  //   category: "fruits",
  //   price: 3.99
  // },
  // {
  //   name: "Peppers",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/peppers_piqb6s.jpg",
  //   category: "vegetables",
  //   price: 2.49
  // },
  // {
  //   name: "Vine Tomatoes",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207907/tomatoes_r5rkgo.jpg",
  //   category: "vegetables",
  //   price: .99
  // },
  // {
  //   name: "Courgette",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/courgette_kfv1re.jpg",
  //   category: "vegetables",
  //   price: .79
  // },
  // {
  //   name: "Eggplant",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/eggplant_asotkv.jpg",
  //   category: "vegetables",
  //   price: .79
  // },
  // {
  //   name: "Butternut Squash",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/squash_fktthu.jpg",
  //   category: "vegetables",
  //   price: 1.99
  // },
  // {
  //   name: "Celery",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/celery_gdhpeh.jpg",
  //   category: "vegetables",
  //   price: .95
  // },
  // {
  //   name: "Green Beans",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/green-beans_q5kuuh.jpg",
  //   category: "vegetables",
  //   price: .99
  // },
  // {
  //   name: "Broccoli",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/broccoli_dealip.jpg",
  //   category: "vegetables",
  //   price: .79
  // },
  // {
  //   name: "Cauliflower",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/cauliflower_ipxf3v.jpg",
  //   category: "vegetables",
  //   price: 1.99
  // },
  // {
  //   name: "asparagus",
  //   imageUrl: "https://res.cloudinary.com/dcod1zxnl/image/upload/v1598207906/asparagus_g7gawm.jpg",
  //   category: "vegetables",
  //   price: 3.99
  // }
];

Product.create(products)
  .then((productsFromDB) => {
    console.log(`Created ${productsFromDB.length} products`);
    //close db after file creation
    mongoose.connection.close();
  })
  .catch((error) => console.log(`Error while creating products: ${error}`));

//node ./bin/seeds
