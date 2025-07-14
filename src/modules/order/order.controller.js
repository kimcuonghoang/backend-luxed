import PayOS from "@payos/node";
import MESSAGES from "../../common/constants/message.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import Order from "./order.model.js";
import {
  PAYOS_API_KEY,
  PAYOS_CHECKSUM_KEY,
  PAYOS_CLIENT_ID,
} from "../../common/configs/enviroments.js";
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

// createPayosPayment
const payOS = new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY);
export const createPayosPayment = handleAsync(async (req, res, next) => {
  const newOrder = await Order.create({ ...req.body, paymentMethod: "PAYOS" });
  const orderCode = Number(String(Date.now()).slice(-3));
  const bodyPayos = {
    orderCode: orderCode,
    amount: newOrder.totalAmount,
    currency: "VND",
    description: "Thanh toan don hang",
    returnUrl: "https://example.com/return",
    cancelUrl: "https://example.com/cancel",
  };
  if (!bodyPayos.orderCode || !bodyPayos.amount || !bodyPayos.currency) {
    return next(
      createError(true, 400, MESSAGES.ORDER.CREATE_PAYMENT_LINK_ERROR)
    );
  }
  const createPaymentLink = await payOS.createPaymentLink(bodyPayos);
  return res.json(
    createResponse(
      true,
      200,
      MESSAGES.ORDER.CREATE_PAYMENT_LINK_SUCCESS,
      createPaymentLink
    )
  );
});

// returnConfirmPayment
export const returnConfirmPayment = handleAsync(async (req, res, next) => {});

export const confirmWebhookPayment = handleAsync(async (req, res, next) => {
  const { orderCode, status, transactionId } = req.body;
  if (!orderCode || !status || !transactionId) {
    return next(
      createError(true, 400, MESSAGES.ORDER.CONFIRM_WEBHOOK_PAYMENT_ERROR)
    );
  }
  const order = await Order.findOne({ orderCode });
  if (!order) {
    return next(createError(true, 404, MESSAGES.ORDER.NOT_FOUND));
  }
  order.paymentStatus = status;
  order.paymentMethod = "PAYOS";
  await order.save();

  return res.json(
    createResponse(true, 200, MESSAGES.ORDER.CONFIRM_WEBHOOK_PAYMENT_SUCCESS)
  );
});
