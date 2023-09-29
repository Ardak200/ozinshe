import React, {useEffect, useState} from "react";
import cookie from "js-cookie";
import YouTube from "react-youtube";
import {addFilmMovie, addVideoList, getMovieById} from "../../redux/actions/projects";
import simpleToaster from "simple-toaster";

const EditVideo = ({type, movie, history,setMovie,movieId,seasonList,setSeasonList,season,setSeason}) => {
    const opts = {
        height:'200',
        width: '250',
    }


    const videoListBySeasonId = (seasonId) => seasonList.filter(v=>v.number === seasonId)[0].videos;

    const [film,setFilm] = useState(movie.video === null ? '' : movie.video.link)

    const changeFilm = e => {
        if(e.target.value !== movie.video.link) {
            setMovie({...movie,video: {link: e.target.value}})
        }
        setFilm(e.target.value)
    }

    const goBack = () => {
        history.push(`/projects/add?movieId=${movieId}`);
        getMovieById(setMovie,movieId)
    }

    const addSeria = (e) => {
        const seasonId = parseInt(e.target.getAttribute("data-season"))
        const season = seasonList.find(v=>v.number=== seasonId)
        const length = season.videos.length;
        season.videos = [...season.videos, {number: length+1,link: ""}]
        setSeasonList([...seasonList])
    }

    const onChangeValue = (e) => {
        const value = e.target.value
        const seasonId = parseInt(e.target.getAttribute("data-season"))
        const id = parseInt(e.target.getAttribute("data-serial"))
        const season = seasonList.find(v=>v.number == seasonId)
        const videoIndex = season.videos.findIndex(v=> {
            return v.number === id;
        })
        season.videos[videoIndex].link=value
        setSeasonList([...seasonList])
    }

    const onRemoveVideo = e => {
        const seasonId = parseInt(e.target.getAttribute("data-season"));
        const id = parseInt(e.target.getAttribute("data-serial"));
        const filteredSeason = seasonList.find(v=>v.number == seasonId);
        const removedVideo = filteredSeason.videos.filter(v=> {
            return v.number !== id;
        })

        filteredSeason.videos = removedVideo
        filteredSeason.videos !== [] && filteredSeason.videos.map((s,index)=> {
            filteredSeason.videos[index].number = index+1
        })
        if(filteredSeason.videos.length === 0) {
            setSeason(season-1)
            const seasonListVal = seasonList.filter(v=>v.number !== seasonId && v.videos.length !== 0);
            seasonListVal.map((s,index) => {
                s.number = index+1
            })
            setSeasonList([...seasonListVal])
        }else {
            setSeasonList([...seasonList])
        }
    }

    const onAddSeason = () => {
        setSeason(season+1);
        setSeasonList([...seasonList, {number: season+1, movieId: movieId, videos: [{
                number:1,link: ""
            }]}])
    }

    const handleSubmitSeason = () => {
        if(season === 0) {
            simpleToaster("error","Сезон не должен быть пустым")
        }
        else {
            addVideoList(movieId,seasonList,season,movie,history)
        }
    }

    const serialArrays = [];

    for(var i=0;i<season; i++) {
        serialArrays.push(
            <div className="series-list mt16">
                <span className="heading">{i+1} сезон
                </span>
                <div className="form-group">
                    {videoListBySeasonId(parseInt(i+1)).map((v,index)=>(
                        <div className="serial-list-input">
                            <div className="did-floating-label-content mt16">
                                <input data-serial={v.number} data-season={i+1} onChange={e => onChangeValue(e)}
                                       value={v.link} className=" did-floating-input"
                                       type="text"
                                       placeholder={" "}
                                       autoComplete="false"/>
                                <label className="did-floating-label">{v.number + " серия / Youtube Video ID"}</label>
                                {
                                    <img className="trash" src="/img/delete.svg" data-season={i+1} data-serial={v.number} onClick={e=>onRemoveVideo(e)}/>
                                }
                            </div>


                            {v.link !== "" && <YouTube className={"mt16"} videoId={v.link} opts={opts} />}

                        </div>

                    ))}

                </div>
                <span onClick={(e) => addSeria(e)} className="addSeria " data-season={i+1}>Добавить серию</span>

            </div>
        )
    }

    return (
        <div>
            <div className="did-floating-label-content sm-form">
                {type!== 'MOVIE' &&
                <div className={"d-flex justify-content-between"}>
                    <span onClick={()=> onAddSeason()} className="primary-button btn">Добавить сезон ({season})</span>
                </div>
                }
            </div>
            {type !== 'MOVIE' ? serialArrays :
                <div>
                    <div className="did-floating-label-content  ">
                        <input value={film} onChange={e=>changeFilm(e)} type='text' placeholder={" "} className="did-floating-input" />
                        <label className="did-floating-label" htmlFor="floatingInput">Ссылка на фильм / Youtube Video ID</label>
                    </div>
                    {film !== "" && <YouTube className={"mt16"} videoId={film} opts={opts} />}
                </div>
            }
        </div>
    )
}

export default EditVideo;