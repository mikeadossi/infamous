import ImperativeBase from './ImperativeBase'
import XYZValues from './XYZValues'

// Transformable doesn't need to extend my ImperativeBase class, but there isn't
// multiple inheritance in JavaSript out of the box, and Node needs to have the
// properties of ImperativeBase and Transformable, while Scene will extend from
// ImperativeBase.
//
// TODO: Make a multiple-inheritance tool so that Node can extend from both
// ImperativeBase and Transformable
class Transformable extends ImperativeBase {
    constructor(initialProperties = {}, _motorHtmlNode) {
        super()

        // Property Cache, with default values
        this._properties = {

            // XXX: remove these in favor of storing them directly in the
            // DOMMatrix?
            position: new XYZValues(0, 0, 0),
            rotation: new XYZValues(0, 0, 0),

            // TODO: handle scale
            scale: new XYZValues(1, 1, 1),

            // TODO, handle origin, needs a setter/getter pair.
            origin: new XYZValues(0.5, 0.5, 0.5),

            align: new XYZValues(0, 0, 0),
            mountPoint: new XYZValues(0, 0, 0),
            sizeMode: new XYZValues('absolute', 'absolute', 'absolute'),
            absoluteSize: new XYZValues(0, 0, 0),
            proportionalSize: new XYZValues(1, 1, 1),

            transform: new window.DOMMatrix,

            style: {
                opacity: 1,
            },
        };

        const self = this
        const propertyChange = function() {
            self._needsToBeRendered()
        }
        this._properties.position.onChanged = propertyChange
        this._properties.rotation.onChanged = propertyChange
        this._properties.scale.onChanged = propertyChange
        this._properties.origin.onChanged = propertyChange
        this._properties.align.onChanged = propertyChange
        this._properties.mountPoint.onChanged = propertyChange
        this._properties.sizeMode.onChanged = propertyChange
        this._properties.absoluteSize.onChanged = propertyChange
        this._properties.proportionalSize.onChanged = propertyChange

        this.properties = initialProperties
    }

    /**
     * Set the position of the Transformable.
     *
     * @param {Object} newValue
     * @param {number} [newValue.x] The x-axis position to apply.
     * @param {number} [newValue.y] The y-axis position to apply.
     * @param {number} [newValue.z] The z-axis position to apply.
     */
    set position(newValue) {
        if (!(newValue instanceof Object))
            throw new TypeError('Invalid value for Transformable#position.')

        if (typeof newValue.x != 'undefined') this._properties.position._x = newValue.x
        if (typeof newValue.y != 'undefined') this._properties.position._y = newValue.y
        if (typeof newValue.z != 'undefined') this._properties.position._z = newValue.z

        this._needsToBeRendered()
    }
    get position() {
        return this._properties.position
    }

    /**
     * @param {Object} newValue
     * @param {number} [newValue.x] The x-axis rotation to apply.
     * @param {number} [newValue.y] The y-axis rotation to apply.
     * @param {number} [newValue.z] The z-axis rotation to apply.
     *
     * XXX: We should we also provide a setRotationAxis method to rotate about
     * a particular axis? Or, maybe if a fourth `w` property is specified then
     * x, y, and z can define a rotation axis and w be the angle.
     */
    set rotation(newValue) {
        if (!(newValue instanceof Object))
            throw new TypeError('Invalid value for Node#rotation.')

        if (typeof newValue.x != 'undefined') this._properties.rotation._x = newValue.x
        if (typeof newValue.y != 'undefined') this._properties.rotation._y = newValue.y
        if (typeof newValue.z != 'undefined') this._properties.rotation._z = newValue.z

        this._needsToBeRendered()
    }
    get rotation() {
        return this._properties.rotation
    }

    /**
     * @param {Object} newValue
     * @param {number} [newValue.x] The x-axis scale to apply.
     * @param {number} [newValue.y] The y-axis scale to apply.
     * @param {number} [newValue.z] The z-axis scale to apply.
     *
     * TODO: scale is not handled yet.
     */
    set scale(newValue) {
        if (!(newValue instanceof Object))
            throw new TypeError('Invalid value for Node#scale.')

        if (typeof newValue.x != 'undefined') this._properties.scale._x = newValue.x
        if (typeof newValue.y != 'undefined') this._properties.scale._y = newValue.y
        if (typeof newValue.z != 'undefined') this._properties.scale._z = newValue.z

        this._needsToBeRendered()
    }
    get scale() {
        return this._properties.scale
    }

    /**
     * Set this Node's opacity.
     *
     * @param {number} opacity A floating point number between 0 and 1
     * (inclusive). 0 is fully transparent, 1 is fully opaque.
     */
    set opacity(opacity) {
        if (!isRealNumber(opacity)) throw new Error('Expected a real number for Node#opacity.')
        this._properties.style.opacity = opacity;
        this._needsToBeRendered()
    }
    get opacity() {
        return this._properties.style.opacity
    }

    /**
     * Set the size mode for each axis. Possible size modes are "absolute" and "proportional".
     *
     * @param {Object} newValue
     * @param {number} [newValue.x] The x-axis sizeMode to apply.
     * @param {number} [newValue.y] The y-axis sizeMode to apply.
     * @param {number} [newValue.z] The z-axis sizeMode to apply.
     */
    set sizeMode(newValue) {
        if (!(newValue instanceof Object))
            throw new TypeError('Invalid value for Node#sizeMode.')

        if (typeof newValue.x != 'undefined') this._properties.sizeMode._x = newValue.x
        if (typeof newValue.y != 'undefined') this._properties.sizeMode._y = newValue.y
        if (typeof newValue.z != 'undefined') this._properties.sizeMode._z = newValue.z

        this._needsToBeRendered()
    }
    get sizeMode() {
        return this._properties.sizeMode
    }

    /**
     * @param {Object} newValue
     * @param {number} [newValue.x] The x-axis absoluteSize to apply.
     * @param {number} [newValue.y] The y-axis absoluteSize to apply.
     * @param {number} [newValue.z] The z-axis absoluteSize to apply.
     */
    set absoluteSize(newValue) {
        if (!(newValue instanceof Object))
            throw new TypeError('Invalid value for Node#absoluteSize.')

        if (typeof newValue.x != 'undefined') this._properties.absoluteSize._x = newValue.x
        if (typeof newValue.y != 'undefined') this._properties.absoluteSize._y = newValue.y
        if (typeof newValue.z != 'undefined') this._properties.absoluteSize._z = newValue.z

        this._needsToBeRendered()
    }
    get absoluteSize() {
        return this._properties.absoluteSize
    }

    /**
     * Get the actual size of the Node. This can be useful when size is
     * proportional, as the actual size of the Node depends on querying the DOM
     * for the size of the Node's DOM element relative to it's parent.
     *
     * @readonly
     *
     * @return {Array.number} An Oject with x, y, and z properties, each
     * property representing the computed size of the x, y, and z axes
     * respectively.
     *
     * TODO: traverse up the tree to find parent size when this Node's size is
     * proportional?
     */
    get actualSize() {
        let actualSize = {}

        if (this._properties.sizeMode.x === 'absolute') {
            actualSize.x = this._properties.absoluteSize.x
        }
        else if (this._properties.sizeMode.x === 'proportional') {
            // TODO: avoid getComputedStyle as it causes a layout thrash.
            actualSize.x = parseInt(getComputedStyle(this._el.element).getPropertyValue('width'))
        }

        if (this._properties.sizeMode.y === 'absolute') {
            actualSize.y = this._properties.absoluteSize.y
        }
        else if (this._properties.sizeMode.y === 'proportional') {
            actualSize.y = parseInt(getComputedStyle(this._el.element).getPropertyValue('height'))
        }

        if (this._properties.sizeMode.z === 'absolute') {
            actualSize.z = this._properties.absoluteSize.z
        }
        else if (this._properties.sizeMode.z === 'proportional') {
            //actualSize.z = parseInt(getComputedStyle(this._el.element).getPropertyValue('height'))
            actualSize.z = 0 // TODO
        }

        return actualSize
    }

    /**
     * Set the size of a Node proportional to the size of it's parent Node. The
     * values are a real number between 0 and 1 inclusive where 0 means 0% of
     * the parent size and 1 means 100% of the parent size.
     *
     * @param {Object} newValue
     * @param {number} [newValue.x] The x-axis proportionalSize to apply.
     * @param {number} [newValue.y] The y-axis proportionalSize to apply.
     * @param {number} [newValue.z] The z-axis proportionalSize to apply.
     */
    set proportionalSize(newValue) {
        if (!(newValue instanceof Object))
            throw new TypeError('Invalid value for Node#proportionalSize.')

        if (typeof newValue.x != 'undefined') this._properties.proportionalSize._x = newValue.x
        if (typeof newValue.y != 'undefined') this._properties.proportionalSize._y = newValue.y
        if (typeof newValue.z != 'undefined') this._properties.proportionalSize._z = newValue.z

        this._needsToBeRendered()
    }
    get proportionalSize() {
        return this._properties.proportionalSize
    }

    /**
     * Set the alignment of the Node. This determines at which point in this
     * Node's parent that this Node is mounted.
     *
     * @param {Object} newValue
     * @param {number} [newValue.x] The x-axis align to apply.
     * @param {number} [newValue.y] The y-axis align to apply.
     * @param {number} [newValue.z] The z-axis align to apply.
     */
    set align(newValue) {
        if (!(newValue instanceof Object))
            throw new TypeError('Invalid value for Node#align.')

        if (typeof newValue.x != 'undefined') this._properties.align._x = newValue.x
        if (typeof newValue.y != 'undefined') this._properties.align._y = newValue.y
        if (typeof newValue.z != 'undefined') this._properties.align._z = newValue.z

        this._needsToBeRendered()
    }
    get align() {
        return this._properties.align
    }

    /**
     * Set the mount point of the Node. TODO: put "mount point" into words.
     *
     * XXX possibly rename to "anchor" to avoid confusion with Scene.mount?
     * Could also segway to anchors system like Qt QML.
     *
     * @param {Object} newValue
     * @param {number} [newValue.x] The x-axis mountPoint to apply.
     * @param {number} [newValue.y] The y-axis mountPoint to apply.
     * @param {number} [newValue.z] The z-axis mountPoint to apply.
     */
    set mountPoint(newValue) {
        if (!(newValue instanceof Object))
            throw new TypeError('Invalid value for Node#mountPoint.')

        if (typeof newValue.x != 'undefined') this._properties.mountPoint._x = newValue.x
        if (typeof newValue.y != 'undefined') this._properties.mountPoint._y = newValue.y
        if (typeof newValue.z != 'undefined') this._properties.mountPoint._z = newValue.z

        this._needsToBeRendered()
    }
    get mountPoint() {
        return this._properties.mountPoint
    }

    /**
     * Set all properties of the Node in one method.
     *
     * XXX: Should we change size so it matches structure here and on the node?
     *
     * @param {Object} properties Properties object - see example
     *
     * @example
     * node.properties = {
     *   classes: ['open'],
     *   position: [200, 300, 0],
     *   rotation: [3, 0, 0],
     *   scale: [1, 1, 1],
     *   size: {
     *     mode: ['absolute', 'proportional'],
     *     absolute: [300, null],
     *     proportional: [null, .5]
     *   },
     *   opacity: .9
     * }
     */
    set properties (properties = {}) {
        // Classes
        if (properties.classes)
            this._el.setClasses(properties.classes);

        // Position
        if (properties.position)
            this.position = properties.position

        // Rotation
        if (properties.rotation)
            this.rotation = properties.rotation

        // Scale
        if (properties.scale)
            this.scale = properties.scale

        // Align
        if (properties.align)
            this.align = properties.align

        // Size Modes
        if (properties.sizeMode)
            this.sizeMode = properties.sizeMode

        // Absolute Size
        if (properties.absoluteSize)
            this.absoluteSize = properties.absoluteSize

        // Proportional Size
        if (properties.proportionalSize)
            this.proportionalSize = properties.proportionalSize

        // Opacity
        if (properties.style) {
            if (typeof properties.style.opacity != 'undefined')
                this.opacity = properties.opacity
        }

        this._needsToBeRendered()
    }
    // no need for a properties getter.

    async _needsToBeRendered() {
        Motor._setNodeToBeRendered(this)

        // TODO: Move this logic into Motor? (Maybe in the _setNodeToBeRendered method).
        if (!Motor._inFrame) Motor._startAnimationLoop()
    }
}

export {Transformable as default}
