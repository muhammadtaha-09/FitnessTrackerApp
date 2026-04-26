import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, SafeAreaView, Alert, Platform, StatusBar, Animated } from 'react-native';
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
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    setQuote(QUOTES[randomIndex]);
  }, []);

  // Filter exercises based on favorites
  const filteredExercises = exercises.filter(ex => {
    if (showFavorites && !ex.isFavorite) return false;
    return true;
  });

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity 
      style={[styles.cardContainer, { backgroundColor: colors.cardBackground }]} 
      activeOpacity={0.85}
      onPress={() => navigation.navigate('ExerciseDetail', { id: item.id })}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImage, { backgroundColor: colors.cardBackgroundAlt, alignItems: 'center', justifyContent: 'center' }]}>
          <Ionicons name="barbell-outline" size={40} color={colors.secondaryText} />
        </View>
      )}
      
      <View style={styles.cardOverlay} />
      
      <View style={styles.cardInfo}>
        <View style={styles.cardInfoLeft}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.cardSubtitle} numberOfLines={1}>{item.description}</Text>
        </View>
        
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.cardActionBtn}>
            <Ionicons 
              name={item.isFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={item.isFavorite ? "#FF453A" : "rgba(255,255,255,0.7)"} 
            />
          </TouchableOpacity>
          {item.completed && (
            <View style={[styles.completedBadge, { backgroundColor: colors.primary }]}>
              <Ionicons name="checkmark" size={12} color={colors.accentText} />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
                <Text style={[styles.avatarText, { color: colors.accentText }]}>
                  {user?.firstName?.charAt(0) || 'G'}
                </Text>
              </View>
              <View style={styles.greetingBlock}>
                <Text style={[styles.greetingSmall, { color: colors.secondaryText }]}>{getGreeting()}</Text>
                <Text style={[styles.greetingName, { color: colors.text }]}>{user?.firstName || 'Guest'} 👋</Text>
              </View>
            </View>
            
            <View style={styles.headerRight}>
              <TouchableOpacity 
                onPress={() => setShowFavorites(!showFavorites)} 
                style={[styles.headerIconBtn, { backgroundColor: showFavorites ? colors.primary : colors.cardBackground }]}
              >
                <Ionicons 
                  name={showFavorites ? "heart" : "heart-outline"} 
                  size={20} 
                  color={showFavorites ? colors.accentText : colors.text} 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Settings')} 
                style={[styles.headerIconBtn, { backgroundColor: colors.cardBackground }]}
              >
                <Ionicons name="settings-outline" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Quote Card */}
          <View style={[styles.quoteCard, { backgroundColor: colors.cardBackground, borderLeftColor: colors.primary }]}>
            <Ionicons name="flame" size={16} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={[styles.quoteText, { color: colors.secondaryText }]} numberOfLines={2}>"{quote}"</Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: colors.cardBackground }]}>
              <View style={[styles.statIconCircle, { backgroundColor: 'rgba(200,245,96,0.15)' }]}>
                <Ionicons name="fitness" size={18} color={colors.primary} />
              </View>
              <Text style={[styles.statNumber, { color: colors.text }]}>{exercises.length}</Text>
              <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Total</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.cardBackground }]}>
              <View style={[styles.statIconCircle, { backgroundColor: 'rgba(50,215,75,0.15)' }]}>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              </View>
              <Text style={[styles.statNumber, { color: colors.text }]}>{exercises.filter(e => e.completed).length}</Text>
              <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Done</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.cardBackground }]}>
              <View style={[styles.statIconCircle, { backgroundColor: 'rgba(255,69,58,0.15)' }]}>
                <Ionicons name="heart" size={18} color={colors.danger} />
              </View>
              <Text style={[styles.statNumber, { color: colors.text }]}>{exercises.filter(e => e.isFavorite).length}</Text>
              <Text style={[styles.statLabel, { color: colors.secondaryText }]}>Favs</Text>
            </View>
          </View>

          {/* Section Title */}
          <View style={styles.sectionTitleRow}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {showFavorites ? 'Favorites' : 'Workouts'}
            </Text>
            <View style={[styles.countBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.countBadgeText, { color: colors.accentText }]}>{filteredExercises.length}</Text>
            </View>
          </View>
        </View>

        {/* Exercise List */}
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="heart-dislike-outline" size={48} color={colors.secondaryText} />
              <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
                {showFavorites ? 'No favorites yet. Tap the heart icon on any workout!' : 'No exercises found.'}
              </Text>
            </View>
          }
        />

        {/* FAB */}
        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: colors.primary }]} 
          activeOpacity={0.9}
          onPress={() => navigation.navigate('AddExercise')}
        >
          <Ionicons name="add" size={28} color={colors.accentText} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 12 : 16,
    paddingBottom: 4,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
  },
  greetingBlock: {},
  greetingSmall: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  greetingName: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 18,
    borderLeftWidth: 3,
  },
  quoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    flex: 1,
    lineHeight: 17,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
  },
  statIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginRight: 8,
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 4,
  },
  cardContainer: {
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    height: 180,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cardInfoLeft: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardActionBtn: {
    padding: 4,
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#C8F560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
  },
});
