import { useEffect, useState } from "react";
import styles from "./Nqueens_problem.module.css";

const N = 6;
const array = Array.from({ length: N }, () => ".");

function isValid(row, col) {
    for (let qcol = 0; qcol < col; qcol++) {
        const qrow = array[qcol];
        if (col === qcol || row === qrow || qrow + qcol === row + col || qrow - qcol === row - col) {
            return false;
        }
    }
    return true;
}

function solve_N_queens(col) {
    if (col === N) {
        return array;
    } else {
        for (let row = 0; row < N; row++) {
            if (isValid(row, col)) {
                array[col] = row;
                const solution = solve_N_queens(col + 1);
                if (solution) return solution;
                array[col] = ".";
            }
        }
        return false;
    }
}

const Nqueens_problem = () => {
    // checking screen size to determine it is desktop or a mobile device
    const breakpoint = 480;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
        const resizeHandler = () => setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    const containerStyle = isMobile ? { maxWidth: "95vw" } : "";

    const gridStyle = isMobile
        ? {
              gridTemplateColumns: `repeat(${N}, minmax(18px, 10vw))`,
              gridTemplateRows: `repeat(${N}, minmax(18px, 10vw))`,
          }
        : {
              gridTemplateColumns: `repeat(${N}, 40px)`,
              gridTemplateRows: `repeat(${N}, 40px)`,
          };

    const cellStyle = isMobile ? { width: "10vw", height: "10vw", borderRadius: 6, border: "1px solid #eee" } : "";

    // Problem : N-queens problem solution
    //! Matrix
    const [matrix, setMatrix] = useState(Array.from({ length: N }, () => Array.from({ length: N }, () => ".")));

    const handleSolveNQueens = () => {
        const solution = solve_N_queens(0);
        if (!solution) return;

        const newMatrix = Array.from({ length: N }, () => Array.from({ length: N }, () => "."));
        for (let col = 0; col < N; col++) {
            const row = solution[col];
            newMatrix[row][col] = "Q";
        }

        setMatrix(newMatrix);
    };

    const handleResetNQueens = () => {
        const newMatrix = Array.from({ length: N }, () => Array.from({ length: N }, () => "."));
        setMatrix(newMatrix);
    };

    return (
        <div className={styles.container} style={isMobile ? containerStyle : undefined}>
            <h2>N-Queens Problem</h2>
            <div className={styles.grid} style={gridStyle}>
                {matrix.map((row, i) =>
                    row.map((val, j) => {
                        return (
                            <div
                                key={`${i}${j}`}
                                id={`cell-${i}-${j}`}
                                style={isMobile ? cellStyle : undefined}
                                className={`${styles.cell} ${val === "Q" && styles.queen}`}
                            >
                                {val}
                            </div>
                        );
                    })
                )}
            </div>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={handleSolveNQueens}>
                    Solve
                </button>
                <button className={styles.button} onClick={handleResetNQueens}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Nqueens_problem;
