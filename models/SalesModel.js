const db = require('../config/dbConnection'); //reference of dbconnection.js
const moment = require('moment');

const SalesTask = {
    SalesRegistration: function (UserData,callback) {
        let CurrentDate = moment().format("YYYY-MM-DD HH:ss")
        db.query("insert into sales(UserName,Amount,RegistrationDate) values($1,$2,$3) returning ID", [UserData.UserName, UserData.Amount, CurrentDate], callback);
    },

    SalesStatus: function (id,callback) {
        if(id=='daily'){
            db.query("select extract(hour from RegistrationDate) as hour_of_day,sum(Amount) as total_sales from sales where date(RegistrationDate) = current_date group by extract(hour from RegistrationDate) ", [], callback);
        }
        else if(id=='weekly'){
            var startofWeek = moment().day('Monday').format('YYYY-MM-DD');
            let today_date = moment().format("YYYY-MM-DD ")
            db.query("select extract(day from RegistrationDate) as hour_of_day,sum(Amount) as total_sales from sales where date(RegistrationDate) between $1 and $2 group by extract(day from RegistrationDate)  ", [startofWeek,today_date], callback);
        }
        else if(id=='monthly'){
            let startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
            let today_date = moment().format("YYYY-MM-DD ")
            db.query("select extract(day from RegistrationDate) as hour_of_day,sum(Amount) as total_sales from sales where date(RegistrationDate) between $1 and $2 group by extract(day from RegistrationDate) ", [startOfMonth,today_date], callback);
        }
          
    },

};

module.exports = SalesTask;