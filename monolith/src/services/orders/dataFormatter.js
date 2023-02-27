const { productById } = require("../products");

async function generateOrderDetails(obj) {
  const data = {
    id: obj.id,
    userInfo: {
      id: obj.userId,
      email: obj.email,
    },
    totalCost: obj.totalCost,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };

  const productIds = [];

  for (const pid of obj.productIds) {
    const objProduct = await productById(pid);
    const { createdAt, updatedAt, ...rest } = objProduct;
    productIds.push(rest);
  }

  data.productIds = productIds;
  return data;
}

module.exports = { generateOrderDetails };
