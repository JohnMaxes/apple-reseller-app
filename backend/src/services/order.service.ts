import db from '../utils/db';
import configs from '../configs';
import jwt from 'jsonwebtoken';

export const createOrder = async (orderJson: any, accessToken: string) => {
  const { Order, OrderItem } = await db.connect();
  if (!accessToken) {
    return {
      status: 401,
      message: 'Access token is missing',
    };
  }
  let decoded;
  try {
    // Giải mã token (thay 'your_jwt_secret' bằng secret thực tế của bạn)
    decoded = jwt.verify(accessToken, configs.SECRET_KEY);
  } catch (error) {
    return {
      status: 401,
      message: 'Invalid access token',
    };
  }
  const userId = (decoded as any).payload.userId; // hoặc decoded.userId tùy payload token
  // Kiểm tra user tồn tại trong DB (nếu cần)
  // Kiểm tra dữ liệu đầu vào
  if (
    !orderJson.totalAmount ||
    !orderJson.paymentMethod ||
    !orderJson.paymentStatus ||
    !orderJson.orderStatus ||
    !orderJson.shippingAddress ||
    !Array.isArray(orderJson.items) ||
    orderJson.items.length === 0
  ) {
    return {
      status: 400,
      message: 'Invalid order data!',
    };
  }

  try {
    // Tạo order mới
    const newOrder = await Order.create({
      userId: userId,
      fullName: orderJson.fullName,
      phoneNumber: orderJson.phoneNumber,
      totalAmount: orderJson.totalAmount,
      voucherCode: orderJson.voucherCode || null, // Voucher code có thể là null
      paymentMethod: orderJson.paymentMethod,
      paymentStatus: orderJson.paymentStatus,
      orderStatus: orderJson.orderStatus,
      shippingAddress: orderJson.shippingAddress,
      trackingNumber: orderJson.trackingNumber || null,
    });

    // Tạo các order item
    for (const item of orderJson.items) {
      if (
        !item.productId ||
        !item.quantity ||
        !item.price
      ) {
        return {
          status: 400,
          message: 'Invalid order item data!',
        };
      }
      await OrderItem.create({
        orderId: newOrder.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    // Lấy lại order vừa tạo cùng các order item
    const createdOrder = await Order.findOne({
      where: { orderId: newOrder.orderId },
      include: [
        {
          model: OrderItem,
          as: 'items',
        },
      ],
    });

    return {
      status: 201,
      message: 'Order created successfully!',
      data: createdOrder,
    };
  } catch (error: any) {
    return {
      status: error.code || 400,
      message: error.message,
    };
  }
};

export const getOrderByUserId = async (accessToken: string) => {
  const { Order, OrderItem, Product, ProductImage } = await db.connect();
  if (!accessToken) {
    return {
      status: 401,
      message: 'Access token is missing',
    };
  }
  let decoded;
  try {
    // Giải mã token (thay 'your_jwt_secret' bằng secret thực tế của bạn)
    decoded = jwt.verify(accessToken, configs.SECRET_KEY);
  } catch (error) {
    return {
      status: 401,
      message: 'Invalid access token',
    };
  }
  const userId = (decoded as any).payload.userId;
  // Tìm các order kèm với các thông tin liên quan có đính User ID của người dùng
  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem, as: 'items',
          include: [
            {
              model: Product,
              include: [
                {
                  model: ProductImage, as: 'images', where: { imageDefault: 1 }, 
                  attributes: ['imageUrl'], limit: 1,
                }
              ]
            }
          ]
        }
      ]
    });

    const formattedOrders: any = (orders as any).map((order: any) => ({
      ...order.toJSON(),
      items: order.items.map((item: any) => ({
        productName: item.Product?.productName,
        price: item.Product?.price,
        quantity: item.quantity,
        color: item.Product?.color,
        storage: item.Product?.storage,
        imageUrl: item.Product?.images?.[0]?.imageUrl || null,
      }))
    }));

    return {
      status: 200,
      data: formattedOrders,
    };
  }
  catch (error: any) {
    return {
      status: error.code || 400,
      message: error.message,
    };
  }
}