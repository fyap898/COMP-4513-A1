const express = require('express');
const supa = require('@supabase/supabase-js');
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

        if(error)
            console.log(error)

        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/galleries', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('galleries')
        .select();

        if(error)
            console.log(error)

        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/galleries/:ref', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('galleries')
        .select()
        .eq('galleryId', req.params.ref);

        if(error)
            console.log(error)

        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/galleries/country/:cty', async (req, resp) => {
    country = req.params.cty + '%';
    try{
        const {data, error} = await supabase
        .from('galleries')
        .select()
        .ilike('galleryCountry', country);

        if(error)
            console.log(error)

        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/artists', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('artists')
        .select();

        if(error)
            console.log(error)

        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/artists/:ref', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('artists')
        .select()
        .eq('artistId', req.params.ref);

        if(error)
            console.log(error)

        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/artists/search/:lname', async (req, resp) => {
    lName = req.params.lname + '%'

    try{
        const {data, error} = await supabase
        .from('artists')
        .select()
        .ilike('lastName', lName);

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

// might change
app.get('/api/artists/nation/:cty', async (req, resp) => {
    nationality = req.params.cty + '%'

    try{
        const {data, error} = await supabase
        .from('artists')
        .select()
        .ilike('nationality', nationality);

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/paintings', async (req, resp) => {

    try{
        const {data, error} = await supabase
        .from('paintings')
        .select(`paintingId, artists(*), galleries(*), imageFileName, title, shapeId, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations`)
        .order('title', {ascending: true});

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
            console.error("Unexpected error: ", err);
            resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/paintings/sort/:query', async (req, resp) => {
    const query = req.params.query;

    try{
        if(query === "title")
        {
            const {data, error} = await supabase
            .from('paintings')
            .select()
            .order('title', {ascending: true});

            if(error)
                console.log(error)

            resp.send(data);
        } else if(query === "year")
        {
            const {data, error} = await supabase
            .from('paintings')
            .select()
            .order('yearOfWork', {ascending: true});

            if(error)
                console.log(error)

            resp.send(data);
        }
    } catch(err) {
            console.error("Unexpected error: ", err);
            resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/paintings/:ref', async (req, resp) => {

    try{
        const {data, error} = await supabase
        .from('paintings')
        .select()
        .eq('paintingId', req.params.ref);

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
            console.error("Unexpected error: ", err);
            resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/paintings/search/:title', async (req, resp) => {
    const match = '%' + req.params.title + '%';

    try{
        const {data, error} = await supabase
        .from('paintings')
        .select()
        .ilike('title', match);

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
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
                .select()
                .lte('yearOfWork', end)
                .gte('yearOfWork', start)
                .order('yearOfWork', {ascending: true});

                if(error)
                    console.log(error)
                
                resp.send(data);

            } catch(err) {
                console.error("Unexpected error: ", err);
                resp.status(500).send("Unexpected error occured");
            }

        } else 
            resp.send("Invalid year input, \"/years/start/end\", 'end' year must greater than 'start' year.");
    } else
        resp.send("Invalid year input, ensure input year is integer only.")

});

app.get('/api/paintings/galleries/:ref', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('paintings')
        .select()
        .eq('galleryId', req.params.ref);

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/paintings/artist/:ref', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('paintings')
        .select()
        .eq('artistId', req.params.ref);

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/paintings/artists/country/:cty', async (req, resp) => {
    const match = req.params.cty + '%';
    try{
        const {data, error} = await supabase
        .from('paintings')
        .select(`*, artists!inner(nationality)`)
        .ilike('artists.nationality', match);

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/genres', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('genres')
        .select(`genreId, genreName, description, wikiLink, eras(*)`)

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/genres/:ref', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('genres')
        .select('genreId, genreName, description, wikiLink, eras(*)')
        .eq('genreId', req.params.ref);

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/genres/painting/:ref', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('genres')
        .select(`genreId, genreName, eras(*), description, wikiLink, paintinggenres!inner(paintingId, painting:paintings(*))`)
        .eq('paintinggenres.paintingId', req.params.ref)
        .order('genreName', {ascending: true});

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

////////////////////////////////////////////////////////////////////////////
app.get('/api/paintings/genre/:ref', async (req, resp) => {
    try{
        const {data, error} = await supabase
        .from('paintinggenres')
        .select('paintings!paintingId(paintingId, title, yearOfWork)')
        .eq('genreId', req.params.ref)
        .order('paintings(yearOfWork)', {ascending: true});

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
    }
});

app.get('/api/paintings/era/:ref', async (req, resp) => {
    try{
        const eraId = req.params.ref;

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

        if(error)
            console.log(error)
        
        resp.send(data);
    } catch(err) {
        console.error("Unexpected error: ", err);
        resp.status(500).send("Unexpected error occured");
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
            return resp.status(500).send('Failed to fetch genre names');
        }

        const result = genreNames.data.map(g => ({
            genre : g.genreName,
            count : paintingCount[g.genreId]
        })).sort((a,b) => a.count - b.count);

        resp.send(result);

        } catch(err) {
            console.error("Unexpected error: ", err);
            return resp.status(500).send("Unexpected error occured");
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
            return resp.status(500).send('Failed to fetch artist names');
        }

        const result = artistNames.data.map(a => ({
            first_name: a.firstName,
            last_name: a.lastName,
            count: paintingCount[a.artistId]
        })).sort((a,b) => b.count - a.count);

        resp.send(result);

    } catch(err) {
        console.error("Unexpected error: ", err);
        return resp.status(500).send("Unexpected error occured");
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
            return resp.status(500).send('Failed to fetch genre names');
        }

        const result = genreNames.data.map(g => ({
            genre : g.genreName,
            count : paintingCount[g.genreId]
        })).sort((a,b) => b.count - a.count);

        resp.send(result);

        } catch(err) {
            console.error("Unexpected error: ", err);
            return resp.status(500).send("Unexpected error occured");
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
    console.log('http://localhost:8080/api/artists/nation/fra');

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