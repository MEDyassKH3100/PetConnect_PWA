'use client';

import React from 'react';
import { PlusIcon } from 'lucide-react';

export const PetProfiles = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Mes animaux</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
                <div className="flex-shrink-0 w-40 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-32 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                            alt="Max"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-3">
                        <h3 className="font-medium text-gray-800">Max</h3>
                        <p className="text-xs text-gray-500">Labrador • 3 ans</p>
                        <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Actif
                            </span>
                            <button className="text-xs text-[#FFB8C2] hover:underline">
                                Profil
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0 w-40 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-32 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                            alt="Mia"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-3">
                        <h3 className="font-medium text-gray-800">Mia</h3>
                        <p className="text-xs text-gray-500">Chat Européen • 2 ans</p>
                        <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Actif
                            </span>
                            <button className="text-xs text-[#FFB8C2] hover:underline">
                                Profil
                            </button>
                        </div>
                    </div>
                </div>
                <button className="flex-shrink-0 w-40 h-full flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6 hover:bg-gray-100 transition-colors">
                    <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mb-2">
                        <PlusIcon size={20} className="text-white" />
                    </div>
                    <p className="text-sm text-gray-600 text-center">Ajouter un animal</p>
                </button>
            </div>
        </div>
    );
};