
function createFullSizeDiv() {
    const div = document.createElement('div')
    div.setAttribute('style', `
        width:100%;
        height:100%;
    `)
    console.log(div.style.width)
    return div
}

function sleep(duration) {
    return new Promise(r => setTimeout(r, duration))
}
