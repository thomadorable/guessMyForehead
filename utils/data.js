import { AsyncStorage } from 'react-native';

export async function getScore(key, callback) {
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
            // TODO : set SCORE
            setScore(key, score);
        } else {
            score = JSON.parse(score);
        }

        callback(score);
    } catch (error) {
        // Error getting data
    }
}


export async function setScore(key, score) {
    try {
        await AsyncStorage.setItem('@GuessMyForehead:' + key, JSON.stringify(score));
        console.log('score setted for key ', key, JSON.stringify(score))
    } catch (error) {
        // Error saving data
    }
}