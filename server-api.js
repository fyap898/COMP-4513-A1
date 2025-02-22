const express = require('express');
const app = express();
require('dotenv').config();

const routerMisc = require('./misc.js');
routerMisc.allEras(app);
routerMisc.allGalleries(app);
routerMisc.galleryCountry(app);
routerMisc.galleryId(app);

const routerArtist = require('./scripts/artist.js');
routerArtist.allArtist(app);
routerArtist.artistId(app);
routerArtist.artistLName(app);
routerArtist.artistNation(app);

const routerPainting = require('./scripts/painting.js');
routerPainting.allPainting(app);
routerPainting.paintingId(app);
routerPainting.paintingInGallery(app);
routerPainting.paintingByArtistId(app);
routerPainting.paintingByArtistCountry(app);
routerPainting.sortPaintingTitleYear(app);
routerPainting.searchpaintingTitle(app);
routerPainting.betweenYearPainting(app);

const routerGenre = require('./scripts/genre.js');
routerGenre.allGenre(app);
routerGenre.genreId(app);
routerGenre.genreByPaintingId(app);

const routerPaintingBy = require('./scripts/paintingby.js');
routerPaintingBy.byGenreId(app);
routerPaintingBy.byEraId(app);

const routerCount = require('./scripts/count.js');
routerCount.genreCount(app);
routerCount.artistCount(app);
routerCount.genreAtLeast(app);


port = process.env.PORT;
app.listen(port, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/api/eras');

    console.log('http://localhost:8080/api/galleries');
    console.log('http://localhost:8080/api/galleries/30');
    console.log('http://localhost:8080/api/galleries/country/fra');

    console.log('http://localhost:8080/api/artists');
    console.log('http://localhost:8080/api/artists/12');
    console.log('http://localhost:8080/api/artists/search/ma');
    console.log('http://localhost:8080/api/artists/country/fra');

    console.log('http://localhost:8080/api/paintings');
    console.log('http://localhost:8080/api/paintings/sort/year');
    console.log('http://localhost:8080/api/paintings/sort/title');
    console.log('http://localhost:8080/api/paintings/63');
    console.log('http://localhost:8080/api/paintings/search/port');
    console.log('http://localhost:8080/api/paintings/years/1800/1850');
    console.log('http://localhost:8080/api/paintings/years/1850/1800');
    console.log('http://localhost:8080/api/paintings/galleries/5');
    console.log('http://localhost:8080/api/paintings/artist/16');
    console.log('http://localhost:8080/api/paintings/artists/country/ital');

    console.log('http://localhost:8080/api/genres');
    console.log('http://localhost:8080/api/genres/76');
    console.log('http://localhost:8080/api/genres/painting/408');

    console.log('http://localhost:8080/api/paintings/genre/78');
    console.log('http://localhost:8080/api/paintings/era/2');

    console.log('http://localhost:8080/api/counts/genres');
    console.log('http://localhost:8080/api/counts/artists');
    console.log('http://localhost:8080/api/counts/topgenres/20');

});