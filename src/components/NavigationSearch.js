import {useHistory} from 'react-router-dom';
import React, {useCallback} from 'react';
import cookie from "js-cookie";
import {axiosInstance} from "../modules/categories";
import MoviesMain from "../pages/movies-main";
import {handleRemove} from "../redux/actions/projects";
const NavigationSearch = () => {

    const [searchTerm, setSearchTerm] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])
    const results = [];

    const handleChange = e => {
        setSearchTerm((e.target.value))
    }

    const history = useHistory();
    const handleOnClick = () => {
        cookie.remove("token")
        history.push("/login")
        setTimeout(() => {
            location.reload()
        },1000)
    }

    const handleSubmit = (event) => {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            setSearchTerm(searchTerm)
            // Trigger the button element with a click
            history.push({pathname: "/search-result", search: `?search=${searchTerm}`})        }
    }
    return (
        <div className="d-flex navigation-top justify-content-between align-items-center">
            <div className="navsearch">
            <form>
                <input onKeyDown={e=>handleSubmit(e)} className="form-control " placeholder="Поиск" value={searchTerm} onChange={handleChange}/>
                <img src="/img/search.svg"/>
            </form>
            </div>
            <ul>
                {searchResults.map(item => (
                    <li>{item}</li>
                ))}
            </ul>
            <button onClick={() => handleOnClick()} type="button" className="btn btn-default btn-sm exitbtn"> Выйти <img src="/img/signout.svg" />
            </button>
        </div>

    )
}
export default NavigationSearch;