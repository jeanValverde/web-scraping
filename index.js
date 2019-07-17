const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');

const lista = [];

var express = require('express')
var app = express()

app.get('/', function (req, res) {

  request(
    `http://www.sismologia.cl/links/tabla.html`,
    (error, response, data) => {

      const $ = cheerio.load(data);
       var cont1 = 1;
       $('tr').each(function (i, e) {
        var url = $(this).text();
        lista.push({"id": cont1, "detalle": url});
        cont1++;
      });

     res.send(lista)

    }
  );
})



app.get('/github', function (req, res) {
  const github = [];
  request(
    `https://github.com/trending`,
    (error, response, data) => {

      const $ = cheerio.load(data);
       var cont1 = 1;
       $('article').each(function (i, e) {
        var url = $(this).text();
        var sin_salto = url.split("\n").join("");
        var sin_espacio = url.split(" ").join("");
        sin_espacio = sin_espacio.replace(/(?:\r\n|\r|\n)/g, ' ');
        github.push({"id": cont1, "repositorios": sin_espacio});
        cont1++;
      });

     console.log(github[0]);

     res.send(github)

    }
  );
})



app.get('/twitter', function (req, res) {
  const github = [];
  request(
    `https://twitter.com/search?f=tweets&vertical=default&q=%22Karol%20Dance%22&src=tren&lang=es`,
    (error, response, data) => {

      const $ = cheerio.load(data);
       var cont1 = 1;
       $('div.stream>ol').each(function (i, e) {
        var url = $(this).text();
        github.push({"id": cont1, "url": url});
        cont1++;
      });

     console.log(github[0]);

     res.send(github)

    }
  );
})



app.get('/ripley', function (req, res) {

  const ripley = [];

  request(
    `https://simple.ripley.cl/tecno/cyber/impresion-y-almacenamiento?bx4-electro-tecno-accesorios-computacion`,
    (error, response, data) => {

      const $ = cheerio.load(data);
       var cont1 = 1;

       $('.catalog-container').each(function (i, e) {
         var url = $(this).text();
         ripley.push({"id": cont1, "url": url});
         cont1++;
       });

     res.send(ripley)

    }
  );

})



app.listen(3000)



/**
 *
 *
 *
 request(
   `https://simple.ripley.cl/tecno/cyber/impresion-y-almacenamiento?bx4-electro-tecno-accesorios-computacion`,
   (error, response, data) => {
     const $ = cheerio.load(data);
     $('.catalog-container').each(function (i, e) {
      console.log($(this).text()  + '\n' );
   });
   }
 );



 request(
   `https://twitter.com/hashtag/Bienvenidos13?src=tren&lang=es`,
   (error, response, data) => {
     const $ = cheerio.load(data);
     $('li').each(function (i, e) {
      console.log($(this).text()  + '\n' );
   });
   }
 );

 *
 *
 */
