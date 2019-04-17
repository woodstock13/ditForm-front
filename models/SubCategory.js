class SubCategory extends Category{
    constructor(id,nom) {
        id = id
        name = nom
        let map = new Map() 
    }

    get id() {return id} ;
    get name() {return name} ;

    get nbQ() {
        return this.map.size()
    }
    addQ(subCategory) {
        map.set(subCategory.id, subCategory.name)
    }

}