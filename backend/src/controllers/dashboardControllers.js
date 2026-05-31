const prisma = require("../config/prismaClient");

const summary = async (req, res) => {
  try {
    const totalProducts = await prisma.product.count();

    const totalTransactions = await prisma.transaction.count();

    const totalRevenue = await prisma.transaction.aggregate({
      _sum: {
        total_price: true,
      },
    });

    const lowStockProducts = await prisma.product.findMany({
      where: {
        quantity: {
          lte: 10,
        },
      },
    });

    res.status(200).json({
      message: "Dashboard summary",
      data: {
        totalProducts,
        totalTransactions,
        totalRevenue: totalRevenue._sum.total_price || 0,
        lowStockProducts: lowStockProducts.length,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { summary };
