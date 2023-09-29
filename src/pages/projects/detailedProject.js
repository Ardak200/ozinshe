import React,{useEffect, useState} from "react";
import {axiosInstance} from "../../modules/categories";
import YouTube from "react-youtube";
import {useHistory} from "react-router-dom";
import {handleRemove} from "../../redux/actions/projects";

const opts = {
    height:'428',
    width: '760',
}
const DetailedProject = (props) => {
    const history = useHistory();
    const [project,setProject] = useState({
        poster: {
            link: null
        },
        project: {
            video: {
                link: null
            }
        },
        categories: [
            {name: ""}
        ]

    });
    const [loading,setLoading] = useState(true)
    const [seasons,setSeasons] = useState([{number: 1,videos: [{
        link: ""
        }]}])

    const [currentSeria,setCurrentSeria] = useState(1)
    const [currenSeason,setCurrenSeason] = useState(1)
    let thisSeason = [{videos: [{link: ""}]}]
    let videosVL = []
    const [serialLink, setSerialLink] = useState("")

    useEffect(() => {
        if(thisSeason.videos!=null) {
            thisSeason = seasons.find(item => item.number === currenSeason)
            setSerialLink(thisSeason.videos[0].link)
        }
    },[seasons])



    useEffect(() => {
        setLoading(true)
        const {id} = props.match.params;
        if(id !== 'edit' && id !== 'add') {
            axiosInstance.get(`/core/V1/movies/${id}`)
                .then(res=> {
                    setLoading(false)
                    setProject(res.data)
                })
            axiosInstance.get(`/core/V1/seasons/${id}`)
                .then(res=> {
                    setSeasons(res.data)
                })
        }
        },[])


    const onEdit = (id) => {
        history.push(`/projects/edit/${id}`)
        location.reload();
    }

    const changeSeasons =(n) => {
        setCurrenSeason(n+1)
        thisSeason = seasons.find(item => item.number === n+1)
        setSerialLink(thisSeason.videos[0].link)
        setCurrentSeria(1)
        const seasonBlock = document.getElementById('seasonsBlock');

    }
    const changeSerials = (n) => {
        setCurrentSeria(n)
        setSerialLink(videosVL[n-1].link)
    }

    const ProjectDetail = ({project}) => {
        const seasonButtons = []
        const serialButtons = []

            if(project.movieType === "SERIAL") {
                thisSeason = seasons.find(item => item.number === currenSeason)

                if (thisSeason != null) {
                    const thisNumber = thisSeason.number
                    for (let i = 0; i < project.seasonCount; i++) {
                        seasonButtons.push(
                            <button onClick={() => changeSeasons(i)}
                                    className={i + 1 === currenSeason ? "btn seasonbtn active" : "btn seasonbtn"}><p>{i + 1} сезон</p></button>
                        )
                    }


                    videosVL = thisSeason.videos
                    for (let i = 0; i < thisSeason.videos.length; i++) {
                        serialButtons.push(
                            <div onClick={() => changeSerials(videosVL[i].number)}
                                 className={currentSeria === videosVL[i].number ? "ser active-seria" : "ser"}>{videosVL[i].number} серия</div>
                        )
                    }
                }
            }
        return (
            <div className="project_detailed">
                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="project_detailed--name">{project.name}</h5>
                    <div className="project_detailed--buttons d-flex">
                        <button data-id={props.match.params.id} onClick={(()=>onEdit(props.match.params.id))} className=" btn addBtn secondary-button"><p>Редактировать</p></button>
                        <img src={"/img/trashDetail.svg"} data-id={props.match.params.id} onClick={(e) => handleRemove(e,history, setLoading)} />
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <div className="project_detailed--icons">
                    <img src="/img/eye.svg" className="icon-right"/>
                        <p>{project.watchCount}</p>
                    </div>
                    <div className="project_detailed--icons">
                        <img src="/img/star.svg" className="icon-right"/>
                        <p>0</p>
                    </div>
                    <div className="project_detailed--icons">
                        <img src="/img/upload.svg" className="icon-right"/>
                        <p>0</p>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    {project.movieType === 'MOVIE' && <YouTube className="youtube" videoId={project.video.link !== undefined ? project.video.link :  "null"} opts={opts} />}
                    {project.movieType !== 'MOVIE' && seasons.length>0 &&  <YouTube className="youtube" videoId={serialLink} opts={opts} />
                    }
                </div>

                {   project.movieType === "SERIAL"?
                    <div>
                    <div className="project_detailed--seasons d-flex" id="seasonsBlock">
                        {seasonButtons}
                    </div>
                    <div className="project_detailed--serials d-flex" id="selectedSeria">
                        {serialButtons}
                    </div>
                    </div>
                    : <div></div>
                }
                <div className="project_detailed--description ">
                    <h2 className="heading">Описание</h2>
                    <p className="mt32 mb28">{project.description}</p>
                    <div className="project_detailed--authors">
                        <span className="d-flex mb8">Режиссер: <p>{project.director}</p></span>
                        <span className="d-flex mb34">Продюсер: <p>{project.producer}</p></span>
                    </div>
                    <hr/>
                </div>
                <div className="project_detailed--posters ">
                    <h2 className="heading">Скриншоты</h2>
                    <div className="d-flex flex-wrap">
                        {project.screenshots !== undefined && project.screenshots.map(s=> (
                            <div className={"screen-div"}>
                                    <img src={s.link} className="screenshot-img"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const ProjectDetailedSide = ({project}) => {
        return (
            <div className="d-flex flex-column">
                <span><i><img src="/img/clock.svg"/></i> {" " + project.year + " год"}</span>
                <span><i><img className="ganre" src="/img/ganre.svg" /></i>
                    {project.categories.map(c=> (
                        c.name + ","
                    ))}
                </span>
                <span><i><img src="/img/clapper-board.svg" /></i>{project.timing + " мин"} </span>

                {project.poster === null ? <img src="/img/logo.svg" className={"mt-3 sidebar-img"}/> :
                    <img src={ project.poster.link} className={"mt24 sidebar-img"} /> }
                <hr className={"mt32 mb32"}/>
                <div >
                    <div className="d-flex flex-column project_detailed--sidebar--otherinfo">
                        <div className="d-flex align-items-center">
                        <span>Добавил:</span>
                        <p>Админ</p>
                        </div>
                        <div className="d-flex">
                        <span>Дата добавления:</span>
                        <p>4.04.2021, в 21:30</p>
                        </div>
                        <div className="d-flex">
                        <span>Дата обновления:</span>
                        <p>4.04.2021, в 21:30</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {loading === false && project !== [] ?
                <div className="">
                    <div className="detailMainInfo">
                        <ProjectDetail project={project}/>
                    </div>
                    <div className="col-2 project_detailed--sidebar">
                        <ProjectDetailedSide project={project} />
                    </div>
                </div>
                :

                <div></div>}
        </React.Fragment>

    )
}

export default DetailedProject;