import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Button,
  IconButton,
  Colors,
  Provider as PaperProvider,
  DefaultTheme,
  Text,
  useTheme,
} from 'react-native-paper'
import StartSessionsScreen from './components/Session'
import BeginSession from './components/BeginSession'
import ViewSessionsScreen from './components/ViewSessions'
import LocalSession from './components/LocalSessions'
import CloudSession from './components/CloudSessions'
import { init } from './database/db'

// Initiating the database from ./database
init()
  .then(() => {
    console.log('Database creation succeeded!')
  })
  .catch((err) => {
    console.log('Database IS NOT initialized! ' + err)
  })

// Home screen with the navigation prop
function HomeScreen({ navigation }) {
  // Since the PaperProvider is located at the Navigation Stack, you need to "import" the theme to the function
  const theme = useTheme()

  return (
    <View style={styles.main}>
      <View>
        {/* Header text */}
        <Text style={styles.vechicleCounter}>VEHICLE COUNTER</Text>

        <IconButton
          icon="car-multiple"
          color={Colors.black}
          size={50}
          style={styles.vechicleIcon}
        />
      </View>
      <View style={styles.buttonColumn}>
        {/* Start the session button */}
        <Button
          icon="arrow-right-circle"
          style={{ width: 175, color: theme.colors.primary }}
          // Assign the height variable to the content instead of the button itself
          // -> otherwise the button touchable area will not be correct
          contentStyle={{ height: 60 }}
          mode="contained"
          onPress={() => navigation.navigate('Start Session')}
        >
          Start session
        </Button>

        {/* View the previous sessions button
        See above for more specific comments */}
        <Button
          style={{ marginTop: 20, color: theme.colors.primary }}
          contentStyle={{ height: 60 }}
          icon="border-color"
          mode="contained"
          onPress={() => navigation.navigate('View Sessions')}
        >
          Previous sessions
        </Button>
      </View>
    </View>
  )
}

// Navigation stack
const Stack = createNativeStackNavigator()

// Navigation stack and screens
function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Start Session" component={StartSessionsScreen} />
          <Stack.Screen name="View Sessions" component={ViewSessionsScreen} />
          <Stack.Screen name="Begin Session" component={BeginSession} />
          <Stack.Screen name="Local Session" component={LocalSession} />
          <Stack.Screen name="Cloud Session" component={CloudSession} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

// Theme for the PaperProvider
export const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    primary: '#6E31D1',
    accent: '#93d131',
    grey: '#455A64',
  },
}

// Stylesheet
const styles = StyleSheet.create({
  main: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vechicleCounter: {
    fontFamily: 'sans-serif',
    position: 'relative',
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 41,
    textAlign: 'center',
  },
  vechicleIcon: {
    alignSelf: 'center',
    position: 'relative',
  },
  buttonColumn: {
    marginTop: 150,
    alignItems: 'center',
  },
})

export default App
