const express = require("express");
const router = express.Router();
const {
  create,
  selectAll,
  edit,
  remove,
} = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/products", verifyToken, create);
router.get("/products", selectAll);
router.put(`/products/:id`, verifyToken, edit);
router.delete(`/products/:id`, verifyToken, remove);

module.exports = router;
