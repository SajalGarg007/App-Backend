import { Table, Column, Model, DataType, ForeignKey,HasMany, BelongsTo} from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { Team } from './Team';
import { Employee } from './Employee';

/**
 * The User Model
 */
@Table(
  { tableName: 'sub_team', timestamps: false }
)
export class SubTeam extends BaseModel {

  @ForeignKey(()=> Team)
  @Column
  public team_id: string;

  @BelongsTo(()=> Team)
  public Team: Team;

  @HasMany(()=> Employee)
  public Employee: Employee[]


}
