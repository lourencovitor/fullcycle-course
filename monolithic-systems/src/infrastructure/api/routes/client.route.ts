import express, { Request, Response } from "express";
import ClientRepository from "../../../modules/client-adm/repository/client.repository";
import AddClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase";
import { AddClientInputDto } from "../../../modules/client-adm/usecase/add-client/add-client.usecase.dto";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new AddClientUseCase(new ClientRepository());

  try {
    const clientDto: AddClientInputDto = {
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      state: req.body.state,
      complement: req.body.complement,
      street: req.body.street,
      number: req.body.number,
      zipCode: req.body.zipCode,
      document: req.body.document,
    };

    const output = await useCase.execute(clientDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
