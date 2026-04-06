const prisma = require("../config/prismaClient");

const create = async (req, res) => {
  try {
    // 1. Retrieve request body, then validate it
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length < 1) {
      return res
        .status(400)
        .json({ message: "Invalid order format, please input proper order" });
    }

    let selectedIdProduct = [];
    items.forEach((item, index) => {
      selectedIdProduct.push(item.product_id);
    });

    // 2. Create productMap as source of truth, to match between request and product availability
    let productMap = new Map();

    const listProducts = await prisma.product.findMany({
      where: { id: { in: selectedIdProduct } },
    });

    listProducts.forEach((item, index) => {
      productMap.set(item.id, item);
    });

    // 3. Check request order first before create transaction
    let processedItems = [];
    let total_price = 0;

    for (let i = 0; i < items.length; i++) {
      const product = productMap.get(items[i].product_id);

      if (product === undefined) {
        return res
          .status(404)
          .json({ message: "Product not found!", data: [] });
      }

      if (
        items[i].quantity < 1 ||
        typeof items[i].quantity !== "number" ||
        isNaN(items[i].quantity)
      ) {
        return res.status(400).json({
          message: "Invalid total order, please input the proper quantity!",
          data: [],
        });
      }

      if (product.status !== "Available") {
        return res.status(400).json({ message: "Product sold out!", data: [] });
      }

      if (product.quantity < items[i].quantity) {
        return res.status(400).json({ message: "Out of stock!", data: [] });
      }

      //   console.log(product);

      let subtotal = product.price * items[i].quantity;

      processedItems.push({
        product_id: items[i].product_id,
        quantity: items[i].quantity,
        price: product.price,
        subtotal: subtotal,
      });
      total_price += subtotal;
    }

    // 4. Create Transaction after passing input request order
    const user_id = req.user.id;
    const result = await prisma.$transaction(async (tx) => {
      const createTransaction = await tx.transaction.create({
        data: {
          user_id,
          total_price,
        },
      });

      for (let i = 0; i < processedItems.length; i++) {
        const item = processedItems[i];
        await tx.transactionItem.create({
          data: {
            transaction_id: createTransaction.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
          },
        });

        await tx.product.update({
          data: {
            quantity: { decrement: item.quantity },
          },
          where: { id: item.product_id },
        });
      }

      return tx.transaction.findUnique({
        where: { id: createTransaction.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    });

    res
      .status(201)
      .json({ message: "Successfully created new transaction", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
const selectAll = async (req, res) => {};
const edit = async (req, res) => {};
const remove = async (req, res) => {};

module.exports = { create, selectAll, edit, remove };
