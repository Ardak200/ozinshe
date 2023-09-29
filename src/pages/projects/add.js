import AddProjectMain from "../../components/projects/AddProjectMain";
import AddVideo from "../../components/projects/AddVideo";
import {useLocation, useHistory} from "react-router-dom";
import Dropzone from "../../components/projects/Dropzone";
import {useEffect, useState} from "react";
import ScreenShots from "../../components/projects/ScreenShots";
import SuccessAdd from "../../components/projects/SuccessAdd";
import withAuth from '../../hoc/withAuth';
import {loadAllCategories} from "../../redux/actions/categories";
import {loadAllCategoryAge, loadAllGenres} from "../../redux/actions/genres";
import cookie from "js-cookie";
import simpleToaster from "simple-toaster";
import {Modal} from "react-bootstrap";
import {getMovieById, handleSubmitWithScreen} from "../../redux/actions/projects";
import useQuery from "../../defaults/useQuery";
const ProjectAdd = () => {
    const history = useHistory();
    const search = useLocation().search;
    const query = useQuery();

    const step = query.get('step');
    const movieIdPath = query.get("movieId");
    const finalStep = step ? parseInt(step) + 1 : 2;
    const [files,
        setFiles] = useState([]);
    const [success,setSuccess] = useState(false);
    const [screens,setScreens] = useState([]);
    const [categories,setCategories] = useState([])
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("")
    const [ages,setAges] = useState([])
    const [genres,setGenres] = useState([])
    const [movie,setMovie] = useState({
        "categories": [
            {
                "fileId": 0,
                "id": "",
                "link": "string",
                "name": "string"
            }
        ],
        "categoryAges": [
            {
                "fileId": 0,
                "id": "",
                "link": "string",
                "name": "string"
            }
        ],
        "video": {
            "link": ""
        },
        "description": "",
        "director": "",
        "genres": [

        ],
        "keyWords": "",
        "movieType": "",
        "name": "",
        "poster": {
            "fileId": 0,
            "id": "",
            "link": "string",
            "movieId": 0
        },
        "producer": "",
        "screenshots": [
            {
                "fileId": 0,
                "id": "",
                "link": "string",
                "movieId": 0
            }
        ],
        "timing": "",
        "trend": true,

        "year": ""
    })
    const [poster,setPoster] = useState("")
    const [screenShots,setScreenShots] = useState([])
    const [projectName,setProjectName] = useState("")
    const movieId = cookie.get("movie-add");
    useEffect(() => {
        loadAllCategories(setCategories)
        loadAllGenres(setGenres)
        loadAllCategoryAge(setAges)

        if(movieId !== undefined) {
            getMovieById(setMovie,movieId,setProjectName);
        }
    },[])

    const handleClose = () => {
        setSuccess(false);
        history.push("/projects")
    }

    const goBack = () => {
        if(step == 3) {
            history.push(`/projects/add?step=${2}&movieId=${movieId}`)
        }

        getMovieById(setMovie,movieId,null)
    }

    const handleSubmitFinalStep = () => {
        if(files.length === 0 || screens.length === 0) {
           simpleToaster("error", "Добавьте обложку или скриншоты")
        } else {
            handleSubmitWithScreen(
                movie,
                setLoading,
                setError,
                files,
                screens,
                setPoster,
                setScreenShots,
                movieId,
                poster,
                screenShots,
                setSuccess,
            )
        }
    }

    const handleShow = () => setSuccess(true);
    return (
        <div className="project-form">
            <div className="backpath heading">
                <i className="fa fa-arrow-left"  onClick={() => history.goBack()}/>
                {/*<img src="/img/arrow-left.svg" onClick={() => history.goBack()}/>*/}
                {!step && 'Основная информация'}
                {step === '2' && 'Видео'}
                {step === '3' && 'Обложка и скриншоты'}
            </div>


            {!step &&
                <AddProjectMain
                    categories={categories}
                    genres={genres}
                    ages={ages}
                    history={history}
                    setMovie={setMovie}
                    movie={movie}
                    currentMovie={movieIdPath}
                />
            }
            {step && step === '2' && <AddVideo type={movie.movieType} movie={movie} movieIdPath={movieIdPath} history={history} setMovie={setMovie} setProjectName={setProjectName}/>}
            {step === '3' &&
                <div>
                    <Dropzone files={files} setFiles={setFiles} show={false}/>
                    <ScreenShots setScreens={setScreens} screens={screens} />
                    <div className="d-flex justify-content-between buttons">
                        <div onClick={() => goBack()}>
                            <button className="btn">Назад</button>
                        </div>
                        <div>
                            <button onClick={() => handleSubmitFinalStep() }  className="btn addBtn">
                                Добавить
                            </button>
                            <button onClick={() => history.goBack()} className="btn">
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            }

            <SuccessAdd show={success} handleClose={handleClose}/>
        </div>
    )
}

export default withAuth(ProjectAdd);