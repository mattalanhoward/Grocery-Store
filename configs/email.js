// const sgmail = require("@sendgrid/mail");

// const sendgridAPIKey = `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`;

// sgmail.setApiKey(sendgridAPIKey);

const obj = {
  subject: "SendGrid Template Demo",
  heading: "Welcome to Okaydexter",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  image:
    "https://images.unsplash.com/photo-1583552188819-4cab7da34a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
};

// let htmlTemplate = `
//         <!DOCTYPE html>
//         <html>
//         <body>
//         <h1>${obj.heading}</h1>
//         <a href="default.asp">
//         <img src=${obj.image} alt="HTML tutorial" style="width:200px;height:200px;border:0">
//         </a>
//         <p>${obj.description}</p>
//         </body>
//         </html>
// `;

/**********************************
 *   Function that frames the email content
 ***********************************/
const frameEmailTemplate = (shopCartDetails) => {
  const {
    customerId: { firstName, lastName, email, address },
    purchaseDate,
  } = shopCartDetails;

  let productList = [];
  shopCartDetails.products.map(
    ({ quantity, productId: { name, imageUrl, category, price } }) =>
      productList.push({ name, price, imageUrl, category, quantity })
  );
  let htmlTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"><head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <html> 
        <body> 
          <div class="padding">
            <div class="container-fluid row welcome text-center">
              <div class="col-12">
                <img src="">
                <h2> Dear ${firstName} ${lastName}, </h2>
                <h2 class="display-4"> Thank you for your order!</h2>
              </div>
                <hr>
                <div class="col-12">
                <p class="lead"> 
                   Your groceries will be delivered to your doorstep ASAP !!
                </p>
                </div>
            </div>
          </div>
          <hr class="my-3">
          <div>
            <h3> Order Summary </h3>
          </div>
          <div>  <!-- products -->`;
  productList.forEach((eachProduct) => {});

  htmlTemplate += `</div>
        </body>
      </html>
    `;
};

/**********************************
 *   Function that sends an e-mail;
 ***********************************/
const sendWelcomeEmail = (shopCartDetails) => {
  // console.log(shopCartDetails);
  const deliverInfo = frameEmailTemplate(shopCartDetails);
  console.log("inside send email:");
  console.log(deliverInfo);
  //   sgmail.send({
  //     to: "mattalanhoward@gmail.com",
  //     from: "mannam.sunitha@gmail.com",
  //     cc: "nagaraju.dasari@gmail.com",
  //     subject: "Send Grid Email test",
  //     content: [{ type: "text/html", value: htmlTemplate }],
  //   });
};

module.exports = { sendWelcomeEmail };
// sendWelcomeEmail(shopCartDetails);
