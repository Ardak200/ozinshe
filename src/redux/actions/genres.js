import {axiosInstance} from "../../modules/categories";
import simpleToaster from "simple-toaster";
import swal from "sweetalert2";
import {deleteFile} from "./files";

// const pathname = window.location.pathname;
// const finalPath = pathname.includes("/genres") ?  "genres" : "category-ages";
//Load all genres
export const loadAllGenres = (setItems) => {
    axiosInstance.get(`/core/V1/genres`)
        .then(res => {
            setItems(res.data)
        })
        .catch(err => {
            simpleToaster("error", "Что пошло не так при загрузке жанра")
        })
}
export const loadAllCategoryAge = (setItems) => {
    axiosInstance.get(`/core/V1/category-ages`)
        .then(res => {
            setItems(res.data)
        })
        .catch(err => {
            simpleToaster("error", "Что пошло не так при загрузке жанра")
        })
}

// Load all genres by page
export const loadGenres = (setItems, location) => {
    axiosInstance.get(`/core/V1${location}`)
        .then(res => {
            setItems(res.data)
        });
}

// Add genre

export const handleSubmit = (setLoading, setError, files, item, handleClose, pathname, setItems) => {
    setError("")
    var formData = new FormData();
    formData.append("file", files[0][0])
    if (item.name === '') {
        setError("Заполните поле")
    } else {
        setLoading(true)
        axiosInstance.post(`/core/V1/files/upload`, formData, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        })
            .then(res => {
                const fileId = res.data.id
                addGanre(fileId, item.name, setLoading, handleClose, pathname);
                loadGenres(setItems, pathname)
            })
            .catch(err => {
                simpleToaster("error", "Добавьте картинку")
                setLoading(false)
            })
    }
}

const addGanre = (fileId, name, setLoading, handleClose, pathname) => {
    axiosInstance.post(`/core/V1${pathname}`, {
        fileId: parseInt(fileId),
        name: name,
    }, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => {
            setLoading(false);
            handleClose()
            simpleToaster("success", "Успешно добавлен")
            loadCategories(20, parseInt(currentPage) - 1);
        })
        .catch(err => {
            simpleToaster("error", "Что то пошло не так")
            setLoading(false)
        })
}

// Remove genre
export const handleRemove = (e, pathname, setItems) => {
    const id = parseInt(e.target.dataset.id)

    new swal({
        title: `Удалить ${pathname==="/genres"? " жанр" : " возраст"}?`,
        text: `Вы действительно хотите удалить ${pathname==="/genres"? " жанр" : " возраст"}?`,
        showCancelButton: true,
        confirmButtonText: 'Да, удалить',
        cancelButtonText: 'Отмена',
        buttonsStyling: false,
        showCloseButton: true,

    }).then( function (dismiss) {
            if(dismiss.dismiss === undefined){
                onRemove(id, pathname, setItems)
            }
            else{
                return
            }
        }
    )
}
const onRemove = async (id, pathname, setItems) => {
    await axiosInstance.delete(`/core/V1${pathname}/${id}`, {})
        .then(res => {
            loadGenres(setItems,pathname)
            simpleToaster("success", "Успешно удален");
            loadCategories(20, parseInt(currentPage) - 1);
        })
        .catch(res => {
        })
}

//Edit ganre
const editGenre = (fileId, name, setLoading, handleClose, id, pathname, setItems) => {
    axiosInstance.put(`/core/V1${pathname}/${id}`, {
        fileId: parseInt(fileId),
        name: name,
    }, {
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => {
            loadGenres(setItems, pathname)
            setLoading(false);
            handleClose()
            simpleToaster("success", "Успешно добавлен")
            loadCategories(20, parseInt(currentPage) - 1);
        })
        .catch(err => {
            simpleToaster("error", "Что то пошло не так")
            setLoading(false)
        })
}

export const handleEditSubmit = (setLoading, setError, files, item, handleClose, setItem, pathname, setItems) => {
    // setLoading(true)
    setError("");
    if (item.deleted === true && (files.length === 0 || files === [])) {
        simpleToaster("error", "Добавьте картинку")
    }
    if (item.deleted === true && files.length > 0) {
        var formData = new FormData();
        formData.append("file", files[0][0])

        axiosInstance.post(`/core/V1/files/upload`, formData, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }).then(res => {
            deleteFile(item.fileId)
            const fileId = res.data.id;
            editGenre(fileId, item.name, setLoading, handleClose, item.id, pathname, setItems)
        })
            .catch(res => {
                simpleToaster("error", "Что то пошло не так")
            })
    }
    if (item.deleted === undefined) {
        axiosInstance.put(`/core/V1${pathname}/${item.id}`, {
            name: item.name,
            fileId: item.fileId
        })
            .then(res => {
                simpleToaster("success", "Успешно обновлен")
                setLoading(false);
                handleClose();
                loadGenres(setItems, pathname)
            })
    }
}

//Get genre by id
