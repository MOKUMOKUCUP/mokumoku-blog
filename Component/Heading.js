import styles from "pages/index.module.css";

const Heading = ({text}) => {
  return <h2 className={`${styles.heading}`}>{text}</h2>;
};

export default Heading;
