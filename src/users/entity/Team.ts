import { Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { SubTeam } from './SubTeam';


/**
 * The User Model
 */
@Table(
  { tableName: 'team', timestamps: false }
)
export class Team extends BaseModel {

  @Column({ field: 'head' })
  public head: string;

  @HasMany(()=> SubTeam)
  public subTeams: SubTeam[]

}
