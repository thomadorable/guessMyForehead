import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

export default class Back extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.backContainer} onPress={() => {
                if (this.props.action) {
                    this.props.action();
                } else {
                    this.props.navigation.pop()
                }
            }}>
                <Text style={styles.back}>Retour</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    backContainer: {
        marginBottom: 30,
        padding: 20,
        backgroundColor: 'white',
    },
    back: {
        color: '#292929',
        fontWeight: 'bold'
    }
});
