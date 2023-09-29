import {useHistory} from "react-router-dom";
import useQuery from "../../defaults/useQuery";
import {useEffect, useState} from "react";
import {getMovieById, handleSubmitWithScreen, updateMovieById} from "../../redux/actions/projects";
import {loadAllCategories} from "../../redux/actions/categories";
import {loadAllCategoryAge, loadAllGenres} from "../../redux/actions/genres";
import EditProjectHeader from "../../components/projects/EditProjectHeader";
import EditProjectMain from "../../components/projects/EditProjectMain";
import {axiosInstance} from "../../modules/categories";
import EditVideo from "../../components/projects/EditVideo";
import ScreenShots from "../../components/projects/ScreenShots";
import Dropzone from "../../components/projects/Dropzone";
import FileUpload from "../../components/fileUploader/FileUpload";
import PosterAdd from "../../components/fileUploader/projectAdd/PosterAdd";
import simpleToaster from "simple-toaster";

const EditProject = (props) => {
    const {id} = props.match.params;
    const history = useHistory();
    const query = useQuery();
    const step = query.get("step")
    const [success,setSuccess] = useState(false);
    const [projectName,setProjectName] = useState("")
    const [page,setPage] = useState("main")
    const [categories,setCategories] = useState([])
    const [genres,setGenres] = useState([])
    const [ages,setAges] = useState([])
    const [seasons,setSeasons] = useState([])
    const [loading,setLoading] = useState(false)
    const [currentSeasonList,setCurrentSeasonList] = useState([])
    const [currentSeasonId,setCurrentSeasonId] = useState([])
    const [season, setSeason] = useState(1)
    const [files,
        setFiles] = useState([]);
    const [screens,setScreens] = useState([]);

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



    const [seasonList,setSeasonList] = useState([{
        number:1,
        movieId: parseInt(id),
        videos: [
            {
                number: 1,
                link: ""
            }
        ]
    }])

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

    const handleSubmit = () => {
        checkRequired();
        let success = Object.keys(errorForm).every((k) => errorForm[k] === false);
        if(((movie.poster !== null && movie.poster.deleted === true) || movie.poster === null) && (files.length === 0 || files[0] === [])) {
            simpleToaster("error","Не добавлена 'Обложка'");
        }
        else if(screens.screenshots === 0 && screens.length ===0) {
            simpleToaster("error","Не добавлена 'Скриншоты'");
        }
        else if(success === false) {
            simpleToaster("error","Заполните обязательные поля в блоке 'Основная информация'")
        }
        else {
            updatePoster();
            if(movie.movieType === 'SERIAL') {
                seasonUpdate();
            }
            updateAndSave();
        }

    }

    const updatePoster = () => {
        var formData1 = new FormData();
        var formData2 = new FormData();
        const fileAdd = files.length>0 ? files[0][0] : null
        if(files.length>0) {
            formData1.append("file",files[0][0])
        }
        if(files.length === 0) {
            formData1 = null
        }

        if(screens.length>0) {
            screens[0].map(s=> {
                formData2.append("files", s)
            })
        }
        if(screens.length === 0) {
            formData2 = null;
        }

        movie.screenshots.map(s=> {
            if(s.deleted !== undefined) {
                axiosInstance.delete(`/core/V1/screenshots/${s.id}`)
            }
        })
        if(movie.poster !== null && movie.poster.deleted !== undefined) {
            axiosInstance.delete(`/core/V1/posters/${movie.poster.id}`)
                .then(res=> {
                })
        }

        handleSubmitWithScreen(
            movie,
            setLoading,
            formData1,
            formData2,
            id,
            setSuccess,
        )
    }

    const updateAndSave = () => {
        updateMovieById(movie,id,history,setLoading)
    }


    const seasonUpdate = () => {
        if(seasonList !== currentSeasonList && currentSeasonId.length>0) {
            currentSeasonId.map((c,index)=> {
                axiosInstance.delete(`/core/V1/seasons/${c}`)
                    .then(res=> {
                        if(index+1 === currentSeasonId.length) {
                            seasonList.map(s=> {
                                axiosInstance.post(`/core/V1/seasons`,s)
                                    .then(res=> {
                                    })
                            })

                        }
                    })
            })
        }
        if(currentSeasonId.length === 0){
            seasonList.map(s=> {
                axiosInstance.post(`/core/V1/seasons`,s)
                    .then(res=> {
                    })
            })
        }
    }

    const getSeasons = () => {
        if(movie.movieType === "SERIAL") {
            axiosInstance.get(`/core/V1/seasons/${id}`)
                .then(res=> {
                    if(res.data.length>0) {
                        setSeasonList(res.data)
                        setCurrentSeasonList(res.data)
                        setSeason(res.data.length)
                        const seriaId = []
                        res.data.map(r=> {
                            seriaId.push(r.videos[0].seasonId)
                        })
                        setCurrentSeasonId(seriaId)
                    }
                })
        }
    }

    useEffect(() => {
        getMovieById(setMovie,id,setProjectName)
        loadAllCategories(setCategories)
        loadAllGenres(setGenres)
        loadAllCategoryAge(setAges)
    },[])

    useEffect(() => {
        getSeasons();
    },[movie.movieType])

    const handleClose = () => {
        setSuccess(false);
        history.push("/projects")
    }

    const updateUploadedFiles = (files) =>
        setScreens({ ...screens, files });
    const updateUploadedFiles2 = (files) =>
        setFiles({ ...files, files });

    useEffect(() => {
    },[screens])
    return (
        <div className="project-form">
            <EditProjectHeader
                projectName={projectName}
                history={history}
                page={page}
                setPage={setPage}
            />

            {page === "main" &&
                <EditProjectMain
                    movie={movie}
                    categories={categories}
                    ages={ages}
                    genres={genres}
                    setMovie={setMovie}
                    projectName={projectName}
                    errorForm={errorForm}
                    setErrorForm={setErrorForm}
                    data={data}
                    setData={setData}
                />
            }

            {page === "video" &&
                <EditVideo
                    type={movie.movieType}
                    movie={movie}
                    history={history}
                    setMovie={setMovie}
                    movieId={id}
                    seasonList={seasonList}
                    setSeasonList={setSeasonList}
                    season={season}
                    setSeason={setSeason}
                />
            }
            {page === 'screens'
            &&
            <div>
                <PosterAdd
                    files={files}
                    setFiles={setFiles}
                    setScreens={setScreens}
                    screens={screens}
                    movie={movie}
                    setMovie={setMovie}
                />

            </div>
            }


            <div className="d-flex buttons">
                <button disabled={loading} onClick={() =>handleSubmit()} className="btn primary-button formActionBtn button-right" type="submit">
                    Сохранить
                </button>
                <button onClick={() => history.goBack()} className="btn secondary-button formActionBtn ">
                    Отмена
                </button>

            </div>
        </div>
    )
}

export default EditProject;