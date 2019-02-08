import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { shuffle, backGame, initScore, winGame } from '../constants/Utils';
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
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
        this.width = 4;


        this.state = {
            isPlaying: false
        }

        initScore.bind(this)();
    }

    _initGame = () => {
        var cards = [];
        for (let i = 0, l = (this.width * this.width); i < l; i++) {
            if (i === 6 || i === 7 || i === 11 || i === 8 || i === 13) {
                cards.push(1);
            } else {
                cards.push(0);
            }
        }

        this.setState({
            isPlaying: true,
            cards
        });
    }

    // TODO : check this is not verry functionnal
    _removeZero = (array) => {
        for (let i = array.length - 1; i--;){
            if (array[i] === 0) {
                array.splice(i, 1);
            }
        }
    }

    _mergeNumbers = (array) => {
        console.log('array', array)
        for (let i = 0, l = array.length; i < l; i++) {
            let value = array[i];
            if (value !== 0) {
                console.log('value =>', value);
            }
        }
    }

    _cleanRows = (cards) => {
        for (let i = 0, l = this.width; i < l; i++) {
            let row = cards.splice(0, 4);
            this._removeZero(row);
            this._mergeNumbers(row);
            console.log('row 2 => ', row);

            console.log('-----')
        }
    }

    // TODO
    // OK - tej tous les 0 quand on va à gauche

    // TODO - fusionner les chiffres identiques vers la gauche
    // TODO - replacer les 0 à la fin
    // TODO - faire pareil avec les 4 directions

    _addNumber = (direction) => {
        // Copy array
        let cards = this.state.cards.slice(0);

        switch (direction) {
            case 'left':
                this._cleanRows(cards);

                break;
        
            default:
                break;
        }
    }

    _renderGame = () => {
        return (
            <View style={[Layout.container, { alignItems: 'center' }]}>
                <Back navigation={this.props.navigation} action={() => {
                    backGame.bind(this)();
                }} />
                
                <View style={{width: 4 * 24, flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    this.state.cards && this.state.cards.map((value, index) => {
                        const display = value > 0 ? Math.pow(2, value) : 0;
                        return(
                            <View key={index} style={{width: 20, height: 20, backgroundColor: 'lightgrey', margin: 2}}>
                                <Text style={{textAlign: 'center'}}>{display}</Text>
                            </View>
                        )
                    })
                }
                </View>

                <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 15}}>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this._addNumber('top')
                    }}>
                        <Text style={styles.btnText}>^</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={[styles.btn, {marginRight: 30}]} onPress={() => {
                            this._addNumber('left')
                        }}>
                            <Text style={[styles.btnText, {transform: [{ rotate: '-90deg'}]}]}>^</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={() => {
                            this._addNumber('right')
                        }}>
                                <Text style={[styles.btnText, {transform: [{ rotate: '90deg'}]}]}>^</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this._addNumber('bottom')
                    }}>
                            <Text style={[styles.btnText, {transform: [{ rotate: '180deg'}]}]}>^</Text>
                    </TouchableOpacity>
                </View>
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