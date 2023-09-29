import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import {useEffect} from "react";

const DropFile = ({setFiles, files, show}) => {

    useEffect(()=>{

    },[])
    const handleChangeStatus = ({ meta }, status, files) => {
        setFiles(files)
    }

    return (
        <div className={files.length>0 && "text-center"}>
            {!show && <div>
                <span className="heading">Обложка</span>
                <p>Рекомендуется использовать картинки меньше 1 Мб</p>
            </div>}

            <Dropzone
                onChangeStatus={handleChangeStatus}
                inputContent='Перетищите картинку или загрузите'
                maxFiles={1}
                accept="image/*"
                submitButtonContent={"Добавить еще"}
                styles={{ dropzone: { minHeight: 300, maxHeight: 350 } }}
            />
        </div>

    )
}

export default DropFile;