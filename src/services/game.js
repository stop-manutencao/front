import Http from "./http"

export const create = data => Http.client.post('/game/create', data)

export const signIn = data => Http.client.post('/game/signin', data)

export const changeStatus = data => Http.client.post('/game/status', data)

export const getGameData = data => Http.client.post('/game/users', data)

export const answer = data => Http.client.post('/game/answer', data)

export const getScore = data => Http.client.get(`/game/score/${data}`)
