import React, { createContext, useState } from 'react';

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([
    {
      id: '1',
      name: 'Push Ups',
      description: 'A classic bodyweight exercise for the chest, shoulders, and triceps.',
      image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&q=80&w=400',
      completed: false,
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Squats',
      description: 'A lower body exercise targeting the thighs and glutes.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400',
      completed: true,
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
