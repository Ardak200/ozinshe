export const required = val => {
    let error;
    if (!val) {
        error = 'Поле обязательно для заполнения'
    }
    return error
}