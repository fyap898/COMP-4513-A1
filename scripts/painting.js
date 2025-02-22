const provider = require('../server-provider.js');
const supabase = provider.database;


const allPainting = (app) => {
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
}


const sortPaintingTitleYear = (app) => {
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
}


const paintingId = (app) => {
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
}



const searchpaintingTitle = (app) => {
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
}


const betweenYearPainting = (app) => {
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
}


const paintingInGallery = (app) => {
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
}


const paintingByArtistId = (app) => {
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
}


const paintingByArtistCountry = (app) => {
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
}

module.exports = {
    allPainting,
    paintingId,
    paintingInGallery,
    paintingByArtistId,
    paintingByArtistCountry,
    sortPaintingTitleYear,
    searchpaintingTitle,
    betweenYearPainting
}