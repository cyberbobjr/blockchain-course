const Interpreter = require('./index.js');
const {
    STOP,
    ADD,
    SUB,
    MUL,
    DIV,
    PUSH,
    LT,
    GT,
    EQ,
    OR,
    AND,
    JMP,
    JMPI
} = Interpreter.OPCODE_MAP;

describe('Interpreter', () => {
    describe('runCode()', () => {
        describe('and the code includes ADD', () => {
            it('should add two values ', function () {
                expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, ADD, STOP])).toEqual(5);
            });
        });

        describe('and the code includes SUB', () => {
            it('should substracts one value from another ', function () {
                expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, SUB, STOP])).toEqual(1);
            });
        });

        describe('and the code includes MUL', () => {
            it('should mul one value from another ', function () {
                expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, MUL, STOP])).toEqual(6);
            });
        });

        describe('and the code includes DIV', () => {
            it('should div one value from another ', function () {
                expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, DIV, STOP])).toEqual(1.5);
            });
        });

        describe('and the code includes LT', () => {
            it('checks if one value is lesser than another ', function () {
                expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, LT, STOP])).toEqual(0);
            });
        });

        describe('and the code includes GT', () => {
            it('checks if one value is greater than another ', function () {
                expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, GT, STOP])).toEqual(1);
            });
        });

        describe('and the code includes EQ', () => {
            it('checks if one value is equal than another ', function () {
                expect(new Interpreter().runCode([PUSH, 2, PUSH, 3, EQ, STOP])).toEqual(0);
            });
        });

        describe('and the code includes AND', () => {
            it('ands two conditions ', function () {
                expect(new Interpreter().runCode([PUSH, 1, PUSH, 0, AND, STOP])).toEqual(0);
            });
        });

        describe('and the code includes OR', () => {
            it('or two conditions ', function () {
                expect(new Interpreter().runCode([PUSH, 1, PUSH, 0, OR, STOP])).toEqual(1);
            });
        });

        describe('and the code includes JUMP', () => {
            it('jumps to a destination ', function () {
                expect(new Interpreter().runCode([PUSH, 6, JMP, PUSH, 0, JMP, PUSH, "jump successful", STOP])).toEqual("jump successful");
            });
        });

        describe('and the code includes JUMPI', () => {
            it('jumps to a destination ', function () {
                expect(new Interpreter().runCode([PUSH, 8, PUSH, 1, JMPI, PUSH, 0, JMP, PUSH, "jumpi successful", STOP])).toEqual("jumpi successful");
            });
        });

        describe('and the code includes an invalid JUMP destination', () => {
            it('throws an error ', function () {
                expect(
                    () =>
                        new Interpreter().runCode([PUSH, 99, JMP, PUSH, 0, JMP, PUSH, "jump successful", STOP])
                )
                    .toThrow("Invalid destination : 99");
            });
        });

        describe('and the code includes an invalid PUSH value', () => {
            it('throws an error ', function () {
                expect(
                    () =>
                        new Interpreter().runCode([PUSH, 0, PUSH])
                )
                    .toThrow("The PUSH instruction cannot be the last");
            });
        });

        describe('and the code includes an infinite loop', () => {
            it('throws an error ', function () {
                expect(
                    () =>
                        new Interpreter().runCode([PUSH, 0, JMP, STOP])
                )
                    .toThrow("Check for an infinite loop. Execution limit of 10000 exceed");
            });
        });
    })
});

