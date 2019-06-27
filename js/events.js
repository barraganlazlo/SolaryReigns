var events = {
    loadData: function() {
        $.getJSON("data.json", function(data) {
            events.data = data;
        });
    },
    onDataLoaded: function() {

    }
}