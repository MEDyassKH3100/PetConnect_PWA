'use client';

import React from 'react';
import { HealthRecord } from '@/types/health';

interface HealthRecordListProps {
  records: HealthRecord[];
}

export const HealthRecordList = ({ records }: HealthRecordListProps) => {
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};