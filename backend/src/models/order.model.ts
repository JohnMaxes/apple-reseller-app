import { Model, Sequelize, DataTypes } from 'sequelize';

class OrderEntity extends Model {
  declare orderId: number;
  declare userId: number;
  declare totalAmount: number;
  declare paymentMethod: string;
  declare paymentStatus: string;
  declare orderStatus: string;
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
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'total_amount',
      },
      paymentMethod: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'payment_method',
      },
      paymentStatus: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'payment_status',
      },
      orderStatus: {
        type: DataTypes.STRING(20),
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