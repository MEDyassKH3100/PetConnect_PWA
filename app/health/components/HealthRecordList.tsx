'use client';

import React from 'react';
import { HealthRecord } from '@/types/health';

interface HealthRecordListProps {
    records: HealthRecord[];
    onDelete?: (id: string) => void;
}

export const HealthRecordList = ({ records, onDelete }: HealthRecordListProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Praticien
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Notes
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {record.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {record.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {record.practitioner}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{record.notes}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                                {typeof onDelete === 'function' && (
                                    <button
                                        type="button"
                                        onClick={() => onDelete(record.id)}
                                        className="px-2 py-1 text-sm text-red-600 hover:underline"
                                        aria-label={`Supprimer dossier ${record.id}`}
                                    >
                                        Supprimer
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};