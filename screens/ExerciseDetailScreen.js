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
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.secondaryText }]}>Exercise not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} bounces={false}>
      <View style={styles.imageContainer}>
        {exercise.image ? (
          <Image 
            source={{ uri: exercise.image }} 
            style={styles.image} 
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor: colors.cardBackground }]}>
            <Ionicons name="image-outline" size={48} color={colors.secondaryText} />
          </View>
        )}
        <View style={styles.imageOverlay} />
      </View>
      
      <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.text }]}>{exercise.name}</Text>
          <View style={[styles.statusBadge, { 
            backgroundColor: exercise.completed ? 'rgba(50,215,75,0.15)' : 'rgba(255,255,255,0.08)' 
          }]}>
            <Ionicons 
              name={exercise.completed ? "checkmark-circle" : "time-outline"} 
              size={14} 
              color={exercise.completed ? colors.success : colors.secondaryText} 
              style={styles.statusIcon}
            />
            <Text style={[styles.statusText, { color: exercise.completed ? colors.success : colors.secondaryText }]}>
              {exercise.completed ? 'Completed' : 'Pending'}
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Text style={[styles.descriptionHeader, { color: colors.primary }]}>INSTRUCTION</Text>
        <Text style={[styles.description, { color: colors.text }]}>{exercise.description}</Text>

        <TouchableOpacity 
          style={[
            styles.button, 
            exercise.completed 
              ? { borderColor: colors.border, borderWidth: 1, backgroundColor: 'transparent' }
              : { backgroundColor: colors.primary }
          ]} 
          activeOpacity={0.8}
          onPress={() => toggleComplete(exercise.id)}
        >
          <Ionicons 
            name={exercise.completed ? "arrow-undo-outline" : "checkmark-outline"} 
            size={20} 
            color={exercise.completed ? colors.text : colors.accentText} 
          />
          <Text style={[styles.buttonText, { color: exercise.completed ? colors.text : colors.accentText }]}>
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
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  imageContainer: {
    width: '100%',
    height: 340,
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
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  contentContainer: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    padding: 24,
    paddingTop: 28,
    minHeight: 500,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 12,
  },
  divider: {
    height: 1,
    marginBottom: 24,
  },
  descriptionHeader: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 1.5,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 'auto',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});
