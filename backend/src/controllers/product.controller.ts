import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const getProductBySKU = async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    const product = await productService.getProductBySKU(sku);
    res.json(product);
  } catch (error: any) {
    console.log(error); 
    res.send({
      status: error.code || 400,
      message: error.message,
    });
  }
};

export const getProductByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const products = await productService.getProductByCategory(category);
    res.json(products);
  } catch (error: any) {
    console.log(error);
    res.send({
      status: error.code || 400,
      message: error.message,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productjson = {
      ...req.body,
      images: req.files, // multer sẽ đính kèm các ảnh tại đây
    };
    const resData = await productService.createProduct(productjson);
    res.json(resData);
  } catch (error: any) {
    console.log(error);
    res.send({
      status: error.code || 400,
      message: error.message,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    const productjson = {
      ...req.body,
      images: req.files, // multer sẽ đính kèm các ảnh tại đây
    };
    const resData = await productService.updateProduct(sku, productjson);
    res.json(resData);
  } catch (error: any) {
    console.log(error);
    res.send({
      status: error.code || 400,
      message: error.message,
    });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    const resData = await productService.deleteProduct(sku);
    res.json(resData);
  } catch (error: any) {
    console.log(error);
    res.send({
      status: error.code || 400,
      message: error.message,
    });
  }
};