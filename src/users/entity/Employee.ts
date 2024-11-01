import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Designation } from './Designation';
import { SubTeam } from './SubTeam';
import { Vendor } from './Vendor';
import { CostCenter } from './CostCenter';
import { FunctionalHead } from './FunctionalHead';

/**
 * The User Model
 */
@Table({ tableName: 'employee', timestamps: false })
export class Employee extends Model {
  @Column({ primaryKey: true, field: 'id', type: DataType.UUIDV4 })
  public id: string;

  @Column({ field: 'first_name' })
  public first_name: string;

  @Column({ field: 'last_name' })
  public last_name: string;

  @Column({ field: 'employee_id' })
  public employee_id: string;

  @Column({ field: 'gender' })
  public gender: string;

  @Column({ field: 'rtw_tier' })
  public rtw_tier: string;

  @Column({ field: 'work_mode' })
  public work_mode: string;

  @Column({ field: 'parking_sticker' })
  public parking_sticker: string;

  @Column({ field: 'job_level' })
  public job_level: string;

  @Column({ field: 'job_location' })
  public job_location: string;

  @ForeignKey(() => Vendor)
  @Column
  public vendor_id: string;

  @BelongsTo(() => Vendor)
  public vendor: Vendor;

  @ForeignKey(() => FunctionalHead)
  @Column
  public functional_head_id: string;

  @BelongsTo(() => FunctionalHead)
  public functional_head: FunctionalHead;

  @ForeignKey(() => SubTeam)
  @Column
  public sub_team_id: string;

  @BelongsTo(() => SubTeam)
  public SubTeam: SubTeam;

  @ForeignKey(() => Employee)
  @Column
  public reporting_manager_id: string;

  @BelongsTo(() => Employee)
  public reportingManager: Employee;

  @ForeignKey(() => Designation)
  @Column
  public designation_id: string;

  @BelongsTo(() => Designation)
  public designation: Designation;

  @ForeignKey(() => CostCenter)
  @Column
  public cost_center_id: string;

  @BelongsTo(() => CostCenter)
  public cost_center: CostCenter;

  @Column({ field: 'employeement_type' })
  public employeement_type: string;

  @Column({ field: 'description' })
  public description: string;

  @Column({ field: 'active' })
  public active: boolean;

  public buildMe(uuid: string) {
    return Employee.build({
      id: uuid,
      employee_id: this.employee_id,
      first_name: this.first_name,
      last_name: this.last_name,
      gender: this.gender,
      rtw_tier: this.rtw_tier,
      work_mode: this.work_mode,
      cost_center_id: this.cost_center_id,
      parking_sticker: this.parking_sticker,
      job_level: this.job_level,
      job_location: this.job_location,
      vendor_id: this.vendor_id,
      functional_head_id: this.functional_head_id,
      sub_team_id: this.sub_team_id,
      employeement_type: this.employeement_type,
      designation_id: this.designation_id,
      description: `A boston group ${this.id}`,
    });
  }

  public setEmpId(id: string): Employee {
    this.employee_id = id;
    return this;
  }

  public setGender(gender: string): Employee {
    this.gender = gender;
    return this;
  }

  public setRtwTier(rtw_tier: string): Employee {
    this.rtw_tier = rtw_tier;
    return this;
  }

  public setWorkMode(work_mode: string): Employee {
    this.work_mode = work_mode;
    return this;
  }

  public setParkingSticker(parking_sticker: string): Employee {
    this.parking_sticker = parking_sticker;
    return this;
  }

  public setJobLevel(job_level: string): Employee {
    this.job_level = job_level;
    return this;
  }

  public setJobLocation(job_location: string): Employee {
    this.job_location = job_location;
    return this;
  }

  public setFirstName(fname: string): Employee {
    this.first_name = fname;
    return this;
  }
  public setLastName(lname: string): Employee {
    this.last_name = lname;
    return this;
  }

  public setVendorId(vendorId: string): Employee {
    this.vendor_id = vendorId;
    return this;
  }

  public setFunctionalHeadId(functional_headId: string): Employee {
    this.functional_head_id = functional_headId;
    return this;
  }

  public setSubTeamId(subTeamId: string): Employee {
    this.sub_team_id = subTeamId;
    return this;
  }
  public setCostCenterId(CostCenterId: string): Employee {
    this.cost_center_id = CostCenterId;
    return this;
  }

  public setEmployementType(empType: string): Employee {
    this.employeement_type = empType;
    return this;
  }

  public setDesignation(designationId: string): Employee {
    this.designation_id = designationId;
    return this;
  }
}
