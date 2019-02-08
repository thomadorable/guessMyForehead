import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Easing, ImageBackground } from 'react-native';
import { shuffle, backGame, initScore, winGame } from '../constants/Utils';
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import { getScore } from '../utils/data'

import Back from '../components/Back'
import LaunchGame from '../components/LaunchGame'


export default class GamesScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.key = 'games';

        this.images = [
            require('../assets/images/games/guess.jpeg'),
            require('../assets/images/games/pendu.jpeg'),
            require('../assets/images/games/snake.jpeg'),
            require('../assets/images/games/memory.jpeg'),
            require('../assets/images/games/quizz.jpeg'),
            require('../assets/images/games/2048.jpeg'),
            require('../assets/images/games/tictactoe.jpeg')
        ];

        this.state = {
            games: [
                'Guess',
                'Pendu',
                'Snake',
                'Memory',
                'Quizz',
                '2048',
                'TicTacToe'
            ] 
        }
    }

    _launchGame = (value) => {
        console.log('launch', value);
        this.props.navigation.navigate(value)
    }


    _customButton = () => {
        return (
            <View style={{padding: 30}}>
                {
                    this.state.games.map(
                        (value, index) => {
                            return <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    this._launchGame(value);
                                }}
                            >
                                <ImageBackground 
                                    imageStyle={{ borderRadius: 5, opacity: 0.7 }}
                                    style={styles.theme} 
                                    source={this.images[index]}
                                >
                                    <Text style={styles.themeText}>{value}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        }
                    )
                }
            </View>
        )
    }


    render = () => {
        return (
            <View style={[Layout.container, { alignItems: 'center'}]}>

                <View>
                    <Text>Les jeux</Text>
                </View>


                <ScrollView style={styles.scrollContainer}>
                    {
                        this._customButton()
                    }
                </ScrollView>

            </View>

            
        )
    }

}


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%'
    },
    theme: {
        backgroundColor: '#292929',
        justifyContent: 'center',
        marginBottom: 20,
        height: 150,
        borderRadius: 5
    },
    themeText: {
        textAlign: 'center',
        color: 'white',
        letterSpacing: 5,
        fontSize: 20,
        textTransform: 'uppercase'
    }
});