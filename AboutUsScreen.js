import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default function AboutUsScreen() {
  const fadeTitle = useRef(new Animated.Value(0)).current;
  const fadePara1 = useRef(new Animated.Value(0)).current;
  const fadePara2 = useRef(new Animated.Value(0)).current;
  const fadePara3 = useRef(new Animated.Value(0)).current;

  // New: scale animations for icon and title
  const scaleIcon = useRef(new Animated.Value(0.8)).current;
  const scaleTitle = useRef(new Animated.Value(0.8)).current;

  // Easter egg state
  const [footerText, setFooterText] = useState('Est. 2002 • Crafted with pride 💈');

  useEffect(() => {
    Animated.stagger(300, [
      Animated.parallel([
        Animated.timing(fadeTitle, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fadePara1, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadePara2, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadePara3, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Icon scale bounce
    Animated.sequence([
      Animated.timing(scaleIcon, {
        toValue: 1.2,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleIcon, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Footer press handler for Easter egg
  const onFooterPress = () => {
    setFooterText((prev) =>
      prev.includes('💈')
        ? 'Thanks for visiting! ✂️🔥'
        : 'Est. 2002 • Crafted with pride 💈'
    );
  };

  return (
    <View style={styles.gradientBackground}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Animated Icon */}
        <Animated.View style={{ transform: [{ scale: scaleIcon }] }}>
          <Ionicons name="people-circle" size={64} color="#FFD700" style={styles.icon} />
        </Animated.View>

        {/* Animated Title */}
        <Animated.Text style={[styles.title, { opacity: fadeTitle, transform: [{ scale: scaleTitle }] }]}>
          About Us
        </Animated.Text>

        <Animated.Text style={[styles.paragraph, { opacity: fadePara1 }]}>
          Welcome to <Text style={styles.highlight}>Salloni Titi salon</Text> — where tradition meets modern style.
          Our barbers are craftsmen dedicated to delivering precision cuts,
          clean shaves, and an experience that’s second to none.
        </Animated.Text>

        <Animated.Text style={[styles.paragraph, { opacity: fadePara2 }]}>
          Nestled in the heart of the city, our shop offers a relaxing and classy environment,
          perfect for gentlemen who value detail, style, and great conversation.
        </Animated.Text>

        <Animated.Text style={[styles.paragraph, { opacity: fadePara3 }]}>
          Whether you're after a sharp fade, classic beard trim, or a straight razor shave —
          you're in good hands.
        </Animated.Text>

        {/* Touchable Footer */}
        <TouchableOpacity onPress={onFooterPress} activeOpacity={0.7}>
          <Text style={styles.footer}>{footerText}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    // subtle vertical gradient effect using shadow (no image)
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFD700',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 2,
  },
  paragraph: {
    fontSize: 17,
    color: '#ccc',
    marginBottom: 22,
    lineHeight: 28,
    textAlign: 'center',
  },
  highlight: {
    color: '#FFD700',
    fontWeight: '700',
  },
  footer: {
    fontSize: 15,
    color: '#888',
    marginTop: 30,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
