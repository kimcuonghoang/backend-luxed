import MESSAGES from "../../common/constants/message.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import Order from "./order.model.js";
export const getListOrderByAdmin = handleAsync(async (req, res, next) => {
  const orderList = await Order.find();
  if (!orderList) next(createError(true, 404, MESSAGES.ORDER.NOT_FOUND));
  return res.json(
    createResponse(true, 200, MESSAGES.ORDER.GET_BY_ID_SUCCESS, orderList)
  );
});
export const getListOrderOwner = handleAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const listOrdersOwnerShip = await Order.find({
    userId,
  });
  if (!listOrdersOwnerShip)
    return next(createError(true, 404, MESSAGES.ORDER.NOT_FOUND));
  return res.json(
    createResponse(
      true,
      200,
      MESSAGES.ORDER.GET_BY_ID_SUCCESS,
      listOrdersOwnerShip
    )
  );
});
export const createOrder = handleAsync(async (req, res, next) => {
  const data = await Order.create(req.body);
  if (!data) next(createError(true, 404, MESSAGES.ORDER.CREATE_ERROR));
  return res.json(
    createResponse(true, 201, MESSAGES.ORDER.CREATE_SUCCESS, data)
  );
});
export const updateAddressOrder = handleAsync(async (req, res, next) => {});
export const cancelOrder = handleAsync(async (req, res, next) => {});
