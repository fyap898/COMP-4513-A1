const provider = require('../server-provider.js');
const supabase = provider.database;

const allGenre = (app) => {
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
}


const genreId = (app) => {
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
}


const genreByPaintingId = (app) => {
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
}

module.exports = {
    allGenre,
    genreId,
    genreByPaintingId
}