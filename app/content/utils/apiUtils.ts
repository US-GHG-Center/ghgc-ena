export default function fetchDatasetMetadata() {
    // Simulate fetching data from an API
    return [{
        "nid": "67",
        "title": "Drupal API Fetched Test Dataset",
        "summary": "This is a test dataset fetched from a Drupal API endpoint to demonstrate merging with MDX data.",
        "usage": [
            {
                "url": "https://us-ghg-center.github.io/ghgc-docs/datausage.html",
                "label": "Notebooks to read, visualize, and explore data statistics",
                "title": "Data Usage Notebooks"
            },
            {
                "url": "https://hub.ghg.center/hub/user-redirect/git-pull?repo=https%3A%2F%2Fgithub.com%2FUS-GHG-Center%2Fghgc-docs&urlpath=lab%2Ftree%2Fghgc-docs%2Fuser_data_notebooks%2Fmicasa-carbonflux-daygrid-v1_User_Notebook.ipynb&branch=main",
                "label": "Run example notebook",
                "title": "Interactive Session in the US GHG Center JupyterHub (requires account)"
            },
            {
                "url": "https://data.ghg.center/browseui/index.html#micasa-carbonflux-daygrid-v1/",
                "label": "Browse and download the data",
                "title": "Data Browser"
            }
        ],
        "media": {
            "src": "/images/dataset/geos-casa-gfed-cover.jpg",
            "alt": "wildfire",
            "author": {
                "name": "Marcus Kauffman"
            }
        },
        "taxonomy": [
            {
                "name": "Topics",
                "values": [
                    "Natural Emissions and Sinks"
                ]
            },
            {
                "name": "Source",
                "values": [
                    "NASA"
                ]
            },
            {
                "name": "Gas",
                "values": [
                    "CO₂"
                ]
            },
            {
                "name": "Product Type",
                "values": [
                    "Model Output"
                ]
            }
        ],
    "data_tools": "\u003Ca href=\"/ghgcenter/data-tools/nist-indianapolis-flux-experiment-influx-tower-data-viewer\" hreflang=\"en\"\u003ENIST Indianapolis Flux Experiment (INFLUX) Tower Data Viewer\u003C/a\u003E",
    "data_type": "Research",
    "data_units": "Micromoles per mole of dry air (Parts CO₂ per million (ppm)); Nanomoles per mole of dry air (Parts CH₄ per billion (ppb))",
    "spatial_extent": "Indianapolis, Indiana, United States",
    "spatial_resolution": "Point location samples",
    "temporal_extent": "January 1, 2024 - December 31, 2024",
    "temporal_resolution": "Continuous measurements: daily, monthly; Non-continuous measurements: varies"
    }];
}