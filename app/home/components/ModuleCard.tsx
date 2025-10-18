'use client';

import React from 'react';

type ModuleCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    link: string;
};

export const ModuleCard = ({
    title,
    description,
    icon,
    color,
    link,
}: ModuleCardProps) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
                <div className={`p-2 rounded-full mr-3 ${color} text-white`}>
                    {icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm">{description}</p>
            <button className="text-[#FFB8C2] font-medium hover:underline">
                Accéder
            </button>
        </div>
    );
};