const STOP = 'STOP';
const ADD = 'ADD';
const SUB = 'SUB';
const MUL = 'MUL';
const DIV = 'DIV';
const PUSH = 'PUSH';
const LT = 'LT';
const GT = 'GT';
const EQ = 'EQ';
const OR = 'OR';
const AND = 'AND';
const JMP = 'JMP';
const JMPI = 'JMPI';

const EXECUTION_COMPLETE = "Smart Contract finished";
const EXECUTION_LIMIT = 10000;

const OPCODE_MAP = {
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
};

class Interpreter {

    constructor() {
        this.state = {
            programCounter: 0,
            stack: [],
            code: [],
            executionCount: 0
        };
    }

    jump() {
        const destination = this.state.stack.pop();
        if (destination < 0 || destination > this.state.code.length) {
            throw new Error(`Invalid destination : ${destination}`);
        }
        this.state.programCounter = destination;
        this.state.programCounter--;
    }

    runCode(code) {
        this.state.code = [...code];
        try {
            while (this.state.programCounter < this.state.code.length) {
                this.state.executionCount++;

                if (this.state.executionCount > EXECUTION_LIMIT) {
                    throw new Error(`Check for an infinite loop. Execution limit of ${EXECUTION_LIMIT} exceed`);
                }
                let opCode = this.state.code[this.state.programCounter];
                switch (opCode) {
                    case PUSH:
                        this.state.programCounter++;
                        if (this.state.programCounter === this.state.code.length) {
                            throw new Error(`The PUSH instruction cannot be the last`);
                        }
                        this.state.stack.push(this.state.code[this.state.programCounter]);
                        break;
                    case STOP:
                        throw new Error(EXECUTION_COMPLETE);
                    case JMP:
                        this.jump();
                        break;
                    case JMPI:
                        const condition = this.state.stack.pop();
                        if (condition === 1) {
                            this.jump();
                        }
                    case ADD:
                    case SUB:
                    case MUL:
                    case DIV:
                    case LT:
                    case GT:
                    case EQ:
                    case AND:
                    case OR:
                        let aValue = this.state.stack.pop();
                        let bValue = this.state.stack.pop();
                        let result;
                        if (opCode === ADD) result = aValue + bValue;
                        if (opCode === SUB) result = aValue - bValue;
                        if (opCode === DIV) result = aValue / bValue;
                        if (opCode === MUL) result = aValue * bValue;
                        if (opCode === LT) result = aValue < bValue ? 1 : 0;
                        if (opCode === GT) result = aValue > bValue ? 1 : 0;
                        if (opCode === EQ) result = aValue === bValue ? 1 : 0;
                        if (opCode === OR) result = aValue || bValue;
                        if (opCode === AND) result = aValue && bValue;

                        this.state.stack.push(result);
                        break;
                    default:
                        break;
                }
                this.state.programCounter++;
            }
        } catch (e) {
            if (e.message === EXECUTION_COMPLETE) {
                return this.state.stack[this.state.stack.length - 1];
            }
            throw e;
        }

    }
}

Interpreter.OPCODE_MAP = OPCODE_MAP;
module.exports = Interpreter
