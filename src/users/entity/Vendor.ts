import { Table, Column, Model, DataType} from 'sequelize-typescript';
import { BaseModel } from './BaseModel';


/**
 * The User Model
 */
@Table(
  { tableName: 'vendor', timestamps: false }
)
export class Vendor extends BaseModel {


}
