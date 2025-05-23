const gameBoard = document.querySelector('#gameboard');
const playerDisplay = document.querySelector('#player');
const infoDisplay = document.querySelector('#info-display')
const width = 8
let playerGo = 'white'
playerDisplay.textContent = 'white'
const startPieces = [
    rook, knight, bishop, queen, king, bishop,knight,rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop,knight,rook,
]

function createBoard (){
    startPieces.forEach((startPiece,i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable',true)
        square.setAttribute('square-id',i)
        //square.classList.add('beige')
        const row = Math.floor( (63-i) / 8)+1
        if(row % 2 === 0){
            square.classList.add(i%2 === 0 ? "White" : "Black")
        }
        else{
            square.classList.add(i%2 === 0 ? "Black" : "White")
        }

        if( i<= 15 ){
            square.firstChild.firstChild.classList.add('white')
        }
        if( i>= 48 ){
            square.firstChild.firstChild.classList.add('black')
        }
        gameBoard.append(square)
    })
}
createBoard()

const allSquares = document.querySelectorAll('#gameboard .square')

    allSquares.forEach(square =>  {
        square.addEventListener('dragstart',dragStart)
        square.addEventListener('dragover',dragOver)
        square.addEventListener('drop',dragDrop)

    })

    let startPositionId;
    let draggedElement;

    function dragStart (e){
        startPositionId = e.target.parentNode.getAttribute('square-id')
        draggedElement = e.target
    }

    function dragOver (e){
        e.preventDefault()
    }

    function dragDrop(e){
        e.stopPropagation()
        //console.log('playergo' ,playerGo)
        //console.log('e.target' ,e.target)
        const correctGo = draggedElement.firstChild.classList.contains(playerGo)
        const taken = e.target.classList.contains('piece')
        const valid = checkIfValid(e.target)
        const opponentGo = playerGo === 'white' ? 'black' : 'white'
        //console.log(opponentGo)
        const takenByOpponent = e.target.firstChild ?.classList.contains(opponentGo)
            if(correctGo){
                if(takenByOpponent && valid){
                    e.target.parentNode.append(draggedElement)
                    e.target.remove()
                    checkForWin()
                    changePlayer()
                    return
                }
            if(taken && !takenByOpponent){
                infoDisplay.textContent='you cannot go here budddy'
                setTimeout(() => infoDisplay.textContent ="",2000)
                return
            }
            if(valid){
                 e.target.append(draggedElement)
                 checkForWin()
                 changePlayer()
                 return
            }
        } 
    }

    function checkIfValid(target){
        //console.log(target)
        const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
        const startId = Number(startPositionId)
        const piece = draggedElement.id
        console.log('startId',startId)
        console.log('targrtId',targetId)
        console.log('piece',piece)

        switch(piece){
            case 'pawn' :
                const startRow = [8,9,10,11,12,13,14,15]
                if(
                    startRow.includes(startId) && startId + width * 2 === targetId ||
                    startId + width === targetId ||
                    startId + width - 1 === targetId && document.querySelector(`[square-id]="${startId + width - 1}"]`).firstChild ||
                    startId + width + 1 === targetId && document.querySelector(`[square-id]="${startId + width + 1}"]`).firstChild)
                {
                    return true;
                }
                break;
            case 'knight':
                if(
                        startId + width * 2 +1 === targetId ||
                        startId + width * 2 -1 === targetId ||
                        startId + width - 2 === targetId ||
                        startId + width + 2 === targetId ||
                        startId - width * 2 +1 === targetId ||
                        startId - width * 2 -1 === targetId ||
                        startId - width - 2 === targetId ||
                        startId - width + 2 === targetId
                )
                    {
                        return true;
                    }
                    break;
            case 'bishop ':
                if(
                    startId + width + 1 === targetId ||
                    startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild ||
                    startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstchild||
                    startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstchild||
                    startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstchild||
                    startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstchild||
                    startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*6+6}"]`).firstchild||
                    
                    //-
                    startId - width - 1 === targetId ||
                    startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild ||
                    startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstchild||
                    startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstchild||
                    startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstchild||
                    startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstchild||
                    startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*6-6}"]`).firstchild||
                    
                    startId - width + 1 === targetId ||
                    startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild ||
                    startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstchild||
                    startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstchild||
                    startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstchild||
                    startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstchild||
                    startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*6+6}"]`).firstchild||
                    
                    startId + width - 1 === targetId ||
                    startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild ||
                    startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstchild||
                    startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstchild||
                    startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstchild||
                    startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstchild||
                    startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*6-6}"]`).firstchild
                    ){
                        return true;
                    }
                    break;
                case 'rock':
                    if(
                        startId + width == targetId ||
                        startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild ||
                        startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 2}"]`).firstChild ||
                        startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 3}"]`).firstChild ||
                        startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 4}"]`).firstChild ||
                        startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 5}"]`).firstChild ||
                        startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 6}"]`).firstChild||

                        //--
                        startId - width == targetId ||
                        startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild ||
                        startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 2}"]`).firstChild ||
                        startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 3}"]`).firstChild ||
                        startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 4}"]`).firstChild ||
                        startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 5}"]`).firstChild ||
                        startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 6}"]`).firstChild||

                        //--
                        startId + 1 == targetId ||
                        startId + 2 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild ||
                        startId + 3 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 2}"]`).firstChild ||
                        startId + 4 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 3}"]`).firstChild ||
                        startId + 5 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 4}"]`).firstChild ||
                        startId + 6 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 5}"]`).firstChild ||
                        startId + 7 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 5}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 6}"]`).firstChild||

                        startId - 1 == targetId ||
                        startId - 2 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild ||
                        startId - 3 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId- 2}"]`).firstChild ||
                        startId - 4 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId- 3}"]`).firstChild ||
                        startId - 5 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId- 4}"]`).firstChild ||
                        startId - 6 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId- 5}"]`).firstChild ||
                        startId - 7 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId- 5}"]`).firstChild && !document.querySelector(`[square-id="${startId- 6}"]`).firstChild
                    ){
                        return true;
                    }
                    break;
                case 'queen':
                    if(
                        startId + width + 1 === targetId ||
                        startId + width * 2 + 2 && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild ||
                        startId + width * 3 + 3 && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstchild||
                        startId + width * 4 + 4 && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstchild||
                        startId + width * 5 + 5 && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstchild||
                        startId + width * 6 + 6 && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstchild||
                        startId + width * 7 + 7 && !document.querySelector(`[square-id="${startId+width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*6+6}"]`).firstchild||
                        
                        //-
                        startId - width - 1 === targetId ||
                        startId - width * 2 - 2 && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild ||
                        startId - width * 3 - 3 && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstchild||
                        startId - width * 4 - 4 && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstchild||
                        startId - width * 5 - 5 && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstchild||
                        startId - width * 6 - 6 && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstchild||
                        startId - width * 7 - 7 && !document.querySelector(`[square-id="${startId-width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*6-6}"]`).firstchild||
                        
                        startId - width + 1 === targetId ||
                        startId - width * 2 + 2 && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild ||
                        startId - width * 3 + 3 && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstchild||
                        startId - width * 4 + 4 && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstchild||
                        startId - width * 5 + 5 && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstchild||
                        startId - width * 6 + 6 && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstchild||
                        startId - width * 7 + 7 && !document.querySelector(`[square-id="${startId-width+1}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstchild && !document.querySelector(`[square-id="${startId-width*6+6}"]`).firstchild||
                        
                        startId + width - 1 === targetId ||
                        startId + width * 2 - 2 && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild ||
                        startId + width * 3 - 3 && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstchild||
                        startId + width * 4 - 4 && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstchild||
                        startId + width * 5 - 5 && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstchild||
                        startId + width * 6 - 6 && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstchild||
                        startId + width * 7 - 7 && !document.querySelector(`[square-id="${startId+width-1}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstchild && !document.querySelector(`[square-id="${startId+width*6-6}"]`).firstchild||

                        //--
                        startId + width == targetId ||
                        startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild ||
                        startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 2}"]`).firstChild ||
                        startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 3}"]`).firstChild ||
                        startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 4}"]`).firstChild ||
                        startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 5}"]`).firstChild ||
                        startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId+width}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId+width * 6}"]`).firstChild||

                        //--
                        startId - width == targetId ||
                        startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild ||
                        startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 2}"]`).firstChild ||
                        startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 3}"]`).firstChild ||
                        startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 4}"]`).firstChild ||
                        startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 5}"]`).firstChild ||
                        startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId-width}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId-width * 6}"]`).firstChild||

                        //--
                        startId + 1 == targetId ||
                        startId + 2 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild ||
                        startId + 3 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 2}"]`).firstChild ||
                        startId + 4 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 3}"]`).firstChild ||
                        startId + 5 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 4}"]`).firstChild ||
                        startId + 6 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 5}"]`).firstChild ||
                        startId + 7 === targetId && !document.querySelector(`[square-id="${startId+1}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 2}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 3}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 4}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 5}"]`).firstChild && !document.querySelector(`[square-id="${startId+ 6}"]`).firstChild||

                        startId - 1 == targetId ||
                        startId - 2 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild ||
                        startId - 3 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId- 2}"]`).firstChild ||
                        startId - 4 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId- 3}"]`).firstChild ||
                        startId - 5 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId- 4}"]`).firstChild ||
                        startId - 6 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId- 5}"]`).firstChild ||
                        startId - 7 === targetId && !document.querySelector(`[square-id="${startId-1}"]`).firstChild && !document.querySelector(`[square-id="${startId- 2}"]`).firstChild && !document.querySelector(`[square-id="${startId- 3}"]`).firstChild && !document.querySelector(`[square-id="${startId- 4}"]`).firstChild && !document.querySelector(`[square-id="${startId- 5}"]`).firstChild && !document.querySelector(`[square-id="${startId- 6}"]`).firstChild
                    ){
                        return true;
                    }
                    break;
                    case 'king':
                        if(
                            startId+1 === targetId||
                            startId-1 === targetId||
                            startId+width === targetId||
                            startId-width === targetId||
                            startId+width-1===targetId||
                            startId+width+1===targetId||
                            startId-width-1===targetId||
                            startId-width+1===targetId
                        ){
                            return true
                        }
        }
    }
    function changePlayer(){  
        if(playerGo == 'white'){
            reverseIds()
            playerGo ='black'
            playerDisplay.textContent = 'black'
        }else{
            revertIds()
            playerGo = 'white'
            playerDisplay.textContent='white'
        }
    }

    function reverseIds(){
        const allsquares = document.querySelectorAll(".square")
        allsquares.forEach((square,i) => 
            square.setAttribute('square-id',(width * width - 1) - i))

    }

    function revertIds(){
        const allsquares = document.querySelectorAll(".square")
        allsquares.forEach((square,i) => 
            square.setAttribute('square-id',i))

    }

    function checkForWin(){
        const kings = Array.from(document.querySelectorAll('#king'))
        console.log(kings)
        if(!kings.some(king => king.firstChild.classList.contains('white'))){
            infoDisplay.innerHTML = "Black Player Wins!"
            const allSquares = document.querySelectorAll('.square')
            allSquares.forEach(square => square.firstChild?.setAttribute('draggable',false))
        }
        if(!kings.some(king => king.firstChild.classList.contains('black'))){
            infoDisplay.innerHTML = "White Player Wins!"
            const allSquares = document.querySelectorAll('.square')
            allSquares.forEach(square => square.firstChild?.setAttribute('draggable',false))
        }
    }