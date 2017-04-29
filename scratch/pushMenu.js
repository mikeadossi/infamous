
pushMenu()
function pushMenu() {
    document.body.innerHTML = (`
        <motor-scene>
          <motor-push-pane-layout>
              <div slot="menu">menu</div>
              <div slot="content">content</div>
          </motor-push-pane-layout>
        </motor-scene>
    `)

    const pushPane = document.querySelector('motor-push-pane-layout')
    pushPane.absoluteSize = {
        x: 240,
        y: 300,
    }
    pushPane.style.outline = '1px solid orange'
}
