import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/api/mvt/:index/:z/:x/:y', async (req, res, next) => {
    const { index, x, y, z } = req.params;

    const name_dict = {
        'n03-19_190101': 'N03_004',
        gis_osm_pois_free_1: 'name',
    };
    const name = name_dict[index];

    const geometry_dict = {
        'n03-19_190101': 'geometry',
        gis_osm_pois_free_1: 'geometry.coordinates',
    };
    const geometry = geometry_dict[index];

    const fields_dict = {
        'n03-19_190101': ['N03_004']['name'],
        gis_osm_pois_free_1: ['name'],
    };
    const fields = fields_dict[index];

    const { search } = req.query;
    const phrases = (search || '')
        .replace('　', ' ')
        .split(' ')
        .filter((str) => str !== '');
    const body = {
        fields,
    };
    if (phrases.length > 0) {
        body.query = {
            bool: {
                must: phrases
                    .map((phrase) => [{ match_phrase: { [name]: phrase } }])
                    .flat(),
            },
        };
    }
    const url = `http://es01:9200/${index}/_mvt/${geometry}/${z}/${x}/${y}?grid_precision=0`;
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    const data = await fetch(url, options);

    const b = await data.arrayBuffer();
    res.set({ 'Content-Disposition': `attachment; filename=${y}.pbf` });
    res.send(Buffer.from(b));
});

app.listen(3000);
