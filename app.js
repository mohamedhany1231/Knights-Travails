const horseMoves = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
];
class Tree {
  constructor(root) {
    this.root = root;
  }
}
class Square {
  constructor(x, y, previous = null) {
    this.x = x;
    this.y = y;
    this.previous = previous;
    this.moves = this.computeNextMoves();
  }
  computeNextMoves() {
    let moves = horseMoves.map((elm) => [elm[0] + this.x, elm[1] + this.y]);
    return moves.filter(
      (move) => move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7
    );
  }
  createMoves() {
    this.moves = this.moves.map((move) => new Square(move[0], move[1], this));
    return this.moves;
  }
}

// function createBoard() {
//   let board = [];
//   for (let i = 0; i < 8; i++) {
//     let row = [];
//     for (let j = 0; j < 8; j++) {
//       let cell = "";
//       row.push(cell);
//     }
//     board.push(row);
//   }
//   return board;
// }

function knightMoves(
  starting,
  ending,
  queue = [new Square(...starting)],
  myTree = new Tree(queue[0])
) {
  starting = queue[0];
  if (queue.length == 0) return [];
  //   check if found
  if (starting.x == ending[0] && starting.y == ending[1]) {
    queue = [];
    let outputArr = [[starting.x, starting.y]];
    let count = 0;
    let prev = starting.previous;
    while (prev != null) {
      count++;
      outputArr.unshift([prev.x, prev.y]);
      prev = prev.previous;
    }

    return { outputArr: outputArr, count: count };
  }

  starting.createMoves();
  //    add possible moves to the queue
  starting.moves.forEach((move) => {
    if (
      //   starting.previous != null &&
      (myTree.root == starting ||
        move.x != starting.previous.x ||
        move.y != starting.previous.y) &&
      !queue.some((elm) => elm.x == move.x && elm.y == move.y)
    ) {
      queue.push(move);
    }
  });
  //   remove current from queue
  queue.shift();
  //  recall with same queue , tree
  return knightMoves("", ending, queue, myTree);
}

// recursion not best performance
function knightMovesNoRec(starting, ending) {
  let queue = [new Square(...starting)];
  let myTree = new Tree(queue[0]);

  let current = queue[0];
  while (queue.length > 0) {
    current = queue[0];
    if (current.x == ending[0] && current.y == ending[1]) break;
    else {
      current.createMoves();
      //    add possible moves to the queue
      current.moves.forEach((move) => {
        if (
          myTree.root == current ||
          move.x != current.previous.x ||
          (move.y != current.previous.y &&
            !queue.some((elm) => elm.x == move.x && elm.y == move.y))
        ) {
          queue.push(move);
        }
      });
      //   remove current from queue
      queue.shift();
    }
  }

  let outputArr = [[current.x, current.y]];
  let count = 0;
  let prev = current.previous;
  while (prev != null) {
    count++;
    outputArr.unshift([prev.x, prev.y]);
    prev = prev.previous;
  }

  return { outputArr: outputArr, count: count };
}

// const start = Date.now();

let moves = knightMoves([0, 0], [7, 7]);
console.log("done in", moves.count, " moves");
moves.outputArr.forEach((elm) => {
  console.log(elm);
});
// const end = Date.now();
// console.log(`recursion Execution time: ${end - start} ms`);
// const start2 = Date.now();

let moves2 = knightMovesNoRec([0, 0], [7, 7]);
console.log("done in", moves2.count, " moves");
moves2.outputArr.forEach((elm) => {
  console.log(elm);
});

// const end2 = Date.now();
// console.log(`loop Execution time: ${end2 - start2} ms`);
