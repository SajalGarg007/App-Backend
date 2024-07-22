import { Controller, Get, Post,Put,Delete, Request, UploadedFile,Param, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DataService } from './data.service';
import { AddEmployeeRequest } from './entity/AddEmployeeRequest';

@Controller('boston/data')
export class DataController {

    constructor(private readonly dataService: DataService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploadedFiles'
        })
    }))
    uploadFile(@Request() request: Request, @UploadedFile() file: Express.Multer.File) {
        return this.dataService.prepareAndInsertXlsExistingEmpData(file);
    }

    @Get('employees')
    async getAllEmployees(@Request() request) {
        return this.dataService.getEmployees(request.query);
    }

    @Get('/employee/division')
    async getAllEmployeeByDivision() {
        return this.dataService.getAllEmployeeByDivision();
    }

    @Post('/add/employee')
    async bookSeat(@Body() employee: AddEmployeeRequest) {
      return this.dataService.addEmployee(employee);
    }

    @Put('/edit/employee/:id')
    async Users(@Request() req, @Param('id') id) {
      return this.dataService.editEmployee(id, req.body);
    }
  
    @Delete('/delete/employee/:id')
    async DeleteEmp( @Param('id') id) {
      return this.dataService.deleteEmployee(id);
    }

}
