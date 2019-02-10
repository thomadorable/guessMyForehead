import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors'
import { AsyncStorage } from "react-native"
import { LinearGradient } from 'expo';

export default class CustomHeader extends React.Component {
    _getUser = async () => {
        try {
            const user = await AsyncStorage.getItem('@GuessMyForehead:user');
            if (user) {
                const json = JSON.parse(user);

                if (json && this.state.image !== json.image) {
                    this.setState({
                        image: json.image
                    })
                }
            }
        } catch (error) {
        //    console.log('error get')
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            image: ''
        }
    }

    componentWillUpdate() {
        this._getUser();
    }

    render() {
        return (
            <LinearGradient
                colors={[Colors.blue, Colors.green]}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.container}
            >
                <Text style={styles.title}>Guess My Game</Text>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 15,
        flexDirection: 'column',
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        letterSpacing: 2
    },
    options: {
        position: 'absolute',
        right: 20,
        bottom: 15
    }
});