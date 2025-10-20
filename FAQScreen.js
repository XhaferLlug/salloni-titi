import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  AccessibilityInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'We offer haircuts, beard trims, straight razor shaves, and styling tailored to your preferences.',
  },
  {
    question: 'Do I need to book an appointment?',
    answer:
      'While walk-ins are welcome, we recommend booking in advance to ensure you get the perfect time slot.',
  },
  {
    question: 'What safety measures are in place?',
    answer:
      'We follow strict hygiene protocols including sterilizing tools, wearing masks, and sanitizing the shop regularly.',
  },
  {
    question: 'What are your opening hours?',
    answer: 'We are open Monday to Saturday from 9:00 AM to 7:00 PM, closed on Sundays.',
  },
];

export default function FAQScreen() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in answer on expand
    if (expandedIndex !== null) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [expandedIndex, fadeAnim]);

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Ionicons name="help-circle" size={64} color="#FFD700" style={styles.icon} />
      <Text style={styles.title} accessibilityRole="header">
        Frequently Asked Questions
      </Text>

      {faqs.map((faq, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpand(index)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityState={{ expanded: isExpanded }}
              accessibilityLabel={`${faq.question}. ${isExpanded ? 'Collapse' : 'Expand'} answer.`}
            >
              <Text style={styles.question}>{faq.question}</Text>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#FFD700"
              />
            </TouchableOpacity>

            {isExpanded && (
              <Animated.View style={[styles.answerContainer, { opacity: fadeAnim }]}>
                <Text style={styles.answer}>{faq.answer}</Text>
              </Animated.View>
            )}
          </View>
        );
      })}

      <Text style={styles.footer}>Still have questions? Contact us anytime!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  content: {
    padding: 24,
    alignItems: 'center',
    paddingBottom: 40,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 24,
    textAlign: 'center',
  },
  faqItem: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    flex: 1,
    paddingRight: 10,
  },
  answerContainer: {
    paddingHorizontal: 18,
    paddingBottom: 15,
    backgroundColor: '#222',
  },
  answer: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
