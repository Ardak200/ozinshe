import {Modal} from "react-bootstrap";
const UsersInfo = ({show, handleClose, user}) => {
    return (
        <Modal show={show} size="lg" onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title><p className="heading">Данные пользователя</p></Modal.Title>
                <img src="/img/close.svg" onClick={handleClose}/>
            </Modal.Header>
            <Modal.Body>
                <div className="successAlert user-modal d-flex flex-column justify-content-between align-items-center text-center">
                    <img src="/img/user.svg" />
                    <span className="heading">{user.name !== undefined ? user.name : ""}</span>
                    <p className="gray">{user.phoneNumber}</p>
                    <p className="gray">{user.user.email}</p>
                    <p className="gray">Дата рождения: {user.birthDate}</p>
                    <button className="btn primary-button" onClick={handleClose}>
                        <p>Закрыть</p>
                    </button>
                </div>

            </Modal.Body>
        </Modal>
    )
}

export default UsersInfo;