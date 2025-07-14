import React, {type ChangeEvent, useContext, useEffect, useReducer, useState} from "react";
import type {ServiceModel} from "../models/ServiceModel.ts";
import type {RegisterDataModel} from "../models/RegisterData.model.ts";
import {AuthContext} from "../App.tsx";

interface Props {
    currentService: ServiceModel;

    freshService: boolean;
    registerForm: RegisterDataModel;
    setRegisterForm: (formData: any) => void;
}

export default function ServiceInRegisterFreelancer({currentService,
                                                        freshService
                                                    } : Props) {

    const [registerForm, setRegisterForm] = useContext(AuthContext);

    let [editableService, setEditableService]  = useState({...currentService});

    let [editMode, setEditMode] = useState<boolean>(false);
    //let [freshService, setFreshService] = useState<boolean>(false);

    let [newServiceInput, setNewServiceInput] = useState<ServiceModel>({price: 0, name: ''});
    let [addButtonClicked, setAddButtonClicked] = useState<string>("");


    const onConfirmService = () => {
        setEditMode(false);
    };

    /*
    function onAddNewService() {

        registerForm.services.push({
            name: newServiceInput.name,
            price: newServiceInput.price
        });

    };*/


    useEffect(() => {

        onAddNewService();

    }, []);

    const onAddNewService = () => {


        //setAddButtonClicked("clicked");

        const updatedServices = [
            ...registerForm.services,
            {
                name: newServiceInput.name,
                price: newServiceInput.price
            }
        ];

        setRegisterForm(
            {
            ...registerForm.services,
                services: updatedServices
            }
        );

        //setRegisterForm({...registerForm, services: updatedServices});

        //setNewServiceInput({name: '', price: 0});

        setTimeout(() => {

            console.log("newServiceInput: ", newServiceInput);
            console.log("Updated Services after adding: ", updatedServices);
            console.log("ALl Services after adding: ", registerForm.services);

        }, 0);

        //forceUpdate();

    };

    return (
        <div>

            {!freshService && (
                editMode ? (
                    <div className={'flex items-center gap-x-2 mb-5 mt-6\n'}>
                        <input value={editableService?.name} onChange={(e: ChangeEvent<HTMLInputElement>) => setEditableService({...editableService, name: e.target}) } placeholder={'Make a Website'} type={'text'}/>
                        <input value={editableService?.price} placeholder={'100$'} type={'text'}/>
                        <button onClick={onConfirmService} type={'button'}><i className="bi bi-check-circle-fill"></i></button>
                    </div>
                ) : (
                    <div onClick={() => setEditMode(true)} className={'flex flex-row bg-gray-200 p-2 rounded-lg'}>
                        {currentService.name} for {currentService.price}
                    </div>
                )

            )}

            {/*

            */}

            {freshService && (
                <div className={'flex items-center gap-x-2'}>
                    <input className={'w-1/2 p-2 border-2 rounded-b-md mt-6'} placeholder={'New Service'} value={newServiceInput.name} onChange={(e) =>
                        setNewServiceInput({...newServiceInput, name: e.target.value })} type="text" id="newServiceInputName"/>
                    <input className={'w-1/4 p-2 border-2 rounded-b-md mt-6'} value={newServiceInput.price} onChange={(e) => setNewServiceInput({
                        ...newServiceInput,
                        price: parseFloat(e.target.value) || 0
                    })} type='text' id={"newServiceInputPrice"} />
                    <button
                        className={' mt-6 left-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'}
                        onClick={onAddNewService} type={'button'}>
                        Hinzufügen
                        {/*}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                        </svg>*/}

                    </button>

                </div>
            )}


            {/*
            {!freshService && (
                {editMode && (
                    <div className={'flex flex-row'}>
                        <input value={currentService?.name} placeholder={'Make a Website'} type={'text'}/>
                        <input value={currentService?.price} placeholder={'100$'} type={'text'}/>
                        <button onClick={onConfirmService} type={'button'}><i className="bi bi-check-circle-fill"></i></button>
                    </div>

                )}

                {!editMode && (
                    <div className={'flex flex-row bg-gray-200 p-2 rounded-lg' }>
                        {currentService.name} for {currentService.price}
                    </div>
                )}
            )}


            {freshService && (
                <div>
                    <input value={newServiceInput} onChange={(e) => setNewServiceInput(e.target.value)} type="text" id="newServiceInput"/>
                    <button onClick={onAddNewService} type={'button'}><i className="bi bi-plus"></i></button>
                </div>

            )}

            */}

        </div>
    );

}