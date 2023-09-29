import AddProjectMain from "../../components/projects/AddProjectMain";
import AddVideo from "../../components/projects/AddVideo";
import {useLocation, useHistory} from "react-router-dom";
import Dropzone from "../../components/projects/Dropzone";
import {useEffect, useState} from "react";
import ScreenShots from "../../components/projects/ScreenShots";
import SuccessAdd from "../../components/projects/SuccessAdd";
import withAuth from '../../hoc/withAuth';
import {Tab, Tabs} from "react-bootstrap";
import {addMoviePoster, getMovieById, removeScreenShots, updateMovieById} from "../../redux/actions/projects";
import EditProjectMain from "../../components/projects/EditProjectMain";
import {loadAllCategories} from "../../redux/actions/categories";
import {loadAllCategoryAge, loadAllGenres} from "../../redux/actions/genres";
import EditVideo from "../../components/projects/EditVideo";
import { pathToFile } from 'image-to-file-converter'
import simpleToaster from 'simple-toaster';
import {axiosInstance} from "../../modules/categories";
import FileUpload from "../../components/fileUploader/FileUpload";

const ProjectEdit = (props) => {
    const {id} = props.match.params;
    const removedScreens = [];
    const history = useHistory();
    const search = useLocation().search;
    const step = new URLSearchParams(search).get('step');

    const [sucess,setSuccess] = useState(false);
    const [projectName,setProjectName] = useState("")
    const [screens,setScreens] = useState([]);
    const [page,setPage] = useState('main')
    const [categories,setCategories] = useState([])
    const [genres,setGenres] = useState([])
    const [ages,setAges] = useState([])
    const [movieLoad, setMovieLoad] = useState(false)
    const [oblozhka,setOblozhka] = useState(false)
    const [loading,setLoading] = useState(false)
    const [screenShots,setScreenShots] = useState(false)
    const [activeTab,setActiveTab] = useState("main")

    const [movie,setMovie] = useState({
        "categories": [
            {
                "fileId": 0,
                "id": 0,
                "link": "string",
                "name": "string"
            }
        ],
        "categoryAges": [
            {
                "fileId": 0,
                "id": 0,
                "link": "string",
                "name": "string"
            }
        ],
        "description": "string",
        "director": "string",
        "genres": [
            {
                "fileId": 0,
                "id": 0,
                "link": "string",
                "name": "string"
            }
        ],
        "id": 0,
        "keyWords": "string",
        "movieType": "MOVIE",
        "name": "string",
        "poster": {
            "fileId": 0,
            "id": 0,
            "link": "string",
            "movieId": 0
        },
        "producer": "string",
        "screenshots": [
            {
                "fileId": 0,
                "id": 0,
                "link": "string",
                "movieId": 0
            }
        ],
        "timing": 0,
        "trend": true,
        "video": {
            "id": 0,
            "link": "string",
            "number": 0,
            "seasonId": 0
        },
        "year": 0
    })

    const [files,
        setFiles] = useState([]);


    useEffect(() => {
    },[files])

    useEffect(() => {
        getMovieById(setMovie,id,setProjectName)
        loadAllCategories(setCategories)
        loadAllGenres(setGenres)
        loadAllCategoryAge(setAges)
    },[])

    useEffect(() => {
        setMovieLoad(true)
    },[movie])
    const FileAdd = () => {
        return (
            <div>
                <Dropzone setFiles={setFiles} files={files} />
                <ScreenShots setScreens={setScreens} screens={screens} />
            </div>
        )
    }

    const handleClose = () => {
        setSuccess(false);
        history.push("/projects")
    }

    const posterRemove = (e) => {
        const id = parseInt(e.target.dataset.id);
        setMovie({...movie, poster: {
                link: ""
            }})
        axiosInstance.delete(`/core/V1/posters/${id}`)
            .then(res=> {
            })
        setOblozhka(true)
    }

    const screenShotRemove = (e) => {
        const id = parseInt(e.target.dataset.id);
        removedScreens.push(id);

        let screenShotElems = movie.screenshots.filter(s=> {
            return parseInt(s.id) !== parseInt(id)
        })
        axiosInstance.delete(`/core/V1/screenshots/${id}`)
            .then(res=> {
            })

        setMovie({...movie, screenshots: screenShotElems})
    }

    const updateAndSave = () => {
        if((movie.poster === null || movie.poster.link === '') && files === []) {
            simpleToaster("error", "Загрузите обложку")
        }
        if(files.length>0) {
            var formData1 = new FormData();
            formData1.append("file", files[0].file);
            axiosInstance.post(`/core/V1/files/upload`, formData1, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            })
                .then(res=> {
                    addMoviePoster(movie,id,res.data.id)
                })
        } else {
            updateMovieById(movie,id,history,setLoading, files,screens,)
        }

    }

    const uploadScreens = files => {
        setScreens({...screens,files})
    }
    return (
        <div>
            {movieLoad === false && 'Загрузка'}
            {movieLoad === true &&  <div className="project-form">
                <div className="backpath heading">
                    <i className="fa fa-arrow-left"  onClick={() => history.goBack()}/>
                    Редактировать "{projectName}"
                </div>
                <div className="tab-sheet">
                    <div onClick={e=>setPage(e.target.dataset.id)} className={`tab ${page === 'main' && "tab-active"}`} data-id={"main"}>
                        Основная информация
                    </div>
                    <div onClick={e=>setPage(e.target.dataset.id)} className={`tab ${page === 'video' && "tab-active"}`} data-id={"video"}>
                        Видео
                    </div>
                    <div onClick={e=>setPage(e.target.dataset.id)} className={`tab ${page === 'screens' && "tab-active"}`} data-id={"screens"}>
                        Обложка и скриншоты
                    </div>
                </div>
                {movieLoad === true && page === 'main'
                    &&
                    <EditProjectMain
                        movie={movie}
                        categories={categories}
                        ages={ages}
                        genres={genres}
                        setMovie={setMovie}
                        projectName={projectName}
                    />}

                { page === 'video'
                    &&
                    <EditVideo
                        movie={movie}
                        setMovie={setMovie}
                        type={movie.movieType}
                    />}

                {page === 'screens'
                    &&
                    <div>
                        {oblozhka === false && movie.poster !== null?
                            <div className="text-center">
                                <h2>Обложка</h2>
                                <div className="d-flex justify-content-center">
                                    <div className="oblozhka">
                                        <i onClick={e=>posterRemove(e)} data-id={movie.poster.id} className="fa fa-trash"></i>
                                        <img data-id ={movie.poster.id} src={movie.poster.link} />
                                    </div>
                                </div>

                            </div>:
                            <Dropzone files={files} setFiles={setFiles} show={false}/>
                        }

                        <ScreenShots setScreens={setScreens} screens={screens} />
                        <div className="d-flex justify-content-between flex-wrap">
                            {movie.screenshots.map(s=> (
                                <div className="oblozhka mt-3">
                                    {/*<span onClick={() => posterRemove()}>x</span>*/}
                                    <i onClick={e=>screenShotRemove(e)} className="d-flex justify-content-center" data-id={s.id} className="fa fa-trash"></i>
                                    <img data-id ={s.id} src={s.link} />
                                </div>
                            ))}
                        </div>

                    </div>
                }

                {/*{ page === 'screens' && <FileAdd />}*/}

                <div className="d-flex buttons">
                        <button disabled={loading} onClick={() =>updateAndSave()} className="btn addBtn primary-button button-right" type="submit">
                            <p>Сохранить</p>
                        </button>
                        <button onClick={() => history.goBack()} className="btn secondary-button otmenabtn">
                            <p>Отмена</p>
                        </button>

                </div>
                <SuccessAdd show={sucess} handleClose={handleClose}/>
            </div>}

        </div>
    )
}

export default (ProjectEdit);
