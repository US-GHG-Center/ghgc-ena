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
        "infoDescription": "::markdown\n  - Temporal Extent: January 1, 2001 - Ongoing\n  - Temporal Resolution: Daily and Monthly Averages\n  - Spatial Extent: Global\n  - Spatial Resolution: 0.1° x 0.1°\n  - Data Units: Grams of Carbon per square meter per day (g Carbon/m²/day) \n  - Data Type: Research\n  - Data Latency: Less than a year, typically 6 months\n",
        "content": "Test content from API"
    }];
}