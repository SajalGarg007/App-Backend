import { Table, Column, Model, DataType} from 'sequelize-typescript';
import { BaseModel } from './BaseModel';

@Table(
    {tableName:'functional_head', timestamps:false}
)

export class FunctionalHead extends BaseModel {

    
}