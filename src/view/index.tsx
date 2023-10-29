import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Box, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TicTacToeCell, TicTacToeParentCell } from '@/components';
import { TicTacToe } from '@/TicTacToe';
// type valueType = 'X' | 'O' | 'D' | ''

// class TicTacToe {
//   private _id: string = '';
//   private _board: TicTacToe[][] | null = null;
//   private parentBoard: TicTacToe | null = null
//   private _value: valueType = '';
//   private _isActive: boolean = true;
//   private _i: number = 0;
//   private _j: number = 0;
//   private _layer: number = 0;
//   constructor(id: string, layer: number, hasChildBoard: boolean, parentBoard: TicTacToe | null, i: number, j: number) {
//     this._id = id;
//     this.parentBoard = parentBoard;
//     this._i=i;
//     this._j=j;
//     this._layer = layer;
//     this._board = this._layer > 0 ? Array.from({ length: 3 }, (_, i) =>
//       Array.from({ length: 3 }, (_, j) => {
//         const newBoard = new TicTacToe(id= `${this._id}ChildBlock`, layer= this._layer - 1, hasChildBoard=false, parentBoard= this, i=i, j=j);
//         return newBoard;
//       }
//     )) : null
//   }

//   getId() { return this._id; }
//   getBoard() { return this._board; }
//   getValue() { return this._value; }
//   getIsActive() { return this._isActive; }

//   setIsActive(value: boolean) { this._isActive = value; }

//   setValue(value: 'X' | 'O', callBack?: () => void) {
//     if (!this._value && this._isActive) {
//       this._value = value;
//       this._isActive = false;
//       this.evaluate();
//       callBack?.()
//       return {
//         update: "successfull",
//         message: `updated value ${this._value}`
//       }
//     } else if (this._value && this._board && this._board.length > 0) {
//       console.log(this);
      
//       return {
//         update: "failed",
//         message: `can not update value of a board its value update automatically based on its cell value`
//       }
//     } else {
//       console.log(this);
//       return {
//         update: "failed",
//         message: `can not update value ${this._value ? ("because it already has value" + this._value) : "of an inActive cell" }`
//       }
//     }
//   }

//   clearValue(): void { this._value = ''}

//   setMyValue(value: valueType) {
//     this._value = value
//   }

//   evaluate() {
//     if (this?.parentBoard?.getBoard() && this?.parentBoard?.getBoard()?.length) {
//       const matrix = this?.parentBoard?.getBoard();
//       for (let i = 0; i < 3; i++) {
//         // Check rows
//         if (matrix?.[i][0]._value === matrix?.[i][1]._value && matrix?.[i][1]._value === matrix?.[i][2]._value) {
//           if (matrix?.[i][0]._value === 'X') this?.parentBoard?._value ?? this?.parentBoard?.setMyValue('X');
//           if (matrix?.[i][0]._value === 'O') this?.parentBoard?._value ?? this?.parentBoard?.setMyValue('O');
//         }
//         // Check columns
//         if (matrix?.[0][i]._value === matrix?.[1][i]._value && matrix?.[1][i]._value === matrix?.[2][i]._value) {
//           if (matrix?.[0][i]._value === 'X') this?.parentBoard?._value ?? this?.parentBoard?.setMyValue('X');
//           if (matrix?.[0][i]._value === 'O') this?.parentBoard?._value ?? this?.parentBoard?.setMyValue('O');
//         }
//       }
    
//       // Check diagonals
//       if (matrix?.[0][0]._value === matrix?.[1][1]._value && matrix?.[1][1]._value === matrix?.[2][2]._value) {
//         if (matrix?.[0][0]._value === 'X') this?.parentBoard?._value ?? this?.parentBoard?.setMyValue('X');
//         if (matrix?.[0][0]._value === 'O') this?.parentBoard?._value ?? this?.parentBoard?.setMyValue('O');
//       }
//       if (matrix?.[0][2]._value === matrix?.[1][1]._value && matrix?.[1][1]._value === matrix?.[2][0]._value) {
//         if (matrix?.[0][2]._value === 'X') this?.parentBoard?._value ?? this?.parentBoard?.setMyValue('X');
//         if (matrix?.[0][2]._value === 'O') this?.parentBoard?._value ?? this?.parentBoard?.setMyValue('O');
//       }
    
//       // Check for a draw or no outcome
//       const totalMoves = matrix?.flat().filter((cell) => cell._value !== '')?.length || 0;
//       if (totalMoves === 9) {
//         this?.parentBoard?._value ?? this?.parentBoard?.setMyValue('D'); // All cells are filled, it's a draw
//       } else if (totalMoves % 2 === 0) {
//         return;
//       } else {
//         this?.parentBoard?._value ?? this?.parentBoard?.setMyValue('D'); // An odd number of moves, it's a draw (assuming no one has won)
//       }
//     }
//   }
// }


enum GameType {
  NORMAL = 'normal',
  SUPER = 'super',
};

const MainView = () => {
  const theme = useTheme();
  const [gameType, setGameType] = useState<GameType>(GameType.SUPER);
  const [game, setGame] = useState<TicTacToe | null>(null);
  const [player, setPlayer] = useState<'X' | 'O'>('X');
  const XCol = '#05f645';
  const OCol = '#fb1d1d'

  // Game logics
  useEffect(() => {
    if (gameType) {
      // TicTacToe(id: string, hasBoard: boolean, hasChildBoard: boolean, parentBoard: TicTacToe | null, i: number, j: number):
      const newGame = new TicTacToe('parent', 2, true, null, 0, 0)
      console.log(newGame);
      setGame(newGame);
    }
  }, [gameType]);
  const board = game?.getBoard();

  useEffect(() => {
    if (game?.getValue()) {
      game?.getBoard()?.flat()?.map((cell) => {
        cell.setIsActive(false);
      })
    }
  }, [game?.getValue()]);

  // Game logic end

  return (
    <div className={styles.container}>
      <div className={styles.sideContainer} style={{color: XCol}}>X</div>
      <div className={styles.mainContainer} style={{backgroundColor: player === 'X' ?  XCol+"88" : OCol+"88"}}>
        <div className={styles.main} >
          {board?.map((row, i) => {
            
            return (<div className={`${styles.row} row${i}`} key={i}>
              {row.map((cell, j) => {
                return (
                  <TicTacToeParentCell customClass={`col${i+""+j}`} key={j} parentCell={board?.[i][j]}  player={player} changePlayer={setPlayer} />
                )
              })}
            </div>)
          })}
          {game?.getValue() && <div className={styles.winOverLay} style={{color: game?.getValue() === 'X' ? XCol : OCol, backgroundColor: game?.getValue() === 'X' ? XCol+"11" : OCol+"11"}} >{game?.getValue() !== "D" ? `Congrats ${game?.getValue()} Wins!` : "Its a draw!"}</div>}
        </div>
      </div>
      <div className={styles.sideContainer} style={{color: OCol}}>O</div>
    </div>
  )
}

export default MainView;

/**
 * const Grid = <>
  <div className={`${styles.corneredItem} ${styles.item}`} id="1">1</div>
        <div className={`${styles.middleItems} ${styles.item}`} id="2">2</div>
        <div className={`${styles.corneredItem} ${styles.item}`} id="3">3</div>
        <div className={`${styles.middleItems} ${styles.item}`} id="4">4</div>
        <div className={`${styles.centerItem} ${styles.item}`} id="5">5</div>
        <div className={`${styles.middleItems} ${styles.item}`} id="6">6</div>
        <div className={`${styles.corneredItem} ${styles.item}`} id="7">7</div>
        <div className={`${styles.middleItems} ${styles.item}`} id="8">8</div>
        <div className={`${styles.corneredItem} ${styles.item}`} id="9">9</div></>
 * <div className={`${styles.corneredItem} ${styles.item}`} id="1">
          {Grid}
        </div>
        <div className={`${styles.middleItems} ${styles.item}`} id="2">
          {Grid}
        </div>
        <div className={`${styles.corneredItem} ${styles.item}`} id="3">
          {Grid}
        </div>
        <div className={`${styles.middleItems} ${styles.item}`} id="4">
          {Grid}
        </div>
        <div className={`${styles.centerItem} ${styles.item}`} id="5">
          {Grid}
        </div>
        <div className={`${styles.middleItems} ${styles.item}`} id="6">
          {Grid}
        </div>
        <div className={`${styles.corneredItem} ${styles.item}`} id="7">
          {Grid}
        </div>
        <div className={`${styles.middleItems} ${styles.item}`} id="8">
          {Grid}
        </div>
        <div className={`${styles.corneredItem} ${styles.item}`} id="9">
          {Grid}
        </div>
 */
