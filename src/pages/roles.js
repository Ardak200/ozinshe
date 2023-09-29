import {Fragment, useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {axiosInstance} from "../modules/categories";
import simpleToaster from "simple-toaster"
import withAuth from "../hoc/withAuth";
import {connect} from "react-redux";
import {getRoles, handleRemove} from "../redux/actions/roles";

const Roles = ({user}) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [userRole, setUserRole] = useState([]);
    const [projects, setProjects] = useState([
        {
            id: '1',
            name: "Менеджер 1",
        },
    ])

    useEffect(() => {
        getRoles(setUserRole)
    }, [])
    useEffect(() => {
        axiosInstance.get(`/core/admin/V1/roles/`)
            .then(res => {
                setProjects(res.data)
            })
    }, [])

    const handleSubmit = () => {
        setError("")
        if (email === '' || role === "") {
            setError("Заполните поле")
        } else {
            axiosInstance.put("/core/V1/admin/roles", {
                email,
                role
            }).then(res => {
                handleClose();
                getRoles(setUserRole)
                simpleToaster("success", `Добавлен пользователь у которого роль ${role}`)
            })
                .catch(err => {
                    simpleToaster("error", "Нет такого пользователя с такой электронной почтой")
                })
        }
    }
    const handleClose = () => {
        setShow(false);
        setError("");
        setEmail("")
        setRole("")
    }

    const handleShow = () => setShow(true);
    return (
        <Fragment>
            <div className="d-flex justify-content-between content-header">
                <div className="d-flex align-items-center">
                    <h2 className="heading">Роли <span className="count">{userRole.length}</span> </h2>
                </div>
                <button className="btn addBtn primary-button" data-toggle="modal" data-target="#addCategory"
                        onClick={handleShow}><img src="/img/plus.svg"/><p>Добавить</p></button>
            </div>
            <Modal show={show}
                   size="lg"
               onHide={handleClose}
               centered>
                <Modal.Header closeButton>
                    <Modal.Title><p className="heading">Добавить роль</p></Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-role">
                    {error && <p className="alert alert-danger">{error}</p>}
                    <div className="did-floating-label-content mb-3">
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className=" did-floating-input"
                            type="text"/>
                        <label className="did-floating-label">Email</label>
                    </div>

                    <div className="did-floating-label-content mb0">
                        <select
                            name={"role"}
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className={"did-floating-select selectfont"}>
                            <option value=""></option>
                            <option value={"ROLE_ADMIN"}>Admin</option>
                            <option value={"ROLE_MODERATOR"}>Moderator</option>
                        </select>
                        <label className="did-floating-label">Роли</label>
                    </div>
                </Modal.Body>
                <div className="modalButtons">
                    <button className="btn addBtn primary-button modal-purple-btn m8" onClick={handleSubmit}>
                        <p>Добавить</p>
                    </button>
                    <button className="btn secondary-button modal-cancel-btn" onClick={handleClose}>
                        <p>Отмена</p>
                    </button>
                </div>
            </Modal>
            {/*<RoleCards/>*/}

            <div className="d-flex flex-wrap">
            {userRole.map( (u,index) => (
                // <RolesCards ourUserRole={u} ourUserRoleIndex={index}/>
                u.user.roles.map( v=> (
                    <div>
                        {  v.name !== "ROLE_USER" ?
                            <div className="roles-card-block">
                                <div className="roles-text">
                                    <p>{u.user.email}</p>
                                </div>
                                <div className="roles-text">
                                    <p>{v.name}</p>
                                </div>
                                <div>
                                    <div>
                                        <img src="/img/check.svg"/>
                                        <span className="roles-rules">Проекты <span
                                            className="roles-rules gray">(Редактирование)</span></span>
                                    </div>
                                    <div>
                                        <img src="/img/check.svg"/>
                                        <span className="roles-rules">Категории <span
                                            className="roles-rules gray">(Редактирование)</span></span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <img src="/img/check.svg"/>
                                            <span className="roles-rules">Пользователи <span
                                                className="roles-rules gray">(Редактирование)</span></span>
                                        </div>
                                        <div className="modify">
                                            {(user.id != u.user.id) &&
                                                <img data-id={u.user.id} className="modify-icons" src="/img/delete.svg"
                                                     onClick={(e) => handleRemove(u.user.id, v.name, setUserRole)} data-id={u.id}/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div></div>
                        }
                    </div>                ))
                )
            )
            }
            </div>
        </Fragment>
    )
}

function mapStateToProps(state) {
    return {user: state.usersReducer.user.user}
}

export default withAuth(connect(mapStateToProps, null)(Roles));
