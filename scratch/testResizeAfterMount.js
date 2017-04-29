
// Verify that proportionally sized nodes are re-sized when mounted to a new parent.
testResizeAfterMount()
async function testResizeAfterMount() {
    const div = createFullSizeDiv()

    div.innerHTML = `
        <motor-scene absoluteSize="400 300" sizeMode="absolute absolute">
          <motor-node id="node" absoluteSize="400 300" align=".5 .5" mountPoint=".5 .5" rotation="0 30 -10" opacity="1"
              style="
                  outline: 5px solid blue;
                  background: lightskyblue;
              "
              >

            <motor-node class="outer" sizeMode="proportional proportional" proportionalSize=".5 .5" mountPoint=".5 .5"
                align=".2 .2"
                style="outline: 1px solid red" >
                <motor-node class="inner" sizeMode="proportional proportional" proportionalSize=".25 .25" mountPoint=".5 .5"
                    align=".2 .2"
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

    // node should appear bigger in the blue box.
    o.removeChild(i)
    n.appendChild(i)

    await sleep(1000)

    // node should be smaller back in the original parent.
    n.removeChild(i)
    await sleep(100)
    o.appendChild(i)
}
