/* Header of Audify */
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { logOutUser } from "../../database/firebase";
import { Link } from "react-router-dom";

import "./header-styles.scss";

/**
 * Represents the header component.
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onLogout - Function to handle user logout.
 * @param {string} props.username - The username of the current user.
 * @returns {JSX.Element} Header component.
 */
export default function Header({ username }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const search = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`); // Navigate to search route with query
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state as user types
  };


  const logoutHandler = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <>
      <header className="main">
        <Link to={'/home'} className="audify-logo" >
          <img src="/images/AudifyLogo.png" alt="Audify Logo"></img>
          <p>udify</p>
        </Link>

        {/* <a
          className="user-section"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <BsPersonCircle />
          <IoIosArrowDown className="arrow-down" />
        </a> */}

        <Link to={'/account'}>
          <BsPersonCircle />
          {username}
          {/* <IoIosArrowDown className="arrow-down" /> */}

        </Link>

        {openMenu && (
          <div className="flex flex-col dropDownMenu">
            <ul className="flex flex-col gap-4">
              <li onClick={username} className="user-name-list">
                user_name
              </li>
              {/* <li onClick={onLogout}>Log Out</li> */}
            </ul>
          </div>
        )}
        <button type="button" onClick={logoutHandler}>
          Log Out
        </button>

        <form onSubmit={search} className="search-bar">
          <input
            type="text"
            placeholder="Search . . ."
            maxLength="100"
            value={searchQuery}
            onChange={handleInputChange} // Update search query as user types
          />
          <button type="submit">
            <IoSearchOutline />
          </button>
        </form>

        {/* <div className="add-review-section">
          <button>Add Review</button>
        </div> */}
      </header>
    </>
  );
}
