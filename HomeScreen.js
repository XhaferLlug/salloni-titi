import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  AccessibilityInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in screen content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    // Smooth pulsing barber icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.12,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();

    // Button scale-in spring animation
    Animated.spring(buttonAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Pulsing Barber Icon */}
      <Animated.View
        style={{ transform: [{ scale: scaleAnim }] }}
        accessible
        accessibilityRole="image"
        accessibilityLabel="Barber scissors icon pulsating"
      >
        <Ionicons name="cut" size={60} color="#FFD700" style={styles.icon} />
      </Animated.View>

      {/* App Title */}
      <Text
        style={styles.title}
        accessibilityRole="header"
        accessibilityLabel="App title, Salloni Titi"
      >
        Salloni Titi
      </Text>
      <Text style={styles.subtitle}>Premium Barber Experience</Text>

      {/* Next Available Appointment */}
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.cardTitle}>Next Available:</Text>
        <Text style={styles.cardTime}>Today at 3:30 PM</Text>
      </Animated.View>

      {/* Book Now Button */}
      <Animated.View
        style={{
          transform: [
            {
              scale: buttonAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.85, 1],
              }),
            },
          ],
        }}
      >
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking')}
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel="Book an appointment now"
        >
          <Ionicons name="calendar" size={20} color="#0f0f0f" />
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f', // dark background for consistency
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    alignItems: 'center',
    width: '85%',
  },
  cardTitle: {
    fontSize: 16,
    color: '#ccc',
  },
  cardTime: {
    fontSize: 22,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 4,
  },
  bookButton: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4, // subtle shadow on Android
  },
  bookButtonText: {
    color: '#0f0f0f',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});
