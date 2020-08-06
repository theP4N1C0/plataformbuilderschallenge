import React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import getCurrentWeather from './src/service';

import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
  const [information, setInformation] = useState({});

  useEffect(() => {
    verifyLocationPermission();
  }, []);

  async function verifyLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function getLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        let {latitude, longitude} = position.coords;
        getInformation({latitude, longitude});
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  async function getInformation({latitude, longitude}) {
    let data = await getCurrentWeather({latitude, longitude});
    setInformation(data);
  }

  return (
    <View style={styles.conteiner}>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => getLocation()}>
        <Icon
          name="refresh-outline"
          style={{marginRight: 20}}
          size={35}
          color="#FFFFFF"
          w
        />
      </TouchableOpacity>
      <View style={styles.temperature}>
        <Text style={styles.temperatureText}>
          {parseInt(information.temperature - 273) || 'Loading'}
        </Text>
        <Text style={[styles.temperatureText, {fontSize: 35}]}>°C</Text>
      </View>
      <Text style={styles.locationText}>{information.name || 'Loading'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#232634',
  },
  refreshButton: {
    position: 'absolute',
    margin: 20,
    alignSelf: 'flex-end',
  },
  temperature: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  temperatureText: {
    fontSize: 80,
    color: '#FFFFFF',
  },
  locationText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
  },
});
