import {axiosInstance} from "../../modules/categories";
import simpleToaster from "simple-toaster";
import swal from "sweetalert2";
import {deleteFile} from "./files";

export const loadMoviesMain = (setMovies) => {
    axiosInstance.get("/core/V1/movies_main")
        .then(res=> {
            setMovies(res.data)
        })
        .catch(err=> {

        })
}

export const loadProjects = (setProjects) => {
    axiosInstance.get("/core/V1/movies")
        .then(res=> {
            setProjects(res.data)
        })
        .catch(err=> {

        })
}

const addProject = (fileId,item,setLoading,handleClose) => {
    axiosInstance.post("/core/V1/movies_main", {
        fileId: fileId,
        movieId: item.movieId,
        sortOrder: item.sortOrder,
        // link: "http://api.ozinshe.com/core/public/V1/show/483"
    })
        .then(res=> {
            setLoading(false)
            simpleToaster("success", "Успешно добавлен")
            handleClose();
        })
        .catch(err=> {
            setLoading(false)
            handleClose();
        })
}

export const handleSubmit = (setLoading, setError, files, item, handleClose) => {
    setError("")
    var formData = new FormData();
    formData.append("file", files[0][0])
    if(item.name === '' && item.sortOrder === '') {
        setError("Заполните поле")
    } else {
        setLoading(true)
        axiosInstance.post(`/core/V1/files/upload`, formData, {
            headers: {
                "Content-type" : "multipart/form-data"
            }
        })
            .then(res=> {
                const fileId=res.data.id
                addProject(fileId,item, setLoading, handleClose);
            })
            .catch(err=> {
                simpleToaster("error", "Добавьте картинку")
                setLoading(false)
            })
    }
}

const onRemove = async (id,setMovies) => {
    await axiosInstance.delete(`/core/V1/movies_main/${id}`, {})
        .then(res => {
            simpleToaster("success", "Успешно удален");
            loadMoviesMain(setMovies);
        })
        .catch(res => {
        })
}

export const handleRemove = (e,setMovies) => {
    const id =parseInt(e.target.dataset.id)
    new swal({
        title: 'Удалить проект из главной?',
        text: "Вы действительно хотите удалить из главной?",
        showCancelButton: true,
        confirmButtonText: 'Да, удалить',
        cancelButtonText: 'Отмена',
        buttonsStyling: false,
        showCloseButton: true,

    }).then( function (dismiss) {
        if(dismiss.dismiss === undefined){
            onRemove(id, setMovies)
        }
        else{
            return
        }
    }
    )
}

const editMovieMain = (fileId,item,setLoading,handleClose) => {
    axiosInstance.put(`/core/V1/movies_main/${item.id}`,
        {
            fileId: fileId,
            movieId: item.movieId === undefined ? item.movie.id : item.movieId,
            sortOrder: item.sortOrder,
        }
        )
        .then(res=> {
            setLoading(false)
            handleClose()
            simpleToaster("success", "Успешно обновлен")
        })
        .catch(err=> {
            handleClose()
            setLoading(false)
        })
}

export const handleEditSubmit = (setLoading, setError, files, item, handleClose, setItem) => {
    setLoading(true)
    setError("")
    var formData = new FormData();
    formData.append("file", files[0][0])
    if(item.movieId === '' && item.sortOrder === '' && files[0].file === "" && item.fileId === '') {
        setError("Заполните поле")
    } else {
        if(item.fileId !== "" && files[0].file === '') {
            editMovieMain(item.fileId,item, setLoading, handleClose);
        }else {
            axiosInstance.post(`/core/V1/files/upload`, formData, {
                headers: {
                    "Content-type" : "multipart/form-data"
                }
            })
                .then(res=> {
                    deleteFile(item.fileId)
                    const fileId=res.data.id
                    setItem({...item,fileId:fileId})
                    editMovieMain(fileId,item, setLoading, handleClose,);
                })
                .catch(err=> {
                    simpleToaster("error", "Что пошло не так")
                    setLoading(false)
                })
        }
    }
}