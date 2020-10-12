// This function uses the samples.json to add all the subject ids as a dropdown 
// selection option
function buildDropDown() {
    d3.json("samples.json").then((data) => {
        var selection = d3.select("#selDataset")
        data.names.forEach(name => {
            selection.append("option")
                .text(name)
                .attr("value",name)
        });
    }
    )
}

function buildBar(id) {
    d3.json("samples.json").then(data => {
        var sample_data = data.samples;
        var subject_data = sample_data.filter(x => x.id == id)[0];

        var trace = {
            x: subject_data.sample_values.slice(0,10).reverse(),
            y: subject_data.otu_ids.map(id => `OTU ${id}`).slice(0,10).reverse(),
            text: subject_data.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation:"h"
        }

        var data = [trace]

        Plotly.newPlot("bar", data)
    })
}

function buildBubble(id) {
    d3.json("samples.json").then((data) => {
        var sample_data = data.samples;
        var subject_data = sample_data.filter(x => x.id == id)[0];

        var trace = {
            x: subject_data.otu_ids,
            y: subject_data.sample_values,
            mode: 'markers',
            marker: {
                color: subject_data.otu_ids,
                opacity: .6,
                size: subject_data.sample_values
            },
            text: subject_data.otu_labels
        }

        var data = [trace];

        var layout = {
            xaxis: {title:"OTU ID"},
            height:600,
            width:1200
        }
        
        Plotly.newPlot("bubble",data,layout)
    })
}

function buildDemo(id) {
    d3.json("samples.json").then((data) => {
        var sample_data = data.metadata;
        var subject_data = sample_data.filter(x => x.id == id)[0];
        var selection = d3.select("#sample-metadata")
        selection.html("");
        Object.entries(subject_data).forEach(([key,value]) => {
            selection.append("h6").text(`${key}: ${value}`)
        })

    })
}

// Initialize Belly Button Dashboard
buildDropDown()
buildBar(940)
buildBubble(940)
buildDemo(940)

function optionChanged(subject_id) {
    buildBar(subject_id);
    buildBubble(subject_id);
    buildDemo(subject_id);
}