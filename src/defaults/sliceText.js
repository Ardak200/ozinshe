export const sliceText = (text,length) => {
    if(text.length > length){
        text = text.slice(0, length) + "..."
    }
    return text
}