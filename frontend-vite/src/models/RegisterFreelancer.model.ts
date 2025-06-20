//Profilbild, Bio, Standort, Sprachen, Preise (Stunden-/Projektpreis)


export interface RegisterFreelancerModel {
    email: string;
    username: string;
    biography: string;
    languages: string;
    services: {
        name: string;
        price: number;
    }
    password: string;
    passwordConfirm: string;

}