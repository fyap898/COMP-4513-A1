# COMP 4513 (W2025) Asg 1: Node, SQL (via supabase)

### Overview
This project is an API for query art from given CSV format data: artist, eras, galleries, genres, painting genres, paintings and shapes.
With given specific API route, the data will be returned in JSON format.

### Built with:
Node.JS - JavaScript runtime environment
Express - Framework for Node
Supabase - Database for imported data
Glitch - Web application deployment

### API Endpoints
|API Endpoint                                           |Description                                                                    |
|-------------------------------------------------------|-------------------------------------------------------------------------------|
|https://grave-talented-floss.glitch.me/api/eras        |Returns all the eras.                                                          |
|https://grave-talented-floss.glitch.me/api/galleries   |Returns every fields of all the galleries.                                     |
|https://grave-talented-floss.glitch.me/api/galleries/ref|Returns a specific gallery.                                                    |
|/api/galleries/country/substring                       |Returns galleries whose field 'galleryCountry' begins with the input substring.|
|/api/artists                                           |Returns every field of all the artists.                                        |
|/api/artists/ref                                       |                                                                               |
|/api/artists/search/substring                          |                                                                               |
|/api/artists/country/substring                         |                                                                               |
|/api/paintings                                         |                                                                               |
|/api/paintings/sort/title\|year                        |                                                                               |
|/api/paintings/ref                                     |                                                                               |
|/api/paintings/search/substring                        |                                                                               |
|/api/paintings/years/start/end                         |                                                                               |
|/api/paintings/galleries/ref                           |                                                                               |
|/api/paintings/artist/ref                              |                                                                               |
|/api/paintings/artists/country/substring               |                                                                               |
|/api/genres                                            |                                                                               |
|/api/genres/ref                                        |                                                                               |
|/api/genres/painting/ref                               |                                                                               |
|/api/paintings/genre/ref                               |                                                                               |
|/api/paintings/era/ref                                 |                                                                               |
|/api/counts/genres                                     |                                                                               |
|/api/counts/artists                                    |                                                                               |
|/api/counts/topgenres/ref                              |                                                                               |