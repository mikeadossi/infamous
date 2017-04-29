
domCar()
function domCar() {
    //TODO: sizeMode absolute not triggering via attribute:
    document.body.innerHTML = (
        `
        <style>
            .car {
                border: 5px solid red;
                /*transform-style: flat!important;*/
            }

            .wheelSide {
                background-image: url("http://www.freeiconspng.com/uploads/car-tire-png-see-tire-details-add-to-my-car-8.png");
                background-size: 30px;
            }

            .wheelOuter {
                background-color: black;
            }

            .camo {
                background-image: url("http://blog.spoongraphics.co.uk/wp-content/uploads/2010/camo-patterns/Urban-Camo.jpg");
                background-size: 200px;
                background-repeat: repeat;
            }

            .bumper {
                background-image: url("http://www.wranglerforum.com/attachment.php?attachmentid=18928&d=1273472303");
                background-size: 168px;
                background-position: center center;
            }

            .underside {
                background-image: url("http://media.caranddriver.com/images/11q2/398067/2012-honda-civic-hybrid-technical-illustration-for-aero-under-body-panels-photo-398255-s-1280x782.jpg");
                background-size: 288px;
                background-position: center center;
            }
        </style>

        <motor-scene absoluteSize="400, 300, 100" sizeMode="absolute, absolute, absolute">

          <motor-node class="car" absoluteSize="400, 300, 100" align="0.5, 0.5, 0" mountPoint="0.5, 0.5, 0" rotation="0, 30, -10" opacity="1">

            <motor-node class="outer" sizeMode="proportional, proportional, absolute" proportionalSize="0.25, 0.25, 0" mountPoint="0.5, 0.5, 0"
                align="0.2, 0.2, 0"
                style="outline: 1px solid red" >
                <motor-node class="inner" sizeMode="proportional, proportional, absolute" proportionalSize="0.25, 0.25, 0" mountPoint="0.5, 0.5, 0"
                    align="0.2, 0.2, 0"
                    style="outline: 1px solid red" >
                </motor-node>
            </motor-node>

            <motor-node class="frame" align="0.5, 0.5, 0" mountPoint="0.5, 0.5, 0" absoluteSize="0, 0, 0">
              <motor-node class="frontLeftFender camo" absoluteSize="80, 40, 0" position="0, 0, 50" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="ftonrRightFender camo" absoluteSize="80, 40, 0" position="0, 0, -50" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="hood camo" absoluteSize="80, 100, 0" rotation="90, 0, 0" position="0, -20, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="bumper" absoluteSize="100, 40, 0" rotation="0, 90, 0" position="-40, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="leftDoor camo" absoluteSize="130, 80, 0" position="105, -20, 50" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="rightDoor camo" absoluteSize="130, 80, 0" position="105, -20, -50" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="roof camo"  absoluteSize="130, 100, 0" rotation="90, 0, 0" position="105, -60, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="windshield" absoluteSize="100, 40, 0" rotation="0, 90, 0" position="40, -40, 0" mountPoint="0.5, 0.5, 0" style="/*border: 5px solid grey*/"></motor-node>
              <motor-node class="hatch camo" absoluteSize="80, 100, 0" rotation="90, 90, 0" position="170, -20, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="underside"  absoluteSize="210, 100, 0" rotation="90, 0, 0" position="65, 20, 0" mountPoint="0.5, 0.5, 0"></motor-node>
            </motor-node>

            <motor-node class="wheel" position="0, 20, -50" align="0.5, 0.5, 0" mountPoint="0.5, 0.5, 0">
              <motor-node class="wheelSide" absoluteSize="30, 30, 0" position="0, 0, -7" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="wheelSide" absoluteSize="30, 30, 0" position="0, 0, 7" mountPoint="0.5, 0.5, 0"></motor-node>

              <motor-node class="wheelOuterRotation" rotation="0, 0, 0">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 45">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 90">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 135">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 180">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 225">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 270">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 315">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>

            </motor-node>

            <motor-node class="wheel" position="0, 20, 50" align="0.5, 0.5, 0" mountPoint="0.5, 0.5, 0">
              <motor-node class="wheelSide" absoluteSize="30, 30, 0" position="0, 0, -7" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="wheelSide" absoluteSize="30, 30, 0" position="0, 0, 7" mountPoint="0.5, 0.5, 0"></motor-node>

              <motor-node class="wheelOuterRotation" rotation="0, 0, 0">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 45">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 90">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 135">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 180">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 225">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 270">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 315">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>

            </motor-node>

            <motor-node class="wheel" position="130, 20, -50" align="0.5, 0.5, 0" mountPoint="0.5, 0.5, 0">
              <motor-node class="wheelSide" absoluteSize="30, 30, 0" position="0, 0, -7" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="wheelSide" absoluteSize="30, 30, 0" position="0, 0, 7" mountPoint="0.5, 0.5, 0"></motor-node>

              <motor-node class="wheelOuterRotation" rotation="0, 0, 0">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 45">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 90">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 135">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 180">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 225">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 270">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 315">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>

            </motor-node>

            <motor-node class="wheel" position="130, 20, 50" align="0.5, 0.5, 0" mountPoint="0.5, 0.5, 0">
              <motor-node class="wheelSide" absoluteSize="30, 30, 0" position="0, 0, -7" mountPoint="0.5, 0.5, 0"></motor-node>
              <motor-node class="wheelSide" absoluteSize="30, 30, 0" position="0, 0, 7" mountPoint="0.5, 0.5, 0"></motor-node>

              <motor-node class="wheelOuterRotation" rotation="0, 0, 0">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 45">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 90">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 135">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 180">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 225">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 270">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>
              <motor-node class="wheelOuterRotation" rotation="0, 0, 315">
                <motor-node class="wheelOuter" absoluteSize="14, 15, 0" rotation="0, 90, 0" position="14, 0, 0" mountPoint="0.5, 0.5, 0"></motor-node>
              </motor-node>

            </motor-node>

          </motor-node>

        </motor-scene>
        `
    )
    var {Motor} = infamous.motor

    var wheels = document.querySelectorAll('.wheel')
    var car = document.querySelector('.car')
    console.log('car', car)

    const sleep = time => new Promise(r => setTimeout(r, time))

    // TODO: save this for tests.
    let keepRendering = true
    testChildCallbacks()
    async function testChildCallbacks() {
        //await car._imperativeCounterpartPromise
        await car.mountPromise
        const c = car.imperativeCounterpart
        console.log('node', car.imperativeCounterpart)
        await c._getScenePromise()
        const p = c._parent

        let count = 0
        while (count < 2) {
            count++
            await sleep(1000)
            console.log(' --- remove child')
            p.removeChild(c)

            ~async function() {
                console.log(' --- wait for child mount. mounted:', c._mounted, c.mountPromise)
                await c.mountPromise
                console.log(' --- child belongs to scene again!')
            }()

            let g = c.children[0]
            ~async function() {
                console.log(' --- wait for grandchild mount. mounted:', g._mounted, g.mountPromise)
                await g.mountPromise
                console.log(' --- grandchild belongs to scene again!')
            }()

            await sleep(1000)
            console.log(' --- add child')
            p.addChild(c)
        }

        //keepRendering = false
    }

    console.log('car mountPromise?', car.mountPromise)
    car.mountPromise.then(function() {
        //var c = document.querySelector('.car')
        //var root = c.attachShadow({mode: 'closed'})
        //root.innerHTML = '<motor-node id="shadow-root-top-node" absoluteSize="100,100,100" style="border: 1px solid red"><slot></slot></motor-node>'
        //var n = root.querySelector('motor-node')

        //var tn = root.querySelector('#shadow-root-top-node')
        //var root2 = tn.attachShadow({mode: 'closed'})
        //root2.innerHTML = '<motor-node id="shadow-root-top-node-2" absoluteSize="50,50,50" style="border: 1px solid green"><slot></slot></motor-node>'
        //var n2 = root2.querySelector('motor-node')

        let task = Motor.addRenderTask(function() {
            //car.rotation.y++

            [].forEach.call(wheels, function(wheel) {
                wheel.rotation.z -= 5
            });

            //n.rotation.y++
            if (!keepRendering) {
                console.log('stop rendering.')
                Motor.removeRenderTask(task)
            }
        })
    })
}
