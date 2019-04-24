function timeFromat (date) {
    const time = new Date(date)
    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()
    return y + '-' + m + '-' + d
}

