const provider = require('../server-provider.js');
const supabase = provider.database;

const allEras = (app) =>{
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
}

////////////////////////////////////////////////////////////////////////////
const allGalleries = (app) => {
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
}

const galleryId = (app) => {
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
}

const galleryCountry = (app) => {
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
}

module.exports = {
    allEras,
    allGalleries,
    galleryId,
    galleryCountry
}