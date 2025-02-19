const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();

const supaUrl = 'https://pvjjzcgypichndagmlxv.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2amp6Y2d5cGljaG5kYWdtbHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMTQ1ODUsImV4cCI6MjA1NDc5MDU4NX0.5wM2napaaigBgWOBZuJhehjzJ2R0ULFDW1jX6OHnA5M';

const supabase = supa.createClient(supaUrl, supaAnonKey);

app.get('/eras', async (req, resp) => {
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
app.get('/galleries', async (req, resp) => {
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

app.get('/galleries/:ref', async (req, resp) => {
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

app.get('/galleries/country/:cty', async (req, resp) => {
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
app.get('/artists', async (req, resp) => {
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

app.get('/artists/:ref', async (req, resp) => {
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

app.get('/artists/search/:lname', async (req, resp) => {
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
app.get('/artists/nation/:cty', async (req, resp) => {
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
app.get('/paintings', async (req, resp) => {

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

app.get('/paintings/sort/:query', async (req, resp) => {
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

app.get('/paintings/:ref', async (req, resp) => {

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

app.get('/paintings/search/:title', async (req, resp) => {
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

app.get('/paintings/years/:start/:end', async (req, resp) => {
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

app.get('/paintings/galleries/:ref', async (req, resp) => {
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

app.get('/paintings/artist/:ref', async (req, resp) => {
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

app.get('/paintings/artists/country/:cty', async (req, resp) => {
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
app.get('/genres', async (req, resp) => {
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

app.get('/genres/:ref', async (req, resp) => {
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

app.get('/genres/painting/:ref', async (req, resp) => {
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
app.get('/paintings/genre/:ref', async (req, resp) => {
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

app.get('/paintings/era/:ref', async (req, resp) => {
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
app.get('/counts/genres', async (req, resp) => {
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

app.get("/counts/artists", async (req, resp) => {
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
app.get('/counts/topgenres/:ref', async (req, resp) => {
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

app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/eras');

    console.log('http://localhost:8080/galleries');
    console.log('http://localhost:8080/galleries/30');
    console.log('http://localhost:8080/galleries/country/fra');

    console.log('http://localhost:8080/artists');
    console.log('http://localhost:8080/artists/12');
    console.log('http://localhost:8080/artists/search/ma');
    console.log('http://localhost:8080/artists/nation/fra');

    console.log('http://localhost:8080/paintings');
    console.log('http://localhost:8080/paintings/sort/year');
    console.log('http://localhost:8080/paintings/sort/title');
    console.log('http://localhost:8080/paintings/63');
    console.log('http://localhost:8080/paintings/search/port');
    console.log('http://localhost:8080/paintings/years/1800/1850');
    console.log('http://localhost:8080/paintings/years/1850/1800');
    console.log('http://localhost:8080/paintings/galleries/5');
    console.log('http://localhost:8080/paintings/artist/16');
    console.log('http://localhost:8080/paintings/artists/country/ital');

    console.log('http://localhost:8080/genres');
    console.log('http://localhost:8080/genres/76');
    console.log('http://localhost:8080/genres/painting/408');

    console.log('http://localhost:8080/paintings/genre/78');
    console.log('http://localhost:8080/paintings/era/2');

    console.log('http://localhost:8080/counts/genres');
    console.log('http://localhost:8080/counts/artists');
    console.log('http://localhost:8080/counts/topgenres/20');

});