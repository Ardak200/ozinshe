import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import {useEffect} from "react";

const ScreenShots = ({setScreens, screens}) => {

    useEffect(()=>{

    },[])
    const handleChangeStatus = ({ meta }, status, files) => {
        const finalFiles = [];
        files.map(f=> {
            finalFiles.push(f.file)
        })
        setScreens(finalFiles)
    }

    return (
        <div className={screens.length>0 && "text-center"}>
            <span className="heading">Скриншоты</span>
            <p>Рекомендуется использовать картинки меньше 1 Мб</p>
            {/*{files.length>0 && <img src={window.URL.createObjectURL(files[0])} /> }*/}

            <Dropzone
                onChangeStatus={handleChangeStatus}
                inputContent='Перетищите картинку или загрузите'
                maxFiles={15}
                accept="image/*"
                styles={{ dropzone: { minHeight: 300, maxHeight: 350 } }}
            />
            <hr />
        </div>

    )
}

export default ScreenShots;