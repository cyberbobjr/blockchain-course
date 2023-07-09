const {sortCharacters, keccakHash} = require("./index");

describe('util', function () {
    describe('sortCharacters()', function () {
        it('create the same strings for the same objects with the same properties in different order', () => {
            expect(sortCharacters({foo: 'foo', bar: 'bar'})).toEqual(sortCharacters({bar: 'bar', foo: 'foo'}));
        })

        it('create a different string for a different object', () => {
            expect(sortCharacters({foo: 'foo'})).not.toEqual(sortCharacters({bar: 'bar'}));
        })
    });

    describe('keccakHash()', function () {
        it('produces a keccak256 hash', () => {
            expect(keccakHash('foo')).toEqual('b2a7ad9b4a2ee6d984cc5c2ad81d0c2b2902fa410670aa3f2f4f668a1f80611c');
        })
    });
});
