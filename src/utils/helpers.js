import acState from '../state'

export const logger = (...data) => {
    if (acState.state.devConfig.isLogging) console.log(data)
}