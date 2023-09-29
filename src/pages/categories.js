import {Fragment, useEffect, useState} from "react";
import {axiosInstance} from "../modules/categories";
import withAuth from "../hoc/withAuth";
import AddCategory from "../components/categories/AddCategory";
import simpleToaster from "simple-toaster"
import {Delete} from "../defaults/delete";
import swal from "sweetalert2";
import {handleRemove} from "../redux/actions/projects";
import {sliceText} from "../defaults/sliceText";

const Categories = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({name: "", id: "", fileId: null, link: null})
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false);

    const handleSubmit = () => {
        setError("")
        if (category.name === '') {
            setError("Заполните поле")
        } else {
            axiosInstance.post("/core/V1/categories", {name: category.name})
                .then(res => {
                    handleClose();
                    simpleToaster("success", "Успешно добавлен")
                    loadCategories();
                })
        }
    }

    const handleEditSubmit = () => {
        setError("");
        if (category === '') {
            setError("Заполните поле")
        } else {
            axiosInstance.put(`/core/V1/categories/${category.id}`, {
                name: category.name,
                id: category.id,
                fileId: category.fileId,
                link: category.link
            })
                .then(res => {
                    simpleToaster("success", "Успешно обновлен");
                    setShow(false);
                    loadCategories()
                })
                .catch(err => {
                });
        }
    }

    const getCategoryById = (id) => {
        let result = null;
        axiosInstance.get(`/core/V1/categories/${id}`)
            .then(res => {
                result = res.data;
            })

        return result;
    }

    const handleClose = () => {
        setShow(false);
        setCategory({name: "", id: ""});
        setError("");
    }

    const onRemove = (id) => {
        axiosInstance.delete(`/core/V1/categories/${id}`, {})
            .then(res => {
                simpleToaster("success", "Успешно удален");
                loadCategories();
            })
            .catch(res => {
            })
    }

    const handleRemove = e => {
        const id = parseInt(e.target.dataset.id)
        new swal({
            title: 'Удалить категорию?',
            text: "Вы действительно хотите удалить категорию?",
            showCancelButton: true,
            confirmButtonText: 'Да, удалить',
            cancelButtonText: 'Отмена',
            buttonsStyling: false,
            showCloseButton: true,

        }).then( function (dismiss) {
                if(dismiss.dismiss === undefined){
                    onRemove(id)
                }
                else{
                    return
                }
            }
        )
    }

    const handleEdit = (e) => {
        const id = parseInt(e.target.dataset.id)
        const categoryVal = categories.find(x => x.id === id);
        setShow(true);
        setCategory({name: categoryVal.name, id: categoryVal.id});
        loadCategories()
    }

    const loadCategories = () => {
        axiosInstance.get("/core/V1/categories")
            .then(res => {
                setCategories(res.data)
            });
    }

    useEffect(() => {
        loadCategories();
    }, [])

    const handleShow = () => setShow(true);
    return (
        <Fragment>

            <div className="d-flex justify-content-between content-header">
                <div className="d-flex align-items-center">
                    <h2 className="heading">Категории <span className="count">{categories.length}</span> </h2>
                </div>
                <button className="btn addBtn primary-button" data-toggle="modal" data-target="#addCategory"
                        onClick={handleShow}><img src="/img/plus.svg"/><p>Добавить</p></button>
            </div>

            <div className="d-flex flex-wrap">
                {loading && 'Загрузка ...'}
                {!loading && categories.map(p => (
                    <div className="categories-card-block">
                        <span className="categories-text">{sliceText(p.name,21)}</span>
                        <div className="d-flex justify-content-between genre-video">
                            <div>
                                <img src="/img/video.svg"/>
                                <span className="roles-rules gray">{p.movieCount}</span>
                            </div>
                            <div className="modify">
                                <img className="modify-icons img-right" src="/img/pen.svg" data-id={p.id}
                                     onClick={e => handleEdit(e)}/>
                                <img className="modify-icons" src="/img/delete.svg" data-id={p.id}
                                     onClick={e => handleRemove(e)}/>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <AddCategory
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                handleEditSubmit={handleEditSubmit}
                category={category}
                setCategory={setCategory}
                show={show}
                error={error}
                edit={edit}
            />
        </Fragment>
    )
}

export default withAuth(Categories)
