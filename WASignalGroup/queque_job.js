const _queque = {}

module.exports = async function (id, awaitable) {
    const queque = _queque[id] || Promise.resolve()
    const quequeSolve =  _queque[id] = queque.then(awaitable, awaitable)
    const quequeClean = function() {
        if (_queque[id] === quequeSolve) delete _queque[id]
    }
    await quequeSolve.then(quequeClean, quequeClean)
    return quequeSolve
}