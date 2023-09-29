import {Modal} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import Dropzone from "../projects/Dropzone";
import FileUpload from "../fileUploader/FileUpload";
import React, {useEffect} from "react";
import {FileMetaData, ImagePreview, PreviewContainer, RemoveFileIcon} from "../fileUploader/file-upload.styles";

const AddWithImage = ({handleClose, handleSubmit, item, setItem, show, error,handleEditSubmit, files, setFiles, loading}) => {
    const action = item.id === "" ? "Добавить" : "Изменить";
    const location = useLocation();
    const pathname = location.pathname;
    const currentPath = pathname.includes("genres") ? " жанр" : " возраст"

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
                    {action +currentPath}
                </p></Modal.Title>
            </Modal.Header>
            <Modal.Body className="">
                {error && <p className="alert alert-danger">{error}</p>}
                <input onChange={e=>setItem({...item,name: e.target.value})} value={item.name} className="form-control without-border mb-3" type="text" placeholder={`Название ${currentPath.includes("возраст")  ? "" : currentPath + "а" }`}/>
            {
                (item.deleted === true) || (item.link === null) ?
                    <FileUpload
                        accept=".jpg, .png, .jpeg"
                        label=""
                        multiple={false}
                        updateFilesCb={updateFile}
                    />
                 :

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
                        <p>Добавить</p>
                    </button> :
                    <button className="btn addBtn primary-button modal-purple-btn m8" disabled={loading} onClick={handleEditSubmit}>
                        <p>Изменить</p>
                    </button>
                }
                <button className="btn secondary-button modal-cancel-btn" onClick={handleClose}>
                    <p>Отмена</p>
                </button>
            </div>
        </Modal>
    )
}

export default AddWithImage;