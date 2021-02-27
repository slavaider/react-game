import React from 'react'
import './Leaders.css'
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Leaders extends React.Component {
    render() {
        return (
            <div className='Leaders' style={{background: this.props.color}}>
                <ol>
                    {this.props.leaders.length > 0 ? this.props.leaders.map((item, index) => {
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
        leaders: state.game.score
    }
}

export default connect(mapStateToProps, null)(Leaders)
