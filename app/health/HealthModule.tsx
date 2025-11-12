'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type {
  PetHealth,
  HealthRecord,
  Vaccination,
  VitalStats,
} from '@/types/health';
import { VaccinationTracker } from './components/VaccinationTracker';
import { HealthRecordList } from './components/HealthRecordList';

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
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  // form states
  const [recordNotes, setRecordNotes] = useState('');
  const [recordType, setRecordType] = useState('Consultation');
  // appointment UI removed: appointments are handled in the central Rendez-vous module
  const [vaccName, setVaccName] = useState('');
  const [vaccDate, setVaccDate] = useState('');
  const [weight, setWeight] = useState<number | ''>('');
  const { token, isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Fetch pets once auth state is known. If user is authenticated, load pets.
    if (!authLoading) {
      fetchPets();
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    if (selectedPetId) fetchPetHealth(selectedPetId);
    else setPetHealth(null);
  }, [selectedPetId]);

  async function fetchPets() {
    try {
      // Use central pets API provided by the 'mes animaux' module
      if (!isAuthenticated) {
        setMessage('Veuillez vous connecter pour voir vos animaux');
        setMessageType('error');
        return;
      }
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/pets', { headers });
      if (!res.ok) throw new Error('Failed to load pets');
      const body = await res.json();
      // central API returns { pets: [...] }
      const list: PetSummary[] = (body?.pets || []).map((p: any) => ({
        petId: p._id || p.id || p.petId,
        name: p.name,
        species: p.type || p.species || p.breed,
      }));
      setPets(list);
      if (list.length && !selectedPetId) setSelectedPetId(list[0].petId);
    } catch (err) {
      console.error(err);
      setMessage('Impossible de charger la liste des animaux');
      setMessageType('error');
    }
  }

  async function fetchPetHealth(petId: string) {
    setLoading(true);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`/api/health/${petId}`, { headers });
      if (!res.ok) throw new Error('Failed to load pet');
      const data: PetHealth = await res.json();
      setPetHealth(data);
      setWeight(data.vitalStats?.weight ?? '');
    } catch (err) {
      console.error(err);
      setMessage('Impossible de charger les informations de santé');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
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
    setBusy(true);
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`/api/health/${selectedPetId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMessage(err?.error || 'Échec lors de l\'ajout du dossier');
      setMessageType('error');
      setBusy(false);
      return;
    }
    const added: HealthRecord = await res.json();
    setPetHealth((prev: PetHealth | null) =>
      prev ? { ...prev, healthRecords: [added, ...(prev.healthRecords || [])] } : prev
    );
    setRecordNotes('');
    setMessage('Dossier ajouté');
    setMessageType('success');
    setBusy(false);
  }

  // appointment creation removed from Health module — handled by the Appointments module

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
    setBusy(true);
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`/api/health/${selectedPetId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMessage(err?.error || 'Échec lors de l\'ajout de la vaccination');
      setMessageType('error');
      setBusy(false);
      return;
    }
    const added: Vaccination = await res.json();
    setPetHealth((prev: PetHealth | null) =>
      prev ? { ...prev, vaccinations: [added, ...(prev.vaccinations || [])] } : prev
    );
    setVaccName('');
    setVaccDate('');
    setMessage('Vaccination ajoutée');
    setMessageType('success');
    setBusy(false);
  }

  async function updateWeight() {
    if (!selectedPetId) return;
    const payload = {
      action: 'updateVital',
      payload: { weight: weight === '' ? undefined : Number(weight), lastWeightDate: new Date().toISOString().split('T')[0] },
    };
    setBusy(true);
    const res = await fetch(`/api/health/${selectedPetId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setMessage(err?.error || 'Échec lors de la mise à jour du poids');
      setMessageType('error');
      setBusy(false);
      return;
    }
    const updated = await res.json();
    setPetHealth((prev: PetHealth | null) => (prev ? { ...prev, vitalStats: updated } : prev));
    setMessage('Poids mis à jour');
    setMessageType('success');
    setBusy(false);
  }

  // delete handlers
  async function handleDeleteRecord(id: string) {
    if (!selectedPetId) return;
    if (!confirm('Confirmer la suppression du dossier ?')) return;
    setBusy(true);
    try {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const res = await fetch(`/api/health/${selectedPetId}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ action: 'deleteRecord', payload: { id } }),
        });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessage(err?.error || 'Échec lors de la suppression du dossier');
        setMessageType('error');
        return;
      }
      const deleted = await res.json();
      setPetHealth((prev) => prev ? { ...prev, healthRecords: (prev.healthRecords || []).filter((r) => r.id !== deleted.id) } : prev);
      setMessage('Dossier supprimé');
      setMessageType('success');
    } catch (err) {
      console.error('deleteRecord failed', err);
      setMessage('Erreur lors de la suppression');
      setMessageType('error');
    } finally {
      setBusy(false);
    }
  }

  // appointment deletion removed from Health module — use the central appointments module

  async function handleDeleteVaccination(id: string) {
    if (!selectedPetId) return;
    if (!confirm('Confirmer la suppression de la vaccination ?')) return;
    setBusy(true);
    try {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const res = await fetch(`/api/health/${selectedPetId}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ action: 'deleteVaccination', payload: { id } }),
        });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessage(err?.error || 'Échec lors de la suppression de la vaccination');
        setMessageType('error');
        return;
      }
      const deleted = await res.json();
      setPetHealth((prev) => prev ? { ...prev, vaccinations: (prev.vaccinations || []).filter((v) => v.id !== deleted.id) } : prev);
      setMessage('Vaccination supprimée');
      setMessageType('success');
    } catch (err) {
      console.error('deleteVaccination failed', err);
      setMessage('Erreur lors de la suppression');
      setMessageType('error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Module Santé</h1>
        <p className="text-sm text-gray-500">Gérer dossiers de santé, vaccinations et rendez-vous</p>
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
        {/* Refresh button removed per request - pets are managed in the Pets module */}
      </div>

      {loading && <div>Chargement...</div>}
      {message && (
        <div className={`p-2 rounded ${messageType === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {message}
        </div>
      )}

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

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

            {/* Detailed lists: vaccinations and appointments with delete support */}
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="bg-white p-4 rounded-xl border">
                <h3 className="font-medium text-gray-700 mb-2">Vaccinations</h3>
                <VaccinationTracker vaccinations={petHealth.vaccinations || []} onDelete={handleDeleteVaccination} />
              </div>
            </div>
          </div>

          {/* Add quick items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* appointment creation removed from Health module */}

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
            <HealthRecordList records={petHealth.healthRecords || []} onDelete={handleDeleteRecord} />
          </div>
        </div>
      )}
    </div>
  );
};