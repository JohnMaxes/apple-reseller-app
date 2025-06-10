import { Model, Sequelize, DataTypes } from 'sequelize';

class OrderEntity extends Model {
  declare orderId: number;
  declare userId: number;
  declare fullName: string;
  declare phoneNumber: string;
  declare totalAmount: number;
  declare productVoucherCode: string | null;
  declare shippingVoucherCode: string | null;
  declare paymentMethod: 'COD' | 'Credit Card' | 'Momo' | 'ZaloPay' | 'Bank Transfer';
  declare paymentStatus: 'Pending' | 'Completed' | 'Failed';
  declare orderStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  declare shippingAddress: string;
  declare trackingNumber: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

function Order(sequelize: Sequelize) {
  OrderEntity.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'order_id',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'full_name',
      },
      phoneNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: 'phone_number',
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'total_amount',
      },
      productVoucherCode: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'product_voucher_code',
      },
      shippingVoucherCode: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'shipping_voucher_code',
      },
      paymentMethod: {
        type: DataTypes.ENUM('COD', 'Credit Card', 'Momo', 'ZaloPay', 'Bank Transfer'),
        allowNull: false,
        field: 'payment_method',
      },
      paymentStatus: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Failed'),
        allowNull: false,
        field: 'payment_status',
      },
      orderStatus: {
        type: DataTypes.ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled'),
        allowNull: false,
        field: 'order_status',
      },
      shippingAddress: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'shipping_address',
      },
      trackingNumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'tracking_number',
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return OrderEntity;
}

export default {
  Order,
  OrderEntity,
}