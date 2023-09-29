import {useEffect, useState} from "react";
import {handleSubmit, handleSubmitUpdate} from "../../redux/actions/projects";
import simpleToaster from "simple-toaster";
import errorMessages from './errorsMessage.json';
import {loadAllCategories} from "../../redux/actions/categories";
import {loadAllCategoryAge, loadAllGenres} from "../../redux/actions/genres";
import { Col, Form } from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';


const AddProjectMain = (
    {
        history,
        setMovie,
        movie,
        currentMovie,
        loading,
        setLoading}) => {
    const [files,setFiles] = useState([{file: ""}])
    const [categories,setCategories] = useState([])
    const [genres,setGenres] = useState([])
    const [ages,setAges] = useState([])
    const [selected, setSelected] = useState([]);
    const [errorForm,setErrorForm] = useState({
        name: false,
        genres: false,
        categories: false,
        categoryAges:false,
        description: false,
        director: false,
        keyWords: false,
        movieType: false,
        producer: false,
        timing: false,
        trend: false,
        year: false,
    })
    const [data,setData] = useState({
        name: movie.name,
        genres: movie.genres,
        categories: movie.categories,
        categoryAges:movie.categoryAges,
        description: movie.description,
        director: movie.director,
        keyWords: movie.keyWords,
        movieType: movie.movieType,
        producer: movie.producer,
        screenshots: "",
        timing: movie.timing,
        trend: true,
        video: {
            "link": "",
        },
        year: movie.year,
    })

    useEffect(() => {
        loadAllCategories(setCategories)
        loadAllGenres(setGenres)
        loadAllCategoryAge(setAges)
    },[])

    const handleInputChange =(e) => {
        const name=e.target.name;
        const errorExist = e.target.value === "";
        setData({...data, [name]:e.target.value})
        setErrorForm({...errorForm,[name]: errorExist})
    }

    const handleInputChangeWithName =(selected,name) => {
        const errorExist = selected.length === 0;
        setData({...data,[name]: selected})
        setErrorForm({...errorForm,[name]: errorExist})
    }

    const handleBlurWithName = (name) => {
        const errorExist = data[name].length === 0;
        setErrorForm({...errorForm,[name]:errorExist})
    }

    const handleBlur = e => {
        const name = e.target.name;
        const errorExist = e.target.value === "";
        setErrorForm({...errorForm, [name]:errorExist })
        if(name==="year" || name==="timing") {
            if(isNaN(e.target.value) || e.target.value < 0) {
                setData({...data, [name]:""})
                setErrorForm({...errorForm, [name]:true })
            }
        }


    }

    const onSubmit = () => {
        checkRequired()
        let success = Object.keys(errorForm).every((k) => errorForm[k] === false)
        if(success === true) {
            if(currentMovie !== null) {
                handleSubmitUpdate(data,history,setLoading,setMovie,movie)
            }
            else {
                handleSubmit(data,history,setLoading,setMovie)
            }
        }else {
            simpleToaster("error","Заполните обязательные поля")
        }
    }

     function checkRequired() {
        const errors = errorForm;
        setErrorForm({...data})
        if( data.name === "") {
           errors.name = true;
        }
        if(data.movieType === "") {
            errors.movieType = true
        }
        if( data.genres.length === 0) {
            errors.genres = true
        }
        if( data.categoryAges.length === 0) {
            errors.categoryAges = true
        }
        if( data.categories.length === 0) {
            errors.categories = true
        }
        if( data.description === "") {
            errors.description = true
        }
        if( data.director === "") {
            errors.director = true
        }
        if( data.keyWords === "") {
            errors.keyWords = true
        }
        if( data.producer === "") {
            errors.producer = true
        }
        if( data.timing === "") {
            errors.timing = true
        }
        if( data.year === "") {
            errors.year = true
        }

        setErrorForm({...errors})
    }
    useEffect(() => {
    },[errorForm])

    return (
        <div>
            <form>
                <div className="did-floating-label-content">
                    <input
                        type="text"
                        name="name"
                        className={errorForm.name ? "did-floating-input did-floating-error" : "did-floating-input"}
                        id="floatingInput"
                        value={data.name}
                        onBlur={e=>handleBlur(e)}
                        onChange={e=>handleInputChange(e)}
                        placeholder=" " />
                    <label className={errorForm.name ? "did-floating-label did-floating-label-error": "did-floating-label "} htmlFor="floatingInput">Название проекта</label>
                </div>

                <div className="did-floating-label-content">
                    <Typeahead
                        id="basic-example"
                        labelKey="name"
                        multiple
                        autoFocus={false}
                        name="genres"
                        onBlur={() => handleBlurWithName("genres")}
                        onChange={(selected)=>handleInputChangeWithName(selected,"genres")}
                        options={genres}
                        className={errorForm.genres ? "multipleInput errorMultiple" : "multipleInput"}
                        placeholder=""
                        selected={data.genres}
                    />
                    <label className={errorForm.genres ? "did-floating-label-error did-floating-multiple" : "did-floating-multiple"}>Жанры</label>
                </div>
                <div className="did-floating-label-content">
                    <Typeahead
                        id="basic-example"
                        labelKey="name"
                        multiple
                        autoFocus={false}
                        name="categories"
                        onBlur={() => handleBlurWithName("categories")}
                        onChange={(selected)=>handleInputChangeWithName(selected,"categories")}
                        options={categories}
                        className={errorForm.categories ? "multipleInput errorMultiple" : "multipleInput"}
                        placeholder=""
                        selected={data.categories}
                    />
                    <label className={errorForm.categories ? "did-floating-label-error did-floating-multiple" : "did-floating-multiple"}>Категория</label>
                </div>

                <div className="row" >
                    <div className="did-floating-label-content  col">
                        <select
                            as="select"
                            name="movieType"
                            value={data.movieType}
                            onBlur={e=>handleBlur(e)}
                            onChange={e=>handleInputChange(e)}
                            className={errorForm.movieType ? "did-floating-select did-floating-error selectfont" : "did-floating-select selectfont"}>
                            <option></option>
                            <option value={"SERIAL"}>Сериал</option>
                            <option value={"MOVIE"}>Фильм</option>
                        </select>
                        <label className={errorForm.movieType ? "did-floating-label did-floating-label-error": "did-floating-label "} htmlFor="floatingInput">Тип проекта</label>
                    </div>
                    <div className="did-floating-label-content col">
                        <Typeahead
                            id="basic-example"
                            labelKey="name"
                            multiple
                            onBlur={() => handleBlurWithName("categoryAges")}
                            onChange={(selected)=>handleInputChangeWithName(selected,"categoryAges")}
                            options={ages}
                            className={errorForm.categoryAges ? "multipleInput errorMultiple" : "multipleInput"}
                            placeholder=""
                            selected={data.categoryAges}
                        />
                        <label className={errorForm.categoryAges ? "did-floating-label-error did-floating-multiple" : "did-floating-multiple"}>Возрастная категория</label>
                    </div>
                </div>
                <div  className="row field_numbers">
                    <div className="did-floating-label-content  col ">
                        <input
                            type="number"
                            name="year"
                            className={errorForm.year ? "did-floating-input did-floating-error" : "did-floating-input"}
                            value={data.year}
                            placeholder={" "}
                            min={0}
                            step={1}
                            onBlur={e=>handleBlur(e)}
                            onChange={e=>handleInputChange(e)}
                        />
                        <label className={errorForm.year ? "did-floating-label did-floating-label-error": "did-floating-label "} htmlFor="year">Год</label>
                    </div>

                    <div className="did-floating-label-content  col">
                        <input type="number"
                               min="0"
                               name="timing"
                               className={errorForm.timing ? "did-floating-input did-floating-error" : "did-floating-input"}
                               value={data.timing}
                               placeholder={" "}
                               onBlur={e=>handleBlur(e)}
                               onChange={e=>handleInputChange(e)}
                        />
                        <label htmlFor="timing" className={errorForm.timing ? "did-floating-label did-floating-label-error": "did-floating-label "}>Хронометраж(мин)</label>
                    </div>
                </div>
                <div className="did-floating-label-content mb0">
                    <input type="text"
                           name="keyWords"
                           className={errorForm.keyWords ? "did-floating-input did-floating-error" : "did-floating-input"}
                           value={data.keyWords}
                           placeholder={" "}
                           onBlur={e=>handleBlur(e)}
                           onChange={e=>handleInputChange(e)}
                    />
                    <label className={errorForm.keyWords ? "did-floating-label did-floating-label-error": "did-floating-label "} htmlFor="key">Ключевые слова</label>
                </div>
                <div className="did-floating-example-content">
                    <p className="example"> Например: мультфильм, мультсериал</p>
                </div>

                <div className="form-group  ">
                    <textarea
                        name="description"
                        rows="4"
                        className={errorForm.description ? "form-control did-floating-error" : 'form-control'}
                        placeholder="Добавьте описание"
                        value={data.description}
                        onBlur={e=>handleBlur(e)}
                        onChange={e=>handleInputChange(e)}
                        />
                </div>

                <div className="did-floating-label-content ">
                    <input type="text"
                           name="director"
                           className={errorForm.director ? "did-floating-input did-floating-error" : "did-floating-input"}
                           value={data.director}
                           placeholder={" "}
                           onBlur={e=>handleBlur(e)}
                           onChange={e=>handleInputChange(e)}
                    />
                    <label htmlFor="direct" className={errorForm.director ? "did-floating-label did-floating-label-error": "did-floating-label "} >Режиссер</label>
                </div>

                <div className="did-floating-label-content ">
                    <input type="text"
                           name="producer"
                           placeholder={" "}
                           className={errorForm.producer ? "did-floating-input did-floating-error" : "did-floating-input"}
                           value={data.producer}
                           onBlur={e=>handleBlur(e)}
                           onChange={e=>handleInputChange(e)}
                    />
                    <label htmlFor="prod" className={errorForm.producer ? "did-floating-label did-floating-label-error": "did-floating-label "} >Продюсер</label>
                </div>

            </form>
            <div className="d-flex justify-content-end">
                {movie.id !== '' ?
                    <button disabled={loading}  onClick={() => onSubmit()} className="btn formActionBtn primary-button m8">
                        {loading ? "Загрузка.." : "Далее"}
                    </button>
                    :
                    <button disabled={loading}  onClick={() => onSubmit()} className="btn formActionBtn primary-button m8">
                        {loading ? "Загрузка.." : "Далее"}
                    </button>
                }

                <button onClick={() => history.goBack()} className="btn formActionBtn secondary-button">
                    Отмена
                </button>
            </div>
        </div>

    )
}

export default AddProjectMain;