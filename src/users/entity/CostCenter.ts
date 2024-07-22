import { Table, Column, Model, DataType} from 'sequelize-typescript';
import { BaseModel } from './BaseModel';


/**
 * The User Model
 */
@Table(
  { tableName: 'cost_center', timestamps: false }
)
export class CostCenter extends BaseModel {

  @Column({ field: 'cost_center' })
  public cost_center: string;

}
