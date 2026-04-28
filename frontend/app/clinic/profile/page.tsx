'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Phone,
  MapPin,
  Clock,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Star,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ClinicProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const isVerified = user?.verificationStatus === 'approved';
  const isPending = user?.verificationStatus === 'pending';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Clinic Profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your clinic information and services.
          </p>
        </div>
        {!isVerified && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </motion.button>
        )}
      </div>

      {/* Verification Status */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Verification Status
        </h2>
        <div className="flex items-center gap-4">
          {isVerified && (
            <>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-green-700 dark:text-green-400">
                  Verified Clinic ✅
                </p>
                <p className="text-sm text-green-600 dark:text-green-500">
                  Your clinic is visible to pet owners
                </p>
              </div>
            </>
          )}
          {isPending && (
            <>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-semibold text-amber-700 dark:text-amber-400">
                  Pending Verification ⏳
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-500">
                  Your clinic is under review (24-48 hours)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Clinic Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Clinic Information
          </h2>
        </div>

        {!isEditing ? (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Clinic Name
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {user?.clinicName || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Email
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {user?.email || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-5 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Contact Number
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    +94 71 234 5678
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Location
                  </p>
                  <p className="text-slate-900 dark:text-white">
                    Colombo, Sri Lanka
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-200 dark:border-slate-800">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                Description
              </p>
              <p className="text-slate-900 dark:text-white leading-relaxed">
                Full-service veterinary clinic specializing in small animals. We offer preventive care, surgical procedures, dental services, and emergency care. Our team is dedicated to providing high-quality care for your beloved pets.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-200 dark:border-slate-800 flex items-start gap-3">
              <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Operating Hours
                </p>
                <div className="space-y-1 text-slate-900 dark:text-white">
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat: 9:00 AM - 4:00 PM</p>
                  <p>Sun: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Clinic Name
              </label>
              <input
                type="text"
                defaultValue={user?.clinicName}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                defaultValue="+94 71 234 5678"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                defaultValue="Full-service veterinary clinic specializing in small animals..."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white resize-none"
              />
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
      >
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Services Offered
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            'General Check-ups',
            'Vaccinations',
            'Dental Care',
            'Surgery',
            'Emergency Care',
            'Grooming',
          ].map((service) => (
            <div
              key={service}
              className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
            >
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">{service}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Reviews Section - Only if verified */}
      {isVerified && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
        >
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Recent Reviews
          </h2>
          <div className="space-y-4">
            {[
              {
                name: 'Sarah Jenkins',
                rating: 5,
                text: 'Excellent service! Dr. Paw team was very professional and caring.',
              },
              {
                name: 'Mike Thompson',
                rating: 5,
                text: 'Highly recommend. My cat received great care.',
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="pb-4 border-b border-slate-200 dark:border-slate-800 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {review.name}
                  </p>
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
