const makeStyle = (
    showAdmin = true,
    queryAdmin = '',
    showPoi = true,
    queryPoi = '',
) => {
    return {
        version: 8,
        glyphs: 'https://mierune.github.io/fonts/{fontstack}/{range}.pbf',
        sources: {
            osm: {
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
                minzoom: 6,
                maxzoom: 10,
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
                id: 'osm',
                type: 'raster',
                source: 'osm',
            },
            {
                id: 'es_admin-fill',
                source: 'es_admin',
                'source-layer': 'hits',
                type: 'fill',
                paint: {
                    'fill-color': '#6666ff',
                    'fill-opacity': 0.1,
                },
                layout: {
                    visibility: showAdmin ? 'visible' : 'none',
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
                    'line-opacity': 0.3,
                },
                layout: {
                    visibility: showAdmin ? 'visible' : 'none',
                },
            },
            {
                id: 'es_poi-circle',
                source: 'es_poi',
                'source-layer': 'hits',
                type: 'circle',
                paint: {
                    'circle-color': '#ff4411',
                    'circle-radius': 5,
                    'circle-stroke-color': '#ffffff',
                    'circle-stroke-width': 1,
                },
                layout: {
                    visibility: showPoi ? 'visible' : 'none',
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
                    visibility: showPoi ? 'visible' : 'none',
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
    style: {
        version: 8,
        source: {},
        layers: [],
    },
    center: [142.4905, 43.566],
    zoom: 9,
});

const search = () => {
    const textinputAdmin = document.getElementById('query-1');
    const queryAdmin = textinputAdmin.value;

    const textinputPoi = document.getElementById('query-2');
    const queryPoi = textinputPoi.value;

    const checkAdmin = document.getElementById('check-1');
    const showAdmin = checkAdmin.checked;
    const checkPoi = document.getElementById('check-2');
    const showPoi = checkPoi.checked;

    const style = makeStyle(showAdmin, queryAdmin, showPoi, queryPoi);
    map.setStyle(style);
};

const searchBtn = document.getElementById('search-btn');
searchBtn.onclick = search;

const checkAdmin = document.getElementById('check-1');
const checkPoi = document.getElementById('check-2');
checkAdmin.onchange = search;
checkPoi.onchange = search;

search();
