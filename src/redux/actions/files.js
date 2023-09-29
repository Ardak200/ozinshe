import {axiosInstance} from "../../modules/categories";

export const deleteFile = (fileId) =>{
    axiosInstance.delete(`/core/V1/files/${fileId}`, {}).then(
        res =>{
        }
    )
        .catch(err => {
        })
}