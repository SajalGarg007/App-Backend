import { Sequelize } from 'sequelize-typescript';
import { CostCenter } from 'src/users/entity/CostCenter';
import { Designation } from 'src/users/entity/Designation';
import { Employee } from 'src/users/entity/Employee';
import { FunctionalHead } from 'src/users/entity/FunctionalHead';
import { SubTeam } from 'src/users/entity/SubTeam';
import { Team } from 'src/users/entity/Team';
import { Vendor } from 'src/users/entity/Vendor';

export const databaseProviders = [
   {
      provide: Sequelize,
      useFactory: async () => {
         console.log(process.env.NODE_ENV);
         const sequelize = new Sequelize({  // TODO see why its not working
            username: 'postgres',
            password: '13mayg**',
            database: 'bostontrial2',
            host: 'localhost',
            port: '5432',
            dialect: 'postgres',
            logging: false
         } as any);
         console.log(sequelize.config)
         sequelize.addModels([Team, SubTeam,CostCenter,  Vendor, Designation, Employee, FunctionalHead]);
         await sequelize.sync();
         return sequelize;
      }
   },
];