const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/products/new").post(isAuthenticatedUser, createProduct);

router
  .route("/products/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(deleteProduct)
  .get(isAuthenticatedUser, getProductDetails);

module.exports = router;
