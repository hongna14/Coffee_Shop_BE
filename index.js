const db = require("./database");

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/product", async (req, res) => {
  const query = `SELECT *
    FROM product 
    INNER JOIN product_type ON product.product_type_id = product_type.product_type_id `;
  const raw = await db.getMany(query);
  const result = raw.map((item) => {
    return {
      productId: item.product_id,
      productName: item.product_name,
      productPrice: item.product_price,
      productType: item.product_type_name,
    };
  });
  res.send(result);
});

app.get("/product/:productId", async (req, res) => {
  const productId = req.params.productId;
  const query = `SELECT *
  FROM product 
  INNER JOIN product_type ON product.product_type_id = product_type.product_type_id
  WHERE product.product_id =  ${productId}`;
  const raw = await db.getOne(query);
  if (!raw) {
    res.send("This product is unvailable!!! 🥱😫😫");
    return;
  }
  const result = {
    productId: raw.product_id,
    productName: raw.product_name,
    productPrice: raw.product_price,
    productType: raw.product_type_name,
  };

  res.send(result);
  //res.send(`This is details of ${req.params.productId}`);
});

app.post("/product", (req, res) => {
  const payload = req.body;
  const query = `INSERT INTO product (product_name, product_price , product_type_id) VALUES
  ('${payload.productName}', ${payload.productPrice}, ${payload.productTypeId});`;
  db.executeQuery(query);
  res.send("created 🤣");
});

app.put("/product/:productId", async (req, res) => {
  const productId = req.params.productId;
  const payload = req.body;
  const getDetailsQuery = `SELECT *
  FROM product 
  WHERE product_id =  ${productId}`;
  const productDetails = await db.getOne(getDetailsQuery);

  const updateQuery = `UPDATE product
  SET product_name = '${payload.productName || productDetails.product_name}',
  product_type_id = ${payload.productTypeId || productDetails.product_type_id},
  product_price = ${payload.productPrice || productDetails.product_price}
  WHERE product_id =  ${productId}`;
  await db.executeQuery(updateQuery);

  res.send("updated 🤣");
});

app.delete("/product/:productId", async (req, res) => {
  const productId = req.params.productId;

  const query = `DELETE
  FROM product 
  WHERE product_id =  ${productId}`;

  await db.executeQuery(query)

  res.send("deleted 😍");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
