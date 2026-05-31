const { ProductStatus } = require("@prisma/client");
const prisma = require("../config/prismaClient");

const create = async (req, res) => {
  try {
    // 1. Retrieve input data, validate input and sanitize + normalize data after pass validation
    const { name, quantity, status, price } = req.body;
    console.log(req.body);
    if (!name || !quantity || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({ message: "Invalid input price!" });
    }
    if (typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({ message: "Invalid input quantity!" });
    }

    const cleanName = name.trim();
    let selectedStatus = ProductStatus.Available;
    const arrStatus = Object.values(ProductStatus);
    if (status) {
      const isAvailableStatus = arrStatus.includes(status);
      if (isAvailableStatus) {
        selectedStatus = status;
      } else {
        return res.status(400).json({ message: "Status didn't found!" });
      }
    }

    // 2. Authorize the process, regarding to the role sending from token
    const role = req.user.role;

    if (role !== "Admin" && role !== "Cashier") {
      return res.status(403).json({ message: "Forbidden!" });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: cleanName,
        quantity: quantity,
        status: selectedStatus,
        price: price,
      },
    });

    // 3. Return response
    res
      .status(201)
      .json({ message: "Success create a product", data: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const selectAll = async (req, res) => {
  try {
    // 1. Retrieve page and limit + set default
    let page = req.query.page;
    let limit = req.query.limit;

    page = page || 1;
    limit = limit || 10;

    // 2. Parse query params type and validate, then init offset
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    if (
      parsedPage < 1 ||
      parsedLimit < 1 ||
      isNaN(parsedPage) ||
      isNaN(parsedLimit)
    ) {
      return res.status(400).json({ message: "Invalid page or limit format!" });
    }

    const offset = (parsedPage - 1) * parsedLimit;

    let filter = {};

    // 3. Retrieve filtering query params + validate

    const status = req.query.status;
    const name = req.query.name;
    const arrStatus = Object.values(ProductStatus);

    if (status) {
      const isAvailableStatus = arrStatus.includes(status);
      if (isAvailableStatus) {
        filter["status"] = status;
      } else {
        return res.status(400).json({ message: "Status didn't found!" });
      }
    }

    if (name) {
      const cleanName = name.trim();
      if (cleanName) {
        filter["name"] = {
          contains: cleanName,
          mode: "insensitive",
        };
      }
    }

    // 4. Process the filtering, according by the filter, page or limit
    const products = await prisma.product.findMany({
      take: parsedLimit,
      skip: offset,
      where: filter,
    });

    const total = await prisma.product.count({
      where: filter,
    });

    // 5. Return Response
    res.status(200).json({
      message: "List All Products",
      meta: {
        page: parsedPage,
        limit: parsedLimit,
        total: total,
        totalPages: Math.ceil(total / parsedLimit),
      },
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
const edit = async (req, res) => {
  try {
    const { name, quantity, status, price } = req.body;

    // 1. Retrieve Id and check the format before parsing

    const { id } = req.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "Invalid ID format!" });
    }

    // 2. Check product at table DB using ID

    const product = await prisma.product.findUnique({
      where: { id: parsedId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // 3. Authorize the process, regarding to the role sending from token
    const role = req.user.role;

    if (role !== "Admin" && role !== "Cashier") {
      return res.status(403).json({ message: "Forbidden!" });
    }

    // 4. Update the data, according to the payload from client
    let updatedData = {};

    if (name !== undefined) {
      const cleanName = name.trim();
      if (cleanName === "") {
        return res.status(400).json({ message: "Bad Client Request!" });
      }
      updatedData["name"] = cleanName;
    }
    if (price !== undefined) {
      if (typeof price !== "number" || price < 0) {
        return res.status(400).json({ message: "invalid price format!" });
      }
      updatedData["price"] = price;
    }
    if (quantity !== undefined) {
      if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ message: "invalid quantity format!" });
      }
      updatedData["quantity"] = quantity;
    }
    const arrStatus = Object.values(ProductStatus);
    if (status !== undefined) {
      const isAvailableStatus = arrStatus.includes(status);
      if (isAvailableStatus) {
        updatedData["status"] = status;
      } else {
        return res.status(400).json({ message: "Status didn't found!" });
      }
    }

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "Bad request client!" });
    }

    const updated = await prisma.product.update({
      where: { id: parsedId },
      data: updatedData,
    });

    // 4. Return Response
    res.status(200).json({ message: "Data changed", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const remove = async (req, res) => {
  try {
    // 1. Retrieve Id and check the format before parsing

    const { id } = req.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "Invalid ID format!" });
    }

    // 2. Check product at table DB using ID

    const product = await prisma.product.findUnique({
      where: { id: parsedId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // 3. Authorize the process, regarding to the role sending from token
    const role = req.user.role;

    if (role !== "Admin" && role !== "Cashier") {
      return res.status(403).json({ message: "Forbidden!" });
    }

    const deleted = await prisma.product.delete({
      where: {
        id: parsedId,
      },
    });

    // 4. Return Response
    res.status(200).json({
      message: "Product deleted successfully!",
      data: { id: deleted.id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { create, selectAll, edit, remove };
