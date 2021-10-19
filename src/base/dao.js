class DAO {

    //new = Instancia uma nova classe
    constructor (model) {
        this.model = model
    }

    create(object) {
        this.model.push(object)
        return object
    }

    findOne(id) {
        return this.model.find(x => x.id == id)
    }

    findAll() {
        return this.model
    }

    update(updatedObject, id) {
        const idx = this.model.findIndex(x => x.id == id)
        this.model[idx] = updatedObject
        return this.model.find(x => x.id == id)
    }

    destroy(id) {
        const idx = this.model.findIndex(x => x.id == id)
        this.model.splice(idx, 1)
    }
}

module.exports = DAO