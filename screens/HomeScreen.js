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

import dataAPI from '../assets/json/data.json';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    _selectTheme = (idTheme) => {
        console.log('datas =>', dataAPI[idTheme])
        this.props.navigation.navigate('GuessForehead', {
            data: dataAPI[idTheme]
        });
    }

    render() {

        return (
            <View style={styles.container}>
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
                                        style={styles.helpLink}>
                                        <Text style={styles.themeText}>{value.title}</Text>
                                    </TouchableOpacity>
                                }
                            )
                        }
                    </ScrollView>

                </View>

                <View style={styles.footer}>
                    <Text>Copyright ML + TD</Text>
                </View>
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
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1
    }
});
