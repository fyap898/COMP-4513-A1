const express = require('express');
const supa = require('@supabase/supabase-js');
const { pid } = require('process');
const app = express();
require('dotenv').config();


const supaUrl = process.env.SUPAURL;
const supaAnonKey = process.env.SUPAKEY;

const supabase = supa.createClient(supaUrl, supaAnonKey);

app.get('/api/eras', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('eras')
        .select();

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch eras."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No era is fetched."});
        } else 
            resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/galleries', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('galleries')
        .select();

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch galleries."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No gallery is fetched."});
        } else 
            resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/galleries/:ref', async (req, resp) => {
    const galleryId = req.params.ref;
    try{
        const {data, error} = await supabase
        .from('galleries')
        .select()
        .eq('galleryId', galleryId);

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch gallery with ID: " + galleryId + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No gallery with ID [" + galleryId + "] is fetched."});
        } else 
            resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/galleries/country/:cty', async (req, resp) => {
    const country = req.params.cty;
    try{
        const {data, error} = await supabase
        .from('galleries')
        .select()
        .ilike('galleryCountry', country + '%');

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch galleries with country begins with: " + country + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No gallery with country begins with [" + country + "] is fetched."});
        } else 
            resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/artists', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('artists')
        .select();

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch artists."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No artist is fetched."});
        } else 
            resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/artists/:ref', async (req, resp) => {
    const artistId = req.params.ref;
    try{
        const {data, error} = await supabase
        .from('artists')
        .select()
        .eq('artistId', artistId);

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch artist with ID: " + artistId + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No artist with ID [" + artistId + "] is fetched."});
        } else 
            resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/artists/search/:lname', async (req, resp) => {
    const lName = req.params.lname;
    try{
        const {data, error} = await supabase
        .from('artists')
        .select()
        .ilike('lastName', lName + '%');

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch artists with last name begins with: " + lName + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No artist with last name begins with [" + lName + "] is fetched."});
        } else 
            resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/artists/country/:cty', async (req, resp) => {
    const nationality = req.params.cty;
    try{
        const {data, error} = await supabase
        .from('artists')
        .select()
        .ilike('nationality', nationality + '%');

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch artists with nationality begins with: " + nationality + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No artist with nationality begins with [" + nationality + "] is fetched."});
        } else 
            resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/paintings', async (req, resp) => {

    try{
        const {data, error} = await supabase
        .from('paintings')
        .select(`paintingId, artists(*), galleries(*), imageFileName, title, shapeId, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations`)
        .order('title', {ascending: true});

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch paintings."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No painting is fetched."});
        } else 
            resp.send(data);

    } catch(err) {
            console.error("Unexpected error: ", err);
            return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/paintings/sort/:query', async (req, resp) => {
    const query = req.params.query;
    try{
        if(query === "title")
        {
            const {data, error} = await supabase
            .from('paintings')
            .select(`paintingId, artists(*), galleries(*), imageFileName, title, shapeId, museumLink, 
                accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, 
                cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations`)
            .order('title', {ascending: true});

            if(error){
                console.error(error);
                return resp.status(400).json({success: false, message:"Failed to fetch paintings."});
            } else if(!data.length){
                return resp.status(404).json({ success: false, message: "No painting is fetched."});
            } else 
                resp.send(data);

        } else if(query === "year")
        {
            const {data, error} = await supabase
            .from('paintings')
            .select(`paintingId, artists(*), galleries(*), imageFileName, title, shapeId, museumLink, 
                accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, 
                cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations`)
            .order('yearOfWork', {ascending: true});

            if(error){
                console.error(error);
                return resp.status(400).json({success: false, message:"Failed to fetch paintings."});
            } else if(!data.length){
                return resp.status(404).json({ success: false, message: "No painting is fetched."});
            } else 
                resp.send(data);
        } else{
            return resp.status(404).json({ success: false, message: "Invalid key input, make sure input key is correct, either title or year."});
        }
    } catch(err) {
            console.error("Unexpected error: ", err);
            return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/paintings/:ref', async (req, resp) => {
    const paintingId = req.params.ref;
    try{
        const {data, error} = await supabase
        .from('paintings')
        .select(`paintingId, artists(*), galleries(*), imageFileName, title, shapeId, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations`)
        .eq('paintingId', paintingId)
        .order('title', {ascending: true});

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch painting with ID: " + paintingId + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No painting with ID: [" + paintingId + "] is fetched."});
        } else 
            resp.send(data);

    } catch(err) {
            console.error("Unexpected error: ", err);
            return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/paintings/search/:title', async (req, resp) => {
    const match = req.params.title;
    try{
        const {data, error} = await supabase
        .from('paintings')
        .select(`paintingId, artists(*), galleries(*), imageFileName, title, shapeId, museumLink, accessionNumber, 
            copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, 
            wikiLink, jsonAnnotations`)
        .ilike('title', '%' + match + '%')
        .order('title', {ascending: true});

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch paintings with title contains: " + match + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No painting with title contains [" + match + "] is fetched."});
        } else 
            return resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/paintings/years/:start/:end', async (req, resp) => {
    const start = parseInt(req.params.start);
    const end = parseInt(req.params.end);
    if(Number.isInteger(start) && Number.isInteger(end))
    {
        if(start < end)
        {
            try{
                const {data, error} = await supabase
                .from('paintings')
                .select(`paintingId, artists(*), galleries(*), imageFileName, title, shapeId, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations`)
                .lte('yearOfWork', end)
                .gte('yearOfWork', start)
                .order('yearOfWork', {ascending: true});

                if(error){
                    console.error(error);
                    return resp.status(400).json({success: false, message:"Failed to fetch paintings between year " + start +  " and year " + end + "."});
                } else if(!data.length){
                    return resp.status(404).json({ success: false, message: "No painting between year [" + start + "] and year [" + end + "] is fetched."});
                } else 
                    return resp.send(data);

            } catch(err) {
                console.error("Unexpected error: ", err);
                return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
            }

        } else 
            return resp.status(404).json({ success: false, message: "Invalid year input, /api/years/start/end, 'end' year must greater than 'start' year."});
    } else
        return resp.status(404).json({ success: false, message: "Invalid year input, ensure input year is integer only."});

});

app.get('/api/paintings/galleries/:ref', async (req, resp) => {
    const galleryId = req.params.ref;
    try{
        const {data, error} = await supabase
        .from('paintings')
        .select(`paintingId, artists(*), galleries(*), imageFileName, title, shapeId, museumLink, accessionNumber, 
            copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, 
            wikiLink, jsonAnnotations`)
        .eq('galleryId', galleryId)
        .order('title', {ascending: true});

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch painting in gallery with ID: " + galleryId + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No painting in gallery with ID: [" + galleryId + "] is fetched."});
        } else 
            return resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/paintings/artist/:ref', async (req, resp) => {
    const artistId = req.params.ref;
    try{
        const {data, error} = await supabase
        .from('paintings')
        .select(`paintingId, artists(*), galleries(*), imageFileName, title, shapeId, museumLink, accessionNumber, 
            copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, 
            wikiLink, jsonAnnotations`)
        .eq('artistId', artistId)
        .order('title', {ascending: true});

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch paintings by artist with ID: " + artistId + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No paintings by artist with ID: [" + artistId + "] is fetched."});
        } else 
            return resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/paintings/artists/country/:cty', async (req, resp) => {
    const match = req.params.cty;
    try{
        const {data, error} = await supabase
        .from('paintings')
        .select(`paintingId, artists!inner(*), galleries(*), imageFileName, title, shapeId, museumLink, accessionNumber, 
            copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription,
            wikiLink, jsonAnnotations`)
        .ilike('artists.nationality', match + '%')
        .order('title', {ascending: true});

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch paintings by artists with nationality begins with: " + match + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No paintings by artists with nationality begins with [" + match + "] is fetched."});
        } else 
            return  resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/genres', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('genres')
        .select(`genreId, genreName, description, wikiLink, eras(*)`)

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch genres."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No genre is fetched."});
        } else 
            return resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/genres/:ref', async (req, resp) => {
    const genreId = req.params.ref;
    try{
        const {data, error} = await supabase
        .from('genres')
        .select('genreId, genreName, description, wikiLink, eras(*)')
        .eq('genreId', genreId);

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch genre with ID: " + genreId + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No genre with ID: [" + genreId + "] is fetched."});
        } else 
            return resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/genres/painting/:ref', async (req, resp) => {
    const paintingId = req.params.ref;
    try{
        const {data, error} = await supabase
        .from('genres')
        .select(`genreId, genreName, eras(*), description, wikiLink, paintinggenres!inner(paintingId, painting:paintings(*))`)
        .eq('paintinggenres.paintingId', paintingId)
        .order('genreName', {ascending: true});

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch genre used in painting with ID: " + paintingId + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "Genre used in painting with ID: [" + paintingId + "] is not fetched."});
        } else 
            return resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/paintings/genre/:ref', async (req, resp) => {
    const genreId = req.params.ref;
    try{
        const {data, error} = await supabase
        .from('paintinggenres')
        .select('paintings!paintingId(paintingId, title, yearOfWork)')
        .eq('genreId', genreId)
        .order('paintings(yearOfWork)', {ascending: true});

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch paintings with genre ID: " + genreId + "."});
        } else if(!data.length){
            return resp.status(404).json({ success: false, message: "No painting with genre ID: [" + genreId + "] is fetched."});
        } else 
            return resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/paintings/era/:ref', async (req, resp) => {
    const eraId = req.params.ref;
    try{
        const genres = await supabase
        .from('genres')
        .select('genreId')
        .eq('eraId', eraId);

        if(genres.error){
            console.error("Error fetching era: ", err);
            resp.status(500).send("Error fetching era");
        }

        const genreId = genres.data.map(g => g.genreId)
        const {data, error} = await supabase
        .from('paintinggenres')
        .select('paintings!paintingId(paintingId, title, yearOfWork)')
        .in('genreId', genreId)
        .order('paintings(yearOfWork)', {ascending: true});

        if(error){
            console.error(error);
            return resp.status(400).json({success: false, message:"Failed to fetch paintings with era ID: " + eraId + "."});
        } else if(!data.length){
             return resp.status(404).json({ success: false, message: "No painting with era ID: [" + eraId + "] is fetched."});
        } else 
            return resp.send(data);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/counts/genres', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('paintinggenres')
        .select('genreId', 'paintingId');

        if(error){
            console.error("Error fetching painting genres: ", error);
            return resp.status(500).send("failure to fetch painting genres");
        }

        const paintingCount = {};
        data.forEach(item => {
            paintingCount[item.genreId] = (paintingCount[item.genreId] || 0) + 1;
        });

        const genreIds = Object.keys(paintingCount);   // gives an array of keys

        const genreNames = await supabase
        .from('genres')
        .select('genreId, genreName')
        .in('genreId', genreIds);

        if (genreNames.error || !genreNames.data) {
            console.error('Error fetching genre names:', genreNames.error);
            return resp.status(500).json({success : false, message: 'Failed to fetch genre names', error: genreNames.error});
        }

        const result = genreNames.data.map(g => ({
            genre : g.genreName,
            count : paintingCount[g.genreId]
        })).sort((a,b) => a.count - b.count);

        resp.send(result);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

app.get('/api/counts/artists', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('paintings')
        .select('paintingId, artistId')

        if(error) {
            console.error("Error fetching painting artists: ", error);
            return resp.status(500).send("failure to fetch painting artists");
        }

        const paintingCount = {};
        data.forEach(item => {
            paintingCount[item.artistId] = (paintingCount[item.artistId] || 0) + 1;
        });

        const artistIds = Object.keys(paintingCount);

        const artistNames = await supabase
        .from('artists')
        .select('artistId, firstName, lastName')
        .in('artistId', artistIds);

        if (artistNames.error || !artistNames.data) {
            console.error('Error fetching artist names:', artistNames.error);
            return resp.status(500).json({success: false, message: 'Failed to fetch artist names', error: artistNames.error});
        }

        const result = artistNames.data.map(a => ({
            artist: a.firstName + ' ' + a.lastName,
            count: paintingCount[a.artistId]
        })).sort((a,b) => b.count - a.count);

        resp.send(result);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/counts/topgenres/:ref', async (req, resp) => {
    const atLeast = req.params.ref;
    try{
        const {data, error} = await supabase
        .from('paintinggenres')
        .select('genreId', 'paintingId');

        if(error){
            console.error("Error fetching painting genres: ", error);
            return resp.status(500).send("failure to fetch painting genres");
        }

        const paintingCount = {};
        data.forEach(item => {
            paintingCount[item.genreId] = (paintingCount[item.genreId] || 0) + 1;
        });
        const filteredCount = {};
        data.forEach(item => {
            if(paintingCount[item.genreId] >= atLeast)
                filteredCount[item.genreId] = paintingCount[item.genreId];
        })

        const genreIds = Object.keys(filteredCount);

        const genreNames = await supabase
        .from('genres')
        .select('genreId, genreName')
        .in('genreId', genreIds);

        if (genreNames.error || !genreNames.data) {
            console.error('Error fetching genre names:', genreNames.error);
            return resp.status(500).json({success: false, message: 'Failed to fetch genre names', error: genreNames.error});
        }

        const result = genreNames.data.map(g => ({
            genre : g.genreName,
            count : paintingCount[g.genreId]
        })).sort((a,b) => b.count - a.count);

        resp.send(result);

        } catch(err) {
            console.error("Unexpected error: ", err);
            return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
        }
});


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