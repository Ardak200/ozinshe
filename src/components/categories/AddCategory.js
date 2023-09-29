import {Modal} from "react-bootstrap";

const AddCategory = ({handleClose, handleSubmit, category, setCategory, show, error,handleEditSubmit}) => {
    return (
        <Modal show={show} size="lg" onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title><p className="heading">
                    {category.id == "" ? "Добавить категорию" : "Изменить категорию"}
                </p></Modal.Title>

            </Modal.Header>
            <Modal.Body>
                {error && <p className="alert alert-danger">{error}</p>}
                <input onChange={e=>setCategory({...category,name: e.target.value})} value={category.name} className="form-control without-border" type="text" placeholder="Название категории"/></Modal.Body>
                <div className="modalButtons">
                    {category.id == "" ?
                        <button className="btn addBtn primary-button modal-purple-btn m8" onClick={handleSubmit}>
                            <p>Добавить</p>
                        </button> :
                        <button className="btn addBtn primary-button modal-purple-btn m8" onClick={handleEditSubmit}>
                            <p>Изменить</p>
                        </button>
                    }

                    <button className="btn  secondary-button modal-cancel-btn" onClick={handleClose}>
                        <p>Отмена</p>
                    </button>
                </div>

        </Modal>
    )
}

export default AddCategory;