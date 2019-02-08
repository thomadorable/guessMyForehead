import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { shuffle, backGame, initScore, winGame } from '../constants/Utils';
import Layout from '../constants/Layout'
import { getScore } from '../utils/data'

import Back from '../components/Back'
import LaunchGame from '../components/LaunchGame'


export default class Z048Stack extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.key = 'Z048';

        this.spinValue = new Animated.Value(0);
        this.colorValue = new Animated.Value(0);

        this.waitForAnim = 0;
        this.animDuration = 400;
        this.pts = 440;

        this.state = {
            isPlaying: false
        }

        initScore.bind(this)();

    }


    _initGame = () => {
        console.log('init game')

        this.setState({
            isPlaying: true
        });

    }

    _renderGame = () => {
        return (
            <View style={[Layout.container, { alignItems: 'center' }]}>
                <Back navigation={this.props.navigation} action={() => {
                    backGame.bind(this)();
                }} />
                
            </View>
        )
    }

    render() {
        return (this.state.isPlaying) ? (
            this._renderGame()
        ) : <LaunchGame
                title="2048"
                action={this._initGame}
                score={this.state.score}
                rules="Il faut fusionner les chiffres ensemble."
            />
    }
}


const styles = StyleSheet.create({
});
