import styles from "../../../app/src/skeleton.module.css";

const Skeleton = ({ classes }) => {
  // 将传入的 classes 字符串拆分成单个词，并映射到 styles 对象中的对应属性
  const classNames = classes
    .split(" ")
    .map((className) => styles[className])
    .join(" ");

  return (
    <div
      className={`${styles.skeleton} ${classNames} ${styles["animate-pulse"]}`}
    ></div>
  );
};

export default Skeleton;
