import {axiosInstance} from "../../modules/categories";
import simpleToaster from "simple-toaster"

export const loadAllCategories = (setCategories) => {
    axiosInstance.get("/core/V1/categories")
        .then(res=> {
            setCategories(res.data)
        })
        .catch(err=> {
            simpleToaster("error", "Что пошло не так при загрузке Категорий")
        })
}