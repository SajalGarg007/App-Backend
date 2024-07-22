/* Table for user_type */

CREATE table team(
    id                    uuid           PRIMARY KEY,
    name                  text           NOT NULL,
    description           text           ,
    head                  uuid           ,
    active                boolean        DEFAULT 'y' NOT NULL
);

CREATE table sub_team (
    id                    uuid           PRIMARY KEY,
    name                  text           NOT NULL,
    description           text           ,
    team_id               uuid           CONSTRAINT subTeamTeamFk REFERENCES team,
    active                boolean        DEFAULT 'y' NOT NULL
);

CREATE table cost_center (
    id                    uuid           PRIMARY KEY,
    cost_center           text           NOT NULL,
    description           text           ,
    name                  text           ,
    active                boolean        DEFAULT 'y' NOT NULL
);

CREATE table vendor (
    id                    uuid           PRIMARY KEY,
    name                  text           NOT NULL,
    description           text           ,
    active                boolean        DEFAULT 'y' NOT NULL
);

CREATE table functional_head (
    id                    uuid           PRIMARY KEY,
    name                  text           NOT NULL,
    description           text           ,
    active                boolean        DEFAULT 'y' NOT NULL
);

CREATE table designation(
    id                    uuid           PRIMARY KEY,
    name                  text           NOT NULL,
    description           text           ,
    active                boolean        DEFAULT 'y' NOT NULL
);


CREATE TABLE location (
        id                    uuid           PRIMARY KEY,
        country               text           NOT NULL,
        name                  text           NOT NULL
);

CREATE table employee (
    id                    uuid           PRIMARY KEY,
    employee_id           text           NOT NULL CONSTRAINT employee_id_unique UNIQUE,
    first_name            text           ,
    last_name             text           ,
    -- cost_center           text           ,
    gender                text           CONSTRAINT gender_valid CHECK (gender in ('M', 'F')),
    rtw_tier              text           ,
    work_mode             text           CONSTRAINT work_mode_valid CHECK (work_mode in ('Hybrid', 'Onsite','Remote')),
    parking_sticker       text           ,
    job_level             text           ,
    cost_center_id        uuid           CONSTRAINT cost_centerFK REFERENCES cost_center,
    job_location          text           CONSTRAINT job_location CHECK (job_location in ('Gurgaon','Pune')),
    vendor_id             uuid           CONSTRAINT vendorFK REFERENCES vendor,
    functional_head_id    uuid           CONSTRAINT functional_headFK REFERENCES functional_head ,
    sub_team_id           uuid           CONSTRAINT subTeamFK REFERENCES sub_team,
    reporting_manager_id  uuid           CONSTRAINT employeeFK REFERENCES employee,
    location_id           uuid           CONSTRAINT locationFK REFERENCES location,
    designation_id        uuid           CONSTRAINT designationFK REFERENCES designation,
    employeement_type     text           CONSTRAINT employeement_type_valid CHECK (employeement_type in ('FTE', 'Contract','Intern')),
    description           text           ,
    active                boolean        DEFAULT 'y' NOT NULL
);



