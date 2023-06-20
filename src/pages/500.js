
import Link from "next/link";

import styles from "src/styles/index.module.css";
import Header from "src/Component/Header";
import Footer from "src/Component/Footer";
import HeadContent from "src/Component/HeadContent";

const Error500 = () => {
  return (
    <div>
      <HeadContent title="404 - Not Found" />
      <Header />
      <main className={`${styles.container}`}>
        <h2 style={{ textAlign: "center" }}>Sorry🙏 500 Error...</h2>
        <p>
          <Link href="/">Topページに戻る</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Error500;
