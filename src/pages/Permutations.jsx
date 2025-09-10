import { useState } from "react";
import styles from "./Permutations.module.css";

function removeCharacterAtIndex(inputString, index) {
    if (index < 0 || index >= inputString.length) {
        return inputString;
    }

    const part1 = inputString.slice(0, index);
    const part2 = inputString.slice(index + 1);

    return part1 + part2;
}

const generatePermutations = (s) => {
    if (s.length === 0) {
        return [""];
    }
    const permutations = [];
    for (let i = 0; i < s.length; i++) {
        const new_s = removeCharacterAtIndex(s, i);
        const perms = generatePermutations(new_s);
        for (const perm of perms) {
            permutations.push(s[i] + perm);
        }
    }
    return permutations;
};

const Permutations = () => {
    const [result, setResult] = useState([]);
    const [value, setValue] = useState("");
    const [visibleCount, setVisibleCount] = useState(120);

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    const genPer = (e) => {
        e.preventDefault();
        if (!value.length) {
            return;
        }
        const permutations = generatePermutations(value);
        setResult(permutations);
        setVisibleCount(120); // reset visible count on new result
    };

    const showMore = () => {
        setVisibleCount((v) => Math.min(v + 120, result.length));
    };

    return (
        <div className={styles.container}>
            <form className={styles.formGroup}>
                <h1>Calculate Permutations</h1>
                <label htmlFor="string">Enter a string</label>
                <input
                    type="text"
                    id="string"
                    name="string"
                    value={value}
                    placeholder="e.g., dragon"
                    required
                    onChange={handleInputChange}
                />
                <button onClick={genPer} className={styles.button}>Permutate</button>
            </form>
            <div className={styles.result}>
                <p>Result ({result.length})</p>
                <ArrayDisplay items={result.slice(0, visibleCount)} />
                {visibleCount < result.length && (
                    <button onClick={showMore} className={styles.showMoreBtn}>
                        Show More ({result.length - visibleCount})
                    </button>
                )}
            </div>
        </div>
    );
};

export default Permutations;

const ArrayDisplay = ({ items }) => (
    <ul className={styles.list}>
        {items.map((item, idx) => (
            <li key={idx} className={styles.listItem}>
                {item}
            </li>
        ))}
    </ul>
);
