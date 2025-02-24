# COMP 4513 (W2025) Asg 1: Node, SQL (via supabase)

### Overview
This project is an API for query art from given CSV format data: artist, eras, galleries, genres, painting genres, paintings and shapes.
The CSV datas, will be uploaded to web-database, Supabase, where will be used to access from the API. With given specific API route, the data will be returned in JSON format.

### Built with:
Node.JS - JavaScript runtime environment  
Express - Framework for Node  
Supabase - Database for imported data  
Glitch - Web application deployment  


### Files
'server-api.js' - Main API file  
'server-provider.js' - Main data provider accessing Supabase URL  
'scripts' folder - Contains different files that handles different query API route  
'server.js' - This is my first file, that does everything in one, was thinking make use of modules for better readability and easy to manage. Therefore, the 3 things on top.  


### API Endpoints
|API Endpoint                                           |Description                                                                    |
|-------------------------------------------------------|-------------------------------------------------------------------------------|
|/api/eras                                              |Returns all the eras.                                                          |
|/api/galleries                                         |Returns every fields of all the galleries.                                     |
|/api/galleries/ref                                     |Returns a specific gallery.                                                    |
|/api/galleries/country/substring                       |Returns galleries whose field 'galleryCountry' begins with the input substring.|
|/api/artists                                           |Returns every field of all the artists.                                        |
|/api/artists/ref                                       |Returns a specific artist.                                                     |
|/api/artists/search/substring                          |Returns artists whose field 'lastName' begins with the input substring.        |
|/api/artists/country/substring                         |Returns artists whose field 'nationality' begins with the input substring.     |
|/api/paintings                                         |Returns all the paintings                                                      |
|/api/paintings/sort/title\|year                        |Returns all the paintings sorted by keyword 'title' or 'year'.                 |
|/api/paintings/ref                                     |Returns a specific painting.                                                   |
|/api/paintings/search/substring                        |Returns paintings whose field 'title' contains input substring.                |
|/api/paintings/years/start/end                         |Returns paintings whose field 'yearOfWork' is between input start and end year.|
|/api/paintings/galleries/ref                           |Returns all the paintings that is in the specific gallery.                     |
|/api/paintings/artist/ref                              |Returns all the paintings by specific artist.                                  |
|/api/paintings/artists/country/substring               |Returns all the paintings by artists whose field 'nationality' begins with the input substring. |
|/api/genres                                            |Returns all genres.                                                            |
|/api/genres/ref                                        |Returns specific genre.                                                        |
|/api/genres/painting/ref                               |Returns specific painting's genre.                                             |
|/api/paintings/genre/ref                               |Returns paintings that use specific genre.                                     |
|/api/paintings/era/ref                                 |Returns paintings in specific era.                                             |
|/api/counts/genres                                     |Returns all genres with number of paintings that use it.                       |
|/api/counts/artists                                    |Returns all artists and their number of paintings created.                     |
|/api/counts/topgenres/ref                              |Returns genres with at least specific amount of paintings.                     |



### Example API endpoints
- https://grave-talented-floss.glitch.me/api/eras
- https://grave-talented-floss.glitch.me/api/galleries
- https://grave-talented-floss.glitch.me/api/galleries/30
- https://grave-talented-floss.glitch.me/api/galleries/country/fra
- https://grave-talented-floss.glitch.me/api/artists
- https://grave-talented-floss.glitch.me/api/artists/12
- https://grave-talented-floss.glitch.me/api/artists/search/ma
- https://grave-talented-floss.glitch.me/api/artists/nation/fra
- https://grave-talented-floss.glitch.me/api/paintings
- https://grave-talented-floss.glitch.me/api/paintings/sort/year
- https://grave-talented-floss.glitch.me/api/paintings/sort/title
- https://grave-talented-floss.glitch.me/api/paintings/63
- https://grave-talented-floss.glitch.me/api/paintings/search/port
- https://grave-talented-floss.glitch.me/api/paintings/years/1800/1850
- https://grave-talented-floss.glitch.me/api/paintings/years/1850/1800
- https://grave-talented-floss.glitch.me/api/paintings/galleries/5
- https://grave-talented-floss.glitch.me/api/paintings/artist/16
- https://grave-talented-floss.glitch.me/api/paintings/artists/country/ital
- https://grave-talented-floss.glitch.me/api/genres
- https://grave-talented-floss.glitch.me/api/genres/76
- https://grave-talented-floss.glitch.me/api/genres/painting/408
- https://grave-talented-floss.glitch.me/api/paintings/genre/78
- https://grave-talented-floss.glitch.me/api/paintings/era/2
- https://grave-talented-floss.glitch.me/api/counts/genres
- https://grave-talented-floss.glitch.me/api/counts/artists
- https://grave-talented-floss.glitch.me/api/counts/topgenres/20