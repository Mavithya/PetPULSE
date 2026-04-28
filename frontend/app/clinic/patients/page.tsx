'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  ChevronRight,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CLINIC_PATIENTS = [
  {
    id: '1',
    petName: 'Bella',
    petType: 'Dog',
    breed: 'Labrador',
    petOwner: 'Sarah Jenkins',
    diagnosis: 'Annual Checkup & Vaccines',
    visitType: 'Routine',
    date: 'Today, 10:00 AM',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    id: '2',
    petName: 'Oliver',
    petType: 'Cat',
    breed: 'Persian',
    petOwner: 'Mike Thompson',
    diagnosis: 'Lethargy, loss of appetite',
    visitType: 'Emergency',
    date: 'Today, 2:30 PM',
    status: 'In Progress',
    statusColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  {
    id: '3',
    petName: 'Charlie',
    petType: 'Dog',
    breed: 'Golden Retriever',
    petOwner: 'Emily Davis',
    diagnosis: 'Post-surgery follow up',
    visitType: 'Walk-in',
    date: 'Tomorrow, 9:00 AM',
    status: 'Scheduled',
    statusColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
];

export default function ClinicPatients() {
  const { user } = useAuth();
  const isPending = user?.verificationStatus === 'pending';
  const [searchTerm, setSearchTerm] = useState('');

  const displayPatients = isPending ? [] : CLINIC_PATIENTS;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Clinic Patients
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your patient records and medical history.
        </p>
      </div>

      {isPending && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 flex items-start gap-4"
        >
          <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-200">
              Feature Unavailable During Verification
            </h3>
            <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
              Patient management will be available once your clinic is verified by our admin team.
            </p>
          </div>
        </motion.div>
      )}

      {!isPending && (
        <>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent & Upcoming Cases
              </h2>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none dark:text-white"
                  />
                </div>
                <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Pet Name
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Pet Owner
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Diagnosis / Reason
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Visit Type
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayPatients.map((patient, idx) => (
                    <motion.tr
                      key={patient.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {patient.petName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {patient.petType} • {patient.breed}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {patient.petOwner}
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300 max-w-xs truncate">
                        {patient.diagnosis}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            patient.visitType === 'Emergency'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              : patient.visitType === 'Walk-in'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          }`}
                        >
                          {patient.visitType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300 text-sm">
                        {patient.date}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${patient.statusColor}`}
                        >
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center gap-1 ml-auto">
                          View
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {displayPatients.length === 0 && !isPending && (
              <div className="p-12 text-center">
                <p className="text-slate-500 dark:text-slate-400">
                  No patients found. Patients will appear here as they visit your clinic.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
