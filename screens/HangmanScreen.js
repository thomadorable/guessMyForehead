import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import dataAPI from '../assets/data/hangman.json';
import { backGame, winGame, initScore } from '../constants/Utils';
import Layout from '../constants/Layout'
import { getScore } from '../utils/data'

import Back from '../components/Back'
import LaunchGame from '../components/LaunchGame'


// 10 letters max per row - 2px margin
const widthLetter = Math.floor(Layout.window.width / 10) - 2;

export default class HangmanScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        
        this.key = 'hangman';

        this.letters = 'azertyuiopqsdfghjklmwxcvbn'.toUpperCase().split('');

        this.images = [
            require('../assets/images/hangman/1.png'),
            require('../assets/images/hangman/2.png'),
            require('../assets/images/hangman/3.png'),
            require('../assets/images/hangman/4.png'),
            require('../assets/images/hangman/5.png'),
            require('../assets/images/hangman/6.png'),
            require('../assets/images/hangman/7.png'),
            require('../assets/images/hangman/8.png'),
            require('../assets/images/hangman/9.png')
        ];

        this.state = {
            isPlaying: false
        }

        initScore.bind(this)();
    }

    _initGame = () => {
        this.word = dataAPI[Math.floor(Math.random() * dataAPI.length)].toUpperCase();

        this.setState({
            letters: [],
            nbTry: 0,
            tryLetters: [],
            isPlaying: true
        });
    }

    _showWord = () => {
        var word = [];

        for (let i = 0, l = this.word.length; i < l; i++) {
            const letter = this.word[i];

            var symbol =  '_';
            if (this.state.letters.indexOf(letter) !== -1) {
                symbol = letter;
            }
            word.push(<Text key={i} style={{margin: 5, fontSize: 20, width: 18}}>{symbol}</Text>);
        }

        return word;
    }
    _showLetter = (begin, end) => {
        var letters = [];
        
        for (let i = begin; i < end; i++) {
            const letter = this.letters[i];
            const text = <Text style={styles.letter}>{letter}</Text>

            // if Not valided letters
            if (this.state.letters.indexOf(letter) === -1) {

                // If not wrong letter
                if (this.state.tryLetters.indexOf(letter) === -1) {
                    letters.push(<TouchableOpacity style={styles.letterContainer} key={i} onPress={() => {
                        this.selectLetter(letter)
                    }}>
                        {text}
                    </TouchableOpacity>)
                } else {
                    letters.push(<View style={[styles.letterContainer, {backgroundColor: '#eb694b'}]} key={i}>
                        {text}
                    </View>)
                }
            } else {
                letters.push(<View style={[styles.letterContainer, {backgroundColor: '#80be00'}]} key={i}>
                    {text}
                </View>)
            }
        }

        return letters;
    }

    selectLetter = (letter) => {
        if (this.word.indexOf(letter) !== -1) {
            this.setState({
                letters: [...this.state.letters, letter]
            }, () => {
                this._checkWin();
            });
        } else {
            this.setState({
                tryLetters: [...this.state.tryLetters, letter]
            },() => {
                if (this.state.tryLetters.length >= (this.images.length - 1)) {
                    winGame.bind(this)();
                }
            });
        }
    }

    _checkWin = () => {
        var nbWin = 0;
        for (let i = 0, l = this.word.length; i < l; i++) {
            const letter = this.word[i];

            if (this.state.letters.indexOf(letter) !== -1) {
                nbWin++;
            }

            if (nbWin >= l) {
                winGame.bind(this)();
            }
        }
    }

    _renderGame = () => {
        this.pts = this.images.length - this.state.tryLetters.length - 1;
        return (
            <View style={Layout.container}>
                <Back navigation={this.props.navigation} action={() => {
                    this.pts = 0;
                    backGame.bind(this)();
                }} />

                <View style={styles.word}>
                    {this._showWord()}
                </View>

                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={this.images[this.state.tryLetters.length]}
                        style={{ width: 250, height: 250 }}
                    />
                    <Text>{this.pts} points</Text>
                </View>


                <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 30}}>
                    <View style={styles.lettersContainer}>
                        {this._showLetter(0, 10)}
                    </View>
                    <View style={styles.lettersContainer}>
                        {this._showLetter(10, 20)}
                    </View>

                    <View style={styles.lettersContainer}>
                        {this._showLetter(20, 26)}
                    </View>
                </View>

                
            </View>
        );
    }

    render() {
        const lastGame = this.word ? [this.pts, this.word] : null;

        console.log(this.word);

        return (this.state.isPlaying) ? (
            this._renderGame()
        ) : <LaunchGame
                title="PENDU"
                action={this._initGame}
                score={this.state.score}
                lastGame={lastGame}
                rules="Tu dois trouver le mot caché en devinant les lettres une par une. Attention, tes tentatives sont limitées ! Bonne chance !"
            />
    }
}

const styles = StyleSheet.create({
    word: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 50,
        marginTop: 50,
    },
    lettersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    letterContainer: {
        margin: 1,
        backgroundColor: '#292929',
        borderRadius: 5,
        width: widthLetter,
        height: widthLetter,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    letter: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
});
