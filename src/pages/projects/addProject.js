import {useHistory, useLocation} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {getMovieById, handleSubmit, handleSubmitWithScreen} from "../../redux/actions/projects";
import AddProjectMain from "../../components/projects/AddProjectMain";
import AddVideo from "../../components/projects/AddVideo";
import Dropzone from "../../components/projects/Dropzone";
import ScreenShots from "../../components/projects/ScreenShots";
import simpleToaster from "simple-toaster";
import SuccessAdd from "../../components/projects/SuccessAdd";
import useQuery from "../../defaults/useQuery";
import PosterAdd from "../../components/fileUploader/projectAdd/PosterAdd";
const AddProject = () => {
    const history = useHistory();
    const search = useLocation().search;
    const query = useQuery();
    const step = new URLSearchParams(search).get('step');
    const movieId = query.get("movieId") !== null ? parseInt(query.get("movieId")) : null;
    const [currentStep,setCurrentStep] = useState(step === null ? 1 : step);
    const [currentMovie,setCurrentMovie] = useState(movieId)
    const [files,setFiles] = useState([])
    const [screens,setScreens] = useState([])
    const [loading,setLoading] = useState(false)
    const [success,setSuccess] = useState(false)
    const [movie,setMovie] = useState({
        "categories": [
        ],
        "categoryAges": [
        ],
        "description": "",
        "director": "",
        "genres": [

        ],
        "id": null,
        "keyWords": "",
        "movieType": "",
        "name": "",
        "poster": {
            "fileId": 0,
            "id": 0,
            "link": "",
            "movieId": 0
        },
        "producer": "",
        "screenshots": [

        ],
        "timing": "",
        "trend": true,
        "video": {
            "id": 0,
            "link": "",
            "number": 0,
            "seasonId": 0
        },
        "year": ""
    })


    useEffect(() => {
        if(currentMovie !== null) {
            getMovieById(setMovie,movieId)
        }
    },[])

    const handleSubmitFinalStep = () => {
        var formData1 = new FormData();
        var formData2 = new FormData();
        formData1.append("file",files[0][0]);
        screens[0].map(s=> {
            formData2.append("files", s)
        })

        handleSubmitWithScreen(
            movie,
            setLoading,
            formData1,
            formData2,
            movieId,
            setSuccess,
        )
    }

    const handleClose = () => {
        setSuccess(false);
        history.push("/projects")
    }

    const AddProjectHeader = () => {
        return(
            <div className="backpath heading mb16">
                <img src="/img/backPath.svg" onClick={() => history.goBack()}/>
                {!step && 'Основная информация'}
                {step === '2' && 'Видео'}
                {step=== '3' && 'Обложка и скриншоты'}
            </div>

        )
    }

    const FirstStep = () => {
        return (
            <AddProjectMain
                history={history}
                setMovie={setMovie}
                movie={movie}
                currentMovie={currentMovie}
                loading={loading}
                setLoading={setLoading}
            />
        )
    }

    const SecondStep = () => {
        return(
            <AddVideo type={movie.movieType} movie={movie}  history={history} setMovie={setMovie} movieId={movieId}/>
        )
    }
    return (
        <div>
            <div className="project-form">
                <AddProjectHeader />
                {!step && <FirstStep />}
                {step === '2' && <SecondStep />}
                {step === '3' &&
                <div>
                    <PosterAdd
                        files={files}
                        setFiles={setFiles}
                        screens={screens}
                        setScreens={setScreens}
                        movie={movie}
                        setMovie={setMovie}
                    />
                    <div className="d-flex justify-content-between ">
                        <div onClick={() => history.goBack()}>
                            <button className="btn secondary-button formActionBtn">Назад</button>
                        </div>
                        <div className="d-flex">
                            <button onClick={() => handleSubmitFinalStep() }  className="btn primary-button formActionBtn">
                                Добавить
                            </button>
                            <div>
                            <button onClick={() => history.goBack()} className="btn secondary-button formActionBtn">
                                Отмена
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
            <SuccessAdd show={success} handleClose={handleClose}/>
        </div>
    )
}

export default AddProject