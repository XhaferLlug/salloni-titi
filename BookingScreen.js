import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const SERVICES = ['Haircut', 'Beard Trim', 'Shave', 'Hair Color', 'Facial'];

export default function BookingScreen() {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [showServices, setShowServices] = useState(false);

  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const handleSubmit = () => {
    if (!name.trim() || !service || !date) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    const formattedDate = date.toLocaleDateString();
    Alert.alert(
      'Success',
      `Appointment booked for ${name.trim()} on ${formattedDate} for ${service}`
    );

    // Reset form
    setName('');
    setService('');
    setDate(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Book an Appointment</Text>

      {/* Name input */}
      <TextInput
        style={[styles.input, !name.trim() && styles.invalid]}
        placeholder="Your Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
        accessibilityLabel="Enter your name"
      />

      {/* Service selector */}
      <TouchableOpacity
        style={[styles.input, styles.dropdown, !service && styles.invalid]}
        onPress={() => setShowServices(true)}
        accessibilityRole="button"
        accessibilityLabel="Select service"
      >
        <Text style={{ color: service ? '#fff' : '#888' }}>
          {service || 'Select Service'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

      {/* Modal for Service List */}
      <Modal visible={showServices} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose a Service</Text>
            {SERVICES.map((s, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  setService(s);
                  setShowServices(false);
                }}
                accessibilityRole="button"
                accessibilityLabel={`Select ${s} service`}
              >
                <Text style={styles.modalText}>{s}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setShowServices(false)}
              accessibilityRole="button"
              accessibilityLabel="Cancel service selection"
            >
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date picker */}
      <TouchableOpacity
        style={[styles.input, styles.dropdown, !date && styles.invalid]}
        onPress={() => setShowDatePicker(true)}
        accessibilityRole="button"
        accessibilityLabel="Select appointment date"
      >
        <Text style={{ color: date ? '#fff' : '#888' }}>
          {date ? date.toLocaleDateString() : 'Select Date'}
        </Text>
        <Ionicons name="calendar" size={20} color="#888" />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Submit */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        accessibilityRole="button"
        accessibilityLabel="Confirm booking"
      >
        <Ionicons name="checkmark-done" size={20} color="#0f0f0f" />
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0f0f0f',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#0f0f0f',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  invalid: {
    borderColor: 'red',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
  },
  modalCancel: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10,
  },
});
