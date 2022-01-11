import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { Button, useTheme } from 'react-native-paper'
import * as Permissions from 'expo-permissions'

export default function StartSessionsScreen() {
  const navigation = useNavigation()
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [mapRegion, setMapRegion] = useState({
    latitude: 60.976,
    longitude: 24.48,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })

  // Theme import
  const theme = useTheme()

  const getLocationHandler = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    let location = await Location.getCurrentPositionAsync({}, 6)
    setLocation(location)

    setLatitude(location.coords.latitude)
    setLongitude(location.coords.longitude)
  }

  global.latitudeVar = latitude
  global.longitudeVar = longitude

  return (
    <View style={styles.container}>
      <View style={styles.dataView}>
        {location ? (
          <View>
            {/* Get location button */}
            <Button
              mode="contained"
              style={{ width: 170, color: theme.colors.primary }}
              contentStyle={{ height: 60 }}
              onPress={getLocationHandler}
            >
              Get Location
            </Button>
          </View>
        ) : (
          <Button
            mode="contained"
            style={{ width: 170, color: theme.colors.primary }}
            contentStyle={{ height: 60 }}
            onPress={getLocationHandler}
          >
            Get Location
          </Button>
        )}
        {/* Begin button */}
        <Button
          style={{ marginTop: 20, width: 170 }}
          contentStyle={{ height: 60 }}
          mode="contained"
          onPress={() => navigation.navigate('Begin Session')}
        >
          Begin
        </Button>
      </View>

      {/* Mapview */}
      <View style={styles.mapView}>
        {location ? (
          <MapView
            style={styles.mapStyle}
            provider="google"
            mapType="satellite"
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              // Set the initial zoom on the map
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }}
          >
            {/* Marker */}
            <Marker
              coordinate={location.coords}
              title="My Place"
              description="Some description"
            />
          </MapView>
        ) : (
          <View>
            <MapView style={styles.mapStyle} />
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
      </View>
    </View>
  )
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {
    flex: 1.45,
  },
  mapStyle: {
    flex: 1,
  },
})
