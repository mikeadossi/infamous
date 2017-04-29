
legacyStartingPoint()
function legacyStartingPoint() {
    let link = document.createElement('link')
    link.setAttribute('rel', "stylesheet")
    link.setAttribute('type', "text/css")
    link.setAttribute('href', './node_modules/famous/src/core/famous.css')
    document.querySelector('head').appendChild(link)

    window.addEventListener('load', function() {
        var Plane                  = infamous.Plane
        var contextWithPerspective = infamous.utils.contextWithPerspective

        console.log(' - ', Plane, contextWithPerspective)

        var ctx = contextWithPerspective(1000)
        var square = new Plane({
            size: [200,200],
            content: 'Hello.',
            properties: {
                backfaceVisibility: 'visible',
                background: 'pink',
                padding: '5px'
            }
        })

        ctx.add(square)
        square.transform.setRotate([0,2*Math.PI,0], {duration: 5000, curve: 'easeInOut'})
    })
}
