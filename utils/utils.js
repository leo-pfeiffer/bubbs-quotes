const seedrandom = require("seedrandom");

const getDailySeed = function() {
    const date = new Date()
    const seed = '' + date.getDate() + '' + date.getMonth() + '' + date.getFullYear()
    const rng = seedrandom(seed)
    return rng()
}

const getRandomIndex = function(length, rnd) {
    return parseInt(length * rnd);
}


module.exports = {
    getDailySeed: getDailySeed,
    getRandomIndex: getRandomIndex
}