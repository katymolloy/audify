/* Header of Audify */
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
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


  return (
    <>
      <header className="main">
        <Link to={'/home'} className="audify-logo" >
          <img src="/images/AudifyLogo.png" alt="Audify Logo"></img>
          <p>udify</p>
        </Link>

        <Link to={'/account'} className="accountIcon">
          <BsPersonCircle />
        </Link>

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

      </header>
    </>
  );
}
