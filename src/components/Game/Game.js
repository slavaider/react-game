import React from 'react';
import './Game.css'
import Cell from "../Cell/Cell";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {addWin, fetchDataFromStorage, fetchScore, resetLeaderBoard} from "../../store/actions";

class Game extends React.Component {

    state = {
        board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        winning_combination: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8]
        ],
        flag: this.props.flag,
        winner: 'pass',
    }

    computer_interval = null

    get_winner = () => {
        const board = this.state.board;
        const winning_combination = this.state.winning_combination
        for (let array of winning_combination) {
            const [x, y, z] = array
            if (board[x] === board[y] && board[y] === board[z] && (board[x] === 1 || board[x] === 2)) {
                return board[x]
            }
        }
        if (!board.includes(0)) {
            return 'draw'
        }
        return 'pass'
    }

    onClickHandler = (index) => {
        if (this.state.flag) {
            const prev_state = [...this.state.board]
            prev_state[index] = 1
            this.setState({board: prev_state, flag: false})
        } else {
            const prev_state = [...this.state.board]
            prev_state[index] = 2
            this.setState({board: prev_state, flag: true})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            localStorage.setItem('board', JSON.stringify(this.state.board));
            if (this.get_winner() !== 'pass' && this.get_winner() === 1) {
                this.setState({winner: 1})
                this.Restart()
            }
            if (this.get_winner() !== 'pass' && this.get_winner() === 2) {
                this.setState({winner: 2})
                this.Restart()
            }
            if (this.get_winner() !== 'pass' && this.get_winner() === 'draw') {
                this.setState({winner: 'draw'})
                this.Restart()
            }
        }
        if (prevProps.computer !== this.props.computer) {
            this.setComputerInterval()
        }
        if (prevProps.score !== this.props.score) {
            localStorage.setItem('score', JSON.stringify(this.props.score))
        }
    }

    keydownHandler = (event) => {
        const key = Number(event.key)
        if ((key >= 1) && (key <= 3)) {
            if (this.state.board[key + 5] === 0)
                this.onClickHandler(key + 5)
        }
        if ((4 <= key) && (key <= 6)) {
            if (this.state.board[key - 1] === 0)
                this.onClickHandler(key - 1)
        }
        if ((7 <= key) && (key <= 9)) {
            if (this.state.board[key - 7] === 0)
                this.onClickHandler(key - 7)
        }
    }

    setComputerInterval = () => {
        if (this.props.computer) {
            this.computer_interval = setInterval(() => {
                let randomIndex = null
                do {
                    randomIndex = Math.floor(Math.random() * 9);
                } while (this.state.board[randomIndex] !== 0)
                this.onClickHandler(randomIndex);
            }, this.props.computerSpeed)
        }
    }

    componentDidMount() {
        if (localStorage.getItem('score') !== null) {
            this.props.fetchScore(JSON.parse(localStorage.getItem('score')));
        }
        if (localStorage.getItem('settings') !== null) {
            this.props.fetchDataFromStorage(JSON.parse(localStorage.getItem('settings')))
        }
        if (localStorage.getItem('board') !== null) {
            this.setState({board: JSON.parse(localStorage.getItem('board'))});
        }
        if (!this.props.computer) {
            document.addEventListener("keydown", this.keydownHandler);
        }
        this.setComputerInterval()
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keydownHandler);
        this.Restart()
        clearInterval(this.computer_interval)
    }

    getWin = () => {
        const winner = this.get_winner()
        let win = null
        if (winner === 1) {
            win = 'Winner "X"'
        }
        if (winner === 2) {
            win = 'Winner "O"'
        }
        if (winner === 'draw') {
            win = 'Draw :)'
        }
        return win
    }

    Restart = () => {
        document.removeEventListener("keydown", this.keydownHandler);
        this.computer_interval = clearInterval(this.computer_interval)
        if (this.props.score.length > 9) {
            this.props.resetLeaderBoard()
        }
        this.props.addWin({
            winner: this.getWin(),
            date: new Date().toLocaleString()
        })
        this.setState({
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            flag: true
        })
    }

    Change = () => {
        this.setState({winner: 'pass'})
        if (!this.props.computer) {
            document.addEventListener("keydown", this.keydownHandler);
        }
        this.setComputerInterval()
    }

    render() {
        const [one, two, three, four, five, six, seven, eight, nine] = this.state.board
        const winner = this.state.winner
        const table = (<table>
            <tbody>
            <tr>
                <Cell key={0} computer={this.props.computer} index={0}
                      onClickHandler={(value) => this.onClickHandler(value)} value={one}/>
                <Cell key={1} computer={this.props.computer} index={1}
                      onClickHandler={(value) => this.onClickHandler(value)} value={two}/>
                <Cell key={2} computer={this.props.computer} index={2}
                      onClickHandler={(value) => this.onClickHandler(value)} value={three}/>
            </tr>
            <tr>
                <Cell key={3} computer={this.props.computer} index={3}
                      onClickHandler={(value) => this.onClickHandler(value)} value={four}/>
                <Cell key={4} computer={this.props.computer} index={4}
                      onClickHandler={(value) => this.onClickHandler(value)} value={five}/>
                <Cell key={5} computer={this.props.computer} index={5}
                      onClickHandler={(value) => this.onClickHandler(value)} value={six}/>
            </tr>
            <tr>
                <Cell key={6} computer={this.props.computer} index={6}
                      onClickHandler={(value) => this.onClickHandler(value)} value={seven}/>
                <Cell key={7} computer={this.props.computer} index={7}
                      onClickHandler={(value) => this.onClickHandler(value)} value={eight}/>
                <Cell key={8} computer={this.props.computer} index={8}
                      onClickHandler={(value) => this.onClickHandler(value)} value={nine}/>
            </tr>
            </tbody>
        </table>)

        let win = ''
        if (winner === 1) {
            win = 'Winner "X"'
        }
        if (winner === 2) {
            win = 'Winner "O"'
        }
        if (winner === 'draw') {
            win = 'Draw :)'
        }
        const result = (
            <>
                <h1>{win}</h1>
                <div className="btn-group" onClick={() => this.Change()}>
                    <button style={{background: this.props.color}}>
                        Restart
                    </button>
                    <Link to={'/'}>
                        <button style={{background: this.props.color}}>
                            Settings
                        </button>
                    </Link>
                    <Link to={'/leaders'}>
                        <button style={{background: this.props.color}}>
                            Leaders
                        </button>
                    </Link>
                </div>
            </>
        )
        return (
            <div className="Game"
                 style={{background: this.props.color}}
            >
                <main className="wrapper">
                    {winner === 'pass' ? table : result}
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        flag: state.game.flag,
        computer: state.game.computer,
        color: state.game.color,
        score: state.game.score,
        computerSpeed: state.game.computerSpeed
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addWin: (win) => dispatch(addWin(win)),
        resetLeaderBoard: () => dispatch(resetLeaderBoard()),
        fetchDataFromStorage: (data) => dispatch(fetchDataFromStorage(data)),
        fetchScore: (data) => dispatch(fetchScore(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
