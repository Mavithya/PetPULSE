'use client';

import React, { useState } from 'react';
import { Search, MapPin, Star, Filter, MapPinIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_VETS = [
  {
    id: '1',
    name: 'Dr. Sarah Jenkins',
    clinic: 'Paws & Claws Veterinary Clinic',
    specialization: ['Dogs', 'Cats', 'Surgery'],
    rating: 4.9,
    reviews: 128,
    distance: '2.4 km',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    clinic: 'City Center Animal Hospital',
    specialization: ['Cats Only', 'Internal Medicine'],
    rating: 4.8,
    reviews: 95,
    distance: '3.1 km',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    clinic: 'Happy Tails Vet Care',
    specialization: ['Dogs', 'Dermatology'],
    rating: 4.7,
    reviews: 210,
    distance: '5.0 km',
    imageUrl: 'https://images.unsplash.com/photo-1594824436998-058d0159a5e3?w=400&h=400&fit=crop',
  },
];

export default function FindVets() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Dogs', 'Cats', 'Surgery', 'Highest Rated'];

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Find the perfect vet for your furry friend
          </h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, clinic, or specialization..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
              />
            </div>
            <div className="sm:w-48 relative">
              <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Location"
                defaultValue="New York, NY"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
              />
            </div>
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-primary-600/20 whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 mr-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_VETS.map((vet, index) => (
          <motion.div
            key={vet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={vet.imageUrl}
                alt={vet.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {vet.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {vet.clinic}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(vet.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {vet.rating}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  ({vet.reviews})
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPinIcon className="w-4 h-4" />
                  {vet.distance}
                </div>

                <div className="flex flex-wrap gap-2">
                  {vet.specialization.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-2.5 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                View Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
