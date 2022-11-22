import styles from "./index.module.css";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Link from "next/link";
import HeadContent from "../Component/HeadContent";

const Error500 = () => {
    return (
        <div>
            <HeadContent title='404 - Not Found'/>
            <Header />
            <main className={`${styles.container}`} >
                <h2 style={{ textAlign: 'center' }}>Sorry🙏 500 Error...</h2>
                <p><Link href='/'>Topページに戻る</Link></p>
            </main>
            <Footer />
        </div>
    )
}

export default Error500
