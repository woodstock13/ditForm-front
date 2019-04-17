'use strict';
/* 
    Une catégorie est composés d'un nombre défini de questins
*/
export default class Category {
    constructor(id,nom) {
        id = id
        name = nom
        let map = new Map() 
    }

    get id() {return id} ;
    get name() {return name} ;

    get nbSubCat() {
        return this.subCategories.size
    }
    addSubCat(subCategory) {
        map.set(subCategory.id, subCategory.name)
    }
}