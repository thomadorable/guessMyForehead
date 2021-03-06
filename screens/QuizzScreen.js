import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import dataAPI from '../assets/data/quizz.json';
import { shuffle, backGame, winGame } from '../constants/Utils';
import Layout from '../constants/Layout'
import Back from '../components/Back'
import { getScore, setScore } from '../utils/data'

import LaunchGame from '../components/LaunchGame'


export default class QuizzScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    
    constructor(props) {
        super(props);
        this.state = {};
        this.key = 'quizz';

        this.nbQuestions = 4;
    }

    componentWillMount() {
        getScore(this.key, (score) => {
            this.setState({
                score
            });
        });
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
            winGame.bind(this)();
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

    render() {
        return (this.state.isPlaying) ? (
            <View style={Layout.container}>
                <Back navigation={this.props.navigation} action={() => {
                    backGame.bind(this)();
                }} />
                <View style={styles.guessContainer}>
                    <Text style={styles.timer}>{this.nbQuestions - this.questions.length} / {this.nbQuestions}</Text>

                    <Text style={styles.guess}>
                        {this.state.question.question}
                    </Text>

                </View>

                <Text style={[styles.timer, {marginTop: 20}]}>{this.pts} points</Text>

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
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    guess: {
        fontWeight: 'bold',
        fontSize: 25,
        lineHeight: 30,
        textAlign: 'center',
        color: '#2c63b7'
    },
    timer: {
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        color: '#555'
    },
    btnContainer: {
        flexDirection: 'row',
        padding: 10,
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
