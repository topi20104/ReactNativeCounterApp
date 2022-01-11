import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BarChart } from 'react-native-chart-kit'
import { fetchAllInfo } from '../database/db'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'

export default function LocalSession() {
  const navigation = useNavigation()
  const [readAllData, setInfo] = useState([])

  var index = 1

  async function readAllDataToo() {
    await fetchAllInfo()
      .then((res) => {
        setInfo(res.rows._array)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        console.log('All cars are read')
      })
  }

  useEffect(() => {
    readAllDataToo()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}
    >
      <View>
        <FlatList
          keyExtractor={(item) => readAllData.indexOf(item).toString()}
          data={readAllData}
          renderItem={(itemData) => (
            <View>
              <Text style={styles.StartDate}>
                StartDate: {itemData.item.Date}
              </Text>
              <Text style={styles.StartDate}>
                EndDate: {itemData.item.endDate}
              </Text>
              <BarChart
                style={styles.styleChart}
                data={{
                  labels: ['Car', 'Bus', 'Trucks', 'Motorcycles'],
                  datasets: [
                    {
                      data: [
                        itemData.item.car,
                        itemData.item.bus,
                        itemData.item.trucks,
                        itemData.item.motorcycles,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 10}
                height={200}
                yAxisInterval={2}
                segments={3}
                showValuesOnTopOfBars={true}
                chartConfig={{
                  decimalPlaces: 0,
                  backgroundColor: '#1cc910',
                  backgroundGradientFrom: '#6E32D1',
                  backgroundGradientTo: '#6E32D1',
                  color: (opacity = 255) => 'white',
                  style: {
                    borderRadius: 12,
                    padding: 10,
                  },
                }}
              />
              <View
                style={{
                  flex: 1,
                  paddingVertical: 20,
                  borderBottomWidth: 5,
                  borderBottomColor: 'red',
                }}
              >
                <MapView
                  style={styles.mapView}
                  provider="google"
                  mapType="satellite"
                  initialRegion={{
                    latitude: itemData.item.latitude,
                    longitude: itemData.item.longitude,
                    // Set the initial zoom on the map
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.000001,
                  }}
                >
                  {/* Marker */}
                  <Marker
                    coordinate={{
                      latitude: itemData.item.latitude,
                      longitude: itemData.item.longitude,
                    }}
                    title="My Place"
                    description="Some description"
                  />
                </MapView>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  StartDate: {
    flexDirection: 'row',
    padding: 20,
    alignSelf: 'center',
    fontSize: 20,
  },
  styleChart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonStyles: {
    width: 170,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonStyles: {
    width: 170,
    alignSelf: 'center',
    marginTop: 20,
  },
  mapView: {
    flex: 1,
    alignSelf: 'center',
    width: Dimensions.get('window').width - 10,
    height: 200,
  },
})
