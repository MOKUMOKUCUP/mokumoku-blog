import styles from "Component/ArchiveList.module.css";
import { useEffect, useState } from "react";

const ArchiveList = ({ posts }) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const tempEvents = [];
    posts.map((post) => {
      const event_name = post.properties.event.multi_select[0].name;
      const event_color = post.properties.event.multi_select[0].color;
      if (!tempEvents.some((event) => event.name === event_name)) {
        tempEvents.push({ name: event_name, color: event_color });
      }
    });
    setEvents(tempEvents);
  }, []);
  return (
    <ol className={styles.wrapper}>
      {events.map((event, index) => {
        return (
          <li key={index} className={styles.eventArea}>
            <p>{event.name}</p>
          </li>
        );
      })}
    </ol>
  );
};
export default ArchiveList;
