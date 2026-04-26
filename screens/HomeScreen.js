import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, SafeAreaView, Alert, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseContext } from '../context/ExerciseContext';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Push harder than yesterday if you want a different tomorrow.",
  "It never gets easier, you just get stronger.",
  "Success starts with self-discipline.",
  "Don't stop when you're tired. Stop when you're done."
];

export default function HomeScreen({ navigation }) {
  const { exercises, toggleFavorite } = useContext(ExerciseContext);
  const { colors, isDarkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  
  const [quote, setQuote] = useState('');
  const [activeTab, setActiveTab] = useState('Categories');
  const [showFavorites, setShowFavorites] = useState(false);
  const [remindersOn, setRemindersOn] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    setQuote(QUOTES[randomIndex]);
  }, []);

  const handleToggleReminders = () => {
    const newState = !remindersOn;
    setRemindersOn(newState);
    Alert.alert(
      "Reminders", 
      newState ? "Daily reminders have been turned ON." : "Daily reminders have been turned OFF."
    );
  };

  // Filter exercises based on tabs and favorites
  const filteredExercises = exercises.filter(ex => {
    if (showFavorites && !ex.isFavorite) return false;
    if (activeTab === 'Your Sessions' && !ex.completed) return false;
    return true;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.cardContainer, { backgroundColor: colors.cardBackground }]} 
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ExerciseDetail', { id: item.id })}
    >
      <View style={styles.cardContent}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, { backgroundColor: colors.background }]}>
            <Ionicons name="barbell-outline" size={28} color={colors.text} />
          </View>
        )}
        
        <View style={styles.cardTextContainer}>
          <Text style={[styles.exerciseName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.exerciseDesc, { color: colors.secondaryText }]} numberOfLines={1}>{item.description}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.actionIcon}>
            <Ionicons 
              name={item.isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={item.isFavorite ? "#FF3B30" : colors.border} 
            />
          </TouchableOpacity>
          <View style={styles.actionIcon}>
            {item.completed ? (
              <Ionicons name="checkmark-circle" size={24} color="#34C759" /> 
            ) : (
              <Ionicons name="ellipse-outline" size={24} color={colors.border} /> 
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.backgroundCurve, { backgroundColor: colors.primary }]} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.greetingTitle}>Hello, {user?.firstName || 'Guest'}!</Text>
          <Text style={styles.greetingSubtitle}>Choose your workout</Text>
          <Text style={styles.quoteText}>"{quote}"</Text>

          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'Categories' && styles.activeTab]}
              onPress={() => setActiveTab('Categories')}
            >
              <Text style={[styles.tabText, activeTab === 'Categories' && styles.activeTabText]}>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'Your Sessions' && styles.activeTab]}
              onPress={() => setActiveTab('Your Sessions')}
            >
              <Text style={[styles.tabText, activeTab === 'Your Sessions' && styles.activeTabText]}>Your Sessions</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: colors.secondaryText, marginTop: 40 }}>
              No exercises found.
            </Text>
          }
        />

        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: colors.primary }]} 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('AddExercise')}
        >
          <Ionicons name="add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={[styles.bottomNav, { backgroundColor: colors.navBackground }]}>
        <TouchableOpacity style={styles.navItem} onPress={() => setShowFavorites(false)}>
          <Ionicons name={!showFavorites ? "home" : "home-outline"} size={26} color={!showFavorites ? colors.text : colors.secondaryText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleToggleReminders}>
          <Ionicons name={remindersOn ? "notifications" : "notifications-outline"} size={26} color={remindersOn ? colors.text : colors.secondaryText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setShowFavorites(true)}>
          <Ionicons name={showFavorites ? "heart" : "heart-outline"} size={26} color={showFavorites ? colors.text : colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundCurve: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 380,
    borderBottomRightRadius: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#A0A0A5',
    fontWeight: '600',
    fontSize: 13,
  },
  activeTabText: {
    color: '#212C4F',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 120, 
    paddingTop: 10,
  },
  cardContainer: {
    borderRadius: 30, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
    marginHorizontal: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseDesc: {
    fontSize: 13,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    padding: 4,
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 100, 
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 85,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
    paddingBottom: 15,
  },
  navItem: {
    padding: 10,
  }
});
