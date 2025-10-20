import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const services = [
  { id: '1', name: 'Haircut', price: '$5', rating: 5 },
  { id: '3', name: 'Shave', price: '$3', rating: 4 },
  { id: '4', name: 'Hair Color', price: '$4', rating: 5 },
  { id: '5', name: 'Facial', price: '$40', rating: 4 },
];

// Separate component for each service item so we can use hooks safely
function ServiceItem({ item, index, renderStars }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: 200 + index * 150,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity
        style={styles.serviceItem}
        activeOpacity={0.8}
        onPress={() => alert(`Selected: ${item.name}`)}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`Select service ${item.name}, price ${item.price}`}
      >
        <View>
          <Text style={styles.serviceName}>{item.name}</Text>
          {renderStars(item.rating)}
        </View>
        <Text style={styles.servicePrice}>{item.price}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function ServicesScreen() {
  const navigation = useNavigation();

  const renderStars = (rating) => {
    return (
      <View style={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name={i < rating ? 'star' : 'star-outline'}
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Services</Text>

      {/* Featured Service */}
      <View style={styles.featuredCard}>
        <Text style={styles.featuredTitle}>💈 Featured: The Royal Treatment</Text>
        <Text style={styles.featuredDesc}>
          A full haircut, beard trim, hot towel, and facial — the ultimate grooming experience.
        </Text>
        <Text style={styles.featuredPrice}>$52</Text>
      </View>

      {/* Services List */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ServiceItem item={item} index={index} renderStars={renderStars} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  featuredCard: {
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 5,
    borderLeftColor: '#FFD700',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 6,
  },
  featuredDesc: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  featuredPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  serviceItem: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
  },
  servicePrice: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '600',
  },
});
