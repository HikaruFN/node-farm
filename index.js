//Import module
const fs = require('fs')
const http = require('http');
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')

//Reading Templates
const tempOverview = fs.readFileSync('./template-overview.html','utf-8')
const tempProduct = fs.readFileSync('./template-product.html','utf-8')
const tempCard = fs.readFileSync('./template-card.html','utf-8')

//Reading API
const data = fs.readFileSync('./data.json','utf-8');
const dataObject = JSON.parse(data)

//Server
//Create Server
const server = http.createServer((request, response) => { 
    
    const {pathname, query} = url.parse(request.url, true) //true? trasforma la query in un oggetto {pathname, query} crea della variabili con gli stessi valori degli elementi con nome corrispondenti

    if ( pathname === '/' || pathname === '/overview' ) {
            const cardsHtml = dataObject.map( el => replaceTemplate(tempCard,el)).join('') //join() concatena gli elementi del nuovo array in un'unica stringa
            const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)
            response.end(output)

    }else if( pathname === '/product' ){
        response.end(tempProduct)
    }else if ( pathname === '/api') {
        response.end(data) //Showing Api content
    }else{
        response.writeHead(404, 'Error 404') //Status code, Status Message, Headers
        response.end('Page not found!')
    }

}) //Funzione eseguite ogni volta che una nuova richiesta arriva al server
//
server.listen(8000, '127.0.0.1', ()=>{ //(Porta, Il localhost ha l'indirizzo IP 127.0.0.1, che fa riferimento al server sul proprio computer.), callback function
    console.log('Listening to requests on port 8000' + ' ' + 'visit: http://127.0.0.1:8000/');
}) //Quando avvii lo script puoi visitare questo indirizzo: http://127.0.0.1:8000/

