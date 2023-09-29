import {axiosInstance} from "../../modules/categories";
import swal from "sweetalert2";
import simpleToaster from "simple-toaster";
import cookie from "js-cookie";
import add from "../../pages/projects/add";

export const handleSubmitUpdate = (data,history,setLoading,setMovie,movie) => {
    setLoading(true)
    let movieVal = movie
    movieVal.categories = data.categories
    movieVal.categoryAges=data.categoryAges
    movieVal.description = data.description
    movieVal.genres = data.genres;
    movieVal.movieType = data.movieType;
    movieVal.keyWords = data.keyWords;
    movieVal.timing = data.timing;
    movieVal.producer = data.producer
    movieVal.director = data.director;
    movieVal.name=data.name;
    movieVal.year=data.year;
    axiosInstance.put(`/core/V1/movies/${movie.id}`, movieVal)
        .then(res=> {
            setLoading(false)
            history.push(`/projects/add?step=2&movieId=${res.data.id}`)
            setMovie(res.data)
            cookie.set("movie-add", res.data.id);
            cookie.set("step",2);
        })

}
export const handleSubmit = (data, history, setLoading,setMovie) => {
    setLoading(true)
    axiosInstance.post("/core/V1/movies", {
        "categories": data.categories,
        "categoryAges": data.categoryAges,
        "description": data.description,
        "director": data.director,
        "genres": data.genres,
        "id": 0,
        "keyWords": data.keyWords,
        "movieType": data.movieType,
        "name": data.name,
        "poster": {
            "fileId": 1,
            "id": 0,
            "link": "string",
            "movieId": 0
        },
        "producer": data.producer,
        "screenshots": [
            {
                "fileId": 0,
                "id": 0,
                "link": "string",
                "movieId": 0
            }
        ],
        "timing": data.timing,
        "trend": data.trend,
        "video": {
            "id": 0,
            "link": "string",
            "number": 0,
            "seasonId": 0
        },
        "year": data.year
    })
        .then(res=> {
            history.push(`/projects/add?movieId=${res.data.id}`)
            setTimeout(() => {
                setLoading(false)
                history.push(`/projects/add?step=2&movieId=${res.data.id}`)
                setMovie(res.data)
            },1000)
        })
        .catch(err=> {
            setLoading(false)
        })
}

const onRemove = async (id,history,setLoading) => {
    setLoading(true)
    await axiosInstance.delete(`/core/V1/movies/${id}`, {})
        .then(res => {
            setLoading(false)
            simpleToaster("success", "Успешно удален");
            if(history != null) {
                history.push("/projects")
            }
        })
        .catch(res => {
            simpleToaster("error","Что то пошло не так")
        })
}

export const handleRemove = (e,history,setLoading) => {
    const id =parseInt(e.target.dataset.id)

    new swal({
        title: 'Удалить проект?',
        text: "Вы действительно хотите удалить проект?",
        showCancelButton: true,
        confirmButtonText: 'Да, удалить',
        cancelButtonText: 'Отмена',
        buttonsStyling: false,
        showCloseButton: true,

    }).then( function (dismiss) {
            if(dismiss.dismiss === undefined){
                onRemove(id,history,setLoading)
            }
            else{
                return
            }
        }
    )
}

export const getMovieById = (setMovie, movieId,setProjectName) => {
    axiosInstance.get(`/core/V1/movies/${movieId}`)
        .then(res=> {
            setMovie(res.data)
            setProjectName != null && setProjectName(res.data.name);
        })
        .catch({

        })
}

export const addMoviePoster = (movie, id, poster) => {
    axiosInstance.post(`/core/V1/posters`, {
        fileId: parseInt(poster),
        movieId: parseInt(id)
    })
        .then(res=> {
        })
}

const addMovieScreenShots = (movie,id,screenShots) => {
    let screenShotsVal = []
    screenShots.map(s=> {
        screenShotsVal.push({
            movieId: parseInt(id),
            fileId: parseInt(s.id)
        })
    })

        axiosInstance.post(`/core/V1/screenshots`, screenShotsVal )
            .then(res=> {

            })


}

export const handleSubmitWithScreen = (movie,setLoading,formData1,formData2,movieId,setSuccess) => {
    setLoading(true)
    if(formData1 !== null) {
        axiosInstance.post(`/core/V1/files/upload`, formData1, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        })
            .then(res=> {
                addMoviePoster(movie,movieId,res.data.id)
                })

    }

    if(formData2 !== null) {
        axiosInstance.post("/core/V1/files/upload/multi", formData2, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        })
            .then(res=> {
                addMovieScreenShots(movie,movieId,res.data)
                setSuccess(true)
            })
    }

}

const videoListBySeasonId = (seasonId,videoList) => videoList.filter(v=>v.seasonId === seasonId);


export const addVideoList = (movieId,videoList, season, movie,history) => {
    videoList.map((v,index)=> {
        let isLastElement = index+1 === videoList.length
        seasonControllerAdd(v,history,movieId,isLastElement)
    })
    addFilmMovie(movie,videoList[0].link,movieId,history);
}

const seasonControllerAdd = (videoList,history,movieId,isLastElement) => {
    axiosInstance.post(`/core/V1/seasons`, videoList)
        .then(res=> {
            simpleToaster("success", `Успешно добавлен ${videoList.number} сезон`)
            if(isLastElement) {
                history.push(`/projects/add?step=3&movieId=${movieId}`)
            }

        })
        .catch(err=> {
            simpleToaster("error", `Ошибка при добавление ${videoList.number} сезон`)
            if(isLastElement) {
                history.push(`/projects/add?step=3&movieId=${movieId}`)
            }
        })
}

export const addFilmMovie = (movie, film, movieId, history) => {
    let movieVal = movie;
    movieVal.video= {link: film,number:0,seasonId:0}
    axiosInstance.put(`/core/V1/movies/${movieId}`, movieVal)
        .then(res=> {
            history.push(`/projects/add?step=3&movieId=${movieId}`)
        })
}

const getMovieIdData = (movieId) => {
    let result = {}
    axiosInstance.get(`/core/V1/movies/${movieId}`)
        .then(res=> {
            let result = res.data
        })
        .catch(err=> {
            result = {}
        })
    return result
}

export const deleteVideo = (id) => {
    axiosInstance.delete(`/core/V1/videos/${id}`)
        .then(res=> {
            simpleToaster("success", "Текущее видео удален")
        })
}

export const removeScreenShots = (id) => {
    axiosInstance.delete(`/core/V1/screenshots/${id}`)
        .then(res=> {

        })
}

export const updateMovieById = (movie,movieId, history,setLoading) => {
    setLoading(true)
    let result = {}
    axiosInstance.put(`/core/V1/movies/${movieId}`, movie)
        .then(res=> {
            history.push("/projects")
            setLoading(false)
            simpleToaster("success", "Успешно обновлен")
        })
    // axiosInstance.get(`/core/V1/movies/${movieId}`)
        // .then(res=> {
        //     let result = res.data
        //     if(movie.movieType=='MOVIE') {
        //         if(result !== {}) {
        //             if(result.video.link != movie.video.link) {
        //                 deleteVideo(result.video.id)
        //             }
        //         }
        //
        //     }
        // })
        // .catch(err=> {
        //     let result = {}
        // })
}

export const getSearchResult = (searchTerm, setSearchResults) => {
    axiosInstance.get("core/V1/movies/search",{
        params: {
            search: searchTerm
        }
    })
        .then(res => {
            setSearchResults(res.data)
        })
        .catch(err=> {

        })
}
