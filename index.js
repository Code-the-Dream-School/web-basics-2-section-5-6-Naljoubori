//create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons' 
const buttons = document.getElementById('buttons');
buttons.innerHTML = `<button id='new'>New Game</button><button id='reset'>Reset</button>`;
const new_Battleship = () => 
{
  const player1 = {
    player1_Name: prompt(`"Enter first Player name"`),
    shipsCount: 0,
    gameBoard: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
  };
  const player2 = {
    player2_Name: prompt(`Enter second Player name`),
    shipsCount: 0,
    gameBoard: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
  };

  document.getElementById('name_player1').textContent = `${player1.player1_Name}`;
  document.getElementById('name_player2').textContent = `${player2.player2_Name}`;

  const turn = document.getElementById("turn_player");
  turn.textContent = `${player1.player1_Name}`;

  const board_Player1 = document.getElementById('board_player1');
  const board_Player2 = document.getElementById('board_player2');
  

  const addShips = () => {
    while(player1.shipsCount < 4){
      let xpos = Math.floor(Math.random() * 4);
      let ypos = Math.floor(Math.random() * 4);
      if( player1.gameBoard[xpos][ypos] === 0){
        player1.gameBoard[xpos][ypos] = 1;
        player1.shipsCount++
      }
    }
    while( player2.shipsCount !== 4 ){
      const xpos = Math.floor(Math.random() * Math.floor(4)); 
      const ypos = Math.floor(Math.random() * Math.floor(4));
      if( player2.gameBoard[xpos][ypos] === 0){
        player2.gameBoard[xpos][ypos] = 1;
        player2.shipsCount++
      }
    }

    for (var x = 0; x < 4; x++) {
      const li1 = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
      const li2 = document.createElement('li');

        for (var y = 0; y < 4; y++) {
          const cell1 = document.createElement('div');
          const cell2 = document.createElement('div');

          cell1.className = "square"; // adding css properties to make it looks like a square
          cell2.className = "square";
         
          cell1.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
          cell2.textContent = `${x},${y}`;
          
          cell1.value = 0;//state of the cell1

          const pos1 = player1.gameBoard[x][y];
          const pos2 = player2.gameBoard[x][y];

          let lives1 =document.getElementById('ships_player1');
          let lives2 = document.getElementById('ships_player2');    
                  
          lives2.textContent = `${player2.shipsCount}`;
          lives1.textContent = `${player1.shipsCount}`;

          cell1.addEventListener( 'click', (e) => { 
              if(player1.shipsCount !== 0 && player2.shipsCount !== 0)
              {
                if(turn.textContent === `${player2.player2_Name}`) {
                  let cell1 = e.target; 
                  cell1.style.backgroundColor = "purple";
                  turn.textContent = `${player1.player1_Name}`;
                  if(pos1 === 1) {
                    player1.shipsCount--;
                    lives1.textContent = `${player1.shipsCount}`;
                    if(player1.shipsCount == 0) {
                      turn.textContent = `Congratulationes ${player2.player2_Name.toUpperCase()}!! you win!`;
                      alert(`Congratulationes ${player2.player2_Name.toUpperCase()}!! you win!`);
                    }
                  } 
                  cell1.textContent = `${pos1}`;  
                } 
                  else {
                    alert(`It is ${player1.player1_Name}'s turn!`)
                  }
              }
            });

          cell2.addEventListener( 'click', (e) => {
            if(player1.shipsCount !== 0 && player2.shipsCount !== 0) {
              if(turn.textContent === `${player1.player1_Name}`)  {
                let cell2 = e.target;
                cell2.style.background ="purple";
                cell2.textContent = `${pos2}`;
                turn.textContent = `${player2.player2_Name}`;
                if(pos2 === 1) {
                  player2.shipsCount--;
                  lives2.textContent = `${player2.shipsCount}`;
                  if(player2.shipsCount == 0) {
                    turn.textContent = `Congratulationes ${player1.player1_Name.toUpperCase()}!! you win!`;
                    alert(`Congratulationes ${player1.player1_Name.toUpperCase()}!! you win!`);
                  }
                } 
              } 
                else {
                  alert(`It is ${player2.player2_Name}'s turn!`)
                }
            }
              
          });

          li1.appendChild(cell1); //adding each cell into the row number x
          li2.appendChild(cell2);
        }

      board_Player1.appendChild(li1); //adding each row into the board
      board_Player2.appendChild(li2);
    }
  }

  addShips();
  document.getElementById('reset').addEventListener('click', () => {
    board_Player1.innerHTML = '';
    board_Player2.innerHTML = '';
    addShips();
  });
}
new_Battleship ();
document.getElementById('new').addEventListener('click', (e) => {
document.getElementById('board_player1').innerHTML = '';
document.getElementById('board_player2').innerHTML = '';
new_Battleship();
});