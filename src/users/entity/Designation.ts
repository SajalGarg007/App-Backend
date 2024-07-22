import { Table, Column, Model, DataType} from 'sequelize-typescript';
import { BaseModel } from './BaseModel';


/**
 * The User Model
 */
@Table(
  { tableName: 'designation', timestamps: false }
)
export class Designation extends BaseModel {

}
