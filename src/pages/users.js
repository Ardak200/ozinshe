import {Fragment, useEffect, useState} from "react";
import UsersInfo from "../components/users/UsersInfo";
import {axiosInstance} from "../modules/categories";
import withAuth from "../hoc/withAuth";
const Users = () => {
    const [show, setShow] = useState(false);
    const [user,setUser] = useState({
        birthDate: "",
        name: "",
        language: "",
        phoneNumber: "",
        id: "",
        user: {
            email: ""
        }
    })
    const [users, setUsers] = useState([
        {
            birthDate: "",
            name: "",
            language: "",
            phoneNumber: "",
            id: "",
            user: {
                email: ""
            }
        }
    ])

    const [sortField, setSortField] = useState("");
    useEffect(() => {
        loadAllUsers()
    },[])

    const loadAllUsers = () => {
        axiosInstance.get("/core/V1/admin/?size=20&sortField="+`${sortField}`)
            .then(res=> {
                setUsers(res.data.content)
            })
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = (id) => {
        const user = users.find(x=>x.id===parseInt(id));
        setUser(user)
        setShow(true);
    }

    const sortingField = (field) =>{
        setSortField(field)
        let direction = "ASC"
        if(field ==="createdDate") {
            direction = "DESC"
        }

            axiosInstance.get("/core/V1/admin/?size=20&direction=" + `${direction}&sortField=${field}`)
                .then(res => {
                    setUsers(res.data.content)
                })

    }

    return (
        <Fragment>
            <div className="d-flex content-header justify-content-between">
                <div className="d-flex align-items-center">
                    <h2 className="heading">Пользователи <span className="count">{users.length}</span> </h2>
                </div>
            </div>

            <div className="pb40">
                {/*<select  value={sortField} onChange={e => sortingField(e.target.value)}>*/}
                {/*    <option value=""></option>*/}
                {/*    <option value={"name"}>По имени</option>*/}
                {/*    <option value={"createdDate"}>По дате регистрации</option>*/}
                {/*</select>*/}
                <div className="filter-items">
                <div className="filter-item ">
                    <div className="filter-select">
                            <span>
                                Сортировать:
                            </span>
                        <select value={sortField} onChange={e => sortingField(e.target.value)}>
                            <option value={"name"}>По имени</option>
                            <option value={"createdDate"}>По дате регистрации</option>
                        </select>
                        <img src="/img/triangle-arrow.svg"/>
                    </div>
                </div>
                </div>
            </div>
            <div className="row">
                {users.map(p=> (
                    <div data-id={p.id} onClick={() => handleShow(p.id)}  className="users-card-block">
                            <div className="nameBlock">
                                <span className="userName">{p.name !== null && p.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="users-text">
                                <p>{p.name}</p>
                                <p className="gray">{p.user.email}</p>
                            </div>

                        </div>
                ))}
            </div>
            <UsersInfo show={show} handleClose={handleClose} user={user}/>
        </Fragment>
    )
}

export default withAuth(Users)
