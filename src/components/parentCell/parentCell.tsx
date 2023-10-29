import React from 'react'
import styles from "./parentCell.module.css"
import { TicTacToe } from '@/TicTacToe';
import TicTacToeCell from '../cell/cell';

interface TickTackToeParentCellProps {
  id?: string;
  parentCell?: TicTacToe;
  customClass?: string;
  player: 'X' | 'O';
  changePlayer: (player: 'X' | 'O') => void;
}

const TickTackToeParentCell = ({id, customClass, parentCell, player, changePlayer}: TickTackToeParentCellProps) => {
  const board = parentCell?.getBoard();
  // console.log('parentCell.getBoard()',parentCell);
  const activateParentCell = (cell: TicTacToe) => {
    const i = cell.getI();
    const j = cell.getJ();
    console.log("cell","II", i, "JJ", j);
    console.log('parent', "II", cell?.getParentBoard()?.getI(), "JJ", cell?.getParentBoard()?.getJ())
    
    console.log("parentCell", parentCell)
    const nextParentCell = parentCell?.getParentBoard()?.getBoard()?.[i][j];
    const noOfEmptyCellsInNextParentCell = nextParentCell?.getBoard()?.flat()?.filter((cell) => cell.getValue() === '')?.length || 0;
    console.log("nextParentCell", nextParentCell)
    if (nextParentCell?.getValue() === '' || noOfEmptyCellsInNextParentCell > 0) {
      parentCell?.getParentBoard()?.getBoard()?.flat()?.map((cell) => {
        cell.setIsActive(false);
      })
      parentCell?.getParentBoard()?.getValue() === "" && nextParentCell?.setIsActive(true)
    } else{
      parentCell?.getParentBoard()?.getBoard()?.flat()?.map((cell) => {
        cell.setIsActive(true);
      })
      nextParentCell?.setIsActive(false)
    }
  }
  
  return (
    <div className={`${styles.item} ${customClass} ${parentCell?.getIsActive() ? styles.focused : styles.inactive}`} id={id}>
      {board?.map((row, i) => (
        <div className={styles.row} key={i}>
          {row.map((cell, j) => (
            <TicTacToeCell key={j} item={board?.[j][i]} id={cell.getId() + i + j} player={player} changePlayer={changePlayer} activateParentCell={activateParentCell} />
          ))}
        </div>
      ))}
      {!parentCell?.getIsActive() && <div className={styles.blur}></div>}
      {parentCell?.getValue() && <div className={styles.winnerTop}>{parentCell?.getValue()}</div>}
    </div>
  )
}

export default TickTackToeParentCell
