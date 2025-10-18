'use client';

import React from 'react';
import { HeartIcon, MapPinIcon } from 'lucide-react';

type AdoptionCardProps = {
    name: string;
    type: string;
    breed: string;
    age: string;
    gender: string;
    location: string;
    distance: string;
    image: string;
};

export const AdoptionCard = ({
    name,
    type,
    breed,
    age,
    gender,
    location,
    distance,
    image,
}: AdoptionCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 overflow-hidden">
                <img src={image} alt={name} className="w-full h-full object-cover" />
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white">
                    <HeartIcon size={20} className="text-gray-500 hover:text-red-500" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <h3 className="text-lg font-semibold text-white">{name}</h3>
                    <p className="text-sm text-white/90">{breed}</p>
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white text-xs font-medium rounded-full">
                            {type}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {gender}
                        </span>
                    </div>
                    <span className="text-sm text-gray-500">{age}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPinIcon size={16} className="mr-1" />
                    <span>{location}</span>
                    <span className="mx-1">•</span>
                    <span>{distance}</span>
                </div>
                <button className="w-full py-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white rounded-md hover:from-[#FFB8C2] hover:to-[#F5F5DC] transition-colors">
                    Voir le profil
                </button>
            </div>
        </div>
    );
};