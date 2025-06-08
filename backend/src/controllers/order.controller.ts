import { Request, Response } from 'express';
import * as orderService from '../services/order.service';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderJson = req.body;
    const accessToken = req.headers.authorization?.replace('Bearer ', '');
    if (!accessToken) {
      res.status(401).json({ status: 401, message: 'Missing access token' });
      return;
    }
    const result = await orderService.createOrder(orderJson, accessToken);
    res.json(result);
  } catch (error: any) {
    console.log(error);
    res.send({
      status: error.code || 400,
      message: error.message,
    });
  }
}

export const getOrders = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');
    if (!accessToken) {
      res.status(401).json({ status: 401, message: 'Missing access token' });
      return;
    }
    const result = await orderService.getOrderByUserId(accessToken);
    res.json(result);
  } catch (error: any) {
    console.log(error);
    res.send({
      status: error.code || 400,
      message: error.message,
    });
  }
}