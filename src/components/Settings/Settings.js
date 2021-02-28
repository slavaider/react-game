import React from 'react'
import './Settings.css'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
    changeBackground,
    changeSpeed,
    fetchDataFromStorage,
    toggleComputer,
    toggleStart
} from "../../store/actions";

class Settings extends React.Component {

    componentDidMount() {
        if (localStorage.getItem('settings') !== null) {
            this.props.fetchDataFromStorage(JSON.parse(localStorage.getItem('settings')))
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            localStorage.setItem('settings', JSON.stringify({
                computer: this.props.computer,
                color: this.props.color,
                flag: this.props.flag,
                computerSpeed: +this.props.computerSpeed,
            }))
        }
    }

    render() {
        return (
            <div className='Settings' style={{background: this.props.color}}>
                <div className="block">
                    <Link to={'/game'}>
                        <button style={{background: this.props.color}}>
                            Start Game
                        </button>
                    </Link>
                    <Link to={'/leaders'} className={'margin'}>
                        <button style={{background: this.props.color}}>
                            leaders
                        </button>
                    </Link>
                    <h1>Settings</h1>
                    <label htmlFor="background">
                        Background &nbsp;
                        <input
                            id={'background'}
                            value={this.props.color}
                            type="color"
                            onChange={this.props.changeBackground}
                        />
                    </label>
                    <label htmlFor="computer">
                        Computer
                        <input
                            id={'computer'}
                            type="checkbox"
                            checked={this.props.computer}
                            onChange={this.props.toggleComputer}
                        />
                    </label>
                    {this.props.computer ? (
                        <label htmlFor="computer_speed">
                            Computer Speed
                            <input
                                className={'speed'}
                                id={'computer_speed'}
                                type="number"
                                value={this.props.computerSpeed}
                                onChange={this.props.changeSpeed}
                            />
                            ms
                        </label>
                    ) : null}
                    <label htmlFor="start">
                        "{this.props.flag ? 'X' : 'O'}" starts
                        <input
                            id={'start'}
                            type="checkbox"
                            checked={this.props.flag}
                            onChange={this.props.toggleStart}
                        />
                    </label>
                    <p>HOTKEYS: you can play game using 1-9 keys</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        computer: state.game.computer,
        color: state.game.color,
        flag: state.game.flag,
        computerSpeed: state.game.computerSpeed
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleComputer: () => dispatch(toggleComputer()),
        changeBackground: (event) => dispatch(changeBackground(event.target.value)),
        toggleStart: () => dispatch(toggleStart()),
        changeSpeed: (event) => dispatch(changeSpeed(+event.target.value)),
        fetchDataFromStorage: (data) => dispatch(fetchDataFromStorage(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
