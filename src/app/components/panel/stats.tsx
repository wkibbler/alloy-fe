import styles from "./stats.module.css";

interface Stat {
  label: string;
  value: string;
}

interface Props {
  values: Stat[];
}

function Stats({ values }: Props) {
  return (
    <div>
      {values.map((stat) => (
        <div className={`${styles["container"]} px-1`} key={stat.label}>
          <h1>{stat.label}</h1>
          <h1>{stat.value}</h1>
        </div>
      ))}
    </div>
  );
}

export default Stats;
