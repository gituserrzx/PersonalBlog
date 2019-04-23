function ajax ({url, type, data,success,error}) {
    const xhr = new XMLHttpRequest()
    if (typeof data === 'object') {
        const temp = []
        for (let props in data) {
            temp.push(`${props}=${data[props]}`)
        }
        data= temp.join('&')
    }
    if (type === 'GET') {
        xhr.open(type,url + '?'+ data)
        xhr.send()
    } else {
        xhr.open(type, url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(data)
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 ) {
            if( xhr.status === 200){
                success && success(xhr.responseText)
            } else {
                error && error(xhr.responseText)
            }
        }
    }
}
