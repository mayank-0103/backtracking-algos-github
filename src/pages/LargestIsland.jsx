import { useState } from "react";
import styles from "./LargestIsland.module.css";
import { useEffect } from "react";

const initialMatrix = [
    [1, 1, 0, 0, 1],
    [0, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
];

const m = initialMatrix.length;
const n = initialMatrix[0].length;

const directions = [
    [1, 0],
    [1, 1],
    [1, -1],
    [0, 1],
    [0, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1],
];

function findLargestIsland(matrix) {
    const visited = Array(m)
        .fill(0)
        .map(() => Array(n).fill(0));
    let max = 0;
    let cells = [];

    function getCurrIslandSize(arr, i, j) {
        if (i < 0 || j < 0 || i >= m || j >= n) return false;
        if (!matrix[i][j] || visited[i][j]) return false;
        visited[i][j] = 1;
        arr.push([i, j]);
        for (const [dx, dy] of directions) {
            getCurrIslandSize(arr, i + dx, j + dy);
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] && !visited[i][j]) {
                const arr = [];
                getCurrIslandSize(arr, i, j);
                if (arr.length > max) {
                    max = arr.length;
                    cells = arr;
                }
            }
        }
    }
    return { MAX: max, CELLS: cells };
}

function useMobileStyles(breakpoint = 480) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
        const resizeHandler = () => setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, [breakpoint]);

    return isMobile;
}

const LargestIsland = () => {
    const isMobile = useMobileStyles(480);
    const [matrix, setMatrix] = useState(initialMatrix);
    const [highlightCells, setHighlightCells] = useState([]);
    const [result, setResult] = useState(null);

    const handleFindIsland = async () => {
        console.log(matrix);
        const { MAX, CELLS } = findLargestIsland(matrix);
        setHighlightCells(CELLS);
        setResult(MAX);
    };

    const changeTypeOfCell = (i, j) => {
        setMatrix((prev) => {
            setHighlightCells([]);
            setResult(null);
            return prev.map((row, rIdx) => (i === rIdx ? row.map((cell, cIdx) => (j === cIdx ? !cell : cell)) : row));
        });
    };

    const containerStyle = isMobile ? { maxWidth: "95vw" } : "";

    const gridStyle = isMobile
        ? {
              gridTemplateColumns: `repeat(${n}, minmax(18px, 10vw))`,
              gridTemplateRows: `repeat(${m}, minmax(18px, 10vw))`,
          }
        : {
              gridTemplateColumns: `repeat(${n}, 40px)`,
              gridTemplateRows: `repeat(${m}, 40px)`,
          };

    const cellStyle = isMobile ? { width: "10vw", height: "10vw", borderRadius: 6, border: "1px solid #eee" } : "";

    return (
        <div className={styles.container} style={isMobile ? containerStyle : undefined}>
            <h2>Largest Island Finder Visualizer</h2>
            <div className={styles.grid} style={gridStyle}>
                {matrix.map((row, i) =>
                    row.map((val, j) => {
                        const isHighlighted = highlightCells.some(([x, y]) => x === i && y === j);
                        return (
                            <div
                                key={`${i}${j}`}
                                id={`cell-${i}-${j}`}
                                className={`${styles.cell} ${val ? styles.land : styles.water} ${
                                    isHighlighted ? styles.largest : ""
                                }`}
                                style={isMobile ? cellStyle : undefined}
                                onClick={() => changeTypeOfCell(i, j)}
                            >
                                {val ? "L" : "W"}
                            </div>
                        );
                    })
                )}
            </div>
            <button className={styles.button} onClick={handleFindIsland}>
                Find Largest Island
            </button>
            {result != null ? (
                <div className={styles.result}>
                    Largest Island Size: <b>{result}</b>
                </div>
            ) : (
                <div className={styles.result}>Not yet calculated.</div>
            )}
        </div>
    );
};

export default LargestIsland;