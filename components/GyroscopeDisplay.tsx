import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function GyroscopeToggle() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [showCatImage, setShowCatImage] = useState(false);

  const stopMonitoring = () => {
    subscription?.remove();
    setSubscription(null);
    setIsMonitoring(false);
  };

  const toggleMonitoring = () => {
    if (isMonitoring) {
      // Stop monitoring
      stopMonitoring();
    } else {
      // Start monitoring
      Gyroscope.setUpdateInterval(400); // 400ms
      const newSubscription = Gyroscope.addListener(({ x, y, z }) => {
        setGyroscopeData({ x, y, z });
        const rotation = Math.sqrt(x * x + y * y + z * z);
        if (rotation > 1.5) {
          stopMonitoring(); // Stop monitoring immediately
          setShowCatImage(true); // Show the cat image
        }
      });
      setSubscription(newSubscription);
      setIsMonitoring(true);
    }
  };

  useEffect(() => {
    // Cleanup subscription on unmount
    return () => subscription?.remove();
  }, [subscription]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isMonitoring ? styles.buttonActive : styles.buttonInactive]}
        onPress={toggleMonitoring}
      >
        <Text style={styles.buttonText}>
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={showCatImage}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCatImage(false)}
      >
        <View style={styles.modalContainer}>
          <Image
            source={require('../assets/images/flat,750x,075,f-pad,750x1000,f8f8f8.jpg')} // Use the local image
            style={styles.fullScreenImage}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowCatImage(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonActive: {
    backgroundColor: '#28A745',
  },
  buttonInactive: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  dataText: {
    fontSize: 16,
    color: '#374151',
    marginVertical: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullScreenImage: {
    width: '100%', // Make the image fill the width of the screen
    height: '80%', // Adjust the height to fill most of the screen
    resizeMode: 'contain', // Ensure the image maintains its aspect ratio
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});