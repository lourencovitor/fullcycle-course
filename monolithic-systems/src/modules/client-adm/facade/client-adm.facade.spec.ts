import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";

describe("ClientAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    // const repository = new ClientRepository();
    // const addUseCase = new AddClientUseCase(repository);
    const facade = ClientAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "John Doe",
      email: "x@x.com",
      address: "123 Main St",
    };

    await facade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });
    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });

  it("should find a client", async () => {
    // const repository = new ClientRepository();
    // const addUseCase = new AddClientUseCase(repository);
    // const findUseCase = new FindClientUseCase(repository);
    const facade = ClientAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "John Doe",
      email: "x@x.com",
      address: "123 Main St",
    };
    await facade.add(input);

    const result = await facade.find({ id: "1" });

    expect(result).toBeDefined();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.address).toEqual(input.address);
  });
});
