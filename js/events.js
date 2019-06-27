var events = {
    loadData: function(callback) {
        $.getJSON("./data.json", function(data) {
            if (data) {
                events.data = data;
                callback();
            }
        });
    }
}