// require mongoose
const mongoose = require('mongoose');


const Product = require('../models/product.model')

// require db configuration
require('../configs/db.config');

const products = [
  {
    name: "Apples",
    image: "images/apples.jpg",
    category: "fruits",
    price: .71
  },
  {
    name: "Bananas",
    image: "images/bananas.jpg",
    category: "fruits",
    price: 1.59
  },
  {
    name: "Kiwi",
    image: "images/kiwi.jpg",
    category: "fruits",
    price: .50
  },
  {
    name: "Mango",
    image: "images/mango.jpg",
    category: "fruits",
    price: 1.89
  },
  {
    name: "Melon",
    image: "images/melon.jpg",
    category: "fruits",
    price: 2.49
  },
  {
    name: "Oranges",
    image: "images/oranges.jpg",
    category: "fruits",
    price: 2.99
  },
  {
    name: "Pears",
    image: "images/pears.jpg",
    category: "fruits",
    price: .34
  },
  {
    name: "Strawberries",
    image: "images/strawberries.jpg",
    category: "fruits",
    price: 2.49
  },
  {
    name: "White Grapes",
    image: "images/white-grape.jpg",
    category: "fruits",
    price: 2.19
  },
  {
    name: "Watermelon",
    image: "images/watermelon.jpg",
    category: "fruits",
    price: 3.99
  },
  {
    name: "Peppers",
    image: "images/peppers.jpg",
    category: "vegetables",
    price: 2.49
  },
  {
    name: "Vine Tomatoes",
    image: "images/tomatoes.jpg",
    category: "vegetables",
    price: .99
  },
  {
    name: "Courgette",
    image: "images/courgette.jpg",
    category: "vegetables",
    price: .79
  },
  {
    name: "Eggplant",
    image: "images/eggplant.jpg",
    category: "vegetables",
    price: .79
  },
  {
    name: "Butternut Squash",
    image: "images/squash.jpg",
    category: "vegetables",
    price: 1.99
  },
  {
    name: "Celery",
    image: "images/celery.jpg",
    category: "vegetables",
    price: .95
  },
  {
    name: "Green Beans",
    image: "images/green-beans.jpg",
    category: "vegetables",
    price: .99
  },
  {
    name: "Broccoli",
    image: "images/broccoli.jpg",
    category: "vegetables",
    price: .79
  },
  {
    name: "Cauliflower",
    image: "images/cauliflower.jpg",
    category: "vegetables",
    price: 1.99
  },
  {
    name: "asparagus",
    image: "images/asparagus.jpg",
    category: "vegetables",
    price: 3.99
  }
];


Product.create(products)
  .then(productsFromDB => {
    console.log(`Created ${productsFromDB.length} products`);
    //close db after file creation
    mongoose.connection.close();
  })
  .catch(error => console.log(`Error while creating products: ${error}`));


//node ./bin/seeds