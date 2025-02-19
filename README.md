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
|-------------------------------------------------------|-------------------------------------------------------------------------------|
|API Endpoint                                           |Description                                                                    |
|-------------------------------------------------------|-------------------------------------------------------------------------------|
|/api/eras                                              |                                                                               |
|/api/galleries                                         |                                                                               |
|/api/galleries/ref                                     |                                                                               |
|/api/galleries/country/substring                       |                                                                               |
|/api/artists                                           |                                                                               |
|/api/artists/ref                                       |                                                                               |
|/api/artists/search/substring                          |                                                                               |
|/api/artists/country/substring                         |                                                                               |
|/api/paintings                                         |                                                                               |
|/api/paintings/sort/title|year                         |                                                                               |
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