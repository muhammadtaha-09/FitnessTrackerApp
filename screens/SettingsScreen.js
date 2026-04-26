import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme, notificationsOn, toggleNotifications, colors } = useContext(ThemeContext);

  const handleLogout = async () => {
    await logout();
  };

  const handleToggleNotifications = () => {
    toggleNotifications();
    Alert.alert(
      "Notifications", 
      !notificationsOn ? "Notifications have been turned ON." : "Notifications have been turned OFF."
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Preferences Section */}
      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>Preferences</Text>
        
        {/* Notifications Toggle */}
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(200,245,96,0.15)' }]}>
              <Ionicons name="notifications-outline" size={20} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.settingText, { color: colors.text }]}>Notifications</Text>
              <Text style={[styles.settingSubtext, { color: colors.secondaryText }]}>Daily workout reminders</Text>
            </View>
          </View>
          <Switch 
            value={notificationsOn} 
            onValueChange={handleToggleNotifications} 
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={'#FFFFFF'}
          />
        </View>

        {/* Separator */}
        <View style={[styles.separator, { backgroundColor: colors.border }]} />

        {/* Dark Mode Toggle */}
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
              <Ionicons name="moon-outline" size={20} color={colors.text} />
            </View>
            <View>
              <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
              <Text style={[styles.settingSubtext, { color: colors.secondaryText }]}>Switch app appearance</Text>
            </View>
          </View>
          <Switch 
            value={isDarkMode} 
            onValueChange={toggleTheme} 
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={'#FFFFFF'}
          />
        </View>
      </View>

      {/* About Section */}
      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.secondaryText }]}>About</Text>
        
        <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(50,215,75,0.15)' }]}>
              <Ionicons name="information-circle-outline" size={20} color={colors.success} />
            </View>
            <View>
              <Text style={[styles.settingText, { color: colors.text }]}>Version</Text>
              <Text style={[styles.settingSubtext, { color: colors.secondaryText }]}>1.0.0</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: 'rgba(255,69,58,0.12)', borderColor: 'rgba(255,69,58,0.2)' }]} 
        onPress={handleLogout} 
        activeOpacity={0.8}
      >
        <Ionicons name="log-out-outline" size={20} color={colors.danger} />
        <Text style={[styles.logoutText, { color: colors.danger }]}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingText: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingSubtext: {
    fontSize: 12,
    marginTop: 2,
  },
  separator: {
    height: 1,
    marginVertical: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  }
});
