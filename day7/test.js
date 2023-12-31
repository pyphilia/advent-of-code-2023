// const {sortWeakToStrong, getTypeForHand, handToMap} = require('./main')
// const assert= require('assert')

// assert(sortWeakToStrong('A','T')===1)
// assert(sortWeakToStrong('K','T')===1)
// assert(sortWeakToStrong('T','A')===-1)
// assert(sortWeakToStrong('2','T')===-1)
// assert(sortWeakToStrong('A','2')===1)
// assert(sortWeakToStrong('A', 'A')===0)
// assert(sortWeakToStrong('Q', 'T')===1)
// assert(sortWeakToStrong('4','2')===1)

// assert(getTypeForHand(handToMap('32T3K'))===1)
// assert(getTypeForHand(handToMap('T55J5'))===3)
// assert(getTypeForHand(handToMap('KK677'))===2)
// assert(getTypeForHand(handToMap('KTJJT'))===2)
// assert(getTypeForHand(handToMap('QQQJA'))===3)

const {sortWeakToStrong, getTypeForHand, handToMap} = require('./main')
const assert= require('assert')

assert(sortWeakToStrong('A','T')===1)
assert(sortWeakToStrong('K','T')===1)
assert(sortWeakToStrong('T','A')===-1)
assert(sortWeakToStrong('2','T')===-1)
assert(sortWeakToStrong('A','2')===1)
assert(sortWeakToStrong('A', 'A')===0)
assert(sortWeakToStrong('Q', 'T')===1)
assert(sortWeakToStrong('4','2')===1)


assert(getTypeForHand(handToMap('32T3K'))===1)
assert(getTypeForHand(handToMap('T55J5'))===5)
assert(getTypeForHand(handToMap('KK677'))===2)
assert(getTypeForHand(handToMap('KTJJT'))===5)
assert(getTypeForHand(handToMap('QQQJA'))===5)
