import 'geometry-interfaces'
import Motor from './Motor'
import ElementManager from './ElementManager'
import Transformable from './Transformable'
import MotorHTMLNode from '../motor-html/node'
import { makeLowercaseSetterAliases, proxyGettersSetters } from '../motor/Utility'

class Node extends Transformable {

    /**
     * @constructor
     *
     * @param {Object} initialProperties Initial properties that the node will
     * have. This can be used when creating a node, alternatively to using the
     * setters/getters for position, rotation, etc.
     *
     * @example
     * var node = new Node({
     *   absoluteSize: {x:100, y:100, z:100},
     *   rotation: {x:30, y:20, z:25}
     * })
     */
    constructor (initialProperties = {}, _motorHtmlNode) {
        // XXX The presence of a _motorHtmlNode argument signifies that the HTML interface
        // is being used, otherwise the imperative interface here is being
        // used. See MotorHTMLNode. This means the Node and MotorHTMLNode classes are
        // coupled together, but it's in the name of the API that we're supporting. We've
        // gotta make sure it's well documented.

        super(initialProperties, _motorHtmlNode)

        // DOM representation of Node
        // TODO: remove this and handle it in the "DOMRenderer". The DOMRender
        // will handle the HTML-side of the API, but for now it is here.
        this._el = new ElementManager(
            _motorHtmlNode || this._makeElement()
        )
        this._el.element._associateImperativeNode(this)

        this._mounted = false;

        this._parent = null // default to no parent.
        this._children = [];
        this._scene = null // stores a ref to this Node's root Scene.

        // an internal promise that resolves when this Node finally belongs to
        // a scene graph with a root Scene. The resolved value is the root
        // Scene.
        //
        // TODO: Reset this._scenePromise when the node is removed from it's
        // scene, or instead make _scenePromise a function that returns a
        // promise waiting for the next scene that the node will belong to, and
        // returns the existing promise if currently attached on a scene. For
        // now, this only works for the first scene that this Node is attached
        // to (which is not ultimately what we want).
        this._resolveScenePromise = null
        this._scenePromise = new Promise(r => this._resolveScenePromise = r)

        // Provide the user a promise that resolves when this Node is attached
        // to a tree and when this Node's eventual root Scene is mounted.
        // Users can await this in order to do something after this Node is
        // mounted in a scene graph that is live in the DOM.
        // _resolveMountPromise holds the current _mountPromise's resolve
        // method.
        //
        // TODO: Maybe we should rename this to `.ready`, matching with the
        // HTML API. See motor-html/node createdCallback.
        // TODO: We need to reset this when a Node is removed, as it will be
        // mounted again if it is ever added back into a scene graph. For now,
        // this only works on this Node's first mount.
        this._resolveMountPromise = null
        this._mountPromise = new Promise(r => this._resolveMountPromise = r)

        this._waitForSceneThenResolveMountPromise()

        this._init()
    }

    /**
     * @private
     */
    _init() {
        this._needsToBeRendered()
    }

    /**
     * @private
     */
    _makeElement() {
        return new MotorHTMLNode
    }

    /**
     * @private
     * Get a promise for the node's eventual scene.
     */
    _getScenePromise() {
        if (!this._scene && !this._scenePromise)
            this._scenePromise = new Promise(r => this._resolveScenePromise = r)

        return this._scenePromise
    }

    /**
     * @private
     */
    async _waitForSceneThenResolveMountPromise() {

        // TODO: this conditional check should work with child classes who's
        // constructor is no longer named "Node". This should not fire for
        // Scene or child classes of Scene.
        if (this.constructor.name == 'Node') {
            await this._getScenePromise()
            await this._scene.mountPromise

            // TODO TODO: also wait for this._mounted so this.element is actually
            // mounted in the DOM.
            this._resolveMountPromise(true)
        }

    }

    /**
     * @readonly
     *
     * TODO: needs to be overriden for Scene, because Scene mounts/unmounts
     * differently.
     */
    get mountPromise() {
        if (!this._mounted && !this._mountPromise) {
            this._mountPromise = new Promise(r => this._resolveMountPromise = r)
            this._waitForSceneThenResolveMountPromise()
        }

        return this._mountPromise
    }

    /**
     * this._parent is protected (node's can access other node._parent).
     * The user should use the addChild methods, which automatically handles
     * setting a parent.
     *
     * @readonly
     */
    get parent() {
        return this._parent
    }

    /**
     * @readonly
     */
    get children() {
        // return a new array, so that the user modifying it doesn't affect
        // this node's actual children.
        return [...this._children]
    }

    /**
     * @readonly
     */
    get element() {
        return this._el.element
    }

    /**
     * Get the Scene that this Node is in, null if no Scene. This is recursive
     * at first, then cached.
     *
     * This traverses up the scene graph tree starting at this Node and finds
     * the root Scene, if any. It caches the value for performance. If this
     * Node is removed from a parent node with parent.removeChild(), then the
     * cache is invalidated so the traversal can happen again when this Node is
     * eventually added to a new tree. This way, if the scene is cached on a
     * parent Node that we're adding this Node to then we can get that cached
     * value instead of traversing the tree.
     *
     * @readonly
     */
    get scene() {
        // NOTE: this._scene is initally null, created in the constructor.

        // if already cached, return it.
        if (this._scene) return this._scene

        // if the parent node already has a ref to the scene, use that.
        if (this._parent && this._parent._scene) {
            this._scene = this._parent._scene

            return this._scene
        }

        // otherwise call the scene getter on the parent, which triggers
        // traversal up the scene graph in order to find the root scene (null
        // if none).
        else {
            // TODO: We shouldn't rely on constructor.name, as this is different for
            // classes that extend Scene.
            // if (this.constructor.name == 'Scene') this._scene = this
            // else if (this._parent) this._scene = this._parent.scene
            if (this._parent) this._scene = this._parent.scene

            return this._scene
        }
    }

    /*
     * Trigger a re-render for this node (wait until mounted if not nounted
     * yet).
     *
     * TODO: We need to render one time each time mountPromise is resolved, not
     * just this one time as currently in constructor's call to this._init.
     *
     * XXX If a setter is called over and over in a render task before the node
     * is mounted, then each tick will cause an await this.mountPromise, and
     * eventually all the bodies will fire all at once. I don't think we want
     * this to happen.
     */
    async _needsToBeRendered() {
        if (!this._mounted) {
            await this.mountPromise
        }
        Motor._setNodeToBeRendered(this)

        // TODO: Move this logic into Motor..?
        if (!Motor._inFrame) Motor._startAnimationLoop()
    }

    /**
     * Add a child node to this Node.
     *
     * @param {Node} childNode The child node to add.
     */
    addChild (childNode) {
        if (! (childNode instanceof Node))
            throw new Error('Node.addChild expects the childNode argument to be a Node instance.')

        // We cannot add Scenes to Nodes, for now.
        //
        // TODO: If someone extends Scene, constructor.name is different. We
        // need to catch those cases too, without using instanceof Scene in
        // order to avoid a circular dependency in this module.
        // Idea: maybe we can traverse the prototype chain looking for each
        // constructor.name.
        if (childNode.constructor.name == 'Scene') {
            throw new Error(`
                A Scene cannot currently be added to another Node.
                This may change in the future. For now, just mount
                a new Scene onto an HTMLElement (which can be the
                element held by a Node).
            `)
        }

        // Do nothing if the child Node is already added to this Node.
        //
        // After adding a Node to a parent using this imperative API, the
        // MotorHTMLNode ends up calling addChild on this Node's parent a second time
        // in the element's attachedCallback, but the code stops at this line (which is
        // good).
        // TODO: prevent the second call altogether.
        if (childNode._parent === this) return

        if (childNode._parent)
            childNode._parent.removeChild(childNode)

        // Add parent
        childNode._parent = this;

        // Add to children array
        this._children.push(childNode);

        // Pass this parent node's Scene reference (if any, checking this cache
        // first) to the new child and the child's children.
        //
        // NOTE: Order is important: this needs to happen after previous stuff
        // in this method, so that the childNode.scene getter works.
        if (childNode._scene || childNode.scene) {
            childNode._resolveScenePromise(childNode._scene)
            childNode._giveSceneRefToChildren()
        }

        this._mountChildElement(childNode)

        return this
    }

    /**
     * @private
     * This method to be called only when this Node has this.scene.
     * Resolves the _scenePromise for all children of the tree of this Node.
     */
    _giveSceneRefToChildren() {
        for (let childNode of this._children) {
            childNode._scene = this._scene
            childNode._resolveScenePromise(childNode._scene)
            childNode._giveSceneRefToChildren();
        }
    }

    /**
     * Add all the child nodes in the given array to this node.
     *
     * @param {Array.Node} nodes The nodes to add.
     */
    addChildren(nodes) {
        nodes.forEach(node => this.addChild(node))
        return this
    }

    /**
     * Remove a child node from this node. Silently fails if the node doesn't
     * exist, etc.
     *
     * XXX Should this be silent? Or should we throw?
     *
     * @param {Node} childNode The node to remove.
     */
    removeChild(childNode) {
        let thisHasChild = this._children.indexOf(childNode) >= 0

        if (childNode instanceof Node && thisHasChild) {
            childNode._parent = null
            childNode._scene = null // not part of a scene anymore.
            childNode._scenePromise = null // reset so that it can be awaited again for when the node is re-mounted.
            childNode._mounted = false
            childNode._mountPromise = null // reset so that it can be awaited again for when the node is re-mounted.

            // Remove from children array
            this._children.splice(this._children.indexOf(childNode), 1);

            this._detachElement(childNode)
        }

        return this
    }

    /**
     * Remove all the child nodes in the given array from this node.
     *
     * @param {Array.Node} nodes The nodes to remove.
     */
    removeChildren(nodes) {
        nodes.forEach(node => this.removeChild(node))
        return this
    }

    /**
     * @readonly
     * @return {number} How many children this Node has.
     */
    get childCount() {
        return this._children.length
    }

    _render(timestamp) {
        // applies the transform matrix to the element's style property.
        // TODO: We shouldn't need to re-calculate the whole matrix every render?
        this._setMatrix3d(this._calculateMatrix());

        // TODO move to DOMRenderer
        this._applySize()
        this._applyStyles()

        //this._renderChildren()

        return this
    }

    _mountChildElement(childNode) {
        // If Node's HTML element isn't mounted.. mount it.
        // TODO move to DOMRenderer
        if (! childNode._mounted) {
            if (childNode._parent) {

                // TODO: camera
                // Mount to parent if parent is a Node
                // if (childNode._parent instanceof Node) {
                    if (childNode._el.element.parentNode !== childNode._parent._el.element)
                        childNode._parent._el.element.appendChild(childNode._el.element);
                    childNode._mounted = true;

                // Mount to camera if top level Node
                // } else {
                //   //scene.camera.element.appendChild(childNode._el);
                //   childNode._mounted = true;
                // }
            }
        }
    }

    _detachElement(childNode) {
        // TODO: move this out, into DOMRenderer

        // XXX Only remove the childNode _el if it has an actual parent
        if (childNode._el.element.parentNode)
            childNode._el.element.parentNode.removeChild(childNode._el.element)
    }

    _renderChildren() {
        // Render Children
        // TODO: move this out, into DOMRenderer/WebGLRenderer:
        // We don't need to render children explicitly (recursing through the
        // tree) because the DOMRenderer or WebGLRenderer will know what to do
        // with nodes in the scene graph.
        // For example, in the case of the DOMRenderer, we only need to update
        // this Node's transform matrix, then the renderer figures out the rest
        // (i.e. the browser uses it's nested-DOM matrix caching). DOMRenderer
        // or WebGLRenderer can decide how to most efficiently update child
        // transforms and how to update the scene. Node._render here will be
        // just a way of updating the state of this Node only.
        for (let child of this._children) {
            child._render();
        }
    }

    /**
     * [applySize description]
     *
     * @method
     * @private
     * @memberOf Node
     */
    _applySize () {
        var mode = this._properties.sizeMode;
        var absolute = this._properties.absoluteSize;
        var proportional = this._properties.proportionalSize;

        if (mode.x === 'absolute')
            this._applyStyle('width', `${absolute.x}px`);
        else if (mode.x === 'proportional')
            this._applyStyle('width', `${proportional.x * 100}%`);

        if (mode.y === 'absolute')
            this._applyStyle('height', `${absolute.y}px`);
        else if (mode.y === 'proportional')
            this._applyStyle('height', `${proportional.y * 100}%`);

        //TODO z axis
        //if (mode.z === 'absolute')
            //this._applyStyle('height', `${absolute.z}px`);
        //else if (mode.z === 'proportional')
            //this._applyStyle('height', `${proportional.z * 100}%`);
    }

    /**
     * [applyTransform description]
     *
     * @method
     * @private
     * @memberOf Node
     *
     * TODO: instead of calculating the whole matrix here all at once (which
     * gets called each _render()), apply rotation, translation, etc, directly
     * to the matrix individually when the user gives us those values. It might be
     * more performant. It will also let the user apply x,y,z rotation in their
     * order of choice instead of always x,y,z order as we do here.
     */
    _calculateMatrix () {
        let matrix = new window.DOMMatrix

        let alignAdjustment = [0,0,0]
        if (this._parent) { // The root Scene doesn't have a parent, for example.
            let parentSize = this._parent.actualSize
            alignAdjustment[0] = parentSize.x * this._properties.align.x
            alignAdjustment[1] = parentSize.y * this._properties.align.y
            alignAdjustment[2] = parentSize.z * this._properties.align.z
        }

        let mountPointAdjustment = [0,0,0]
        let thisSize = this.actualSize
        mountPointAdjustment[0] = thisSize.x * this._properties.mountPoint.x
        mountPointAdjustment[1] = thisSize.y * this._properties.mountPoint.y
        mountPointAdjustment[2] = thisSize.z * this._properties.mountPoint.z

        let appliedPosition = []
        appliedPosition[0] = this._properties.position.x + alignAdjustment[0] - mountPointAdjustment[0]
        appliedPosition[1] = this._properties.position.y + alignAdjustment[1] - mountPointAdjustment[1]
        appliedPosition[2] = this._properties.position.z + alignAdjustment[2] - mountPointAdjustment[2]

        matrix.translateSelf(appliedPosition[0], appliedPosition[1], appliedPosition[2])

        // TODO: move by negative origin before rotating.
        // XXX Should we calculate origin here, or should we leave that to the
        // DOM renderer (in the style property)? WebGL renderer will need
        // manual calculations. Maybe we don't do it here, and delegate it to
        // DOM and WebGL renderers.

        // apply each axis rotation, in the x,y,z order.
        // XXX: Does order in which axis rotations are applied matter? If so,
        // which order is best? Maybe we let the user decide (with our
        // recommendation)?
        let rotation = this._properties.rotation
        matrix.rotateAxisAngleSelf(1,0,0, rotation.x)
        matrix.rotateAxisAngleSelf(0,1,0, rotation.y)
        matrix.rotateAxisAngleSelf(0,0,1, rotation.z)

        // TODO: move by positive origin after rotating.

        return matrix
    }

    /**
     * Apply the DOMMatrix value to the style of this Node's element.
     *
     * @private
     *
     * TODO We'll eventually apply the DOMMatrix directly instead of
     * converting to a string here.
     */
    _applyTransform () {
        var matrix = this._properties.transform;

        // XXX: is this in the right order? UPDATE: It is.
        // TODO: Apply DOMMatrix directly to the Element once browser APIs
        // support it. Maybe we can polyfill this?
        var cssMatrixString = `matrix3d(
            ${ matrix.m11 },
            ${ matrix.m12 },
            ${ matrix.m13 },
            ${ matrix.m14 },
            ${ matrix.m21 },
            ${ matrix.m22 },
            ${ matrix.m23 },
            ${ matrix.m24 },
            ${ matrix.m31 },
            ${ matrix.m32 },
            ${ matrix.m33 },
            ${ matrix.m34 },
            ${ matrix.m41 },
            ${ matrix.m42 },
            ${ matrix.m43 },
            ${ matrix.m44 }
        )`;

        this._applyStyle('transform', cssMatrixString);
    }

    /**
     * [applyStyle description]
     *
     * @method
     * @private
     * @memberOf Node
     * @param  {String} property [description]
     * @param  {String} value    [description]
     */
    _applyStyles () {
        for (let key of Object.keys(this._properties.style)) {
            this._applyStyle(key, this._properties.style[key]);
        }
    }

    /**
     * Apply a style property to this node's element.
     *
     * TODO: this will be moved into DOMRenderer.
     *
     * @private
     * @param  {string} property The CSS property we will a apply.
     * @param  {string} value    The value the CSS property wil have.
     */
    _applyStyle (property, value) {
        this._el.element.style[property] = value;
    }

    /**
     * [setMatrix3d description]
     *
     * @private
     * @param {DOMMatrix} matrix A DOMMatrix instance to set as this node's
     * transform. See "W3C Geometry Interfaces".
     */
    _setMatrix3d (matrix) {
        this._properties.transform = matrix
        // ^ TODO PERFORMANCE: What's faster? Setting a new DOMMatrix (as we do here
        // currently, the result of _calculateMatrix) or applying all
        // transform values to the existing DOMMatrix?

        this._applyTransform();
    }
}

function defaultZeros(array) {
    array[0] = array[0] || 0
    array[1] = array[1] || 0
    array[2] = array[2] || 0
    return array
}

function isRealNumber(num) {
    if (
        typeof num != 'number'
        || Object.is(num, NaN)
        || Object.is(num, Infinity)
    ) return false
    return true
}

// for use by MotorHTML, convenient since HTMLElement attributes are all
// converted to lowercase by default, so if we don't do this then we won't be
// able to map attributes to Node setters as easily.
makeLowercaseSetterAliases(Node.prototype)

if (Transformable && MotorHTMLNode)
    proxyGettersSetters(Transformable, MotorHTMLNode)

export {Transformable}
export {Node as default}
