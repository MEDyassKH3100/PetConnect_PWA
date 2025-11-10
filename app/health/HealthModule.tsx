'use client';

import React, { useEffect, useState } from 'react';
import {
  CalendarIcon,
  ClipboardListIcon,
  ActivityIcon,
  PlusIcon,
  BrainIcon,
} from 'lucide-react';
import type {
  PetHealth,
  HealthRecord,
  MedicalAppointment,
  Vaccination,
  VitalStats,
} from '@/types/health';

interface PetSummary {
  petId: string;
  name?: string;
  species?: string;
}

export const HealthModule = () => {
  const [pets, setPets] = useState<PetSummary[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [petHealth, setPetHealth] = useState<PetHealth | null>(null);
  const [loading, setLoading] = useState(false);

  // form states
  const [newPetName, setNewPetName] = useState('');
  const [newPetSpecies, setNewPetSpecies] = useState('');
  const [recordNotes, setRecordNotes] = useState('');
  const [recordType, setRecordType] = useState('Consultation');
  const [appDate, setAppDate] = useState('');
  const [appTime, setAppTime] = useState('');
  const [appType, setAppType] = useState('Consultation');
  const [vaccName, setVaccName] = useState('');
  const [vaccDate, setVaccDate] = useState('');
  const [weight, setWeight] = useState<number | ''>('');

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    if (selectedPetId) fetchPetHealth(selectedPetId);
    else setPetHealth(null);
  }, [selectedPetId]);

  async function fetchPets() {
    try {
      const res = await fetch('/api/health/pets');
      if (!res.ok) throw new Error('Failed to load pets');
      const list: PetSummary[] = await res.json();
      setPets(list);
      if (list.length && !selectedPetId) setSelectedPetId(list[0].petId);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchPetHealth(petId: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/health/${petId}`);
      if (!res.ok) throw new Error('Failed to load pet');
      const data: PetHealth = await res.json();
      setPetHealth(data);
      setWeight(data.vitalStats?.weight ?? '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createPet() {
    if (!newPetName.trim()) return alert('Enter a name');
    const res = await fetch('/api/health/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newPetName.trim(), species: newPetSpecies.trim() }),
    });
    if (!res.ok) return alert('Failed to create pet');
    const created: PetSummary & { vitalStats?: VitalStats } = await res.json();
    setPets((prev: PetSummary[]) => [created, ...prev]);
    setNewPetName('');
    setNewPetSpecies('');
    setSelectedPetId(created.petId);
  }

  async function addRecord() {
    if (!selectedPetId) return;
    const payload = {
      action: 'addRecord',
      payload: {
        date: new Date().toISOString().split('T')[0],
        type: recordType,
        practitioner: '',
        notes: recordNotes,
      },
    };
    const res = await fetch(`/api/health/${selectedPetId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return alert('Failed to add record');
    const added: HealthRecord = await res.json();
    setPetHealth((prev: PetHealth | null) =>
      prev ? { ...prev, healthRecords: [added, ...(prev.healthRecords || [])] } : prev
    );
    setRecordNotes('');
  }

  async function addAppointment() {
    if (!selectedPetId) return;
    const payload = {
      action: 'addAppointment',
      payload: {
        date: appDate,
        time: appTime,
        type: appType,
        practitioner: '',
        notes: '',
      },
    };
    const res = await fetch(`/api/health/${selectedPetId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return alert('Failed to add appointment');
    const added: MedicalAppointment = await res.json();
    setPetHealth((prev: PetHealth | null) =>
      prev ? { ...prev, appointments: [added, ...(prev.appointments || [])] } : prev
    );
    setAppDate('');
    setAppTime('');
  }

  async function addVaccination() {
    if (!selectedPetId) return;
    const payload = {
      action: 'addVaccination',
      payload: {
        name: vaccName,
        date: vaccDate,
        nextDueDate: '',
        status: 'up-to-date',
      },
    };
    const res = await fetch(`/api/health/${selectedPetId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return alert('Failed to add vaccination');
    const added: Vaccination = await res.json();
    setPetHealth((prev: PetHealth | null) =>
      prev ? { ...prev, vaccinations: [added, ...(prev.vaccinations || [])] } : prev
    );
    setVaccName('');
    setVaccDate('');
  }

  async function updateWeight() {
    if (!selectedPetId) return;
    const payload = {
      action: 'updateVital',
      payload: { weight: weight === '' ? undefined : Number(weight), lastWeightDate: new Date().toISOString().split('T')[0] },
    };
    const res = await fetch(`/api/health/${selectedPetId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return alert('Failed to update weight');
    const updated = await res.json();
    setPetHealth((prev: PetHealth | null) => (prev ? { ...prev, vitalStats: updated } : prev));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Module Santé</h1>
        <div className="flex items-center space-x-2">
          <input
            value={newPetName}
            onChange={(e) => setNewPetName(e.target.value)}
            placeholder="Nouveau animal (nom)"
            className="px-3 py-2 border rounded"
          />
          <input
            value={newPetSpecies}
            onChange={(e) => setNewPetSpecies(e.target.value)}
            placeholder="Espèce"
            className="px-3 py-2 border rounded"
          />
          <button onClick={createPet} className="flex items-center space-x-1 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-3 py-2 rounded-lg">
            <PlusIcon size={16} />
            <span>Ajouter</span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="text-sm text-gray-600">Sélectionner animal:</label>
        <select
          value={selectedPetId ?? ''}
          onChange={(e) => setSelectedPetId(e.target.value || null)}
          className="px-3 py-2 border rounded"
        >
          <option value="">-- Choisir --</option>
          {pets.map((p: PetSummary) => (
            <option key={p.petId} value={p.petId}>
              {p.name || p.petId} {p.species ? `(${p.species})` : ''}
            </option>
          ))}
        </select>
        <button onClick={fetchPets} className="px-3 py-2 border rounded">Rafraîchir</button>
      </div>

      {loading && <div>Chargement...</div>}

      {!petHealth && !loading && <div className="text-gray-500">Aucun animal sélectionné</div>}

      {petHealth && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{petHealth.name || 'Animal'}</h2>
                <p className="text-sm text-gray-500">{petHealth.species}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dernier bilan: {petHealth.vitalStats?.lastCheckup || '—'}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Poids</p>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="kg"
                    className="px-2 py-1 border rounded w-24"
                  />
                  <button onClick={updateWeight} className="px-3 py-1 bg-[#FFB8C2] text-white rounded">Mettre à jour</button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Dernière mesure: {petHealth.vitalStats?.lastWeightDate || '—'}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Vaccinations</p>
                <p className="text-lg font-semibold text-gray-800">{(petHealth.vaccinations || []).length}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Prochains RDV</p>
                <p className="text-lg font-semibold text-gray-800">{(petHealth.appointments || []).length}</p>
              </div>
            </div>
          </div>

          {/* Add quick items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border">
              <h3 className="font-medium text-gray-700 mb-2">Ajouter dossier</h3>
              <select value={recordType} onChange={(e) => setRecordType(e.target.value)} className="mb-2 px-2 py-1 border rounded w-full">
                <option>Consultation</option>
                <option>Vaccination</option>
                <option>Traitement</option>
                <option>Note</option>
              </select>
              <textarea value={recordNotes} onChange={(e) => setRecordNotes(e.target.value)} rows={3} className="w-full px-2 py-1 border rounded mb-2" placeholder="Notes..." />
              <button onClick={addRecord} className="px-3 py-2 bg-[#FFB8C2] text-white rounded">Ajouter</button>
            </div>

            <div className="bg-white p-4 rounded-xl border">
              <h3 className="font-medium text-gray-700 mb-2">Nouveau rendez-vous</h3>
              <input type="date" value={appDate} onChange={(e) => setAppDate(e.target.value)} className="mb-2 px-2 py-1 border rounded w-full" />
              <input type="time" value={appTime} onChange={(e) => setAppTime(e.target.value)} className="mb-2 px-2 py-1 border rounded w-full" />
              <input value={appType} onChange={(e) => setAppType(e.target.value)} placeholder="Type" className="mb-2 px-2 py-1 border rounded w-full" />
              <button onClick={addAppointment} className="px-3 py-2 bg-[#FFB8C2] text-white rounded">Ajouter RDV</button>
            </div>

            <div className="bg-white p-4 rounded-xl border">
              <h3 className="font-medium text-gray-700 mb-2">Ajouter vaccination</h3>
              <input value={vaccName} onChange={(e) => setVaccName(e.target.value)} placeholder="Nom vaccination" className="mb-2 px-2 py-1 border rounded w-full" />
              <input type="date" value={vaccDate} onChange={(e) => setVaccDate(e.target.value)} className="mb-2 px-2 py-1 border rounded w-full" />
              <button onClick={addVaccination} className="px-3 py-2 bg-[#FFB8C2] text-white rounded">Ajouter</button>
            </div>
          </div>

          {/* Records table */}
          <div className="bg-white p-6 rounded-xl border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Dossier médical récent</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Praticien</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(petHealth.healthRecords || []).map((r: HealthRecord) => (
                    <tr key={r.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{r.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.practitioner}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};