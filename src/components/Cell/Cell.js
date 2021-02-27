import React from 'react';
import './Cell.css'
import Cross from '../../assets/img/cross.png'
import Null from '../../assets/img/null.png'

function Cell(props) {
    const style = {backgroundImage: null}
    if (props.value === 1) {
        style.backgroundImage = `url(${Cross})`
    }
    if (props.value === 2) {
        style.backgroundImage = `url(${Null})`
    }
    return (
        <td>
            <input
                type={'button'}
                style={style}
                disabled={props.value !== 0 || props.computer}
                onClick={props.onClickHandler.bind(this, props.index)}
            >
            </input>
        </td>
    )
}

export default Cell
