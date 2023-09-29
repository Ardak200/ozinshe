import swal from 'sweetalert'

export const Delete = (request) => {
    swal("Вы дейсвительно хотите удалить?", {
        text: "Удаление",
        buttons: {
            catch: {
                text: "Да",
                value: "catch",
            },
            cancel: "Нет"
        }
    }).then(val=> {
        switch (val) {
            case "catch":
                request
            case "cancel":
                break;
        }
    })
}