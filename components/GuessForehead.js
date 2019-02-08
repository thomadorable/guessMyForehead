import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Layout from '../constants/Layout'

import Back from '../components/Back'
import Colors from '../constants/Colors';

export default class GuessForehead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Layout.container}>
                <Back navigation={this.props.navigation} action={this.props.backAction} />

                <Text style={styles.timer}>{this.props.timer} secondes</Text>

                <View style={styles.guessContainer}>
                    <Text style={styles.guess}>{this.props.value}</Text>
                </View>

                <Text style={styles.pts}>{this.props.pts} points</Text>

                <View style={styles.btnContainer}>

                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: Colors.true}]}
                        onPress={() => {
                            this.props.win();
                        }}
                        >
                        <Text style={styles.textBtn}>Gagné</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            this.props.next();
                        }}
                        >
                        <Text style={styles.textBtn}>Perdu</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    guessContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guess: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        color: '#2c63b7'
    },
    timer: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        color: '#555'
    },
    pts: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        color: '#555'
    },
    btnContainer: {
        flexDirection: 'row',
        padding: 30,
        justifyContent: 'space-between'
    },
    btn: {
        padding: 20,
        paddingHorizontal: 50,
        backgroundColor: Colors.false,
        borderRadius: 5
    },
    textBtn: {
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1
    }
});
