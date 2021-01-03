// Logic to fill a square.
document.addEventListener("DOMContentLoaded", function () {
  // 0. Create variable with a boolean value to switch players.
  let isX = true;
  let scoreX = 0;
  let scoreO = 0;

  // 1. Obtain all the squares. (return array of elements)
  const squares = document.querySelectorAll('.square');
  // 2. Add click event for each square. (use loop to iterate in the array and add the event)
  for (const square of squares) {
    square.addEventListener('click', () => {
      // 3. Implement if/else to know which class display.
      if (square.getAttribute('data-clicked') == 'true') {
        return;
      }

      if (isX) {
        square.classList.add('bg-x');
      } else {
        square.classList.add('bg-o');
      }
      square.setAttribute('data-clicked', true);

      // 4. Toggle user.
      isX = !isX;

      updatePlayer();
      setTimeout(() => {
        checkForWinner('x');
        checkForWinner('o');
      }, 0);

    });
  }


  function resetGame() {
    for (const square of squares) {
      square.classList.remove('bg-x');
      square.classList.remove('bg-o');

      square.setAttribute('data-clicked', false);

      isX = true;

      updatePlayer();
    }
  }

  document.getElementById('reset-btn').addEventListener('click', resetGame);


  function updatePlayer() {
    const player = document.querySelector('.active-player b');
    player.innerHTML = isX ? 'X' : 'O';
  }

  // 1. Store in a const all possible winning formulas. (array)
  const winningFormulas = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ]

  function checkForWinner(checkFor) {
    // 2. Iterate in the array and use if/else to check for a winner.
    for (const formula of winningFormulas) {
      if (
        document.querySelector('[data-square="' + formula[0] + '"]').classList.contains('bg-' + checkFor) &&
        document.querySelector('[data-square="' + formula[1] + '"]').classList.contains('bg-' + checkFor) &&
        document.querySelector('[data-square="' + formula[2] + '"]').classList.contains('bg-' + checkFor)
      ) {
        // 3. alert with the winner and update score.
        alert('Congrats you have won the game!');
        resetGame();

        if (checkFor == 'o') {
          scoreO += 1;
        } else {
          scoreX += 1;
        }

        document.querySelector('.score-x').innerHTML = scoreX;
        document.querySelector('.score-o').innerHTML = scoreO;
        return;
      }
    };
  }
});