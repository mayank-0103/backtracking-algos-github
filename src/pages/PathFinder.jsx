import { useEffect, useState } from "react";
import styles from "./PathFinder.module.css";

// Using DFS algorithm to find path which is not always the shortest

class Path {
    constructor(matrix) {
        this.matrix = matrix;
        this.m = matrix.length;
        this.n = matrix[0].length;
        this.path = [];
        this.visited;
        this.directions = [
            [0, 1], // right
            [1, 0], // bottom
            [0, -1], // left
            [-1, 0], // top
        ];
    }

    findPath(i = 0, j = 0) {
        if (i >= this.m || j >= this.n || i < 0 || j < 0 || this.matrix[i][j] == 0 || this.visited[i][j]) {
            return false;
        }
        this.path.push([i, j]);
        this.visited[i][j] = 1;
        if (i === this.m - 1 && j === this.n - 1) {
            return true;
        }
        for (const [dx, dy] of this.directions) {
            if (this.findPath(i + dx, j + dy)) {
                return true;
            }
        }
        const rem = this.path.pop(); // as there is no path ahead so remove it immediately
        this.visited[rem[0]][rem[1]] = 0;
        return false;
    }

    getPath() {
        this.path = [];
        this.visited = Array(this.m)
            .fill(0)
            .map(() => Array(this.n).fill(0));
        if (this.findPath()) {
            return this.path;
        } else {
            return []; // No path found
        }
    }
}

const initialMatrix = [
    [1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1],
];

function useMobileStyles(breakpoint = 480) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
        const resizeHandler = () => setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, [breakpoint]);

    return isMobile;
}

const PathFinder = () => {
    const isMobile = useMobileStyles(480);
    const [matrix, setMatrix] = useState(initialMatrix);
    const [highlightCells, setHighlightCells] = useState([]);
    const [result, setResult] = useState(0);

    const handleFindPath = () => {
        const path = new Path(matrix);
        console.log(matrix);
        const finalPath = path.getPath();
        console.log(finalPath);

        setHighlightCells(finalPath);
        if (finalPath.length) {
            setResult(1);
        }
    };

    const changeTypeOfCell = (i, j) => {
        setMatrix((prev) => {
            setHighlightCells([]);
            setResult(0);
            return prev.map((row, rIdx) =>
                i === rIdx ? row.map((cell, cIdx) => (j === cIdx ? (cell === 1 ? 0 : 1) : cell)) : row
            );
        });
    };

    const containerStyle = isMobile ? { maxWidth: "95vw" } : "";

    const gridStyle = isMobile
        ? {
              gridTemplateColumns: `repeat(${initialMatrix[0].length}, minmax(18px, 10vw))`,
              gridTemplateRows: `repeat(${initialMatrix.length}, minmax(18px, 10vw))`,
          }
        : {
              gridTemplateColumns: `repeat(${initialMatrix[0].length}, 40px)`,
              gridTemplateRows: `repeat(${initialMatrix.length}, 40px)`,
          };

    const cellStyle = isMobile ? { width: "10vw", height: "10vw", borderRadius: 6, border: "1px solid #eee" } : "";
    return (
        <div className={styles.container} style={isMobile ? containerStyle : undefined}>
            <h2>Path Finder Visualizer</h2>
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
            <button className={styles.button} onClick={handleFindPath}>
                Find a Path
            </button>
            <div className={styles.result}>
                Path Exists: <b>{result}</b>
            </div>
        </div>
    );
};

export default PathFinder;
