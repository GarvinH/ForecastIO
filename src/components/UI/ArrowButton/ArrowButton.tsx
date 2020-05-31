import React from 'react'
import { ReactComponent as Arrow } from '../../../assets/Arrow.svg'
import classes from './ArrowButton.module.css'

export enum Direction {
    up,
    down
}

interface Props {
    direction: Direction;
    clicked: (event: React.MouseEvent<HTMLButtonElement>) => void;
    show: boolean;
}

const ArrowButton: React.FC<Props> = ({direction, clicked, show}: Props) => {
    const buttonStyle = [classes.button]
    direction === Direction.up ? buttonStyle.push(classes.up) : buttonStyle.push(classes.down)
    if (!show) {
        buttonStyle.push(classes.hide)
    }

    return (
        <button className={buttonStyle.join(" ")} onClick={clicked}>
            <Arrow className={classes.arrow}/>
        </button>
    )
}

export default ArrowButton