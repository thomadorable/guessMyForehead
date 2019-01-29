import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Layout from '../constants/Layout'
import { AsyncStorage } from "react-native"
import Colors from '../constants/Colors';

const centerX = Math.round(Layout.window.width / 2);

// TODO : 
// - design
// - pouvoir mettre pause
// - créer des bonus placé aléatoirement
// - collision avec les bonus qui font rapetissir ?
// - ne pas pouvoir faire demi-tour
// - ne pas pouvoir sortir de l'écran

// OK :
// - détecter collision avec snake 
// - utiliser les setNativeProps
// - pouvoir rejouer
// - afficher les points 
// - centrer le snake à l'init
// - stocker le record

export default class SnakeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    
    constructor(props) {
        super(props);
        this.best = 0;
    }

    componentWillMount() {
        this._init();
        this._getBestScore();
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const isOutBottom = this.blocs[0].top > this.height - 11;
            const isOutTop = this.blocs[0].top < 0;
            const isOutRight = this.blocs[0].left > this.width;
            const isOutLeft = this.blocs[0].left < -5;

            if (isOutBottom || isOutTop || isOutLeft || isOutRight) {
                this._loose();
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
                        this._loose();
                    }

                    this.refs['snake' + i].setNativeProps({ style: bloc });
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
            this.forceUpdate();
            this.pts ++;

            if (this.pts > this.best) {
                this.best = this.pts;
            }
        }, 200)
    }

    _loose = () => {
        this._save();
        this._init();
    }

    _init = () => {
        this.blocs = [{
            top: 80,
            left: centerX
        }];

        this.direction = 'BOTTOM';
        this.deplacements = [];
        this.speed = 10;
        this.pts = 0;
    }

    _save = async () => {
        try {
            await AsyncStorage.setItem('@GuessMyForehead:snake', JSON.stringify({
                best: this.best,
                last: this.pts
            }));
        } catch (error) {
            // Error saving data
        }
    }

    _getBestScore = async () => {
        try {
          const value = await AsyncStorage.getItem('@GuessMyForehead:snake');
            if (value) {
                var json = JSON.parse(value);
                if (json && json.best) {
                    this.best = json.best;
                }
            }
        } catch (error) {
           console.log('error get')
        }
    }

    render() {
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
                        <Text style={{fontWeight: 'bold', fontSize: 14}}>best : {this.best}</Text>
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