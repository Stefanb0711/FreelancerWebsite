import React, { useState, useEffect } from 'react';
import type {RegisterCustomerModel} from "../models/RegisterCustomer.model.ts";
import type {RegisterFreelancerModel} from "../models/RegisterFreelancer.model.ts";
import AuthService from "../services/AuthService.service.ts";
import {useNavigate} from "react-router-dom";
import type {RegisterDataModel} from "../models/RegisterData.model.ts";
import {GraphQLClient} from "graphql-request";



export function RegisterStep1() {

    //const []


    const emptyRegisterUser: RegisterCustomerModel | RegisterFreelancerModel = useState();

    let [registerForm, setRegisterForm] = useState<RegisterDataModel | null>(null);

    /*
    let [customerRegisterForm, setCustomerRegisterForm] = useState<RegisterCustomerModel>({
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    let [freelancerRegisterForm, setFreelancerRegisterForm] = useState<RegisterFreelancerModel>({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        biography: "",
        languages: "",
        services: {
            name: '',
            price: 0
        }
    });
    */





    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);

    const [errorMessages, setErrorMessages] = useState<string | null>(null);

    const [userType , setUserType] = useState<string | null>(null);


    //Setzt den nächsten Schritt für die Anmeldung
    const handleNext = () => {
        if (currentStep === 1 && selectedOption) {
            setCurrentStep(2);
        } else if (currentStep === 2) {
            navigate('/');
        }
    }


    const onSettingUserTypeToFreelancer = () => {

        setUserType('freelancer');

        setRegisterForm({
            inputType: "Freelancer",
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            biography: "",
            languages: "",
            services: {
                name: '',
                price: 0
            }
        });

        console.log('Current Usertype: ', userType);

        setCurrentStep(2);

    }

    const onSettingUserTypeToCustomer = () => {

        setUserType('customer');
        console.log('Current Usertype: ', userType);

        setRegisterForm({
            inputType: "Customer",
            username: "",
            email: "",
            password: "",
            passwordConfirm: ""
        });

        console.log('Current Form: ', registerForm);


        setCurrentStep(2);
    }



    const onSetForm = () => {

        if (userType === 'freelancer') {
            setRegisterForm({
                inputType: "Freelancer",
                username: "",
                email: "",
                password: "",
                passwordConfirm: "",
                biography: "",
                languages: "",
                services: {
                    name: '',
                    price: 0
                }
            });
        } else if (userType === 'customer') {
            setRegisterForm({
                inputType: "Customer",
                username: "",
                email: "",
                password: "",
                passwordConfirm: ""
            });
        }

        console.log("CurrentRegiseterForm", registerForm);
        console.log('Usertype: ', userType);

    }


    const onSubmit= async ()  => {

        const result = await AuthService.RegisterUser(registerForm);

        console.log('Result of SubmitForm: ', result);
    }

    /*
    useEffect(() => {

        if (userType === 'freelancer') {
            setRegisterForm({
                inputType: "Freelancer",
                username: "",
                email: "",
                password: "",
                passwordConfirm: "",
                biography: "",
                languages: "",
                services: {
                    name: '',
                    price: 0
                }
            });
        } else if (userType === 'customer') {
            setRegisterForm({
                inputType: "Customer",
                username: "",
                email: "",
                password: "",
                passwordConfirm: ""
            });
        }
        console.log('Usertype: ', userType);

    }, [userType]);
     */


    return (
        <div>
            {/* Freelancer/Customer-Auswahl */}

            {currentStep === 1 && (

                <div>
                    <h2>Are you a Freelancer or a Customer</h2>

                    <div id={'freelancerOrCustomerFormular'} className={`flex items-center justify-center min-h-screen bg-gray-100
                        ${currentStep === 1 ? 'opacity-100 translate-y-0': 'opacity-0 -translate-y-10 pointer-events-none'}
                        transition-all duration-500 ease-in-out
                        `}>
                        {/* Container für beide Divs */}
                        <div className="flex space-x-4">
                            <div onClick={() => onSettingUserTypeToFreelancer()} className="border bg-white rounded-lg shadow-lg p-6 w-48 h-48 flex flex-col justify-center items-center
                            ">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Freelancer</h2>
                                <!-- <p className="text-sm text-gray-600 text-center">Das ist ein kurzer Text für das erste Div.</p> -->
                            </div>

                            {/* Zweites Div */}
                            <div  className="border rounded-lg shadow-lg p-6 w-48 h-48 flex flex-col justify-center items-center"
                                  onClick={() => onSettingUserTypeToCustomer()}>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Customer</h2>
                                <!-- <p className="text-sm text-gray-600 text-center">Hier ist ein Text für das zweite Div.</p> -->
                            </div>

                        </div>



                        {/* Step-Next-Button */}
                        <div>
                            <button
                                id={'stepNextButton'}
                                onClick={() => setCurrentStep(2)}
                                type="button"
                                className="fixed bottom-16 right-6 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-arrow-right"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                    />
                                </svg>


                            </button>
                        </div>

                    </div>


                </div>
            )}



            <div id={'registrationFormular'} className={`${userType !== null ? 'block' : 'hidden'}
                ${currentStep === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
                transition-all duration-500 ease-in-out flex items-center justify-center min-h-screen bg-gray-100
            `}>

                {userType === 'customer' && (



                    <div className="w-full max-w-md bg-white p-8 rounded shadow-lg"  >
                        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                                Registrieren
                            </h2>
                            <form>
                                {/* Benutzername */}
                                <div className="mb-4">
                                    <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                                        Vollständiger Name
                                    </label>
                                    <input
                                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                                        value={registerForm.username}
                                        type="text"
                                        id="fullName"
                                        className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Dein Name"
                                    />
                                </div>

                                {/* E-Mail-Adresse */}
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                        E-Mail-Adresse
                                    </label>
                                    <input value={registerForm.email}
                                           onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                                           type="email"
                                           id="email"
                                           className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                           placeholder="beispiel@email.com"
                                    />
                                </div>

                                {/* Passwort */}
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                        Passwort
                                    </label>
                                    <input
                                        value={registerForm.password}
                                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                                        type="password"
                                        id="password"
                                        className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Passwort"
                                    />
                                </div>

                                {/* Passwort */}
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                        Passwort
                                    </label>
                                    <input
                                        onChange={(e) => setRegisterForm({ ...registerForm, passwordConfirm: e.target.value })}
                                        value={registerForm.passwordConfirm}
                                        type="password"
                                        id="password"
                                        className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Passwort"
                                    />
                                </div>

                                {/* Registrieren-Button */}
                                <div className="mt-6">
                                    <button
                                        onClick={() => onSubmit()}
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Registrieren
                                    </button>
                                </div>



                                {/* Step-Back-Button */}
                                <div className="mt-6">
                                    <button
                                        onClick={() => setCurrentStep(1)}
                                        type="button"
                                        className="fixed bottom-4 left-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-arrow-left" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                                        </svg>

                                    </button>
                                </div>


                            </form>
                        </div>
                    </div>

                )}


                {userType === 'freelancer' && (

                    <div className={`w-full max-w-md bg-white p-8 rounded shadow-lg`}>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center"></h2>
                        <div className="w-full bg-white m-auto p-8 rounded shadow">

                            {/* Voller Name */}
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                                    Vollständiger Name
                                </label>
                                <input
                                    onChange={(e) => setRegisterForm({...registerForm, username: e.target.value })}
                                    value={registerForm.username}
                                    type="text"
                                    id="fullName"
                                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Dein Name"
                                />
                            </div>

                            {/* E-Mail-Adresse */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    E-Mail-Adresse
                                </label>
                                <input
                                    value={registerForm.email}
                                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value })}
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="beispiel@email.com"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Passwort
                                </label>
                                <input
                                    value={registerForm.password}
                                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Passwort"
                                />
                            </div>

                            {/* Password Confirm */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Passwort Confirm
                                </label>
                                <input
                                    onChange={(e) => setRegisterForm({...registerForm, passwordConfirm: e.target.value })}
                                    value={registerForm.passwordConfirm}
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Passwort"
                                />
                            </div>

                            {/* Biography */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Biography
                                </label>
                                <input
                                    onChange={(e) => setRegisterForm({...registerForm, biography: e.target.value })}
                                    value={registerForm.biography}
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Passwort"
                                />
                            </div>

                            {/* Languages */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Languages
                                </label>
                                <input
                                    value={registerForm.languages }
                                    onChange={(e) => setRegisterForm({...registerForm, languages: e.target.value })}
                                    type="text"
                                    id="languages"
                                    className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Passwort"
                                />
                            </div>


                            {/* Registrieren-Button */}
                            <div className="mt-6">
                                <button onClick={() => onSubmit()}
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Registrieren
                                </button>
                            </div>


                            {/* Step-Back-Button */}
                            <div className="mt-6">
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    type="button"
                                    className="fixed bottom-4 left-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                                    </svg>

                                </button>
                            </div>


                        </div>


                        {/* Services */}


                    </div>

                )};


            </div>

        </div>

        /*<div>Der Nuzer registriert sich als Freelancer</div>*/

    );
}