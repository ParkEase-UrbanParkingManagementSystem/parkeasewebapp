import styles from "./pmcnavbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.searchcontainer}>
        <input
          type="text"
          placeholder="Search"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className={styles.searchicon}
        />
      </div>
      <div className={styles.user}>
        <div>
          <Image
            className={styles.userimage}
            src="/images/user.jpg"
            width="40"
            height="40"
            alt="User"
          />
        </div>
        <div className={styles.username}>PV</div>
      </div>
    </div>
  );
};

export default Navbar;
