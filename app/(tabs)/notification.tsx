import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#2563EB',
  critical: '#DC2626',
  warning: '#F59E0B',
  success: '#10B981',
  white: '#FFFFFF',
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray600: '#475569',
  gray900: '#0F172A',
};

const NotificationScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const notifications = [
    {
      id: 1,
      title: 'Critical Alert',
      description: 'Unauthorized access detected - Main Entrance',
      time: '2m ago',
      severity: 'critical',
      type: 'security'
    },
    {
      id: 2,
      title: 'System Warning',
      description: 'Camera 3 battery level low (15%)',
      time: '10m ago',
      severity: 'warning',
      type: 'system'
    },
    {
      id: 3,
      title: 'Status Update',
      description: 'All systems operating normally',
      time: '1h ago',
      severity: 'info',
      type: 'status'
    }
  ];

  const getSeverityColor = (severity :any) => {
    switch(severity) {
      case 'critical': return COLORS.critical;
      case 'warning': return COLORS.warning;
      default: return COLORS.success;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Security Alerts</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-off-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="settings-outline" size={24} color={COLORS.gray900} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'critical' && styles.activeTab]}
            onPress={() => setActiveTab('critical')}
          >
            <Text style={[styles.tabText, activeTab === 'critical' && styles.activeTabText]}>
              Critical
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.notificationList}>
        {notifications.map(notification => (
          <TouchableOpacity 
            key={notification.id} 
            style={[styles.notificationItem, { borderLeftColor: getSeverityColor(notification.severity), borderLeftWidth: 4 }]}
          >
            <View style={[styles.notificationIcon, { backgroundColor: `${getSeverityColor(notification.severity)}20` }]}>
              <Ionicons 
                name={notification.severity === 'critical' ? 'warning' : 'shield-checkmark'} 
                size={24} 
                color={getSeverityColor(notification.severity)} 
              />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>{notification.description}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    shadowColor: COLORS.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 12,
    backgroundColor: COLORS.gray100,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray600,
  },
  activeTabText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  notificationList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    backgroundColor: COLORS.white,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: COLORS.gray600,
  },
});

export default NotificationScreen;