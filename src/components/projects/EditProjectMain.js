import {useEffect, useState} from "react";
import simpleToaster from "simple-toaster";
import errorMessages from './errorsMessage.json';
import {Typeahead} from "react-bootstrap-typeahead";
const EditProjectMain = (
    {
        movie,
        categories,
        genres,
        ages,
        setMovie,
        projectName,
        errorForm,
        setErrorForm,
        data,
        setData
       }) => {
    const [files,setFiles] = useState([{file: ""}])




    useEffect(() => {
        setData({
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
    },[projectName])
    const handleInputChange =(e) => {
        const name=e.target.name;
        const errorExist = e.target.value === "";
        setErrorForm({...errorForm,[name]: errorExist})
        setData({...data, [name]:e.target.value})
        setMovie({...movie, [name]: e.target.value})
    }

    const handleBlur = e => {
        const name = e.target.name;
        const errorExist = e.target.value === "";
        setErrorForm({...errorForm, [name]:errorExist })
    }

    const handleInputChangeWithName =(selected,name) => {
        const errorExist = selected.length === 0;
        setData({...data,[name]: selected})
        setErrorForm({...errorForm,[name]: errorExist})
        setMovie({...movie,[name]:selected})
    }

    const handleBlurWithName = (name) => {
        const errorExist = data[name].length === 0;
        setErrorForm({...errorForm,[name]:errorExist})
    }

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
                            disabled
                            name="movieType"
                            value={data.movieType}
                            onBlur={e=>handleBlur(e)}
                            onChange={e=>handleInputChange(e)}
                            className={errorForm.movieType ? "did-floating-select did-floating-error selectfont" : "did-floating-select selectfont"}>
                            <option></option>
                            <option value={"SERIAL"}>Сериал</option>
                            <option value={"MOVIE"}>Фильм</option>
                        </select>
                        <label className={errorForm.movieType ? "did-floating-multiple did-floating-label-error": "did-floating-multiple "} htmlFor="floatingInput">Тип проекта</label>
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
                            onBlur={e=>handleBlur(e)}
                            onChange={e=>handleInputChange(e)}

                        />
                        <label className={errorForm.year ? "did-floating-label did-floating-label-error": "did-floating-label "} htmlFor="year">Год</label>
                    </div>

                    <div className="did-floating-label-content  col">
                        <input type="number"
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
                <div className="did-floating-label-content ">
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

                <div className="form-group  ">
                    <textarea
                        name="description"
                        rows="4"
                        className={errorForm.description ? "did-floating-error form-control" : 'form-control'}
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
        </div>

    )
}

export default EditProjectMain;