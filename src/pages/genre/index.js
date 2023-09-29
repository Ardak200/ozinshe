import {Fragment, useEffect, useState} from "react";
import withAuth from "../../hoc/withAuth";
import {useLocation} from "react-router-dom";
import useQuery from "../../defaults/useQuery";
import AddGenre from "../../components/genres/AddGenre";
import {handleEditSubmit, handleRemove, handleSubmit, loadGenres} from "../../redux/actions/genres";
import {sliceText} from "../../defaults/sliceText";

const Genre = () => {
    const query = useQuery();
    const location = useLocation();
    const pathname = location.pathname;
    const currentPage = query.get("page") === null ? "1" : query.get("page")
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({name: "", id: "", fileId: "", link: null})
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false);
    const pageName = location.pathname.includes("/genres") ? 'Жанры' : 'Возрасты'
    const [files,
        setFiles] = useState([]);
    const [pagination, setPagination] = useState({
        totalPages: 0,
        last: false,
        first: false,
        totalElements: 0,
        size: 0,
    })

    const handleChangePage = pageNumber => {
        history.push({pathname: "/genres", search: `?page=${pageNumber}`});
        loadGenres( setItems, pathname);
    }

    const handleClose = () => {
        setShow(false);
        setItem({name: "", id: "", link: null});
        setError("");
        setFiles([])
    }

    const handleEdit = (e) => {
        setItem({name: "", id: ""})
        setFiles([]);
        const id = parseInt(e.target.dataset.id)
        const categoryVal = () => items.filter(x => {
            return x.id === parseInt(id)
        });
        let filteredVal = categoryVal()[0]

        setShow(true);
        setItem({name: filteredVal.name, id: filteredVal.id, fileId: filteredVal.fileId, link: filteredVal.link});
    }

    useEffect(() => {
        loadGenres(setItems, pathname);

    }, [])

    useEffect(() => {
        if (loading === false) {
            loadGenres(setItems, pathname)
        }
    }, [loading])
    const handleShow = () => {
        setShow(true)
    };
    return (
        <Fragment>

            <div className="d-flex justify-content-between content-header">
                <div className="d-flex align-items-center">
                    <h2 className="heading">{pageName} <span className="count">{items.length}</span> </h2>
                </div>
                <button className="btn addBtn primary-button" data-toggle="modal" data-target="#addCategory"
                        onClick={handleShow}><img src="/img/plus.svg"/><p>Добавить</p></button>
            </div>

            <div className=" d-flex flex-wrap">
                {loading && 'Загрузка ...'}
                {!loading && items.map(p => (
                    <div className="genre-card-block">
                        <img className="genre-card-block--littleimg" src={p.link}/>
                        <span className="genre-text">{pageName == "Возрасты" ? p.name + " жас" : sliceText(p.name,23)}</span>
                        <div className="d-flex justify-content-between genre-video">
                            <div>
                                <img src="/img/video.svg"/>
                                <span className="roles-rules gray">{p.movieCount}</span>
                            </div>
                            <div className="modify">
                                <img className="modify-icons img-right" src="/img/pen.svg" data-id={p.id}
                                     onClick={e => handleEdit(e)}/>
                                <img className="modify-icons" src="/img/delete.svg" data-id={p.id}
                                     onClick={e => handleRemove(e, pathname, setItems)}/>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/*<div className="d-flex justify-content-center">*/}
            {/*    <Pagination*/}
            {/*        activePage={parseInt(currentPage)}*/}
            {/*        itemsCountPerPage={pagination.size}*/}
            {/*        totalItemsCount={pagination.totalElements}*/}
            {/*        pageRangeDisplayed={5}*/}
            {/*        itemClass="page-item"*/}
            {/*        linkClass="page-link"*/}
            {/*        onChange={handleChangePage}*/}
            {/*    />*/}
            {/*</div>*/}


            <AddGenre
                handleClose={handleClose}
                handleSubmit={() => handleSubmit(setLoading, setError, files, item, handleClose, pathname, setItems)}
                handleEditSubmit={() => handleEditSubmit(setLoading, setError, files, item, handleClose, setItem, pathname, setItems)}
                item={item}
                setItem={setItem}
                show={show}
                error={error}
                edit={edit}
                files={files}
                setFiles={setFiles}
                loading={loading}
            />


        </Fragment>
    )
}

export default withAuth(Genre);
