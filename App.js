import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

//used in navigation to settings page //import: npm install @react-navigation/native
import { NavigationContainer } from '@react-navigation/native';

//used in navigation to settings page //import: npm install @react-navigation/stack
import { createStackNavigator } from '@react-navigation/stack';

//used for appbar //import npm install react-native-paper
import { Appbar, Button, Provider as PaperProvider } from 'react-native-paper';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>
      <Text>This is the Settings screen.</Text>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [fetchedData, setFetchedData] = useState(null);

  const fetchDataFromInternet = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const result = await response.json();
      setFetchedData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showAlert = () => {
    Alert.alert(
      'Alert',
      'Button Pressed!',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  const renderOSMessage = () => { //platform specific example
    if (Platform.OS === 'ios') {
      return <Text>This is an iOS device.</Text>;
    } else {
      return <Text>This is an Android or other device.</Text>;
    }
  };

  return (
    <View style={styles.container}>   
      <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Press me (Alert)!</Text>
      </TouchableOpacity>

      <TouchableHighlight
        style={styles.highlightButton}
        onPress={fetchDataFromInternet}
        underlayColor="#3498db"
      >
        <Text style={styles.buttonText}>Fetch Data from Internet</Text>
      </TouchableHighlight>

      {fetchedData && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Fetched Data:</Text>
          <Text>{JSON.stringify(fetchedData, null, 2)}</Text>
        </View>
      )}

      <View style={styles.osMessageContainer}>{renderOSMessage()}</View>
    </View>
  );
};

const Stack = createStackNavigator();

//make sure to wrap paper components in Provider 
const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Home',
              headerLeft: () => (
                <Button
                  onPress={() => {
                    navigation.navigate('Settings');
                  }}
                >
                  Settings
                </Button>
              ),
            })}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  highlightButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
  },
  dataText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  osMessageContainer: {
    marginTop: 20,
  },
});


//very important statement, do not forget or nothing will work
export default App;