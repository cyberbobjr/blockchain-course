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

class Interpreter {

    constructor() {
        this.state = {
            programCounter: 0,
            stack: [],
            code: []
        };
    }

    jump() {
        const destination = this.state.stack.pop();
        this.state.programCounter = destination;
        this.state.programCounter--;
    }

    runCode(code) {
        this.state.code = [...code];
        try {
            while (this.state.programCounter < this.state.code.length) {
                let opCode = this.state.code[this.state.programCounter];
                switch (opCode) {
                    case PUSH:
                        this.state.programCounter++;
                        this.state.stack.push(this.state.code[this.state.programCounter]);
                        break;
                    case STOP:
                        throw new Error("Smart Contract finished");
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
            return this.state.stack.pop();
        }

    }
}

let code = [PUSH, 2, PUSH, 10, ADD, STOP];
console.log("Result of ADD between 10 and 2 : ", (new Interpreter()).runCode(code));

code = [PUSH, 2, PUSH, 10, DIV, STOP];
console.log("Result of DIV between 10 and 2 : ", (new Interpreter()).runCode(code));

code = [PUSH, 2, PUSH, 10, SUB, STOP];
console.log("Result of SUB between 10 and 2 : ", (new Interpreter()).runCode(code));

code = [PUSH, 2, PUSH, 10, MUL, STOP];
console.log("Result of MUL between 10 and 2 : ", (new Interpreter()).runCode(code));

code = [PUSH, 2, PUSH, 10, GT, STOP];
console.log("Result of GT between 10 and 2 : ", (new Interpreter()).runCode(code));

code = [PUSH, 2, PUSH, 10, LT, STOP];
console.log("Result of LT between 10 and 2 : ", (new Interpreter()).runCode(code));

code = [PUSH, 2, PUSH, 2, EQ, STOP];
console.log("Result of EQ between 2 and 2 : ", (new Interpreter()).runCode(code));

code = [PUSH, 6, JMP, PUSH, 0, JMP, PUSH, "jump successful", STOP]
console.log("Result JMP : ", (new Interpreter()).runCode(code));

code = [PUSH, 8, PUSH, 1, JMPI, PUSH, 0, JMP, PUSH, "jumpi successful", STOP]
console.log("Result JMPI : ", (new Interpreter()).runCode(code));
