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
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.header}>
                <Text>Bienvenue sur Guess My Forehead</Text>
            </View>

            <View style={styles.body}>
                <Text>Sélectionnez un thème pour commencer</Text>

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

            </View>
            
            <View style={styles.footer}>
                <Text>Copyright ML + TD</Text>
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        height: 70
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    footer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
    }, 
    helpContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    helpLink: {
        backgroundColor: '#00FF00'
    }
});
