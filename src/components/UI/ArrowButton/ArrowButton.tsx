import React from 'react'
import { ReactComponent as Arrow } from '../../../assets/Arrow.svg'
import classes from './ArrowButton.module.css'

export enum Direction {
    up,
    down
}

interface Props {
    direction: Direction;
    clicked?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ArrowButton: React.FC<Props> = ({direction, clicked}: Props) => {
    const buttonStyle = [classes.button]
    direction === Direction.up ? buttonStyle.push(classes.up) : buttonStyle.push(classes.down)

    return (
        <button className={buttonStyle.join(" ")} onClick={clicked}>
            <Arrow className={classes.arrow}/>
        </button>
    )
}

export default ArrowButton