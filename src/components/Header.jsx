import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Backtracking Algorithms</h1>
            <Link to="/">
                <img src="/backtrack.png" alt="Home page button"/>
            </Link>
        </div>
    );
};

export default Header;
