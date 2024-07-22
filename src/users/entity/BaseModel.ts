import { Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import { SubTeam } from './SubTeam';


/**
 * The User Model
 */
export class BaseModel extends Model {

  @Column({ primaryKey: true, field: 'id', type: DataType.UUIDV4 })
  public id: string;

  @Column({ field: 'name' })
  public name: string;

  @Column({ field: 'description' })
  public description: string;

  @Column({ field: 'active' })
  public active: boolean;

  
}
