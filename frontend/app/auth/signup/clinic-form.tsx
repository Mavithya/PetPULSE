'use client';

import React, { useState } from 'react';
import {
  Building2,
  Phone,
  MapPin,
  FileText,
  Upload,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface ClinicFormData {
  clinicName: string;
  contactNumber: string;
  address: string;
  description: string;
  operatingHours: string;
  licenseFile: File | null;
  clinicPhoto: File | null;
}

interface ClinicSignupFormProps {
  onSubmit: (data: ClinicFormData) => void;
  isLoading: boolean;
}

export function ClinicSignupForm({ onSubmit, isLoading }: ClinicSignupFormProps) {
  const [formData, setFormData] = useState<ClinicFormData>({
    clinicName: '',
    contactNumber: '',
    address: '',
    description: '',
    operatingHours: '',
    licenseFile: null,
    clinicPhoto: null,
  });

  const [uploadStates, setUploadStates] = useState({
    license: false,
    photo: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: 'license' | 'photo'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fileType === 'license' ? 'licenseFile' : 'clinicPhoto']: file,
      }));
      setUploadStates((prev) => ({ ...prev, [fileType]: true }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid =
    formData.clinicName &&
    formData.contactNumber &&
    formData.address &&
    formData.description &&
    formData.operatingHours &&
    formData.licenseFile;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Basic Information
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Clinic Name *
            </label>
            <input
              type="text"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleInputChange}
              required
              placeholder="Enter clinic name"
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Contact Number *
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                placeholder="+94 7X XXX XXXX"
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Clinic Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Clinic Details
          </h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Street, City, Province"
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Description / Services *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Brief description of your clinic and services offered"
              rows={3}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Operating Hours *
            </label>
            <input
              type="text"
              name="operatingHours"
              value={formData.operatingHours}
              onChange={handleInputChange}
              required
              placeholder="e.g., Mon-Sat 9AM-6PM, Sun 10AM-4PM"
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
            />
          </div>
        </div>
      </motion.div>

      {/* Verification Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-800"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
            <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Verification Documents
          </h3>
        </div>

        <div className="space-y-5">
          {/* License Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              License / Registration Document *
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'license')}
                accept=".pdf,.jpg,.jpeg,.png"
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="px-4 py-3 bg-white dark:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-primary-500 transition-colors flex items-center gap-3">
                {uploadStates.license ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">
                        {formData.licenseFile?.name}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        File uploaded successfully
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Click to upload license
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        PDF, JPG, or PNG
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Clinic Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Clinic Photo
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'photo')}
                accept=".jpg,.jpeg,.png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="px-4 py-3 bg-white dark:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-primary-500 transition-colors flex items-center gap-3">
                {uploadStates.photo ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-green-700 dark:text-green-400">
                        {formData.clinicPhoto?.name}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        File uploaded successfully
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Click to upload clinic photo
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        JPG or PNG (optional)
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-medium text-slate-900 dark:text-white">
                ℹ️ Your clinic will be reviewed by our admin team before being visible to pet owners.
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!isFormValid || isLoading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Creating clinic account...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            Create Clinic Account
          </>
        )}
      </motion.button>
    </form>
  );
}
