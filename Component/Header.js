import { useEffect, useState } from "react";
import styles from "../pages/index.module.css";
import Link from "next/link";
import { isBrowser, isMobile, isTablet } from "react-device-detect";

const Header = () => {
  const [boxStyle, setBoxStyle] = useState({
    color: "#133D9F",
    fontSize: "2.5rem",
    cursor: "pointer",
    display: "flex",
    gap: "30px",
    justifyContent: "center",
  });

  useEffect(() => {
    if (isMobile) {
      setBoxStyle((state) => ({ ...state, fontSize: "2rem" }));
    } else {
      setBoxStyle((state) => ({
        ...state,
        fontSize: "3rem",
        letterSpacing: "20px",
      }));
    }
  }, []);

  return (
    <header className={styles.header}>
      {isBrowser && !isTablet && (
        <>
          <Link href="/">
            <div style={boxStyle}>
              <span className="box">M</span>
              <span className="box">O</span>
              <span className="box">K</span>
              <span className="box">U</span>
              <span className="box">M</span>
              <span className="box">O</span>
              <span className="box">K</span>
              <span className="box">U</span>
            </div>
          </Link>
          <h3>MOKUMOKU CUP 実行委員会</h3>
        </>
      )}
      {isMobile && (
        <>
          <Link href="/">
            <h1 style={boxStyle}>MOKUMOKU</h1>
          </Link>
          <p style={{ fontSize: ".8rem" }}>MOKUMOKU CUP 実行委員会</p>
        </>
      )}
    </header>
  );
};

export default Header;
