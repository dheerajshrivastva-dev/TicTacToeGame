type valueType = 'X' | 'O' | 'D' | ''

export class TicTacToe {
  private _id: string = '';
  private _board: TicTacToe[][] | null = null;
  private parentBoard: TicTacToe | null = null
  private _value: valueType = '';
  private _isActive: boolean = true;
  private _i: number = 0;
  private _j: number = 0;
  private _layer: number = 0;
  constructor(id: string, layer: number, hasChildBoard: boolean, parentBoard: TicTacToe | null, i: number, j: number) {
    this._id = id;
    this.parentBoard = parentBoard;
    this._i=i;
    this._j=j;
    this._layer = layer;
    this._board = this._layer > 0 ? Array.from({ length: 3 }, (_, i) =>
      Array.from({ length: 3 }, (_, j) => {
        const newBoard = new TicTacToe(id= `${this._id}ChildBlock`, layer= this._layer - 1, hasChildBoard=false, parentBoard= this, i=i, j=j);
        return newBoard;
      }
    )) : null
  }

  getId() { return this._id; }
  getBoard() { return this._board; }
  getValue() { return this._value; }
  getIsActive() { return this._isActive; }
  getI() { return this._i; }
  getJ() { return this._j; }
  getParentBoard() { return this.parentBoard; }

  setIsActive(value: boolean) { this._isActive = value; }

  setValue(value: 'X' | 'O', callBack?: () => void) {
    if (!this._value && this?.parentBoard?._isActive) {
      this._value = value;
      this._isActive = false;
      this.evaluate();
      callBack?.()
      return {
        update: "successfull",
        message: `updated value ${this._value}`
      }
    } else if (this._value && this._board && this._board.length > 0) {
      console.log(this);
      
      return {
        update: "failed",
        message: `can not update value of a board its value update automatically based on its cell value`
      }
    } else {
      console.log(this);
      return {
        update: "failed",
        message: `can not update value ${this._value ? ("because it already has value" + this._value) : "of an inActive cell" }`
      }
    }
  }

  clearValue(): void { this._value = ''}

  setMyValue(value: valueType) {
    this._value = value
    this?.evaluate();
  }

  evaluate() {
    // console.log("evaluate", this.parentBoard);
    
    const matrix = this?.parentBoard?.getBoard();
    console.log('matrix', matrix);
    
    for (let i = 0; i < 3; i++) {
      // Check rows
      if (matrix?.[i][0]._value === matrix?.[i][1]._value && matrix?.[i][1]._value === matrix?.[i][2]._value) {
        console.log("row check pass ", i, 0)
        if (matrix?.[i][0]._value === 'X') this?.parentBoard?._value === "" && this?.parentBoard?.setMyValue('X');
        if (matrix?.[i][0]._value === 'O') this?.parentBoard?._value === "" && this?.parentBoard?.setMyValue('O');
      }
      // Check columns
      if (matrix?.[0][i]._value === matrix?.[1][i]._value && matrix?.[1][i]._value === matrix?.[2][i]._value) {
        console.log("col check pass ", 0, i)
        if (matrix?.[0][i]._value === 'X') this?.parentBoard?._value === "" && this?.parentBoard?.setMyValue('X');
        if (matrix?.[0][i]._value === 'O') this?.parentBoard?._value === "" && this?.parentBoard?.setMyValue('O');
      }
    }
  
    // Check diagonals
    if (matrix?.[0][0]._value === matrix?.[1][1]._value && matrix?.[1][1]._value === matrix?.[2][2]._value) {
      if (matrix?.[0][0]._value === 'X') this?.parentBoard?._value === "" && this?.parentBoard?.setMyValue('X');
      if (matrix?.[0][0]._value === 'O') this?.parentBoard?._value === "" && this?.parentBoard?.setMyValue('O');
    }
    if (matrix?.[0][2]._value === matrix?.[1][1]._value && matrix?.[1][1]._value === matrix?.[2][0]._value) {
      if (matrix?.[0][2]._value === 'X') this?.parentBoard?._value === "" && this?.parentBoard?.setMyValue('X');
      if (matrix?.[0][2]._value === 'O') this?.parentBoard?._value === "" && this?.parentBoard?.setMyValue('O');
    }
  
    // Check for a draw or no outcome
    const totalMoves = matrix?.flat().filter((cell) => cell._value !== '')?.length || 0;
    if (totalMoves === 9) {
      this?.parentBoard?._value === "" && this?.parentBoard?.setMyValue('D'); // All cells are filled, it's a draw
    } else if (totalMoves % 2 === 0) {
      return;
    }

    console.log("evaluating this?.parentBoard", this?.parentBoard);
  }
}

