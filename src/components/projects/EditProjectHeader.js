import {Fragment} from "react";

const EditProjectHeader = ({projectName,history,page,setPage,}) => {
    return (
        <Fragment>
            <div className="backpath heading">
                <img src="/img/backPath.svg"  onClick={() => history.goBack()}/>
                Редактировать "{projectName}"
            </div>
            <div className="tab-sheet">
                <div onClick={e=>setPage(e.target.dataset.id)} className={`tab ${page === 'main' && "tab-active"}`} data-id={"main"}>
                    Основная информация
                </div>
                <div onClick={e=>setPage(e.target.dataset.id)} className={`tab ${page === 'video' && "tab-active"}`} data-id={"video"}>
                    Видео
                </div>
                <div onClick={e=>setPage(e.target.dataset.id)} className={`tab ${page === 'screens' && "tab-active"}`} data-id={"screens"}>
                    Обложка и скриншоты
                </div>
            </div>
        </Fragment>

    )
}

export default EditProjectHeader;