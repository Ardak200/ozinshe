import FileUpload from "../FileUpload";
import React, {Fragment} from "react";
import {
    FileMetaData,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer, PreviewList,
    RemoveFileIcon
} from "../file-upload.styles";
const PosterAdd = ({files,setFiles,screens,setScreens,movie,setMovie}) => {
    const updateFile = (files) => {
        setFiles([files])
    }

    const updateScreens = (files) => {
        setScreens([files])
    }

    const removePoster = () => {
        setMovie({...movie, poster: {...movie.poster, deleted:true}})
    }


    const removeScreenShots = (id) => {
        const screenShots = movie.screenshots;
        const finded = screenShots.findIndex(x=>x.fileId === id)
        screenShots[finded].deleted = true
        setMovie({...movie, screenShots: {screenShots}})
    }

    return (
        <Fragment>
            <div className={files.length>0 && "text-center"}>
                <div className="edit-project">
                    <span className="heading">Обложка</span>
                    <p>Рекомендуется использовать картинки меньше 1 Мб</p>
                    {movie!== undefined && movie.poster !== null && movie.poster.deleted !== true ?
                        <PreviewContainer multiple={false} className={"m-auto"}>
                            <div>
                                <ImagePreview src={movie.poster.link}/>
                                <FileMetaData isImageFile={true}>
                                    <aside>
                                        <RemoveFileIcon
                                            src="/img/trashInImg.svg"
                                            onClick={() => removePoster()}
                                        />
                                    </aside>
                                </FileMetaData>
                            </div>
                        </PreviewContainer> :
                                    <FileUpload
                                        accept=".jpg, .png, .jpeg"
                                        label=""
                                        multiple={false}
                                        updateFilesCb={updateFile}
                                    />
                    }
                </div>
                <hr/>
            </div>
            <div className={screens.length>0 && "text-center "}>
                <div className="edit-project">
                <span className="heading">Скриншоты</span>
                <p>Рекомендуется использовать картинки меньше 1 Мб</p>
                <FileUpload
                    accept=".jpg, .png, .jpeg"
                    label=""
                    multiple={true}
                    updateFilesCb={updateScreens}
                />
                </div>
            </div>
            {movie.screenshots.length !== 0 &&
            <FilePreviewContainer>
                <p className="mb16">Текущие скриншоты</p>
                <PreviewList>
                    {movie.screenshots.map(s => {
                        if(s.deleted === undefined) {
                            return (
                            <PreviewContainer>
                                <div>
                                    <ImagePreview src={s.link}/>
                                    <FileMetaData isImageFile={true}>
                                        <aside>
                                            <RemoveFileIcon
                                                onClick={() => removeScreenShots(s.fileId)}
                                                src="/img/trashInImg.svg"
                                            />
                                        </aside>
                                    </FileMetaData>
                                </div>
                            </PreviewContainer>
                            )
                        }
                    })}
                </PreviewList>
            </FilePreviewContainer>
            }
        </Fragment>
    )
}
export default PosterAdd;