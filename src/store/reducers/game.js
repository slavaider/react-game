const initialState = {
    score: [],
    color: '#54ee29',
    computer: false,
    flag: true,
    computerSpeed: 1000
}
export default function Game(state = initialState, action) {
    switch (action.type) {
        case 'LEADER_ADD': {
            const score = [...state.score];
            score.push(action.value)
            return {
                ...state,
                score
            }
        }
        case 'LEADER_RESET': {
            return {
                ...state,
                score: []
            }
        }
        case 'CHANGE_SPEED': {
            return {...state, computerSpeed: action.value}
        }
        case 'TOGGLE_COMPUTER': {
            return {...state, computer: !state.computer}
        }
        case 'TOGGLE_START': {
            return {...state, flag: !state.flag}
        }
        case 'CHANGE_BACKGROUND': {
            return {...state, color: action.value}
        }
        default:
            return state
    }
}
