import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

// TODO - animation return
// TODO - design cards
// TODO - timer
// TODO - save best score


// OK :
// TODO - remove useless map
// TODO - nb moves 
// TODO - replay


const cardWidth = 80;
const nbColumns = 4;

export default class MemoryScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._initGame();
    }

    _initGame = () => {
        var values = ['red', 'lightblue', 'green', 'lightgrey', 'orange', 'pink', 'darkblue', 'yellowgreen'];
        // var values = ['red', 'lightblue', 'green'];

        var cards = [];

        for (let i = 0, l = values.length; i < l; i++) {
            cards.push({color: values[i], status: 0});
            cards.push({color: values[i], status: 0});
        }

        cards = this.shuffle(cards);

        this.setState({
            cards
        });

        this.nbToWin = values.length;
        this.currents = [];
        this.nbMove = 0;
    }

    shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    _pick = (card, index) => {
        let cards = this.state.cards;
        card.index = index;

        if (this.currents.length === 1) {
            this.nbMove++;
            const current = this.currents[0];
            if (current.color === card.color) {
                // 2a) Lock winning cards
                cards[current.index].status = 3;
                cards[index].status = 3;
                this.nbToWin--;

                if (this.nbToWin <= 0) {
                    alert('Gagné en ' + this.nbMove + ' coups !');
                    this._initGame();
                    return;
                }
                this.currents = [];
            } else {
                // 2b) Save the 2nd tried card
                this.currents.push(card);
            }

        } else {
            if(this.currents.length === 2) {
                // Hide the 2 currents cards
                cards[this.currents[0].index].status = 0;
                cards[this.currents[1].index].status = 0;
            }

            // 1) Save the 1st tried card
            this.currents = [card];
        }

        if (cards[index].status === 0) {
            cards[index].status = 1;
        }

        this.setState({
            cards
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cards}>
                {
                    this.state.cards.map((card, i) => {
                        if (card.status !== 0) {
                            return (<View style={[styles.card, {backgroundColor: card.color}]} key={i}></View>)
                        } else {
                            return (<TouchableOpacity style={styles.card} key={i} onPress={() => {
                                    this._pick(card, i);
                                }}>
                             </TouchableOpacity>)
                        }
                    })
                }
                </View>
                <Text style={{fontWeight: 'bold', marginTop: 20}}>{this.nbMove} coups</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: ((cardWidth + 1) * nbColumns)
    },
    card: {
        width: cardWidth,
        height: cardWidth,
        marginBottom: 1,
        backgroundColor: '#292929'
    }
});
