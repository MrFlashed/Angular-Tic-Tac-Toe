import { Status } from './gamestatus';

export class Gamelogic {

    gameField: Array<number> = [];

    currentTurn: number;

    gameStatus: Status;

    winSituationsOne: Array<Array<number>> = [

        //Horizontally
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],

        //Vertically
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        
        //diagonally
        [0, 0, 1, 0, 1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        
    ]

    winSituationsTwo: Array<Array<number>> = [

        //Horizontally
        [2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2],

        //Vertically
        [2, 0, 0, 2, 0, 0, 2, 0, 0],
        [0, 2, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 2, 0, 0, 2, 0, 0, 2],
        
        //diagonally
        [0, 0, 2, 0, 2, 0, 2, 0, 0],
        [2, 0, 0, 0, 2, 0, 0, 0, 2],
        
    ]

    public constructor(){
        this.gameStatus = Status.START;
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0,]
        this.currentTurn = this.randomPlayerStart();
    }

    gameStart(): void {
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0,]
        this.currentTurn = this.randomPlayerStart();
        console.log(this.currentTurn);
        this.gameStatus = Status.START;
    }

    randomPlayerStart(): number {
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }

    setField(position: number, value: number): void {
        this.gameField[position] = value;
    }

    getPlayerColorClass():string {
        const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
        return colorClass;
    }

    changePlayer(): void {
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
        
    }

    arrayEquals(a: Array<any>, b: Array<any>): boolean{
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every( (value, index) => value === b[index]);
    }
    
    async checkGameEndWinner(): Promise<boolean>{
        let isWinner = false;

        const checkarray = ( this.currentTurn === 1) ? this.winSituationsOne : this.winSituationsTwo;

        const currentArray = [];

        this.gameField.forEach( (subField, index) => {
            if (subField !== this.currentTurn){
                currentArray[index] = 0;
            } else {
                currentArray[index] = subField;
            }
        });

        checkarray.forEach( (checkfield, checkindex) => {
            if (this.arrayEquals(checkfield, currentArray)){
                isWinner = true;                
            }
        })

        console.log(currentArray);

        if (isWinner){
            this.gameEnd();
            return true;
        }
        else{
            return false;
        }
    }
    
    async checkGameEndFull(): Promise<boolean>{
        let isFull = true;

        if (this.gameField.includes(0) ){
            isFull = false;
        }

        if (isFull){
            this.gameEnd();
            return true;
        }
        else{
            return false;
        }
    }

    gameEnd(): void {
        this.gameStatus = Status.STOP;
    }
}
