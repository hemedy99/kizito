export interface UserRequest{
    firstName?:	string;
    middleName?:	string;
    lastName?:	string;
    gender?:	Gender[];
    phone?:	string;
    email?:	string;
    password?:	string;
    userTypeId?: number;
    userStatusId?: number;
    workingAreaId?: number;
    reporterArea?: number;

}

export interface UserResponse{
    id?: number;
    firstName?:	string;
    middleName?:	string;
    lastName?:	string;
    gender?:	Gender[];
    phone?:	string;
    email?:	string;
    password?:	string;
    userTypeId?: number;
    userTypeName?: string;
    userStatusId?: number;
    userStatusName?: string;
    workingAreaId?: number;
    workingAreaName?: string;
    reporterArea?: number;

}

export interface Gender{
    0?: any;
    1?: any;
    }