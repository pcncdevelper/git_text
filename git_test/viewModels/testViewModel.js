(function (global) {
    
    
    var testViewModel,
        app = global.app = global.app || {};

    testViewModel = kendo.data.ObservableObject.extend({
        testDataSource: null,

        init: function () {
            var that = this,
                dataSource;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://localhost/data/data-php.php",
                        dataType: "json"
                    }
                }
            });

            that.set("testDataSource", dataSource);
        }
    });

    app.testService = {
        viewModel: new testViewModel()
    };
})(window);