import React from 'react'
import styles from './cell.module.css'
import { TicTacToe } from '@/TicTacToe';

interface TicTacToeCellProps {
  id: string;
  item: TicTacToe;
  customClass?: string;
  player: 'X' | 'O';
  changePlayer: (player: 'X' | 'O') => void;
  activateParentCell: (cell: TicTacToe) => void;
}

const TicTacToeCell = ({id, customClass, item, player, changePlayer, activateParentCell} : TicTacToeCellProps) => {
  const callBack = () => {
    activateParentCell(item);
    changePlayer(player === 'X' ? 'O' : 'X');
  }
  const handleCellClick = () => {
    console.log("click");
    
    if (item?.getIsActive()) {
      console.log("clickin");
      console.log(item.setValue(player, () => callBack()));
      
      ;
    } else {
      console.log(item.setValue(player, () => callBack()));
    }
  } 
  return (
    <div 
      className={`${styles.item} ${customClass} ${!item?.getIsActive() ?? styles.disabled}`}
      id={id}
      onClick={handleCellClick}
    >
      {item.getValue()}
    </div>
  )
}

export default TicTacToeCell