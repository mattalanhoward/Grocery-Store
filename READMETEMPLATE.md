# Project Name
XYZ Grocery
## Description
This is an online grocery store in which the user can create account / login / and shop for products.  
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 

- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

- **homepage** - homepage with login / register

- **sign up** - user can register with website by entering their basic info. 

- **login** - once registration is complete, user can login with their email and password.

- **edit profile** - user can update profile information.

- **logout** - user can log out.

- **shop page** - user can select from 2 categories and scroll through items to add to cart.

- **cart page** - user can view items in cart, modify quantity or delete items.

- **checkout page** - user can review order and checkout cart.



## Backlog

List of other features outside of the MVPs scope

- admin authentication
- googlemaps page for location of shop
- about page (info about Sunitha and Matthew)
- customer email invoice
- admin email customer's order
- admin upload product route
- cart icon


## ROUTES:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
- GET /events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)


## Models

Customer Model:
1.      First name : String , required
2.      Last name: String , required
3.      Email-id: String , required, unique
4.      Address : String , required
5.      Phone number : String , required
6.      isAdmin : Boolean {true/false}
 
Product Model:
1.      Name
2.      Image
3.      Category ( fruits/ vegetables)
4.      Price per KG
 
Shopping Cart
1.      Customer Id ( Object ID)
2.      Product ID ( ObjectID) [ Array ]
3.      Date Of purchase 



## Links

### Trello

https://trello.com/b/WO64dOTc/project-2-grocery-store

### Git


[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides


[Slides Link](http://slides.com)

