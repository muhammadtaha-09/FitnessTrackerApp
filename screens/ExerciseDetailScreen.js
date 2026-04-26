import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseContext } from '../context/ExerciseContext';
import { ThemeContext } from '../context/ThemeContext';

export default function ExerciseDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const { exercises, toggleComplete } = useContext(ExerciseContext);
  const { colors, isDarkMode } = useContext(ThemeContext);
  
  const exercise = exercises.find(ex => ex.id === id);

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Exercise not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} bounces={false}>
      <View style={[styles.imageContainer, { backgroundColor: colors.cardBackground }]}>
        {exercise.image ? (
          <Image 
            source={{ uri: exercise.image }} 
            style={styles.image} 
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="image-outline" size={48} color={colors.secondaryText} />
          </View>
        )}
      </View>
      
      <View style={[styles.contentContainer, { backgroundColor: colors.cardBackground, shadowColor: isDarkMode ? '#000' : '#000' }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.text }]}>{exercise.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: colors.background }]}>
            <Ionicons 
              name={exercise.completed ? "checkmark-circle" : "time-outline"} 
              size={16} 
              color={exercise.completed ? "#34C759" : colors.secondaryText} 
              style={styles.statusIcon}
            />
            <Text style={[styles.statusText, { color: exercise.completed ? "#34C759" : colors.secondaryText }]}>
              {exercise.completed ? 'Completed' : 'Pending'}
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Text style={[styles.descriptionHeader, { color: colors.secondaryText }]}>Instruction</Text>
        <Text style={[styles.description, { color: colors.text }]}>{exercise.description}</Text>

        <TouchableOpacity 
          style={[
            styles.button, 
            exercise.completed 
              ? [styles.buttonPending, { borderColor: colors.border, backgroundColor: colors.cardBackground }] 
              : [styles.buttonCompleted, { backgroundColor: colors.primary }]
          ]} 
          activeOpacity={0.8}
          onPress={() => toggleComplete(exercise.id)}
        >
          <Ionicons 
            name={exercise.completed ? "arrow-undo-outline" : "checkmark-outline"} 
            size={20} 
            color={exercise.completed ? colors.text : "#FFFFFF"} 
          />
          <Text style={[styles.buttonText, exercise.completed ? { color: colors.text } : { color: '#FFFFFF' }]}>
            {exercise.completed ? 'Mark as Incomplete' : 'Complete Exercise'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  errorText: {
    color: '#1A1A1A',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  imageContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#F2F2F7',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    padding: 24,
    paddingTop: 32,
    minHeight: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#8E8E93',
  },
  statusTextCompleted: {
    color: '#34C759',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginBottom: 20,
  },
  descriptionHeader: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 26,
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 30,
    marginTop: 'auto',
  },
  buttonCompleted: {
    backgroundColor: '#1A1A1A', // Minimalist black
  },
  buttonPending: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonTextPending: {
    color: '#1A1A1A',
  }
});
