import PayOS from "@payos/node";
import MESSAGES from "../../common/constants/message.js";
import createError from "../../common/utils/error.js";
import handleAsync from "../../common/utils/handleAsync.js";
import createResponse from "../../common/utils/response.js";
import Order from "./order.model.js";
import Cart from "../cart/cart.model.js";
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
  return res.json(createResponse(true, 200, listOrdersOwnerShip));
});
export const createOrder = handleAsync(async (req, res, next) => {
  const data = await Order.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.ORDER.CREATE_SUCCESS, data)
  );
});
export const updateAddressOrder = handleAsync(async (req, res, next) => {});
export const cancelOrder = handleAsync(async (req, res, next) => {});

// createPayosPayment
const payOS = new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY);
export const createPayOsPayment = handleAsync(async (req, res, next) => {
  const orderCode = Number(String(Date.now()).slice(-3));
  const newOrder = await Order.create({
    ...req.body,
    orderCode,
    paymentMethod: "PAYOS",
  });

  // Xóa giỏ hàng user sau khi tạo order thành công
  if (req.body.userId) {
    await Cart.deleteOne({ userId: req.body.userId });
  }

  const bodyPayos = {
    orderCode: orderCode,
    amount: newOrder.totalAmount,
    currency: "VND",
    description: "Thanh toan don hang",
    returnUrl: "http://localhost:5173/checkout/success",
    cancelUrl: "http://localhost:5173/checkout/error",
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
export const returnConfirmPayment = handleAsync(async (req, res, next) => {
  const query = req.query;
  if (query.code === "00" && query.status === "PAID") {
    const foundOrder = await Order.findOne({
      orderCode: query.orderCode,
      isPaid: false,
    });
    if (!foundOrder) {
      return res.redirect(`http://localhost:3000/checkout/error`);
    }
    foundOrder.isPaid = true;
    await foundOrder.save();
    return res.redirect(`http://localhost:3000/checkout/success`);
  } else {
    return res.redirect("http://localhost:3000/checkout/error");
  }
});

export const confirmWebhookPayment = async (url) => {
  try {
    await payOS.confirmWebhook(url);
    console.log("Webhook payment confirmed successfully");
  } catch (error) {
    console.error("Error confirming webhook payment:", error);
  }
};

export const handlePayOsWebhook = handleAsync(async (req, res, next) => {
  const payOsOrderCode = 123;
  const body = req.body;
  if (body?.data.orderCode !== payOsOrderCode) {
    const webhookData = payOS.verifyPaymentWebhookData(body);
    console.log("Webhook Data:", webhookData);
    if (webhookData.code === "00" && webhookData.desc === "success") {
      const foundOrder = await Order.findOne({
        orderCode: webhookData.orderCode,
        isPaid: false,
      });
      if (!foundOrder) {
        return next(createError(true, 404, MESSAGES.ORDER.NOT_FOUND));
      }
      foundOrder.isPaid = true;
      await foundOrder.save();
      return res.json(
        createResponse(true, 200, MESSAGES.ORDER.PAYMENT_SUCCESS)
      );
    }
  }
  return res
    .status(200)
    .json(createResponse(false, 200, MESSAGES.ORDER.PAYMENT_WEBHOOK_ERROR));
});
