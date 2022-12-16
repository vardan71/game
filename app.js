startGame(8, 8, 15);

function startGame(width, height, bombsCount) {
    const field = document.querySelector(".field");
    const callsCount = width * height;
    field.innerHTML = "<button></button>".repeat(callsCount);
    const cells = [...field.children]
    let closedCount = callsCount;
    const bombs = [...Array(callsCount).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, bombsCount);
    field.addEventListener("click", () => {
        if (event.target.tagName !== "BUTTON") return;

        const index = cells.indexOf(event.target);
        const column = index % width;
        const row = Math.floor(index / width);
        open(row, column);
    });

    function isValid(row, column) {
        return row >= 0
            && row < height
            && column >= 0
            && column < width
    }

    function getCount(row, column) {
        let count = 0;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (isBomb(row + y, column + x)) {
                    count++
                }
            }
        }
        return count;
    }

    function open(row, column) {
        if (!isValid(row, column)) {
            return;
        }
        const index = row * width + column;
        const cell = cells[index];
        const count = getCount(row, column);
        if (cell.disabled === true) {
            return;
        }
        cell.disabled = true;
        if (isBomb(row, column)) {
            cell.innerHTML = "X";
            alert("You Lose!!!")
            return;
        }
        closedCount--;
        if (closedCount <= bombsCount) alert("you win");
        if (count !== 0) {
            cell.innerHTML = count;
            return;
        }
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                open(row + y, column + x)
            }
        }
    }

    function isBomb(row, column) {
        if (!isValid(row, column)) return false;
        const index = row * width + column;
        return bombs.includes(index)
    }
}