import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import dataAPI from '../assets/data/quizz.json';
import {shuffle} from '../constants/Utils';
import Layout from '../constants/Layout'
import Back from '../components/Back'

import LaunchGame from '../components/LaunchGame'

export default class QuizzScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    
    constructor(props) {
        super(props);
        this.state = {};

        this.nbQuestions = 10;
    }

    componentWillMount() {
        this._getScore('quizz', (score) => {
            this.setState({
                score
            });
        });
    }

    _getScore = async (key, callback) => {
        try {
            let score = await AsyncStorage.getItem('@GuessMyForehead:' + key);
            if (!score) {
                // INIT SCORE OBJECT
                score = {
                    games : {
                        ended: 0,
                        canceled: 0
                    }, 
                    scores: {
                        total: 0,
                        last: 0,
                        best: 0
                    }
                }
                this._setScore(key, score);
            } else {
                score = JSON.parse(score);
            }

            callback(score);
        } catch (error) {
            // Error getting data
        }
    }

    _setScore = async (key, score) => {
        try {
            await AsyncStorage.setItem('@GuessMyForehead:' + key, JSON.stringify(score));
        } catch (error) {
            // Error saving data
        }
    }

    _initGame = () => {
        // Use slice to duplicate the data API array
        let allQuestions = shuffle(dataAPI.slice(0));

        // Get 10 random questions from API
        this.questions = allQuestions.splice(0, this.nbQuestions);

        this.pts = 0;
        this._getQuestion();

        this.setState({
            isPlaying: true
        })
    }

    _getQuestion = () => {
        if (this.questions.length > 0) {
            const question = this.questions.splice(Math.floor(Math.random() * this.questions.length), 1)[0];
    
            question.answers = shuffle(question.answers);
            this.setState({
                question
            });
        } else {
            this._winGame();
        }
    }

    _showButton = (index) => {
        const answer = this.state.question.answers[index];
        return (answer && <TouchableOpacity
            style={[styles.btn]}
            onPress={() => {
                if (answer.isWin) {
                    this.pts++;
                }
                this._getQuestion();
            }}
            >
            <Text style={styles.textBtn}>{answer.value}</Text>
        </TouchableOpacity>)
    }

    _winGame = () => {
        let score = this.state.score;
        score.games.ended++;

        score.scores.total += this.pts;
        score.scores.last = this.pts;

        if (this.pts > score.scores.best) {
            score.scores.best = this.pts;
        }

        this._setScore('quizz', score);
        this.setState({
            score
        });

        this.setState({
            isPlaying: false,
        });
    }

    _backGame = () => {
        let score = this.state.score;
        score.games.canceled++;

        this._setScore('quizz', score);
        this.setState({
            score
        });

        this.setState({
            isPlaying: false
        })
    }

    render() {
        return (this.state.isPlaying) ? (
            <View style={Layout.container}>
                <Back navigation={this.props.navigation} action={this._backGame} />
                <View style={styles.guessContainer}>
                    <Text style={styles.guess}>
                        {this.state.question.question}
                    </Text>

                    <Text style={styles.timer}>{this.pts} pts</Text>
                    <Text style={styles.timer}>{this.nbQuestions - this.questions.length} / {this.nbQuestions}</Text>
                </View>

                <View style={styles.btnContainer}>
                    {this._showButton(0)}
                    {this._showButton(1)}
                </View>
                <View style={[styles.btnContainer, {paddingTop: 0}]}>
                    {this._showButton(2)}
                    {this._showButton(3)}
                </View>
            </View>
        ) : <LaunchGame 
                title="QUIZZ"
                action={this._initGame}
                score={this.state.score}
                rules="Réponds simplement aux questions dans ce quizz sur le thème du react native ! Tu vas pouvoir choisir la réponse parmis plusieurs propositions. Bonne chance !"
            />
    }
}

const styles = StyleSheet.create({
    guessContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    guess: {
        fontWeight: 'bold',
        fontSize: 25,
        lineHeight: 40,
        textAlign: 'center',
        color: '#2c63b7'
    },
    timer: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        color: '#555'
    },
    btnContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    btn: {
        padding: 10,
        paddingVertical: 15,
        backgroundColor: '#292929',
        borderRadius: 5,
        flex: 1,
        margin: 10,
        marginBottom: 0,
        alignItems: 'center'
    },
    textBtn: {
        color: 'white',
        textAlign: 'center'
    }
});
