import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing } from 'react-native';
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

    }







    

    render = () => {
        return (
            <View style={[Layout.container, { alignItems: 'center' }]}>

                <View>
                    <Text>Les jeux</Text>
                </View>

                <View>
                    <Text>Guess</Text>
                    <Text>Pendu</Text>
                    <Text>Snake</Text>
                    <Text>Memory</Text>
                    <Text>Quizz</Text>
                    <Text>2048</Text>
                    <Text>TicTacToe</Text>
                </View>
                
            </View>

            
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.grey
    },
    btn: {
        fontSize: 10,
        width: 40,
        height: 40,
        borderRadius: 40,
        borderColor: '#999',
        borderWidth: 1,
    },
    btnText: {
        fontSize: 16,
        lineHeight: 40,
        textAlign: 'center',
        color: '#999'
    }
});