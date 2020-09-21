const sgmail = require("@sendgrid/mail");

sgmail.setApiKey(process.env.SENDGRIDAPIKEY);

/**********************************
 *   Function that frames the email content
 ***********************************/
const frameEmailTemplate = (shopCartDetails) => {
  const {
    customerId: { _id, firstName, lastName, email, address },
    purchaseDate,
  } = shopCartDetails;
  let cardId = "ID_" + _id.toString().slice(0, 10).toUpperCase();
  // console.log(cardId);
  // console.log("insode frameEmailTemplate");
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
            <div class="col-sm-12 text-center mt-3 p-3 bg-success">
              <h5>${firstName} ${lastName},</h5>
              <h2 class="my-3"> We've received your order! <br>
                Thank you for using Farm Grocer</h2>
              <h4> Your cart will be delivered to ${address} by one of our friendly team members within 24 hours</h4> <br>
              <h4>Please contact us at <a href="${email}">Farm Grocer</a> if you have any questions or concerns.  </h4>
            </div>`;
  htmlTemplate += `<hr> <div class="m-2">
                        <h2 class="text-center">ORDER SUMMARY </h2>
                        <h3 class="text-center">Order Id: <p id="order-id"> ${cardId}</p></h3>
                        </div>`;
  htmlTemplate += `
  <table class="table container-fluid" id="checkout-cart">
    <tbody>`;
  let grandTotal = 0;
  productList.forEach((eachProduct) => {
    let subtot = (eachProduct.price * eachProduct.quantity).toFixed(2);
    grandTotal += Number(subtot);
    htmlTemplate += `
      <tr class="product-table">
        <td id="img-container">
          <div>
            <img width="100" height="75" class="rounded " id="checkout-img" src=${eachProduct.imageUrl}>
          </div>
        </td>
        <td>
          <div>
            <h3> ${eachProduct.name} </h3>
            <p> Qty: <span class="qty"> ${eachProduct.quantity} </span> <br>
              €/kg : €<span class="price">${eachProduct.price}</span> <br>
              Total item Cost: € <span class="subtot"> ${subtot}</span></p>
          </div>
        </td>
      </tr>`;
  });
  console.log(grandTotal);
    grandTotal = grandTotal.toFixed(2);
  htmlTemplate += `</tbody> </table>`;
  htmlTemplate += `<hr> <div class="m-2"> 
                        <h3 class="text-center">Order Total: <p id="grand-tot">€ ${grandTotal}</p>
                        </h3>
                        </div>`;
  htmlTemplate += `</div> </body>  </html>`;

  return htmlTemplate;
};

/**********************************
 *   Function that sends an e-mail;
 ***********************************/
const sendWelcomeEmail = (shopCartDetails) => {
  console.log(shopCartDetails);
  const deliverInfo = frameEmailTemplate(shopCartDetails);
  console.log("inside send email:");
  // console.log(deliverInfo);

  const {
    customerId: { _id, email },
  } = shopCartDetails;
  let cardId = "ID_" + _id.toString().slice(0, 10).toUpperCase();
  console.log(email);
  sgmail
    .send({
      to: email, //"mattalanhoward@gmail.com", //"mannam.sunithadasari@gmail.com",  //"mattalanhoward@gmail.com",  //"nagaraju.dasari@gmail.com",  // "mannam.sunitha@gmail.com",
      from: "mannam.sunitha@gmail.com",
      cc: "mattalanhoward@yahoo.com",
      subject: "Invoice for your Order: " + cardId,
      content: [{ type: "text/html", value: deliverInfo }],
    })
    .then((emailRes) => {
      console.log("EMEAIL SENT", emailRes);
    })
    .catch((err) => console.log("ERROR IN THE EMAIL", err.response.body));
  //  console.log("email sent successfully ");
};

module.exports = { sendWelcomeEmail };
// sendWelcomeEmail(shopCartDetails);
