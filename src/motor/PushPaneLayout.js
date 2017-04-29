import Node from './Node'
import MotorHTMLPushPaneLayout from '../motor-html/push-pane-layout'

export default
class PushPaneLayout extends Node {
    constructor(...args) {
        console.log(' -- PushPaneLayout created')
        super(...args)
    }

    /**
     * @override
     */
    _makeElement() {
        return new MotorHTMLPushPaneLayout
    }
}
