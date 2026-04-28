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
      <div className="relative p-6 overflow-hidden bg-white border shadow-sm dark:bg-slate-900 rounded-2xl sm:p-8 border-slate-200 dark:border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 rounded-full bg-primary-500/10 blur-3xl translate-x-1/3" />

        <div className="relative z-10 max-w-2xl">
          <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
            Find the perfect vet for your furry friend
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, clinic, or specialization..."
                className="w-full py-3 pl-10 pr-4 transition-all border outline-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white"
              />
            </div>
            <div className="relative sm:w-48">
              <MapPin className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Location"
                defaultValue="New York, NY"
                className="w-full py-3 pl-10 pr-4 transition-all border outline-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:text-white"
              />
            </div>
            <button className="px-6 py-3 font-medium text-white transition-colors shadow-sm bg-primary-600 hover:bg-primary-700 rounded-xl shadow-primary-600/20 whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 pb-2 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 px-3 py-2 mr-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_VETS.map((vet, index) => (
          <motion.div
            key={vet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden transition-all bg-white border shadow-sm dark:bg-slate-900 rounded-2xl border-slate-200 dark:border-slate-800 hover:shadow-md"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={vet.imageUrl}
                alt={vet.name}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {vet.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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
