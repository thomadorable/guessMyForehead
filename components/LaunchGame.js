import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, AsyncStorage, Animated, Easing } from 'react-native';
import Layout from '../constants/Layout'
import Score from './Score'
import { LinearGradient } from 'expo';
import Colors from '../constants/Colors'
import { Icon } from 'expo';

const KEY = 'hangman';

export default class LaunchGame extends React.Component {
    constructor(props) {
        super(props);

        this.minHeight = 22;
        this.spinValue = new Animated.Value(1);
    }

    _toggleRules = () => {
        var maxHeight = (this.state.isDisplay) ? this.minHeight : this.maxHeight;

        var from = (this.state.isDisplay) ? 0 : 1;
        var to = (this.state.isDisplay) ? 1 : 0;

        this.setState({
            isDisplay: !this.state.isDisplay
        });

        Animated.timing(this.animHeight, {
            toValue: maxHeight,
            duration: 300,
            easing: Easing.easeIn
        }).start(); 

        this.spinValue = new Animated.Value(from);
        Animated.timing(this.spinValue, {
            toValue: to,
            duration: 200,
            easing: Easing.easeIn
        }).start();
    }

    _setMaxHeight(event){
        if (!this.maxHeight) {
            this.maxHeight = event.nativeEvent.layout.height;

            this.animHeight = new Animated.Value(this.minHeight);
            this.setState({
                isDisplay: false
            }, () => {
                const checkScores = this.props.score && this.props.score.games.ended && this.props.score.games.ended > 0;
                if (this.props.score && !checkScores) {
                    this._toggleRules();
                }
            });

        }
    }

    _showLastGame = () => {
        if (this.props.lastGame) {
            const text = (this.props.lastGame[0] > 0) ? (
                <Text style={{color: Colors.true, fontWeight: 'bold', textAlign: 'center'}}>
                    Gagné ! Tu as bien trouvé {this.props.lastGame[1]} !
                </Text>
            ) : (
                <Text style={{color: Colors.false, fontWeight: 'bold', textAlign: 'center'}}>
                    Tu n'as pas trouvé le mot {this.props.lastGame[1]}...
                </Text>
            )

            return (
                <View style={{backgroundColor: 'white', padding: 20, marginTop: 20, shadowColor: Colors.darkgrey,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 7}}>
                    {text}
                </View>
            )
        }
    }

    render() {
        const setMaxHeight = (this.state && this.animHeight) ? {maxHeight: this.animHeight} : null;
        const opacity = (this.state && this.animHeight) ? 1 : 0;

        var spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        });

        return (
        <View style={Layout.container}>
            <TouchableOpacity onPress={this._toggleRules} style={styles.rulesContainer} onLayout={this._setMaxHeight.bind(this)}>
                <Animated.View style={[{overflow: 'hidden', opacity: opacity}, setMaxHeight]}>
                    <Text style={styles.title}>{this.props.title} | Règles du jeu</Text>
                    <Text style={styles.rules}>
                        {this.props.rules}
                    </Text>

                    <Animated.View style={[{position: 'absolute', top: -3, right: 2, transform: [{ rotateX: spin }]}]}>
                        <Icon.Ionicons
                            name="ios-play"
                            size={20}
                            color={Colors.darkgrey}
                            style={{transform: [{ rotate: '270deg' }]}}
                        />
                    </Animated.View>
                </Animated.View>
            </TouchableOpacity>

            {
                this.props.score && this.props.score.games.ended > 0 && (
                    <View>
                        <View style={styles.ptsContainer}>
                            <Score
                                label="Dernière partie" 
                                value={this.props.score.scores.last}
                                unit="point"
                            />
                            {
                                this.props.score.scores.best > 0 && <Score
                                    label="Meilleure partie" 
                                    value={this.props.score.scores.best}
                                    unit="point"
                                />
                            }
                        </View>
                        <View style={styles.ptsContainer}>
                            <Score
                                label="Parties jouées" 
                                value={this.props.score.games.ended}
                                unit="partie"
                            />
                        </View>
                    </View>
                )
            }

            {this._showLastGame()}

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
        paddingBottom: 12,
        shadowColor: Colors.darkgrey,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 7
    },
    rules: {
        color: Colors.black,
        fontSize: 14,
        lineHeight: 22,
    }
});
