import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseContext } from '../context/ExerciseContext';
import { ThemeContext } from '../context/ThemeContext';

export default function AddExerciseScreen({ navigation }) {
  const { addExercise } = useContext(ExerciseContext);
  const { colors } = useContext(ThemeContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Missing Fields', 'Please enter both the exercise name and its description.');
      return;
    }

    addExercise({
      name,
      description,
      image,
    });

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.secondaryText }]}>Exercise Name</Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <Ionicons name="barbell-outline" size={18} color={colors.secondaryText} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="e.g. Jumping Jacks"
              placeholderTextColor={colors.secondaryText}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.secondaryText }]}>Description</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <Ionicons name="document-text-outline" size={18} color={colors.secondaryText} style={styles.inputIconTop} />
            <TextInput
              style={[styles.input, styles.textArea, { color: colors.text }]}
              placeholder="How to perform the exercise..."
              placeholderTextColor={colors.secondaryText}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.secondaryText }]}>
            Image URL <Text style={{ fontWeight: '400', textTransform: 'none', color: colors.secondaryText }}>(Optional)</Text>
          </Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}>
            <Ionicons name="link-outline" size={18} color={colors.secondaryText} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="https://example.com/image.jpg"
              placeholderTextColor={colors.secondaryText}
              value={image}
              onChangeText={setImage}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]} 
          activeOpacity={0.8} 
          onPress={handleSave}
        >
          <Ionicons name="checkmark" size={20} color={colors.accentText} style={{ marginRight: 8 }} />
          <Text style={[styles.buttonText, { color: colors.accentText }]}>Save Exercise</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  textAreaContainer: {
    alignItems: 'flex-start',
  },
  inputIcon: {
    marginRight: 10,
  },
  inputIconTop: {
    marginRight: 10,
    marginTop: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 16,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 16,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#C8F560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  }
});
