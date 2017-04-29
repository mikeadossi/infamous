let instance = null

class DOMRenderer {
    constructor() {
        this.scenes = new Set
    }

    addScene(scene) {
        this.scenes.add(scene)
    }
}

function getDOMRenderer() {
    if (!instance) instance = new DOMRenderer
    return instance
}

// We could return ta singleton instance, but we don't want to instantiate it
// if DOM rendering isn't needed, so we export the factory function tobe used
// if needed.
export default getDOMRenderer
