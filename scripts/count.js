const provider = require('../server-provider.js');
const supabase = provider.database;


const genreCount = (app) => {
    app.get('/api/counts/genres', async (req, resp) => {
        try{
            const {data, error} = await supabase
            .from('paintinggenres')
            .select('genreId', 'paintingId');
    
            if(error){
                console.error("Error fetching painting genres: ", error);
                return resp.status(500).json({success: false, message: "Failure to fetch painting genres", error: error});
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
}


const artistCount = (app) => {
    app.get('/api/counts/artists', async (req, resp) => {
        try{
            const {data, error} = await supabase
            .from('paintings')
            .select('paintingId, artistId')
    
            if(error) {
                console.error("Error fetching painting artists: ", error);
                return resp.status(500).json({success: false, message: "Failure to fetch painting artists", error: error});
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
}


const genreAtLeast = (app) => {
    app.get('/api/counts/topgenres/:ref', async (req, resp) => {
        const atLeast = req.params.ref;
        try{
            const {data, error} = await supabase
            .from('paintinggenres')
            .select('genreId', 'paintingId');
    
            if(error){
                console.error("Error fetching painting and genre IDs: ", error);
                return resp.status(500).json({success: false, message: "Failure to fetch paintingIDs and genreIDs", error: error});
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
    
            if(!result.length){
                 return resp.status(404).json({ success: false, message: "No genre has at least [" + atLeast + "] paintings."});
            } else 
                return resp.send(result);
    
            } catch(err) {
                console.error("Unexpected error: ", err);
                return resp.status(500).json({ success: false, message: "Unexpected error occurred.", error: err });
            }
    });
}


module.exports = {
    genreCount,
    artistCount, 
    genreAtLeast
}