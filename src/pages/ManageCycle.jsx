import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToastNotifications } from '../hooks/useToastNotifications';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';

const ManageCycle = () => {
  // State for dates and round type
  const [startDate, setStartDate] = useState(new Date('2025-01-01'));
  const [endDate, setEndDate] = useState(new Date('2025-06-30'));
  const [roundType, setRoundType] = useState('summer');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { success, error } = useToastNotifications();
  const navigate = useNavigate();

  const handleBack = () => navigate('/scad-dashboard');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      error('Please select both start and end dates');
      return;
    }
    
    if (startDate > endDate) {
      error('Start date cannot be after end date');
      return;
    }
    
    const formattedDates = {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
      roundType
    };
    
    localStorage.setItem('internshipCycle', JSON.stringify(formattedDates));
    success('Internship cycle dates updated successfully!');
    setUpdateSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  // Preset date handlers
  const setSummerRound = () => {
    const currentYear = new Date().getFullYear();
    setStartDate(new Date(`${currentYear}-05-01`));
    setEndDate(new Date(`${currentYear}-08-31`));
    setRoundType('summer');
  };

  const setWinterRound = () => {
    const currentYear = new Date().getFullYear();
    setStartDate(new Date(`${currentYear}-11-01`));
    setEndDate(new Date(`${currentYear + 1}-02-28`));
    setRoundType('winter');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        <motion.button
          whileHover={{ x: -5 }}
          onClick={handleBack}
          className="absolute top-6 left-6 z-30 flex items-center text-white hover:underline"
        >
          <ArrowLeft className="mr-1 w-5 h-5" /> Back
        </motion.button>

        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Manage Internship Cycle
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Configure the current internship cycle dates and round type
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10 mb-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Round Type Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Round Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={setSummerRound}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${roundType === 'summer' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-blue-300'}`}
              >
                <div className="flex flex-col items-center">
                  <span className="font-medium">Summer Round</span>
                  <span className="text-sm text-gray-500">May - August</span>
                </div>
              </button>
              <button
                type="button"
                onClick={setWinterRound}
                className={`py-3 px-4 rounded-lg border-2 transition-all ${roundType === 'winter' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-blue-300'}`}
              >
                <div className="flex flex-col items-center">
                  <span className="font-medium">Winter Round</span>
                  <span className="text-sm text-gray-500">November - February</span>
                </div>
              </button>
            </div>
          </div>

          {/* Date Pickers */}
          <div className="grid md:grid-cols-2 gap-6">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                components={{
                  OpenPickerIcon: Calendar,
                }}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                minDate={startDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
                components={{
                  OpenPickerIcon: Calendar,
                }}
              />
            </LocalizationProvider>
          </div>

          {/* Current Cycle Display */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Current Cycle</h4>
            <div className="flex justify-between">
              <div>
                <span className="text-sm text-gray-500">Start Date:</span>
                <p className="font-medium">
                  {startDate?.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">End Date:</span>
                <p className="font-medium">
                  {endDate?.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Round:</span>
                <p className="font-medium capitalize">{roundType}</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center"
          >
            {updateSuccess ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Updated Successfully
              </>
            ) : (
              'Update Cycle Dates'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageCycle;