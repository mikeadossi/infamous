
shadowTests()
function shadowTests() {
    function shadowType(shadowRoot) {
        if (!shadowRoot) {
            // closed shadow dom does not appear to have a shadowRoot...
            // It could be assumed that it is v1, but for now return undefined
            return;
        }

        const content = document.createElement('content');
        // In browsers that support v1, but not v0 (ex: Safari)
        if (!content.getDistributedNodes) {
            return 'v1';
        }

        content.setAttribute('select', 'test-shadow-dom-version');
        shadowRoot.appendChild(content);

        const testElement = document.createElement('test-shadow-dom-version');
        shadowRoot.host.appendChild(testElement);
        const type = (content.getDistributedNodes().length) ? 'v0' : 'v1';
        shadowRoot.removeChild(content);
        shadowRoot.host.removeChild(testElement);

        return type;
    }

    const div = document.createElement('div')
    //const root = div.attachShadow({mode: 'open'})
    const root = div.createShadowRoot()
    console.log('shadow type:', shadowType(root))
}
