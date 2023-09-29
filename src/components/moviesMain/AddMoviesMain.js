import {Modal} from "react-bootstrap";
import Dropzone from "../projects/Dropzone";
import React, {useEffect, useState} from "react";
import {getSearchResult} from "../../redux/actions/projects";
import {axiosInstance} from "../../modules/categories";
import {FileMetaData, ImagePreview, PreviewContainer, RemoveFileIcon} from "../fileUploader/file-upload.styles";
import FileUpload from "../fileUploader/FileUpload";
import {deleteFile} from "../../redux/actions/files";

const AddMoviesMain = ({projects,handleClose, handleSubmit, item, setItem, show, error,handleEditSubmit, setFiles, loading}) => {
    const action = item.id === "" ? "Добавить " : "Изменить ";
    const order = [1,2,3,4,5,6,7,8,9,10];

    const [searchTerm, setSearchTerm] = React.useState("")
    const [searchResults, setSearchResults] = React.useState([])

        useEffect(() => {
        if(show === true && item.movie !== undefined) {
            axiosInstance.get(`/core/V1/movies/${item.movie.id}`)
                .then(res=> {
                    setSearchResults([])
                    setSearchTerm(res.data.name)

                })
        }else {
            setSearchTerm("")
        }
    },[show])

    const chooseMovie =(e) => {
        let id = e.target.dataset.id;
        let name = e.target.id;
        item.name = name
        setItem({...item, movieId:id})
        setSearchTerm(name);
        setSearchResults([])
    }

    const handleChange = e => {
        setSearchTerm((e.target.value))
        if(e.target.value.length>2) {
          getSearchResult(searchTerm,setSearchResults);
        }
        else {
            setSearchResults([])
        }
    }

    const handleBlur = () => {
        if(item.movie === undefined) {
            setSearchTerm("")
        }
    }

    const updateFile = (files) => {
        setFiles([files])
    }

    const removeImage = () => {
        setItem({...item, deleted:true})
    }

    return (
        <Modal show={show} onHide={handleClose}
               size="lg"
               centered>
            <Modal.Header closeButton>
                <Modal.Title><p className="heading">
                    {action +"проект на главную"}
                </p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="alert alert-danger">{error}</p>}
                <input className="form-control mb-3 without-border" onBlur={handleBlur}  onChange={e=>handleChange(e)} placeholder={"Выберите проект"} value={searchTerm}
                />
                <ul className="auto-suggest">
                    {searchResults.map(item =>(
                        <li data-id={item.id} id={item.name} onClick={e=>chooseMovie(e)}>{item.name}</li>
                    ))}
                </ul>
                <select onChange={e=>setItem({...item, sortOrder: e.target.value})} value={item.sortOrder} className="form-control without-border mb-3">
                    <option value={""}>Выберите очередность</option>
                    {order.map(i=> (
                        <option value={i}>{i}</option>
                    ))}
                </select>
                {
                    (item.deleted === true) || (item.link === undefined) ||(item.link === null)?
                        <FileUpload
                            accept=".jpg, .png, .jpeg"
                            label=""
                            multiple={false}
                            updateFilesCb={updateFile}
                        />:
                        <PreviewContainer multiple={false} className={"m-auto"}>
                            <div>
                                <ImagePreview src = {item.link}/>
                                <FileMetaData isImageFile={true}>
                                    <aside>
                                        <RemoveFileIcon
                                            src="/img/trashInImg.svg"
                                            onClick={() => removeImage()}
                                        />
                                    </aside>
                                </FileMetaData>
                            </div>
                        </PreviewContainer>
                }
            </Modal.Body>
            <div className="modalButtons">
                {item.id == "" ?
                    <button className="btn addBtn primary-button modal-purple-btn m8" disabled={loading} onClick={handleSubmit}>
                       <p> Добавить</p>
                    </button> :
                    <button className="btn addBtn primary-button modal-purple-btn m8" disabled={loading} onClick={handleEditSubmit}>
                       <p> Изменить</p>
                    </button>
                }

                <button className="btn secondary-button modal-cancel-btn" onClick={handleClose}>
                    <p>Отмена</p>
                </button>
            </div>
        </Modal>
    )
}

export default AddMoviesMain;