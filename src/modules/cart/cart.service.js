import Cart from "./cart.model.js";

export const createCartForUser = async (userId) => {
  await Cart.create({ userId: userId, items: [] });
};
