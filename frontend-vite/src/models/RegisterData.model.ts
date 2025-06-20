import type {ServiceModel} from "./ServiceModel.ts";

export interface RegisterDataModel {

    //Entweder Freelancer oder Customer
    inputType: string;

    email: string;
    username: string;
    password: string;
    passwordConfirm: string;

    biography? : string;
    languages? : string;
    services? : ServiceModel[];


}

