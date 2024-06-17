//Export funzione anonima
module.exports = (temp,product) => {
    //Uso una varibaile perchè trattare direttamente l'argomento di una funzione è una bad practice
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName) //.replace() ricerca una stringa e la sostituisce con un'altra  DETTAGLIO:/stringa/g cambia tutte le stringhe, non solo la prima che trova
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%ID%}/g, product.id)
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    }else if(product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, 'card__detail--organic')
    }
    return output
}