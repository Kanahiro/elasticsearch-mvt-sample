const makeStyle = (queryAdmin = '', queryPoi = '') => {
    return {
        version: 8,
        glyphs: 'https://mierune.github.io/fonts/{fontstack}/{range}.pbf',
        sources: {
            gsi: {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                attribution:
                    '<a href="http://osm.org/copyright">OpenStreetMap contributors</a>',
            },
            es_admin: {
                type: 'vector',
                tiles: [
                    `http://localhost/api/mvt/n03-19_190101/{z}/{x}/{y}?search=${queryAdmin}`,
                ],
                maxzoom: 14,
            },
            es_poi: {
                type: 'vector',
                tiles: [
                    `http://localhost/api/mvt/gis_osm_pois_free_1/{z}/{x}/{y}?search=${queryPoi}`,
                ],
                maxzoom: 14,
            },
        },
        layers: [
            {
                id: 'gsi',
                type: 'raster',
                source: 'gsi',
            },
            {
                id: 'es_admin-fill',
                source: 'es_admin',
                'source-layer': 'hits',
                type: 'fill',
                paint: {
                    'fill-color': '#6666ff',
                    'fill-opacity': 0.3,
                },
            },
            {
                id: 'es_admin-line',
                source: 'es_admin',
                'source-layer': 'hits',
                type: 'line',
                paint: {
                    'line-color': '#6666ff',
                    'line-width': 4,
                },
            },
            {
                id: 'es_poi-heatmap',
                source: 'es_poi',
                'source-layer': 'hits',
                type: 'heatmap',
                maxzoom: 12,
                paint: {
                    'heatmap-radius': 20,
                    'heatmap-opacity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        5,
                        0.8,
                        12,
                        0,
                    ],
                },
            },
            {
                id: 'es_poi-circle',
                source: 'es_poi',
                'source-layer': 'hits',
                type: 'circle',
                paint: {
                    'circle-color': '#ff9944',
                    'circle-radius': 5,
                    'circle-stroke-color': '#ffffff',
                    'circle-stroke-width': 1,
                    'circle-opacity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        7,
                        0,
                        14,
                        1.0,
                    ],
                    'circle-stroke-opacity': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        7,
                        0,
                        14,
                        1.0,
                    ],
                },
            },
            {
                id: 'es_poi-label',
                source: 'es_poi',
                'source-layer': 'hits',
                type: 'symbol',
                minzoom: 10,
                layout: {
                    'text-field': ['get', 'name'],
                    'text-font': ['Open Sans Regular'],
                    'text-anchor': 'left',
                },
                paint: {
                    'text-halo-width': 1,
                    'text-halo-color': '#ffffff',
                },
            },
        ],
    };
};

const map = new maplibregl.Map({
    container: 'map',
    style: makeStyle(),
    center: [142.4905, 43.566],
    zoom: 9,
});

const search = () => {
    const textinputAdmin = document.querySelector('#query-1');
    const queryAdmin = textinputAdmin.value;

    const textinputPoi = document.querySelector('#query-2');
    const queryPoi = textinputPoi.value;

    const style = makeStyle(queryAdmin, queryPoi);
    map.setStyle(style);
};

const searchBtn = document.querySelector('#search-btn');
searchBtn.onclick = search;
