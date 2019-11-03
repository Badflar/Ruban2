module.exports = {
    TimestampToHuman: function(UNIX_timestamp) {
        // Create a new timestamp
        var a = new Date(UNIX_timestamp * 1000);
        // Months
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sem', 'Oct', 'Nov', 'Dec']
        // Get 4 digit year
        var year = a.getFullYear();
        // Get month from three letters
        var month = a.months[a.getMonth()];
        // Get 2 digit day 
        var date = a.getDate;
        // Get 2 digit hour
        var hour = a.getHours();
        // Get 2 digit minute
        var min = a.getMinutes();
        // Get 2 digit second
        var sec = a.getSeconds();
        //Combine to string
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ' ' + min + ' ' + sec ; 
        return time;
    }
}