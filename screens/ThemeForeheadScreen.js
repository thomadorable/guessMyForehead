import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { backGame, winGame } from '../constants/Utils';

import LaunchGame from '../components/LaunchGame'
import GuessForehead from '../components/GuessForehead'
import { getScore } from '../utils/data'
import dataAPI from '../assets/data/guessMyForehead.json';


export default class ThemeForeheadScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.key = 'forehead';

        this.state = {
            isPlaying: false
        }

        this.images = [
            require('../assets/images/forehead/random.jpg'),
            require('../assets/images/forehead/stars.jpg'),
            require('../assets/images/forehead/90s.jpg'),
            require('../assets/images/forehead/music.jpg'),
            require('../assets/images/forehead/animals.jpg'),
            require('../assets/images/forehead/blockbuster.jpg'),
            require('../assets/images/forehead/food.jpg'),
            require('../assets/images/forehead/stars.jpg')
        ];

        var allValues = [];
        for (let i = 0, l = dataAPI.length; i < l; i++) {
            const data = dataAPI[i];

            allValues = allValues.concat(data.values);
        }

        dataAPI.unshift({
            "title": "Random",
            "values": allValues
        });
    }

    componentWillMount() {
        getScore(this.key, (score) => {
            this.setState({
                score
            });
        });
    }

    _initGame = (idTheme) => {
        this.values = dataAPI[idTheme].values.slice(0);

        this.setState({
            timer: 10,
            isPlaying: true
        })

        this.pts = 0;

        this.selectValue();

        this.interval = setInterval(() => {
            if (this.state.timer <= 1) {
                clearInterval(this.interval);
                winGame.bind(this)();
            } else {
                this.setState({
                    timer: this.state.timer - 1
                });
            }
        }, 1000);
    }

    selectValue = () => {
        if (this.values.length > 0) {
            const value = this.values.splice(Math.floor(Math.random() * this.values.length), 1);
            this.setState({
                value
            })
        } else {
            winGame.bind(this)();
        }
    }

    _customPlayButton = () => {
        return (
            <View style={{padding: 30}}>
                {
                    dataAPI.map(
                        (value, index) => {
                            return <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    this._initGame(index);
                                }}
                            >
                                <ImageBackground 
                                    imageStyle={{ borderRadius: 5, opacity: 0.7 }}
                                    style={styles.theme} 
                                    source={this.images[index]}
                                >
                                    <Text style={styles.themeText}>{value.title}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        }
                    )
                }
            </View>
        )
    }

    _returnGameOrMenu = () => {
        return (this.state.isPlaying) ? (
            <GuessForehead 
                navigation={this.props.navigation}
                value={this.state.value}
                timer={this.state.timer}
                pts={this.pts}
                backAction={() => {
                    clearInterval(this.interval);
                    backGame.bind(this)();
                }}
                next={this.selectValue}
                win={() => {
                    this.pts++;
                    this.selectValue();
                }}
            />
        ) : <LaunchGame
                title="Guess My Forehead"
                action={this._initGame}
                score={this.state && this.state.score}
                rules="Choisis un thème et fais deviner un maximum de mots dans un temps limité. Tu peux utiliser des phrases sans souci. Bonne chance !"
                customPlayButton={this._customPlayButton}
            />
    }

    render() {
        return(
            <ScrollView style={styles.scrollContainer}>
                {this._returnGameOrMenu()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%'
    },
    theme: {
        backgroundColor: '#292929',
        justifyContent: 'center',
        marginBottom: 20,
        height: 150,
        borderRadius: 5
    },
    themeText: {
        textAlign: 'center',
        color: 'white',
        letterSpacing: 5,
        fontSize: 20,
        textTransform: 'uppercase'
    }
});
