const crypto = require("crypto");
const Table = require("cli-table3");

class GameRules {
  constructor(moves) {
    this.moves = moves;
    this.halfLen = Math.floor(moves.length / 2);
  }

  determineWinner(userMove, computerMove) {
    const userIndex = this.moves.indexOf(userMove);
    const computerIndex = this.moves.indexOf(computerMove);

    if (userIndex === computerIndex) {
      return "Draw";
    } else if (
      (userIndex + this.halfLen) % this.moves.length ===
      computerIndex
    ) {
      return "You win";
    } else {
      return "Computer wins";
    }
  }
}

class KeyGenerator {
  static generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }
}

class HMACGenerator {
  static generateHMAC(key, message) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }
}

class GameTable {
  constructor(moves) {
    this.moves = moves;
  }

  generateTable() {
    const table = new Table({
      head: [" v PC\\User >"].concat(this.moves),
      chars: {
        top: "═",
        "top-mid": "╤",
        "top-left": "╔",
        "top-right": "╗",
        bottom: "═",
        "bottom-mid": "╧",
        "bottom-left": "╚",
        "bottom-right": "╝",
        left: "║",
        "left-mid": "╟",
        mid: "─",
        "mid-mid": "┼",
        right: "║",
        "right-mid": "╢",
        middle: " ",
      },
      style: {
        "padding-left": 0,
        "padding-right": 0,
        "padding-left": 1,
        "padding-right": 1,
        "padding-top": 0,
        "padding-bottom": 0,
        align: "center",
      },
    });

    for (const move of this.moves) {
      const row = [move];
      for (const opponentMove of this.moves) {
        const outcome = this.determineWinner(move, opponentMove);
        row.push(outcome);
      }
      table.push(row);
    }

    return table.toString();
  }

  determineWinner(userMove, opponentMove) {
    const userIndex = this.moves.indexOf(userMove);
    const opponentIndex = this.moves.indexOf(opponentMove);

    if (userIndex === opponentIndex) return "Draw";

    const halfLen = Math.floor(this.moves.length / 2);
    const winningMoves = [];
    for (let i = 0; i < halfLen; i++) {
      winningMoves.push((userIndex + i + 1) % this.moves.length);
    }

    if (winningMoves.includes(opponentIndex)) return "Win";
    return "Lose";
  }
}

function main() {
  const args = process.argv.slice(2);
  if (
    args.length < 3 ||
    args.length % 2 === 0 ||
    new Set(args).size !== args.length
  ) {
    console.log("Incorrect input. Example: node game.js rock paper scissors");
    return;
  }

  const moves = args;
  const gameRules = new GameRules(moves);
  const key = KeyGenerator.generateKey();
  const computerMove = moves[Math.floor(Math.random() * moves.length)];

  console.log("HMAC:", HMACGenerator.generateHMAC(key, computerMove));

  console.log("Available moves:");
  moves.forEach((move, index) => {
    console.log(`${index + 1} - ${move}`);
  });

  console.log("0 - exit");
  console.log("? - help");

  const table = new GameTable(moves);

  process.stdin.on("data", (input) => {
    const userInput = input.toString().trim();

    if (userInput === "?") {
      console.table(table.generateTable());
    } else if (!isNaN(userInput)) {
      const index = parseInt(userInput) - 1;
      if (index === -1) {
        console.log("Exiting the game.");
        process.exit();
      } else if (index >= 0 && index < moves.length) {
        const userMove = moves[index];
        console.log(`Your move: ${userMove}`);
        console.log(`Computer move: ${computerMove}`);
        console.log(gameRules.determineWinner(userMove, computerMove));
        console.log("HMAC key:", key);
        process.exit();
      } else {
        console.log("Invalid input.");
      }
    } else {
      console.log("Invalid input.");
    }
  });
}

main();
