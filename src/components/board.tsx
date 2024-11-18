"use client";

import { useState } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";

type MoveInput = { from: string; to: string; promotion?: string };

export default function Board() {
    const [game, setGame] = useState<Chess>(new Chess());

    function makeAMove(move: MoveInput){
        let result;
        try {
            const gameCopy = new Chess(game.fen());
            result = gameCopy.move(move);
            if (result) {
                setGame(gameCopy);
            }
            
        } catch (e) {
            console.log(e);
        }
        return result;
    }
    
    function onDrop(sourceSquare: Square, targetSquare: Square) {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        });

        if (move === null) return false;
        return true;
    }
    
    return (
        <div>
            <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        </div>
    );
}