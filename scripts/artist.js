const provider = require('../server-provider.js');
const supabase = provider.database;

const allArtist = (app) => {
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
}


const artistId = (app) => {
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
}


const artistLName = (app) => {
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
}


const artistNation = (app) => {
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
}

module.exports = {
    allArtist,
    artistId,
    artistLName,
    artistNation
}
