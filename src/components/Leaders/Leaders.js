import React from 'react'
import './Leaders.css'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchDataFromStorage, fetchScore} from "../../store/actions";

class Leaders extends React.Component {
    componentDidMount() {
        if(localStorage.getItem('score')!==null){
            this.props.fetchScore(JSON.parse(localStorage.getItem('score')));
        }
        if (localStorage.getItem('settings') !== null) {
            this.props.fetchDataFromStorage(JSON.parse(localStorage.getItem('settings')))
        }
    }

    render() {
        return (
            <div className='Leaders' style={{background: this.props.color}}>
                <ol>
                    {this.props.score.length > 0 ? this.props.score.map((item, index) => {
                        return (
                            <li key={index}>
                                {item.winner}&nbsp;
                                Date: {item.date}
                            </li>
                        )
                    }) : <h1>Didn't have any high scores</h1>}
                </ol>
                <Link to={'/'}>
                    <button style={{background: this.props.color}}>
                        на главную
                    </button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        color: state.game.color,
        score: state.game.score,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDataFromStorage: (data) => dispatch(fetchDataFromStorage(data)),
        fetchScore:(data)=>dispatch(fetchScore(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaders)
