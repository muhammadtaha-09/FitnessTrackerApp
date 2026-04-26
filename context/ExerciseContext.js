import React, { createContext, useState } from 'react';

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([
    {
      id: '1',
      name: 'Morning Run',
      description: 'Start your day with a 30-minute outdoor jog to build cardiovascular endurance and boost your metabolism.',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=400',
      completed: false,
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Deadlifts',
      description: 'A compound movement targeting the posterior chain including hamstrings, glutes, and lower back.',
      image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=400',
      completed: true,
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Yoga Flow',
      description: 'A calming 20-minute vinyasa sequence to improve flexibility, balance, and mental clarity.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400',
      completed: false,
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Battle Ropes',
      description: 'High-intensity interval training with battle ropes for full-body conditioning and fat burning.',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=400',
      completed: false,
      isFavorite: true,
    },
  ]);

  const addExercise = (newExercise) => {
    setExercises((prev) => [...prev, { ...newExercise, id: Date.now().toString(), completed: false, isFavorite: false }]);
  };

  const toggleComplete = (id) => {
    setExercises((prev) => prev.map(ex => ex.id === id ? { ...ex, completed: !ex.completed } : ex));
  };

  const toggleFavorite = (id) => {
    setExercises((prev) => prev.map(ex => ex.id === id ? { ...ex, isFavorite: !ex.isFavorite } : ex));
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addExercise, toggleComplete, toggleFavorite }}>
      {children}
    </ExerciseContext.Provider>
  );
};
