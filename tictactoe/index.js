import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    if (props.winner){
        var text=<b>{props.value}</b>
    }else{
        var text=props.value
    }
    return(
            <button  className="square" onClick={props.onClick}>
                {text}
            </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        var bolt=false
        if (this.props.winner.indexOf(i)!=-1){
            bolt=true
        }
        return (<Square
            value={this.props.squares[i]}
            onClick={()=>this.props.onClick(i)}
            winner={bolt}
        />);
    }
    adddiv(){
        var Grid_line=[]
        var Grid=[]
        for (var i=0; i<3; i++){
            for(var j=i*3; j<(i+1)*3; j++){
                Grid.push(this.renderSquare(j))
            }
            Grid_line.push(<div className="board-row">{Grid}</div>)
            var Grid=[]
        }
        return(
            Grid_line
        )

    }

    render() {
        return (
            <div>
                {this.adddiv()}
            </div>
        );
    }
}

class Game extends React.Component {
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length -1];
        const squares= current.squares.slice();
        const movestep= this.state.movestep.slice();
        if (calculateWinner(squares)['winner'] || squares[i]){
            return;
        }
        squares[i]= this.state.xIsNext ? 'X': 'O';
        this.setState({
            history: history.concat([{
                squares:squares,
            }]),
            stepNumber:history.length,
            xIsNext: !this.state.xIsNext,
            movestep: movestep.concat([i+1]),
            winner:calculateWinner(squares)['winnerlist']
        });

    }
    constructor(props) {
        super(props);
        this.state ={
            history : [{
                squares : Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext : true,
            movestep: [],
            moveorder:false,
            winner:[]
        }
    }
    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext:(step%2)===0,
            movestep:this.state.movestep.slice(0, step),
            history:this.state.history.slice(0, step+1),
            winner:[]
        });
    }
    moves(){
        let history = this.state.history;
        let movestep = this.state.movestep;
        var rep=[];
        let move= history.map((step, move)=>{
            if (!this.state.moveorder){
                var movesteps = movestep.length? movestep[movestep.length-move]:0;
            }else {
                var movesteps = movestep.length? movestep[move-1]:0;
            }
            let desc = move ?
                'Go to move #' + Math.ceil(movesteps/3) +","+(movesteps?(movesteps%3?movesteps%3:3):0):
                'Go to game start';
            desc = movestep.length?(move===movestep.length?(<b>{desc}</b>):(desc)):<b>{desc}</b>
            rep.push(<li key={move}><button onClick={()=> this.jumpTo(move)}>{desc}</button></li>)
        })
        return(
            rep
        )
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner['winner']){
            status = "Winner: "+ winner['winner'];
        }else if(this.state.history.length==10){
            status = "战平";
        }else{
            status = 'Next player: ' +(this.state.xIsNext? 'X':'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winner={this.state.winner}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                    </div>
                    <div>排序：
                        <button key={1} onClick={() =>this.setState({moveorder:true})}>升序</button>
                        <button key={2} onClick={() =>this.setState({moveorder:false})}>降序</button>
                    </div>
                    <ol>{this.moves()}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(square){
    const lines =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    var rep={'winner':null,'winnerlist':[]}
    for (let i=0; i<lines.length;i++){
        const [a,b,c]=lines[i];
        if (square[a] && square[a] === square[b] && square[a] === square[c]){
            var rep={'winner':square[a],'winnerlist':lines[i]}
            return rep;
        }
    }
    return rep;
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
