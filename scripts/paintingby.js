const provider = require('../server-provider.js');
const supabase = provider.database;

const byGenreId = (app) => {
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
}


const byEraId = (app) => {
    app.get('/api/paintings/era/:ref', async (req, resp) => {
        const eraId = req.params.ref;
        try{
            const genres = await supabase
            .from('genres')
            .select('genreId')
            .eq('eraId', eraId);
    
            if(genres.error){
                console.error("Error fetching era: ", err);
                resp.status(500).json({success: false, message: "Error fetching genres with era ${eraId}", error: genres.error});
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
}

module.exports = {
    byEraId, 
    byGenreId
}