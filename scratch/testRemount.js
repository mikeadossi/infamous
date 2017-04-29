
// test moving a MotorHTML node to another parent.
testRemount()
async function testRemount() {
    const div = createFullSizeDiv()

    div.innerHTML = `
        <motor-scene absoluteSize="400, 300, 100" sizeMode="absolute, absolute, absolute">
          <motor-node id="node" absoluteSize="400, 300, 100" align="0.5, 0.5, 0" mountPoint="0.5, 0.5, 0" rotation="0, 30, -10" opacity="1"
              style="
                  outline: 5px solid blue;
                  background: lightskyblue;
              "
              >

            <motor-node class="outer" sizeMode="proportional, proportional, absolute" proportionalSize="0.5, 0.5, 0" mountPoint="0.5, 0.5, 0"
                align="0.2, 0.2, 0"
                style="outline: 1px solid red" >
                <motor-node class="inner" sizeMode="proportional, proportional, absolute" proportionalSize="0.25, 0.25, 0" mountPoint="0.5, 0.5, 0"
                    align="0.2, 0.2, 0"
                    style="outline: 1px solid red" >
                </motor-node>
            </motor-node>

          </motor-node>
        </motor-scene>
    `

    document.body.appendChild(div)

    await sleep(1000)

    let i = document.querySelector('.inner')
    let o = document.querySelector('.outer')
    let n = document.querySelector('#node')

    o.removeChild(i)
    n.appendChild(i)
    n.removeChild(i)
    n.appendChild(i)
    n.removeChild(i)
    n.appendChild(i)
}
