/* Header of Audify */

import { IoIosArrowDown } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

import './header-styles.scss';


export default function Header() {

    return (

        <>

            <header className='main'>

                <div className='audify-logo'>
                    Audify
                </div>


                <div className='user-section'>
                    <BsPersonCircle />User_Name <IoIosArrowDown className = "arrow-down" />
                </div>


                <form action='' className = "search-bar">
                    <input
                        type='text'
                        value=''
                        placeholder='Search . . .'
                        maxLength='100'
                    />
                    <button type='submit'><IoSearchOutline /></button>
                </form>


                <div className="add-review-section">
                    <button>
                        Add Review
                    </button>
                </div>

            </header>

        </>

    );

}