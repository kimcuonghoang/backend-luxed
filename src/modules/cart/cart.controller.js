import MESSAGES from "../../common/constants/message.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import Cart from "./cart.model.js";
export const getCart = handleAsync(async (req, res, next) => {
  const userId = req.user?.id || req.query.userId;
  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart) {
    return res.next(createError(true, 404, MESSAGES.CART.NOT_FOUND));
  }
  return res.json(createResponse(true, 200, MESSAGES.CART.GET_SUCCESS, cart));
});
export const updateCart = handleAsync(async (req, res, next) => {
  const { userId, items } = req.body;
  if (!userId || !Array.isArray(items)) {
    return res
      .status(400)
      .json(createResponse(false, 400, MESSAGES.CART.UPDATE_ERROR));
  }
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items });
  } else {
    cart.items = items;
    await cart.save();
  }
  // Populate lại cart trước khi trả về
  const populatedCart = await Cart.findOne({ userId }).populate(
    "items.productId"
  );
  return res.json(
    createResponse(true, 200, MESSAGES.CART.UPDATE_SUCCESS, populatedCart)
  );
});
export const deleteProductCart = handleAsync(async (req, res, next) => {
  
});
export const deleteCart = handleAsync(async (req, res, next) => {});
