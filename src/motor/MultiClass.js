// just an idea: multiple inheritance...
class MultiClass {
    constructor(...args) {
        let constructorName = ''

        this._prototypes = []

        for (let [constructor, index] of args) {
            constructorName += constructor.name + (index == args.length-1 ? '' : '_')
            args[args.length - 1 - index]
        }

        let tmp = {
            [constructorName]() {
                for (let constructor of args) {
                    console.log(constructor)
                }
            }
        }

        return tmp[constructorName]
    }
}
// let multiClass = new MultiClass(ImperativeBase, Transformable)
// console.log(multiClass)

export {MultiClass as default}
