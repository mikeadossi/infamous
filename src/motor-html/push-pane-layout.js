import MotorHTMLNode from './node'
import PushPaneLayout from '../motor/PushPaneLayout'

class MotorHTMLPushPaneLayout extends MotorHTMLNode {
    createdCallback() {
        console.log(' -- MotorHTMLPushPaneLayout created')
        super.createdCallback()

        const menuColor = 'rgb(45,45,45)'

        this._root = this.attachShadow({mode: 'closed'})
        this._root.innerHTML = (`
            <motor-node
                sizeMode="proportional, proportional, absolute"
                proportionalSize="1, 1, 0"
                style="
                    pointer-events: none;
                    ${/*"background: #f5dabd;"*/""}
                "
                >

                <motor-node id="menuNode"
                    sizeMode="absolute, proportional, absolute"
                    absoluteSize="230, 0, 0"
                    position="-230, 0, 1"
                    proportionalSize="0, 1, 0"
                    style="pointer-events: auto;"
                    >

                    <motor-node id="invisibleGrip"
                        sizeMode="absolute, proportional, absolute"
                        absoluteSize="50, 0, 0"
                        proportionalSize="0, 1, 0"
                        position="225, 0, 0"
                        >
                    </motor-node>

                    <motor-node id="menuHint"
                        absoluteSize="10, 20, 0"
                        align="1, 0.5, 0"
                        mountPoint="0, 0.5, 0"
                        >

                        <div class="triangle" style="
                            position: absolute;
                            top: -2px;
                            width: 0;
                            height: 0;
                            border-top: 12px solid transparent;
                            border-bottom: 12px solid transparent;
                            border-left: 12px solid #1dd326;
                        ">
                        </div>

                        <div class="triangle" style="
                            position: absolute;
                            width: 0;
                            height: 0;
                            border-top: 10px solid transparent;
                            border-bottom: 10px solid transparent;
                            border-left: 10px solid ${menuColor};
                        ">
                        </div>
                    </motor-node>

                    <slot name="menu"></slot>

                </motor-node>

                <motor-node id="contentNode"
                    sizeMode="proportional, proportional, absolute"
                    proportionalSize="1, 1, 0"
                    position="0, 0, -1"
                    style="${/*background: salmon;*/""} pointer-events: auto;"
                    >

                    <slot name="content"></slot>
                </motor-node>

                <motor-node id="fadeEffect"
                    sizeMode="proportional, proportional, absolute"
                    proportionalSize="1, 1, 0"
                    position="0, 0, -0.9"
                    opacity="0.0"
                    style="background: #333; pointer-events: none;"
                    >
                </motor-node>

            </motor-node>
        `)
    }

    // @override
    _makeImperativeCounterpart() {
        return new PushPaneLayout({ _motorHtmlCounterpart: this })
    }
}

import 'document-register-element'
MotorHTMLPushPaneLayout = document.registerElement('motor-push-pane-layout', MotorHTMLPushPaneLayout)

export {MotorHTMLPushPaneLayout as default}
