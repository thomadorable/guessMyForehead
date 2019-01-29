import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
// import { AsyncStorage } from "react-native"
import dataAPI from '../assets/data/quizz.json';
import {shuffle} from '../constants/Utils';
import Layout from '../constants/Layout'


// TODO
// - relancer game

export default class SnakeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    
    constructor(props) {
        super(props);

        // Get 10 random questions from API
        // Todo ne pas répéter ça
        this.questions = shuffle(dataAPI).splice(0, 10);


        this.state = {
            question: null,
        };

        this.pts = 0;
    }

    componentWillMount() {
        this._getQuestion();
    }

    _getQuestion = () => {
        if (this.questions.length > 0) {
            const question = this.questions.splice(Math.floor(Math.random() * this.questions.length), 1)[0];
    
            question.answers = shuffle(question.answers);
            this.setState({
                question
            });
        } else {
            alert('Terminé avec ' + this.pts + ' points');
            // this.questions = shuffle(dataAPI).splice(0, 10);
            // this.pts = 0;
            // this._getQuestion();
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
        return (
            <View style={Layout.container}>
                <View style={styles.guessContainer}>
                    <Text style={styles.guess}>
                        {this.state.question.question}
                    </Text>

                    <Text style={styles.timer}>{this.pts} pts</Text>
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
        )
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
