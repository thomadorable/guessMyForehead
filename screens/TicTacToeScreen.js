import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { shuffle, backGame, initScore, winGame } from '../constants/Utils';
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import { getScore } from '../utils/data'

import Back from '../components/Back'
import LaunchGame from '../components/LaunchGame'


export default class TicTacToeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.key = 'tictactoe';


        this.state = {
            isPlaying: false
        }

        initScore.bind(this)();
    }

    _initGame = () => {
        var cards = [];
        for (let i = 0, l = 9; i < l; i++) {
            cards.push("");
        }

        var joueur = "O";

        var win = ""

        var emptyCell = 9

        this.setState({
            isPlaying: true,
            cards,
            joueur,
            win,
            emptyCell
        });
    }

    _play = (col) => {        
        // GET cell de cards
        var cards = this.state.cards
        var joueur = this.state.joueur 
        var win = this.state.win 
        var emptyCell = this.state.emptyCell 

        // Le joueur est l'utilisateur
        if (joueur == "O" && win == "") {
            // Check si déjà cliqué
            if (cards[col] == "") {

                cards[col] = joueur
                emptyCell--

                // Affiche le sign du joueur
                this.setState({
                    cards,
                    emptyCell
                })
            }
        }

        this._win()

        setTimeout(this._playIA, 2000);
    }


    _playIA = () => {
        // GET cell de cards
        var cards = this.state.cards
        var joueur = this.state.joueur 
        var win = this.state.win 
        var emptyCell = this.state.emptyCell 

        if (joueur == "X" && win == "") {
            var arrayRandom = []
            for (let index = 0; index < cards.length; index++) {
                const cell = cards[index];
                if (cell == "") {
                    arrayRandom.push(index)
                }
            }

            var random = arrayRandom[Math.floor(Math.random()*arrayRandom.length)]
            cards[random] = joueur

            emptyCell--

            // Affiche le sign du joueur
            this.setState({
                cards,
                emptyCell
            })
        }

        this._win()
    }


    _win = () => {
        var cards = this.state.cards
        var joueur = this.state.joueur 
        var win = this.state.win 
        var emptyCell = this.state.emptyCell 

        if (win == '' && emptyCell == 0) {
            win = "null"

            this.setState({
                win
            })

            this.pts = 0
            setTimeout(winGame.bind(this), 2000);
        }

        if (win != "null") {
            
            if (cards[0] == joueur && cards[1] == joueur && cards[2] == joueur
                || cards[3] == joueur && cards[4] == joueur && cards[5] == joueur
                || cards[6] == joueur && cards[7] == joueur && cards[8] == joueur
                || cards[0] == joueur && cards[3] == joueur && cards[6] == joueur
                || cards[1] == joueur && cards[4] == joueur && cards[7] == joueur
                || cards[2] == joueur && cards[5] == joueur && cards[8] == joueur
                || cards[0] == joueur && cards[4] == joueur && cards[8] == joueur
                || cards[2] == joueur && cards[4] == joueur && cards[6] == joueur) {
                    win = joueur
                
                    this.setState({
                        win
                    })

                    this.pts = win === 'O' ? emptyCell : 0
                    setTimeout(winGame.bind(this), 2000);
            } else {
                joueur = joueur === 'O' ? 'X' : 'O'

                this.setState({
                    joueur
                })
            }
        }
    }


    _text = () => {
        var win = this.state.win 
        const name = this.state.joueur === "O" ? 'Joueur 1' : "IA"
        var text = ""

        if (win == "null") {
            text = "Personne n'a gagné"
        } else if (win != "") {
            text = name + " a gagné ! Bravo !"
        } else {
            text = "C'est à " + name + " de jouer !"
        }
        return <Text style={{ fontWeight: 'bold', marginTop: 20 }}>{text}</Text>
    }

    

    _renderGame = () => {
        return (
            <View style={[Layout.container, { alignItems: 'center' }]}>
                <Back navigation={this.props.navigation} action={() => {
                    backGame.bind(this)();
                }} />

                <View style={{width: 3 * 108, flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    this.state.cards && this.state.cards.map((value, index) => {
                        return(
                            <TouchableOpacity onPress={() => { 
                                this._play(index)
                            }} 
                            key={index} style={{width: 100, height: 100, backgroundColor: 'lightgrey', margin: 4}}>
                                <Text style={{textAlign: 'center'}}>{value}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
                </View>
                <View>
                    {this._text()}
                </View>
            </View>

            
        )
    }

    render() {
        return (this.state.isPlaying) ? (
            this._renderGame()
        ) : <LaunchGame
                title="TicTacToe"
                action={this._initGame}
                score={this.state.score}
                rules="Défiez notre intelligence artificielle au TicTacToe ! Bonne chance !"
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