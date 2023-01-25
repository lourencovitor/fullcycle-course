import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ProductModel from "./product.model";

@Table({
  modelName: "order",
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false })
  // tslint:disable-next-line:variable-name
  client_id: string;

  @BelongsTo(() => ClientModel)
  client: Awaited<ClientModel>;

  @HasMany(() => ProductModel)
  products: Awaited<ProductModel[]>;

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false })
  total: number;
}
