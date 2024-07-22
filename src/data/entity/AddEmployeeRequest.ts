export class AddEmployeeRequest {
    // NotAvailable=0,
    // Booked=1,
    // Available=2
    public BSC_employee_Id: string;
    public first_name: string;
    public last_name: string;
    public employee_type: string;
    
    public functional_head_id: string;

    public Reporting_manager_id: string;

    public Designation_id: string;

    public Vendor_id: string;

    public Team_id: string;

    public SubTeam_id: string;

    public CostCenter_id: string;

    public job_Location: string;

    public WorkMode: string;

    public JobLevel: string;

    public Gender: string;
  
    constructor(json: object) {
      Object.assign(this, json);
    }
  }