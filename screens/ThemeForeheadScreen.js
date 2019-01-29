import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

import Layout from '../constants/Layout'


import dataAPI from '../assets/data/guessMyForehead.json';
var allValues = [];
for (let i = 0, l = dataAPI.length; i < l; i++) {
    const data = dataAPI[i];

    allValues = allValues.concat(data.values);
}

dataAPI.unshift({
    "title": "Random",
    "values": allValues
});

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.images = [
            require('../assets/images/forehead/random.jpg'),
            require('../assets/images/forehead/stars.jpg'),
            require('../assets/images/forehead/90s.jpg'),
            require('../assets/images/forehead/music.jpg'),
            require('../assets/images/forehead/animals.jpg'),
            require('../assets/images/forehead/blockbuster.jpg'),
            require('../assets/images/forehead/food.jpg'),
            require('../assets/images/forehead/stars.jpg')
        ]
    }

    _selectTheme = (idTheme) => {
        console.log('datas =>', dataAPI[idTheme])
        this.props.navigation.navigate('GuessForehead', {
            data: dataAPI[idTheme]
        });
    }

    render() {

        return (
            <View style={Layout.container}>
                <View style={styles.header}>
                    <Text>Bienvenue sur Guess My Forehead</Text>
                </View>

                <View style={styles.body}>
                    <Text>Sélectionnez un thème pour commencer</Text>

                    <ScrollView style={styles.helpContainer}>
                        {
                            dataAPI.map(
                                (value, index) => {
                                    return <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            this._selectTheme(index);
                                        }}
                                    >
                                        <ImageBackground 
                                            imageStyle={{ borderRadius: 5, opacity: 0.7 }}
                                            style={styles.helpLink} 
                                            source={this.images[index]}
                                        >
                                        <Text style={styles.themeText}>{value.title}</Text>
                                         </ImageBackground>
                                    </TouchableOpacity>
                                }
                            )
                        }
                    </ScrollView>

                </View>
            </View>
        );
    }


}

const styles = StyleSheet.create({
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
        width: '100%',
        marginTop: 30,
        paddingHorizontal: 30
    },
    helpLink: {
        backgroundColor: '#292929',
        justifyContent: 'center',
        marginBottom: 20,
        height: 150,
        borderRadius: 5
    },
    themeText: {
        textAlign: 'center',
        // fontWeight: 'bold',
        color: 'white',
        letterSpacing: 5,
        fontSize: 20,
        textTransform: 'uppercase'
    }
});
