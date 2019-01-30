import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { shuffle, backGame, winGame } from '../constants/Utils';
import Layout from '../constants/Layout'
import { getScore } from '../utils/data'

import Back from '../components/Back'
import LaunchGame from '../components/LaunchGame'

const KEY = 'memory';

const cardWidth = 80;
const nbColumns = 4;
const space = 3;

export default class MemoryScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.spinValue = new Animated.Value(0);
        this.colorValue = new Animated.Value(0);

        this.waitForAnim = 0;
        this.animDuration = 400;
        this.pts = 440;

        this.state = {
            isPlaying: false
        }
    }

    componentWillMount() {
        getScore(KEY, (score) => {
            this.setState({
                score
            });
        });
    }

    _initGame = () => {
        const values = ['red', 'lightblue', 'green', 'lightgrey', 'orange', 'pink', 'darkblue', 'yellowgreen'];
        // const values = ['red', 'lightblue', 'green'];

        var cards = [];

        for (let i = 0, l = values.length; i < l; i++) {
            cards.push({ color: values[i], status: 0 });
            cards.push({ color: values[i], status: 0 });
        }

        cards = shuffle(cards);

        this.setState({
            cards,
            isPlaying: true
        });

        this.nbToWin = values.length;
        this.currents = [];
        this.nbMove = 0;
    }

    _pick = (card, index) => {
        let cards = this.state.cards;
        card.index = index;

        if (this.currents.length === 1) {
            this.nbMove++;
            this.pts += - 5;
            if (this.pts < 0) this.pts = 0;

            const current = this.currents[0];
            if (current.color === card.color) {
                // 2a) Lock winning cards
                cards[current.index].status = 3;
                cards[index].status = 3;
                this.nbToWin--;

                if (this.nbToWin <= 0) {
                    winGame.bind(this)(KEY);
                    return;
                }
                this.currents = [];
            } else {
                // 2b) Save the 2nd tried card
                this.currents.push(card);
            }

        } else {
            if (this.currents.length === 2) {
                // Hide the 2 currents cards
                cards[this.currents[0].index].status = 0;
                cards[this.currents[1].index].status = 0;
            }

            // 1) Save the 1st tried card
            this.currents = [card];
        }

        if (cards[index].status === 0) {
            cards[index].status = 1;
        }

        this.setState({
            cards
        });


        if (this.currents.length > 0) {
            this.spinValue = new Animated.Value(0);
            this.colorValue = new Animated.Value(0);

            Animated.stagger((this.animDuration / 2), [
                Animated.timing(this.spinValue, {
                    toValue: 1,
                    duration: this.animDuration,
                    easing: Easing.easeIn
                }),
                Animated.timing(this.colorValue, {
                    toValue: 1,
                    duration: 0,
                    easing: Easing.easeIn
                })
            ]).start();

            this.waitForAnim = Date.now();
        }
    }

    _renderGame = () => {
        return (
            <View style={[Layout.container, { alignItems: 'center' }]}>
                <Back navigation={this.props.navigation} action={() => {
                    backGame.bind(this)(KEY);
                }} />
                <View style={styles.cards}>
                    {
                        this.state.cards.map((card, i) => {
                            if (card.status !== 0) {
                                var color = card.color;
                                var spin = '0deg';

                                if (this.currents.length > 0) {
                                    if (card.index === this.currents[this.currents.length - 1].index) {
                                        spin = this.spinValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '180deg']
                                        });

                                        color = this.colorValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['#292929', card.color]
                                        });
                                    }
                                }

                                return (<Animated.View style={[styles.card, { backgroundColor: color, transform: [{ rotateY: spin }] }]} key={i}></Animated.View>)
                            } else {
                                return (<TouchableWithoutFeedback key={i} onPress={() => {
                                    if ((Date.now() - this.waitForAnim) > this.animDuration) {
                                        this._pick(card, i);
                                    }
                                }}>
                                    <View style={styles.card}></View>
                                </TouchableWithoutFeedback>)
                            }
                        })
                    }
                </View>
                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>{this.nbMove} coup{this.nbMove > 1 ? 's' : ''}</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>{this.pts} point{this.pts > 1 ? 's' : ''}</Text>
            </View>
        )
    }

    render() {
        return (this.state.isPlaying) ? (
            this._renderGame()
        ) : <LaunchGame
                title="MEMORY"
                action={this._initGame}
                score={this.state.score}
                rules="Retourne les cartes dans le bon ordre pour former des paires. Tu connais le principe ? Bonne chance !"
            />
    }
}


const styles = StyleSheet.create({
    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: ((cardWidth + space) * nbColumns)
    },
    card: {
        width: cardWidth,
        height: cardWidth,
        marginBottom: space,
        backgroundColor: '#292929',
        borderRadius: 5
    }
});
