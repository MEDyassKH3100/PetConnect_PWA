'use client';

import React from 'react';

type HealthStatusCardProps = {
    title: string;
    status: 'success' | 'warning' | 'danger' | 'info';
    value: string;
    icon: React.ReactNode;
};

export const HealthStatusCard = ({
    title,
    status,
    value,
    icon,
}: HealthStatusCardProps) => {
    const getStatusColors = () => {
        switch (status) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'warning':
                return 'bg-orange-50 border-orange-200';
            case 'danger':
                return 'bg-red-50 border-red-200';
            case 'info':
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };
    return (
        <div
            className={`p-4 rounded-xl border ${getStatusColors()} hover:shadow-sm transition-shadow`}
        >
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">{title}</h3>
                {icon}
            </div>
            <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
    );
};