import {Fragment, useEffect, useState} from "react";
import {
    handleEditSubmit,
    handleRemove,
    handleSubmit,
    loadMoviesMain,
    loadProjects
} from "../../redux/actions/moviesMain";
import AddMoviesMain from "../../components/moviesMain/AddMoviesMain";
import {sliceText} from "../../defaults/sliceText";

const MoviesMain = () => {
    const [movies,setMovies] = useState([]);
    const [projects,setProjects] = useState([])
    const [item,setItem] = useState({fileId: "", id: "", movieId: "", sortOrder: ""})
    const [show,setShow] = useState(false);
    const [error,setError] = useState("");
    const [files,setFiles] = useState([{file: ""}]);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        loadMoviesMain(setMovies);
        loadProjects(setProjects)
    },[])

    useEffect(() => {
       if(loading === false) {
           loadMoviesMain(setMovies)
       }
    },[loading])

    const handleEdit = (e) => {
        setItem({fileId: "", id: "", movieId: "", sortOrder: ""})
        setFiles([{file: ""}])
        const id = parseInt(e.target.dataset.id)
        const movieItem = movies.filter(x=>x.id ===id)
        setShow(true)
        setItem(movieItem[0])
    }

    const handleShow = () => {setShow(true)}

    const handleClose = () => {
        setShow(false);
        setItem({fileId: "", id: "", movieId: "", sortOrder: ""});
        setError("");
        setFiles([{file: ""}])
    }

    const onClickRemove = e=> {
        handleRemove(e,setMovies);
    }

    return (
        <Fragment>
            <div className="d-flex content-header justify-content-between">
                <h2 className="heading">Проекты на главной <span className="count">{movies.length}</span> </h2>
                <button className="btn addBtn primary-button" data-toggle="modal" data-target="#addCategory" onClick={handleShow}><img src="/img/plus.svg"/><p>Добавить</p></button>
            </div>
            <div className="row d-flex">
                {movies.map(m=> (
                        <div className="movies-main-card-block">
                            <img className="projectmain-banner" src={m.link} />
                            <span className="movies-main-text">{sliceText(m.movie.name,30)}</span>
                            <ul>
                                {m.movie.genres.map(g=>(
                                    <li className="movies-main-text--gray d-inline">{sliceText(g.name, 50)}</li>
                                ))}
                                </ul>

                            <div className="d-flex justify-content-between">
                                <p className="movies-main-text--desc">Проект на главной #{m.sortOrder}</p>
                                <div className="modify ">
                                    <img className="modify-icons img-right" src="/img/pen.svg" data-id={m.id} onClick={e=>handleEdit(e)}/>
                                    <img className="modify-icons" src="/img/delete.svg" data-id={m.id} onClick={e=>onClickRemove(e)}/>
                                </div>
                            </div>
                        </div>
                ))}

            </div>
            <AddMoviesMain
                projects={projects}
                handleClose={handleClose}
                handleEditSubmit={() => handleEditSubmit(setLoading,setError,files,item,handleClose,setItem)}
                handleSubmit={() => handleSubmit(setLoading,setError,files,item,handleClose)}
                item={item}
                setItem={setItem}
                show={show}
                error={error}
                files={files}
                setFiles={setFiles}
                loading={loading}
            />
        </Fragment>

    )
}

export default MoviesMain;
