var GetFileBlobUsingURL = function (url, convertBlob) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function() {
        convertBlob(xhr.response);
    });
    xhr.send();
};

var blobToFile = function (blob, name) {
    blob.lastModifiedDate = new Date();
    blob.name = name;
    return blob;
};

export const GetFileObjectFromURL = function(filePathOrUrl, convertBlob) {
    GetFileBlobUsingURL(filePathOrUrl, function (blob) {
        convertBlob(blobToFile(blob, 'testFile.jpg'));
    });
};
