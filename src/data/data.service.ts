import { Injectable } from '@nestjs/common';
import readXlsxFile from 'read-excel-file/node';
import { Op, } from 'sequelize';
import { CostCenter } from 'src/users/entity/CostCenter';
import { Designation } from 'src/users/entity/Designation';
import { Employee } from 'src/users/entity/Employee';
import { SubTeam } from 'src/users/entity/SubTeam';
import { Team } from 'src/users/entity/Team';
import { Vendor } from 'src/users/entity/Vendor';
import { v4 as uuidv4 } from 'uuid';
import { AddEmployeeRequest } from './entity/AddEmployeeRequest';
import { FunctionalHead } from 'src/users/entity/FunctionalHead';


@Injectable()
export class DataService {

    async deleteEmployee(id: string){

        console.log("consoling employee id");
        console.log(id);
        
        await Employee.destroy({
            where: {
                employee_id: id,
            }
        });

        return {
            message: 'Employee is deleted',
        };
    }

    async editEmployee(id: string, emp:AddEmployeeRequest){

        console.log("consoling employee id");
        console.log(id);
        console.log("employee details");
        console.log(emp);
        await Employee.update({
            employee_id: emp.BSC_employee_Id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            gender: emp.Gender,
            work_mode: emp.WorkMode,
            job_level: emp.JobLevel,
            cost_center_id: emp.CostCenter_id,
            job_location: emp.job_Location,
            functional_head_id: emp.functional_head_id,
            vendor_id: emp.Vendor_id,
            sub_team_id: emp.SubTeam_id,
            reporting_manager_id: emp.Reporting_manager_id,
            designation_id: emp.Designation_id,
            employeement_type: emp.employee_type,
        },{
            where:{
                employee_id: id
            }
        });

        return {
            message: 'Employee is updated',
        };
    }

    async addEmployee(addEmployeeRequest: AddEmployeeRequest): Promise<object> {
        
          const empId = uuidv4();
          let employee = Employee.build({
            id: empId,
            employee_id: addEmployeeRequest.BSC_employee_Id,
            first_name: addEmployeeRequest.first_name,
            last_name: addEmployeeRequest.last_name,
            gender: addEmployeeRequest.Gender,
            work_mode: addEmployeeRequest.WorkMode,
            job_level: addEmployeeRequest.JobLevel,
            functional_head_id: addEmployeeRequest.functional_head_id,
            cost_center_id: addEmployeeRequest.CostCenter_id,
            job_location: addEmployeeRequest.job_Location,
            vendor_id: addEmployeeRequest.Vendor_id,
            sub_team_id: addEmployeeRequest.SubTeam_id,
            reporting_manager_id: addEmployeeRequest.Reporting_manager_id,
            designation_id: addEmployeeRequest.Designation_id,
            employeement_type: addEmployeeRequest.employee_type,
          });
          await employee.save();
        
        return {
          message: 'Employee is registered',
        };
      }

    async getAllEmployeeByDivision():Promise<object> {

        const team = await Team.findAndCountAll({
                include:[
                    { model: SubTeam, required: false, attributes: ['id', 'name'],
                        include:[
                            { model: Employee, required: false, 
                            attributes: ['first_name', 'last_name', 'employee_id', 'employeement_type',
                                'gender','rtw_tier', 'work_mode','parking_sticker','job_location','job_level'],
                                include: [
                                    { model: Designation, required: false, attributes: ['id', 'name'] },
                                    { model: Vendor, required: false, attributes: ['id', 'name'] },
                                    { model: CostCenter, required: false, attributes: ['id', 'cost_center'] },
                                    { model: Employee, required: false, attributes: ['id','first_name', 'last_name', 'employee_id'] },
                                ]     
                            },
                        ]
                    },
                ],
                
                distinct: true,
            
        });
        return team;
    }

 
    
    //
    async getEmployees(query: any) {
        const keys = Object.keys(query);
        let type = ''
        keys.forEach((key) => {
            if (key == 'type') {
                type = query[key]
                delete query[key]
            }
        })
        const employees = await Employee.findAndCountAll({
            attributes:
                [
                    // [Sequelize.fn('DISTINCT', Sequelize.col('employee_id')), 'employee_id'],
                    //                    [sequelize.literal('DISTINCT "employee_id"'), 'employee_id'],
                    'id', 'first_name', 'last_name', 'employee_id', 'employeement_type',
                     'gender', 'work_mode','job_location','job_level'],
            // where: query,
            distinct: true,
            include: [
                { model: Designation, required: false, attributes: ['id', 'name'] },
                { model: CostCenter, required: false, attributes: ['id', 'cost_center'] },
                { model: Vendor, required: false, attributes: ['id', 'name'] },
                { model: FunctionalHead, required: false, attributes: ['id', 'name'] },
                // { model: Location, required: false, attributes: ['id', 'name'] },
                { model: SubTeam, required: false, attributes: ['id', 'name', 'team_id'],
                    include : [
                        {
                            model: Team, required: true
                        }
                    ]
                },
                { model: Employee, required: false, attributes: ['id','first_name', 'last_name', 'employee_id'] },

                // ,
                // { model: Employee, required: false, attributes: ['first_name', 'last_name', 'employee_id', 'employeement_type'] }
            ]
        });
        const rows = employees.rows;
        const newRows = []
        if (type == 'manager') {
            for (const row of rows) {
                if ((row.designation.name as string).toLocaleLowerCase().includes('manager')
                    || (row.designation.name as string).toLocaleLowerCase().includes('director')) {
                    newRows.push(row);
                }
            }

            employees.rows = newRows;
            employees.count = newRows.length;
        }

        return employees;

    }




    async prepareAndInsertXlsExistingEmpData(file: Express.Multer.File) {
        const rows = await readXlsxFile(file.path);
        let skip = true;
        for (const row of rows) {
            if (skip) {
                skip = false;
                continue
            }
            console.log(JSON.stringify(row));
            console.log('---------------------------11--------------------------------------------------------');
            console.log(row[2]); // TEAM
            const team = await this.createTeam(`${row[2]}`);
            console.log(row[3]); // SUB TEAM
            const subTeam = await this.createSubTeam(`${row[3]}`, team.id);
            console.log(row[4]); // Employeement Type
            console.log(row[5]); // Vendor
            const vender = await this.createVendor(`${row[5]}`);
            console.log(row[1]);
            const functionalHead = await this.createFunctionalHead(`${row[1]}`);
            console.log(row[11]); //  New Cost Center
            const costCenter = await this.createCostCenter(`${row[11]}`);
            console.log(row[14]); // Title Designation
            const designation = await this.createDesignation(`${row[14]}`);
            console.log('------------------------22-----------------------------------------------------------');
            console.log(row[7]); // First Name
            console.log(row[8]); // Last Name
            console.log('-----Gender---');
            console.log(row[9]); // Gender
            console.log(row[12]); // Employee Id
            console.log(row[15]); // Reporting Manager
            console.log(row[16]); // Location
            const employee = new Employee().setEmpId(`${row[12]}`).setFirstName(`${row[7]}`).setLastName(`${row[8]}`)
            .setVendorId(vender.id).setFunctionalHeadId(functionalHead.id).setSubTeamId(subTeam.id).setGender(`${row[9]}`).setWorkMode(`${row[6]}`).setEmployementType(`${row[4]}`)
            .setJobLocation(`${row[16]}`).setJobLevel(`${row[13]}`)
            .setDesignation(designation.id).setCostCenterId(costCenter.id);
            await this.createEmployee(employee);
            console.log('========================================================');
        }
        skip = true;
        for (const row of rows) {
            if (skip) {
                skip = false;
                continue
            }
            const bossName = `${row[15]}`;
            const names = bossName.split(' ')
            const bossEmployeee = await Employee.findOne({
                where: {
                    [Op.and]: [
                        { 'first_name': names[0] },
                        { 'last_name': names[1] },
                    ]
                }
            });
            if (!bossEmployeee) {
                console.log('Corruptted Record....Skipping Assigning Manager');
                continue;
            }
            const employeee = await Employee.findOne({ where: { 'employee_id': `${row[12]}` } });
            console.log(`Employee ${employeee.first_name} , Boss ${bossName}`);
            await employeee.update({ reporting_manager_id: bossEmployeee.id })
        }

        return {
            path: file.path,
            filename: file.originalname,
            mimetype: file.mimetype
        };
    }

    async createTeam(teamName: string): Promise<Team> {
        
        let team = await Team.findOne({
            where: { name: teamName }
        })
        if (team) {
            console.log(`team Exists ${teamName}`);
            return team;
        }

        const resourceId = uuidv4();
        team = Team.build({
            id: resourceId,
            name: teamName,
            description: `A boston team ${teamName}`
        })
        await team.save();
        console.log(`team inserted ${teamName}`)

        return team;
    }

    async createSubTeam(name: string, teamId: string): Promise<SubTeam> {
        let subteam = await SubTeam.findOne({
            where: { name: name, team_id: teamId }
        })
        if (subteam) {
            console.log(`sub team Exists ${name}`);
            return subteam;
        }

        const resourceId = uuidv4();
        subteam = SubTeam.build({
            id: resourceId,
            name: name,
            team_id: teamId,
            description: `A boston group ${name}`
        })
        await subteam.save();
        console.log(`sub team inserted ${name}`)

        return subteam;
    }

    async createCostCenter(name: string): Promise<CostCenter> {
        let costCenter = await CostCenter.findOne({
            where: { cost_center: name }
        })
        if (costCenter) {
            console.log(`CostCenter Exists ${name}`);
            return costCenter;
        }

        const id = uuidv4();
        costCenter = CostCenter.build({
            id: id,
            cost_center: name,
            description: `A boston group ${name}`
        })
        await costCenter.save();
        console.log(`CostCenter inserted ${name}`)

        return costCenter;
    }

    async createVendor(name: string): Promise<Vendor> {
        let vendor = await Vendor.findOne({
            where: { name: name }
        })
        if (vendor) {
            console.log(`Vendor Exists ${vendor}`);
            return vendor;
        }
        const id = uuidv4();
        vendor = Vendor.build({
            id: id,
            name: name,
            description: `A boston group ${name}`
        })
        await vendor.save();
        console.log(`Vendor inserted ${name}`)

        return vendor;
    }

    async createFunctionalHead(name: string):Promise<FunctionalHead>{
        let functional_head = await FunctionalHead.findOne({
            where:{ name : name }
        })
        if(functional_head){
            console.log(`functionalHead Exists ${functional_head}`);
            return functional_head;
        }
        const id =uuidv4();
        functional_head = FunctionalHead.build({
            id: id,
            name: name,
            description: `A boston functional head ${name}`
        })
        await functional_head.save();
        console.log(`FunctionalHead inserted ${name}`);

        return functional_head;

    }

    async createDesignation(name: string): Promise<Designation> {
        let designation = await Designation.findOne({
            where: { name: name }
        })
        if (designation) {
            console.log(`Designation Exists ${designation}`);
            return designation;
        }

        const resourceId = uuidv4();
        designation = Designation.build({
            id: resourceId,
            name: name,
            description: `A boston group ${name}`
        })
        await designation.save();
        console.log(`Designation inserted ${name}`)


        return designation;
    }

    async registerUser(employee: Employee): Promise<Employee | object> {
        return employee.save();
    }

    async createEmployee(employee: Employee): Promise<object | Employee> {
        let response = await Employee.findOne({
            where: { employee_id: employee.employee_id }
        })
        if (response) {
            console.log(`Employee Exists ${response}`);
            return response;
        }

        const id = uuidv4();
        employee = employee.buildMe(id);
        console.log(JSON.stringify(employee));
        response = await this.registerUser(employee) as Employee;
        console.log(`Employee inserted ${id}`)

        return response;
    }
}
