import { getScore, setScore } from '../utils/data'

// Shuffle an array
export function shuffle (a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export function backGame () {
    let score = this.state.score;
        score.games.canceled++;

    setScore(this.key, score);
    this.setState({
        score: score,
        isPlaying: false
    });
}

export function winGame () {
    let score = this.state.score;
    score.games.ended++;

    score.scores.total += this.pts;
    score.scores.last = this.pts;

    if (this.pts > score.scores.best) {
        score.scores.best = this.pts;
    }

    setScore(this.key, score);
    this.setState({
        score,
        isPlaying: false,
    });
}

export function initScore () {
    getScore(this.key, (score) => {
        this.setState({
            score,
        });
    });
}