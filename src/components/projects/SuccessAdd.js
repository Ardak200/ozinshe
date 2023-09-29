import {Modal} from "react-bootstrap";

const SuccessAdd = ({handleClose,show}) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg"
        centered>
            <Modal.Header className="d-flex justify-content-end">
                <img src="/img/close.svg" onClick={handleClose}/>
            </Modal.Header>
            <Modal.Body>
                <div className="successAlert d-flex flex-column justify-content-between text-center">
                    <div className="checkIcon">
                    <img src="/img/addfilm.svg"/>
                    </div>
                    <p className="project-success-text">Проект добавлен успешно!</p>
                    <div className="d-flex justify-content-center">
                        <button className="btn closeBtn" onClick={handleClose}>
                            Закрыть
                        </button>
                    </div>
                </div>

                </Modal.Body>
        </Modal>
    )
}
export default SuccessAdd;