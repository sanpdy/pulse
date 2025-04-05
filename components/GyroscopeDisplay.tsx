import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function GyroscopeDisplay() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [showModal, setShowModal] = useState(false);
  const [randomImage, setRandomImage] = useState<string | null>(null);

  // Array of image paths
  const images = [
    require('../assets/images/dontquit.jpg'),
    require('../assets/images/hanginthere.jpg'),
    require('../assets/images/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'),
  ];

  const stopMonitoring = () => {
    subscription?.remove();
    setSubscription(null);
    setIsMonitoring(false);
  };

  const toggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring();
    } else {
      Gyroscope.setUpdateInterval(400); // 400ms
      const newSubscription = Gyroscope.addListener(({ x, y, z }) => {
        setGyroscopeData({ x, y, z });
        const rotation = Math.sqrt(x * x + y * y + z * z);
        if (rotation > 1.5) {
          stopMonitoring();
          // Randomize the image to display
          const randomIndex = Math.floor(Math.random() * images.length);
          setRandomImage(images[randomIndex]);
          setShowModal(true);
        }
      });
      setSubscription(newSubscription);
      setIsMonitoring(true);
    }
  };

  useEffect(() => {
    return () => subscription?.remove();
  }, [subscription]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button19, isMonitoring ? styles.buttonActive : styles.buttonInactive]}
        onPress={toggleMonitoring}
      >
        <Text style={styles.buttonText}>
          {isMonitoring ? 'Stop Monitoring' : 'Lock In'}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          {randomImage && (
            <Image
              source={randomImage}
              style={styles.image}
            />
          )}
          <TouchableOpacity style={styles.button19} onPress={() => setShowModal(false)}>
            <Text style={styles.buttonText}>Close</Text>
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
    backgroundColor: 'transparent',
    padding: 20,
  },
  button19: {
    backgroundColor: '#1899D6',
    borderRadius: 16,
    borderWidth: 0,
    paddingVertical: 13,
    paddingHorizontal: 16,
    textAlign: 'center',
    width: '100%',
    marginVertical: 10,
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  buttonActive: {
    backgroundColor: '#1CB0F6',
  },
  buttonInactive: {
    backgroundColor: '#1899D6',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});