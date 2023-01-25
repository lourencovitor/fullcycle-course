import express, { Request, Response } from "express";
import ProductRepository from "../../../modules/product-adm/repository/product.repository";
import { AddProductInputDto } from "../../../modules/product-adm/usecase/ad-product/ad-product.dto";
import AddProductUsecase from "../../../modules/product-adm/usecase/ad-product/ad-product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new AddProductUsecase(new ProductRepository());

  try {
    const productDto: AddProductInputDto = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };

    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
