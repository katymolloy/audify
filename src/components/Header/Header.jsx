/* Header of Audify */

import { IoIosArrowDown } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

import "./header-styles.scss";

export default function Header() {
  const search = () => {
    console.log("here");
  };

  return (
    <>
      <header className="main">
        <a className="audify-logo" href="/home">
          <img src="/images/AudifyLogo.png" alt="Audify Logo"></img>
          <p>udify</p>
        </a>

        <a className="user-section" href="/account">
          <BsPersonCircle />
          User_Name <IoIosArrowDown className="arrow-down" />
        </a>

        <form action="" className="search-bar">
          <input
            type="text"
            value=""
            placeholder="Search . . ."
            maxLength="100"
            onChange={search}
          />
          <button type="submit">
            <IoSearchOutline />
          </button>
        </form>

        <div className="add-review-section">
          <button>Add Review</button>
        </div>
      </header>
    </>
  );
}
