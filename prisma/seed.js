const { PrismaClient, ProductStatus } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // optional: clear data dulu (biar gak duplicate)
  await prisma.product.deleteMany();

  // seed products
  await prisma.product.createMany({
    data: [
      {
        name: "Indomie Goreng",
        quantity: 100,
        status: ProductStatus.Available,
        price: 3000,
      },
      {
        name: "Nescafe Ice Black 220ml",
        quantity: 50,
        status: ProductStatus.Available,
        price: 10000,
      },
      {
        name: "Teh Botol Sosro",
        quantity: 80,
        status: ProductStatus.Available,
        price: 5000,
      },
      {
        name: "Hello Panda Strawberry",
        quantity: 40,
        status: ProductStatus.Available,
        price: 12000,
      },
      {
        name: "SilverQueen Chocolate",
        quantity: 20,
        status: ProductStatus.Available,
        price: 15000,
      },

      // edge case: stock kecil
      {
        name: "Ultra Milk 250ml",
        quantity: 1,
        status: ProductStatus.Available,
        price: 6000,
      },

      // edge case: sold out
      {
        name: "Oreo Vanilla",
        quantity: 0,
        status: ProductStatus.SoldOut,
        price: 8000,
      },
    ],
  });

  console.log("✅ Seeding products success!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
