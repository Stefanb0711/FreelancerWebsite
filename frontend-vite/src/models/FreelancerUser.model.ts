import type {ServiceModel} from "./ServiceModel.ts";

export interface FreelancerUser {
    id? : number;
    username?: string;
    biography?: string;
    languages?: string[];
    services?: ServiceModel[];
    rating?: number;
}