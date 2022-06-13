export enum ExpressionType {
    Binary = 'BinaryExpression',
    Block = 'BlockExpression',
    FunctionDecleration = 'FunctionDeclerationExpression',
    VariableDecleration = 'VariableDeclerationExpression',
    Call = 'CallExpression',
    Access = 'AccessExpresion'
}

export class Node {}

export class BinaryNode extends Node {}

export class BlockNode extends Node {}

export class FunctionNode extends Node {}

export class VariableNode extends Node {}

export class CallNode extends Node {}

export class AccessNode extends Node {}