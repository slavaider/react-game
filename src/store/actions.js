export function resetLeaderBoard() {
    return {
        type: 'LEADER_RESET'
    }
}

export function addWin(payload) {
    return {
        type: 'LEADER_ADD',
        value: payload
    }
}

export function toggleComputer() {
    return {
        type: 'TOGGLE_COMPUTER'
    }
}

export function toggleStart() {
    return {
        type: 'TOGGLE_START'
    }
}

export function changeBackground(payload) {
    return {
        type: 'CHANGE_BACKGROUND',
        value: payload
    }
}

export function changeSpeed(payload) {
    return {
        type: 'CHANGE_SPEED',
        value: payload
    }
}

export function fetchDataFromStorage(payload) {
    return {
        type: 'FETCH_DATA',
        value: payload
    }
}

export function fetchScore(payload) {
    return {
        type: 'FETCH_SCORE',
        value: payload
    }
}
