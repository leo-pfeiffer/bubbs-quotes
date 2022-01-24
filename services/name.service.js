const {getRandomIndex, getDailySeed} = require('../utils/utils')

NAMES = ['Lelo', 'Bubby', 'Leo', 'Your Bubby']

module.exports = {
    dailyName: async (req, res) => {
        const seed = getDailySeed();
        const idx = getRandomIndex(NAMES.length, seed);
        const name = NAMES[idx]
        return res.status(200).json({name: name})
    }
}
