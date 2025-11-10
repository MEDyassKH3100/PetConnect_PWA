'use client';

import React, { useEffect, useState } from 'react';
import { CalendarIcon, PlusIcon, XIcon } from 'lucide-react';
import { AppointmentCard } from './components/AppointmentCard';
import { Appointment } from '@/types/Appointement';

export const UserAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Appointment>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch all appointments
  const fetchAppointments = async () => {
    const res = await fetch('/api/appointments');
    const data = await res.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Edit
      const res = await fetch(`/api/appointments?id=${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      await res.json();
      setEditingId(null);
    } else {
      // Add
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      await res.json();
    }
    setFormData({});
    setShowForm(false);
    fetchAppointments();
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/appointments?id=${id}`, { method: 'DELETE' });
    fetchAppointments();
  };

  const handleEdit = (appointment: Appointment) => {
    setFormData(appointment);
    setEditingId(appointment.id || appointment._id || null);
    setShowForm(true);
  };

  const upcomingAppointments = appointments.filter(a => a.status === 'upcoming');
  const pastAppointments = appointments.filter(a => a.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Mes Rendez-vous</h1>
        <button
          className="flex items-center space-x-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-3 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]"
          onClick={() => { setShowForm(true); setEditingId(null); setFormData({}); }}
        >
          <PlusIcon size={16} />
          <span>Nouveau rendez-vous</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {editingId ? 'Modifier le rendez-vous' : 'Planifier un nouveau rendez-vous'}
            </h2>
            <button className="p-1 rounded-full hover:bg-gray-100" onClick={() => setShowForm(false)}>
              <XIcon size={20} className="text-gray-500" />
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  name="type"
                  onChange={handleChange}
                  value={formData.type || ''}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="Consultation">Consultation générale</option>
                  <option value="Vaccination">Vaccination</option>
                  <option value="Chirurgie">Chirurgie</option>
                  <option value="Toilettage">Toilettage</option>
                  <option value="Soins dentaires">Soins dentaires</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Animal</label>
                <input
                  name="pet"
                  onChange={handleChange}
                  value={formData.pet || ''}
                  placeholder="Nom de l'animal"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || ''}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time || ''}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vétérinaire</label>
                <input
                  name="doctor"
                  onChange={handleChange}
                  value={formData.doctor || ''}
                  placeholder="Nom du vétérinaire"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clinique</label>
                <input
                  name="clinic"
                  onChange={handleChange}
                  value={formData.clinic || ''}
                  placeholder="Nom de la clinique"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes || ''}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setShowForm(false)}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white rounded-md hover:from-[#FFB8C2] hover:to-[#F5F5DC]"
              >
                {editingId ? 'Modifier' : 'Planifier'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upcoming */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Prochains rendez-vous</h2>
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-8">Aucun rendez-vous à venir</div>
        ) : (
          upcomingAppointments.map(a => (
            <AppointmentCard
              key={a.id || a._id}
              appointment={a}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      {/* Past */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Historique des rendez-vous</h2>
        {pastAppointments.length === 0 ? (
          <div className="text-center py-8">Aucun rendez-vous passé</div>
        ) : (
          pastAppointments.map(a => (
            <AppointmentCard
              key={a.id || a._id}
              appointment={a}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};
