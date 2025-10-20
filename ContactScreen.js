import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleEmailPress = () => {
    Linking.openURL('mailto:info@gentlemanscut.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+12345678900');
  };

  const handleAddressPress = () => {
    const query = encodeURIComponent('H2XC+F4C, E851, Sllatinë e Madhe 12050');
    const url = Platform.select({
      ios: `maps://?q=${query}`,
      android: `geo:0,0?q=${query}`,
    });
    Linking.openURL(url);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text
        style={styles.title}
        accessibilityRole="header"
        accessibilityLabel="Contact Us"
      >
        Contact Us
      </Text>
      <Text style={styles.subtitle}>Get in Touch</Text>

      <View style={styles.card}>
        <Ionicons name="mail" size={28} color="#FFD700" style={styles.icon} />
        <TouchableOpacity
          onPress={handleEmailPress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Send email to info at Gentleman's Cut"
        >
          <Text style={styles.info}>info@gentlemanscut.com</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Ionicons name="call" size={28} color="#FFD700" style={styles.icon} />
        <TouchableOpacity
          onPress={handlePhonePress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Call Gentleman's Cut at +1 234 567 8900"
        >
          <Text style={styles.info}>+1 234 567 8900</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, styles.addressCard]}>
        <Ionicons name="location" size={28} color="#FFD700" style={styles.icon} />
        <TouchableOpacity
          onPress={handleAddressPress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Open address location in maps"
        >
          <Text style={styles.info}>H2XC+F4C, E851, Sllatinë e Madhe 12050</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 34,
    color: '#FFD700',
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#bbb',
    marginBottom: 32,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  addressCard: {
    justifyContent: 'center',
  },
  icon: {
    marginRight: 18,
  },
  info: {
    fontSize: 18,
    color: '#eee',
  },
});
