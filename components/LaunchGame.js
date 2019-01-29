import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import Layout from '../constants/Layout'
import Score from './Score'
import { LinearGradient } from 'expo';
import Colors from '../constants/Colors'

export default class LaunchGame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <View style={Layout.container}>
            <View style={styles.rulesContainer}>
                <Text style={styles.title}>{this.props.title} | Règles du jeu</Text>
                <Text style={styles.rules}>
                    {this.props.rules}
                </Text>
            </View>

            {
                this.props.score && (
                    <View>
                        <View style={styles.ptsContainer}>
                            <Score
                                label="Dernière partie" 
                                value={this.props.score.scores.last}
                                unit="point"
                            />
                            <Score
                                label="Meilleure partie" 
                                value={this.props.score.scores.best}
                                unit="point"
                            />
                        </View>
                        <View style={styles.ptsContainer}>
                            <Score
                                label="Parties jouées" 
                                value={this.props.score.games.ended + this.props.score.games.canceled}
                                unit="partie"
                            />
                        </View>
                    </View>
                )
            }

            <View style={{justifyContent: 'flex-end', alignItems: 'center', flex: 1, paddingBottom: 30}}>
                <TouchableOpacity onPress={this.props.action}>
                    <LinearGradient
                        colors={[Colors.blue, Colors.green]}
                        start={[0, 0]}
                        end={[1, 0]}
                        style={{height: 44, paddingHorizontal: 50, borderRadius: 22, justifyContent: 'center', alignItems: 'center'}}
                    >
                        <Text style={{fontSize: 18, color: 'white', letterSpacing: 2}}>Jouer</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 6,
        color: Colors.black,
    },
    ptsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30
    },
    rulesContainer: {
        backgroundColor: 'white',
        padding: 20,
        shadowColor: Colors.darkgrey,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 7,
    },
    rules: {
        color: Colors.black,
        fontSize: 14,
        lineHeight: 22
    }
});
