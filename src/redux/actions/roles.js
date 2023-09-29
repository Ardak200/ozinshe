import swal from "sweetalert2";
import {axiosInstance} from "../../modules/categories";
import simpleToaster from "simple-toaster"

export const handleRemove = (e,role, setUserRole) => {
    const id = e
    new swal({
        title: 'Удалить роль?',
        text: "Вы действительно хотите удалить роль?",
        showCancelButton: true,
        confirmButtonText: 'Да, удалить',
        cancelButtonText: 'Отмена',
        buttonsStyling: false,
        showCloseButton: true,

    }).then( function (dismiss) {
            if(dismiss.dismiss === undefined){
                onRemove(id,role, setUserRole)
            }
            else{
                return
            }
        }
    )
}

const onRemove = (id,role, setUserRole) => {
    axiosInstance.delete(`/core/V1/admin/${id}`,{
        data: {
            id: id,
            name: role
        }})
        .then(res=> {
            getRoles(setUserRole)
            simpleToaster("success","Успешно удален")
        })
        .catch(err=> {
            simpleToaster("error", "Что пошло не так")
        })
}

export const getRoles = (setUserRole) => {
    axiosInstance.get("/core/V1/admin/",{
        params: {
            size:20,
            hasMoreRoles:true
        }
    }).then(res=> {
        setUserRole(res.data.content)

    })
}