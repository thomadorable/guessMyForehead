import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { initScore, backGame, winGame } from '../constants/Utils';

import Layout from '../constants/Layout'
import { AsyncStorage } from "react-native"
import Colors from '../constants/Colors';
import LaunchGame from '../components/LaunchGame'

const centerX = Math.round(Layout.window.width / 2);

// TODO : 
// - design
// - pouvoir mettre pause
// - créer des bonus placé aléatoirement
// - collision avec les bonus qui font rapetissir ?
// - ne pas pouvoir faire demi-tour
// - ne pas pouvoir sortir de l'écran
// - show best score 


export default class SnakeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    
    constructor(props) {
        super(props);

        this.key = 'snake2';

        this.state = {
            isPlaying: false
        }

        initScore.bind(this)();
    }

    _initGame = () => {
        this.setState({
            isPlaying: true
        });

        this.blocs = [{
            top: 80,
            left: centerX
        }];

        this.direction = 'BOTTOM';
        this.deplacements = [];
        this.speed = 10;
        this.pts = 0;

        this.interval = setInterval(() => {
            const isOutBottom = this.blocs[0].top > this.height - 11;
            const isOutTop = this.blocs[0].top < 0;
            const isOutRight = this.blocs[0].left > this.width;
            const isOutLeft = this.blocs[0].left < -5;

            if (isOutBottom || isOutTop || isOutLeft || isOutRight) {
                this._endGame();
            } else {
                this.deplacements.unshift(this.direction)
                this.deplacements = this.deplacements.slice(0, this.blocs.length);


                for (let i = 0, l = this.blocs.length; i < l; i++) {
                    const bloc = this.blocs[i];

                    if (!bloc) {
                        return;
                    }

                    switch(this.deplacements[i]) {
                        case 'TOP':
                            bloc.top =  bloc.top - this.speed 
                        break;
    
                        case 'LEFT':
                            bloc.left =  bloc.left - this.speed 
                        break;
    
                        case 'RIGHT':
                            bloc.left =  bloc.left + this.speed 
                        break;
    
                        default: // BOTTOM
                        bloc.top =  bloc.top + this.speed 
                    }

                    if (i > 0 && bloc.top === this.blocs[0].top && bloc.left === this.blocs[0].left) {
                        this._endGame();
                    }

                    if (this.refs['snake' + i]) {
                        this.refs['snake' + i].setNativeProps({ style: bloc });
                    }

                }
            }
        }, 50);

        this.interval2 = setInterval(() => {
            var newBloc = {
                top: this.blocs[this.blocs.length - 1].top,
                left: this.blocs[this.blocs.length - 1].left
            }

            switch(this.deplacements[this.deplacements.length - 1]) {
                case 'TOP':
                    newBloc.top =  newBloc.top + this.speed 
                break;

                case 'LEFT':
                    newBloc.left =  newBloc.left + this.speed 
                break;

                case 'RIGHT':
                    newBloc.left =  newBloc.left - this.speed 
                break;

                default: // BOTTOM
                newBloc.top =  newBloc.top - this.speed 
            }

            this.blocs.push(newBloc);
            this.pts ++;

            this.forceUpdate();
        }, 200)
    }

    _endGame = () => {
        clearInterval(this.interval);
        clearInterval(this.interval2);
        winGame.bind(this)();
        this.setState({
            isPlaying: false
        });
    }

    _renderGame = () => {
        return (
            <View style={styles.container}>
                <View 
                    style={styles.game}
                    onLayout={(event) => {
                        const {width, height} = event.nativeEvent.layout;
                        this.width = width;
                        this.height = height;
                    }}
                >
                    {
                        this.blocs && this.blocs.map((bloc, i) => {
                            return (
                                <View ref={'snake' + i} key={i} style={[styles.snake, {top: bloc.top, left: bloc.left} ]}></View>
                            )
                        })
                    }
                </View>

                <View>
                    <View style={{position: 'absolute', left: 10, top: 10}}>
                        <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 5}}>{this.pts} points</Text>
                        {/* <Text style={{fontWeight: 'bold', fontSize: 14}}>best : {this.best}</Text> */}
                    </View>

                    <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 15}}>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            this.direction = 'TOP';
                        }}>
                            <Text style={styles.btnText}>^</Text>
                        </TouchableOpacity>

                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={[styles.btn, {marginRight: 30}]} onPress={() => {
                                this.direction = 'LEFT';
                            }}>
                                <Text style={[styles.btnText, {transform: [{ rotate: '-90deg'}]}]}>^</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={() => {
                                this.direction = 'RIGHT';
                            }}>
                                    <Text style={[styles.btnText, {transform: [{ rotate: '90deg'}]}]}>^</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            this.direction = 'BOTTOM';
                        }}>
                                <Text style={[styles.btnText, {transform: [{ rotate: '180deg'}]}]}>^</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (this.state.isPlaying) ? (
            this._renderGame()
        ) : <LaunchGame
                title="Snake"
                action={this._initGame}
                score={this.state.score}
                rules="Tu dois trouver le mot caché en devinant les lettres une par une. Attention, tes tentatives sont limitées ! Bonne chance !"
            />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.grey
    },
    game: {
        flex: 1,
        backgroundColor: '#292929'
    },
    snake: {
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: '#80be00',
        borderRadius: 5
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