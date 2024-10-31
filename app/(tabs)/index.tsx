
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList,
  Animated,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SecuritySystem = () => {
  const [status, setStatus] = useState('Unarmed');
  const [pin, setPin] = useState('');
  const [notifications, setNotifications] = useState([
    { id: '1', message: 'System armed', timestamp: '10:00 PM' },
    { id: '2', message: 'Motion detected', timestamp: '10:20 PM' },
  ]);

  const statusAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(statusAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7
    }).start();
  }, [status]);

  const handlePinSubmit = () => {
    if (pin.length === 4) {
      setStatus(status === 'Armed' ? 'Unarmed' : 'Armed');
      setPin('');
      setNotifications(prev => [{
        id: Date.now().toString(),
        message: `System ${status === 'Armed' ? 'unarmed' : 'armed'}`,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev]);
    }
  };

  const handlePinPress = (num : any) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handlePinDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient
        colors={['#007AFF', '#00C6FB']}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Security System</Text>
        
        <Animated.View style={[
          styles.statusIndicator,
          { transform: [{ scale: statusAnimation }] }
        ]}>
          <View style={[
            styles.statusCircle,
            { backgroundColor: status === 'Armed' ? '#34C759' : '#FF3B30' }
          ]}>
            <Text style={styles.statusEmoji}>
              {status === 'Armed' ? '🔒' : '🔓'}
            </Text>
          </View>
          <Text style={styles.statusText}>{status}</Text>
        </Animated.View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Emergency</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Panic</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.mainContent}>
        <View style={styles.pinSection}>
          <View style={styles.pinDisplay}>
            {[...Array(4)].map((_, i) => (
              <View key={i} style={[
                styles.pinDot,
                pin.length > i && styles.pinDotFilled
              ]} />
            ))}
          </View>

          <View style={styles.keypad}>
            {[1,2,3,4,5,6,7,8,9,'',0,'del'].map((num, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.key, !num && styles.keyHidden]}
                onPress={() => {
                  if (num === 'del') handlePinDelete();
                  else if (num !== '') handlePinPress(num);
                }}
              >
                {num === 'del' ? (
                  <Text style={styles.deleteKey}>⌫</Text>
                ) : (
                  <Text style={styles.keyText}>{num}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              pin.length === 4 ? styles.submitActive : styles.submitInactive
            ]}
            onPress={handlePinSubmit}
            disabled={pin.length !== 4}
          >
            <Text style={styles.submitText}>
              {status === 'Armed' ? 'Disarm System' : 'Arm System'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activitySection}>
  <Text style={styles.sectionTitle}>Recent Activity</Text>
  <FlatList
    data={notifications}
    renderItem={({ item }) => (
      <LinearGradient
        colors={['#ffffff', '#f0f4f8']}
        style={styles.notificationCard}
      >
        <Ionicons 
          name={item.message.includes('armed') ? 'lock-closed-outline' : 'alert-circle-outline'} 
          size={24} 
          color={item.message.includes('armed') ? '#34C759' : '#FF3B30'} 
          style={styles.notificationIcon}
        />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationText}>{item.message}</Text>
          <Text style={styles.notificationTime}>{item.timestamp}</Text>
        </View>
      </LinearGradient>
    )}
    keyExtractor={item => item.id}
  />
</View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },

  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusIndicator: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statusEmoji: {
    fontSize: 40,
  },
  statusText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 16,
    textTransform: 'uppercase',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  pinSection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginHorizontal: 8,
  },
  pinDotFilled: {
    backgroundColor: '#007AFF',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  key: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  keyHidden: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
  },
  keyText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  deleteKey: {
    fontSize: 24,
    color: '#FF3B30',
  },
  submitButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitActive: {
    backgroundColor: '#007AFF',
  },
  submitInactive: {
    backgroundColor: '#A2A2A2',
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  activitySection: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  notificationIcon: {
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  notificationTime: {
    fontSize: 14,
    color: '#8E8E93',
  },

});

export default SecuritySystem;
