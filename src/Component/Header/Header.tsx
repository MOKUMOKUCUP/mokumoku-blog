import styles from "@/Component/Header/Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link href="/">MOKUMOKU</Link>
      </h1>
      <p className={styles.subheader}>MOKUMOKU CUP 実行委員会</p>
    </header>
  );
};

export default Header;
