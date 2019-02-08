import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { backGame, initScore, winGame } from '../constants/Utils';
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import { getScore } from '../utils/data'

import Back from '../components/Back'
import LaunchGame from '../components/LaunchGame'


export default class Z048Screen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.key = 'Z048';
        this.width = 4;
        this.pts = 0;

        this.colors = ['#ede4da', '#ece0c6', '#f4b274', '#f7955d', '#fb7959', '#f85c32', '#eecf6b', '#edc843', '#eec52e', '#edc30f', '#ff3a35', '#ef4b54'];

        this.state = {
            isPlaying: false
        }

        initScore.bind(this)();
    }

    _initGame = () => {
        var cards = [];
        for (let i = 0, l = (this.width * this.width); i < l; i++) {
            if (i === 6 || i === 11) {
                cards.push(1);
            } else {
                cards.push(0);
            }
        }

        this.pts = 0;

        this.setState({
            isPlaying: true,
            cards
        });
    }

    _removeZero = (array) => {
        for (let i = array.length; i--;){
            if (array[i] === 0) {
                array.splice(i, 1);
            }
        }
    }

    _mergeNumbers = (array) => {
        let lastValue = 0;
        for (let i = 0, l = array.length; i < l; i++) {
            let value = array[i];
            if (value !== 0) {
                if (lastValue === value) {
                    array[i - 1]++;
                    array.splice(i, 1);
                }
            }
            lastValue = value;
        }
    }

    _fillZerosPush = (array) => {
        const length = array.length;
        const missingZeros = this.width - length;
        if (missingZeros > 0) {
            for (let i = 0; i < missingZeros; i++) {
                array.push(0);
            }
        }
    }

    _fillZerosUnshift = (array) => {
        const length = array.length;
        const missingZeros = this.width - length;
        if (missingZeros > 0) {
            for (let i = 0; i < missingZeros; i++) {
                array.unshift(0);
            }
        }
    }

    _cleanRows = (cards, callback) => {
        let newCards = [];
        for (let i = 0, l = this.width; i < l; i++) {
            let row = cards.splice(0, this.width);
            this._removeZero(row);
            this._mergeNumbers(row);
            this[callback](row);

            newCards = newCards.concat(row);
        }

        return newCards;
    }

    _mergeCols = (rows) => {
        let cards = [];
        for (let i = 0, l = this.width; i < l; i++) {
            for (let y = 0, l = rows.length; y < l; y++) {
                cards.push(rows[y][i]);
            }
        }
        
        return cards;
    }

    _cleanCols = (cards, callback) => {
        let newCards = [];
        let rows = [];
        for (let i = 0, l = this.width; i < l; i++) {
            let row = cards.filter((number, index) => index % this.width === i);
            this._removeZero(row);
            this._mergeNumbers(row);
            this[callback](row);

            rows.push(row);
        }

        newCards = this._mergeCols(rows);

        return newCards;
    }

    _addNumber = (array) => {
        var borderIndex = [];
        for (let i = 0; i < array.length; i++) {
            if (i < this.width && borderIndex.indexOf(i) === -1) {
                borderIndex.push(i); // TOP
            }

            if (i > (array.length - this.width)) {
                borderIndex.push(array.length - i - 1); // BOTTOM
            }

            if (i % this.width === 0 && borderIndex.indexOf(i) === -1) {
                borderIndex.push(i); // LEFT
            }


            if (i % this.width === (this.width - 1) && borderIndex.indexOf(i) === -1) {
                borderIndex.push(i); // RIGHT
            }
        }

        borderIndex = borderIndex.filter((value) => array[value] === 0)

        const randomIndex = Math.floor(Math.random() * borderIndex.length);
        const value = (Math.random() > 0.35) ? 1 : 2;

        array[borderIndex[randomIndex]] = value;

        return array;
    }

    _countPts = (cards) => {
        let nbEmpty = 0;
        let nbPts = 0;
        for (let i = 0, l = cards.length; i < l; i++) {
            const card = cards[i];
            if (card === 0) {
                nbEmpty++;
            } else {
                nbPts += Math.pow(2, card);
            }
        }

        this.pts = nbPts;
        if (nbEmpty === 0) {
            winGame.bind(this)();
        }
    }

    _movement = (direction) => {
        // Copy array
        let cards = this.state.cards.slice(0);

        switch (direction) {
            case 'left':
                cards = this._cleanRows(cards, '_fillZerosPush');
                break;

            case 'right':
                cards = this._cleanRows(cards, '_fillZerosUnshift');
                break;

            case 'top':
                cards = this._cleanCols(cards, '_fillZerosPush');
                break;
        
            default: // botom
                cards = this._cleanCols(cards, '_fillZerosUnshift');
                break;
        }

        cards = this._addNumber(cards);

        this._countPts(cards);

        this.setState({
            cards
        })
    }


    _renderGame = () => {
        return (
            <View style={[Layout.container, { alignItems: 'center' }]}>
                <Back navigation={this.props.navigation} action={() => {
                    backGame.bind(this)();
                }} />

                <Text style={{marginBottom: 30}}>{this.pts} points</Text>

                
                <View style={{width: 4 * 64, flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    this.state.cards && this.state.cards.map((value, index) => {
                        const display = value > 0 ? Math.pow(2, value) : null;
                        const color = value > 0 ? this.colors[value] : 'lightgrey';
                        return(
                            <View key={index} style={{width: 60, height: 60, backgroundColor: color, margin: 2, alignContent: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 5}}>
                                <Text style={{textAlign: 'center'}}>{display}</Text>
                            </View>
                        )
                    })
                }
                </View>

                <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 15, marginTop: 30}}>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this._movement('top')
                    }}>
                        <Text style={styles.btnText}>^</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={[styles.btn, {marginRight: 30}]} onPress={() => {
                            this._movement('left')
                        }}>
                            <Text style={[styles.btnText, {transform: [{ rotate: '-90deg'}]}]}>^</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={() => {
                            this._movement('right')
                        }}>
                                <Text style={[styles.btnText, {transform: [{ rotate: '90deg'}]}]}>^</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this._movement('bottom')
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
                rules="Il faut fusionner les chiffres identiques pour atteindre 2048. Bonne chance !"
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
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: Colors.blue,
        borderWidth: 1,
    },
    btnText: {
        fontSize: 16,
        lineHeight: 50,
        textAlign: 'center',
        color: Colors.blue
    }
});