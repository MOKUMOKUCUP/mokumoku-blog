import styles from "@/Component/Heading/Heading.module.css";

const Heading = ({ text }) => {
  return <h2 className={`${styles.heading}`}>{text}</h2>;
};

export default Heading;
