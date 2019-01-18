import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import dataAPI from '../assets/json/data.json';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _selectTheme = (idTheme) => {
    this.props.navigation.navigate('GuessForehead', {
      idTheme: idTheme
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View>
            {
              dataAPI.map(
                (value, index) => {
                  return <View style={styles.helpContainer} key={index}>
                  <TouchableOpacity onPress={() => {
                    this._selectTheme(index);
                  }} style={styles.helpLink}>
                    <Text>{value.title}</Text>
                  </TouchableOpacity>
                </View>
                }
              ) 
            }
          </View>
        </ScrollView>


      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  }
});
