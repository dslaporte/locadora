//Classe customer
class Customer {
    //construtor da classe, que permite inicializá-la
    //passando atributos para uso interno
    constructor(id, name, cpf, birthday) {
        this.id = id
        this.name = name
        this.cpf = cpf
        this.birthday = birthday
        this.active = true
        this.created_at = new Date()
    }
}

//Exporta a classe Customer
module.exports = Customer