/* Header of Audify */

import { IoIosArrowDown } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

import { Link } from 'react-router-dom';

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
            placeholder="Search . . ."
            maxLength="100"
            onSubmit={search}
          />
          <button type="submit">
            <Link to = '/album'>
              <IoSearchOutline />
            </Link>
          </button>
        </form>

        {/* <div className="add-review-section">
          <button>Add Review</button>
        </div> */}
      </header>
    </>
  );
}
