import React from 'react';
import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import Colors from '../constants/Colors'
import { LinearGradient } from 'expo';

export default class CustomLoader extends React.Component {
    constructor(props) {
        super(props);
        
        this.opacity = new Animated.Value(1);
        this.space = new Animated.Value(6);

        Animated.stagger(400, [
            Animated.timing(this.space, {
                toValue: 40,
                duration: 800,
                easing: Easing.easeIn
            }),
            Animated.timing(this.opacity, {
                toValue: 0,
                duration: 400,
                easing: Easing.easeIn
            })
        ]).start();
    }

    render() {
        return (
            <Animated.View 
                style={[styles.container, {opacity: this.opacity}]}
            >
                <LinearGradient
                    colors={[Colors.blue, Colors.green]}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}
                >
                    <Animated.Text style={[styles.text, {letterSpacing: this.space}]}>guess</Animated.Text>
                    <Text style={[styles.text]}>my game</Text>
                </LinearGradient>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'red'
    },
    text: {
        fontSize: 32,
        color: 'white',
        fontFamily: 'avenir',
        marginBottom: 10,
        marginLeft: 4,
        letterSpacing: 6
    },
});

