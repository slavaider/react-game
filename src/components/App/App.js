import React from 'react';
import './App.css'
import Cell from "../Cell/Cell";
import logo from '../../assets/img/rs_school_js.svg'

class App extends React.Component {

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
        flag: true,
        color: 'lightblue',
        winner: 'pass'
    }

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
    }

    Restart = () => {
        this.setState({
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            flag: true
        })
    }
    Change = () => {
        this.setState({winner: 'pass'})
    }

    render() {
        const [one, two, three, four, five, six, seven, eight, nine] = this.state.board
        const winner = this.state.winner
        const table = (<table>
            <tbody>
            <tr>
                <Cell key={0} index={0} onClickHandler={(value) => this.onClickHandler(value)} value={one}/>
                <Cell key={1} index={1} onClickHandler={(value) => this.onClickHandler(value)} value={two}/>
                <Cell key={2} index={2} onClickHandler={(value) => this.onClickHandler(value)} value={three}/>
            </tr>
            <tr>
                <Cell key={3} index={3} onClickHandler={(value) => this.onClickHandler(value)} value={four}/>
                <Cell key={4} index={4} onClickHandler={(value) => this.onClickHandler(value)} value={five}/>
                <Cell key={5} index={5} onClickHandler={(value) => this.onClickHandler(value)} value={six}/>
            </tr>
            <tr>
                <Cell key={6} index={6} onClickHandler={(value) => this.onClickHandler(value)} value={seven}/>
                <Cell key={7} index={7} onClickHandler={(value) => this.onClickHandler(value)} value={eight}/>
                <Cell key={8} index={8} onClickHandler={(value) => this.onClickHandler(value)} value={nine}/>
            </tr>
            </tbody>
        </table>)
        let win = ''
        if (winner === 1) {
            win = 'Winner Cross'
        }
        if (winner === 2) {
            win = 'Winner Null'
        }
        if (winner === 'draw') {
            win = 'Draw ;)'
        }
        const settings = (
            <>
                <div>{win}</div>
                <button onClick={() => this.Change()}>Restart</button>
            </>
        )
        return (
            <div className="App">
                <div className="wrapper">
                    {winner === 'pass' ? table : settings}
                </div>
                <div className="github">
                    <a href="https://github.com/slavaider">github</a>
                    <img src={logo} alt="img"/>
                    <a href="https://rs.school/js/">rs-school</a>
                </div>
            </div>
        );
    }
}


export default App;
