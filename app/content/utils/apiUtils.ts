export default function fetchDatasetMetadata() {
    // Simulate fetching data from an API
    return [{
        "nid": "67",
        "title": "Drupal API Fetched Test Dataset",
        "summary": "This is a test dataset fetched from a Drupal API endpoint to demonstrate merging with MDX data.",
        "data_license": "\u003Ca href=\"https://creativecommons.org/publicdomain/zero/1.0/legalcode\"\u003Ehttps://creativecommons.org/publicdomain/zero/1.0/legalcode\u003C/a\u003E",
        "data_tools": "\u003Ca href=\"/ghgcenter/data-tools/nist-indianapolis-flux-experiment-influx-tower-data-viewer\" hreflang=\"en\"\u003ENIST Indianapolis Flux Experiment (INFLUX) Tower Data Viewer\u003C/a\u003E",
        "data_type": "Research",
        "data_units": "Micromoles per mole of dry air (Parts CO₂ per million (ppm)); Nanomoles per mole of dry air (Parts CH₄ per billion (ppb))",
        "spatial_extent": "Indianapolis, Indiana, United States",
        "spatial_resolution": "Point location samples",
        "temporal_extent": "January 1, 2024 - December 31, 2024",
        "temporal_resolution": "Continuous measurements: daily, monthly; Non-continuous measurements: varies",
        "gas": "\u003Ca href=\"/ghgcenter/taxonomy/term/74\" hreflang=\"en\"\u003ECH₄\u003C/a\u003E",
        "scale": "\u003Ca href=\"/ghgcenter/taxonomy/term/9\" hreflang=\"en\"\u003EGlobal\u003C/a\u003E",
        "sectors": "\u003Ca href=\"/ghgcenter/sectors/land-management\" hreflang=\"en\"\u003ELand Management\u003C/a\u003E",
        "topics": "\u003Ca href=\"/ghgcenter/topics/aquatic\" hreflang=\"en\"\u003EAquatic\u003C/a\u003E, \u003Ca href=\"/ghgcenter/topics/land\" hreflang=\"en\"\u003ELand\u003C/a\u003E, \u003Ca href=\"/ghgcenter/topics/methane\" hreflang=\"en\"\u003EMethane\u003C/a\u003E"
    }];
}