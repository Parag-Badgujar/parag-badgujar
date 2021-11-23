const express = require('express');
const SalesModel = require('../models/SalesModel');
var moment = require('moment');

var salesController = {
    SalesRegistration: function (req, res) {
        var UserData = req.body;
        SalesModel.SalesRegistration(UserData, function (err, data) {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Internal server error.',
                })
            } else if (data.rows.length > 0) {
                res.status(201).send({
                    status: true,
                    message: "Data added successful.",
                })
            } else {
                res.status(400).send({
                    status: false,
                    message: 'Something went wrong!! Please try again later!!!',
                })
            }
        });
    },

    SalesStatus: function (req, res) {
        var SalesStatus = req.body;
        var id = req.params.status;
        var SalesDate = []
        if (id == 'daily' || id == 'weekly' || id == 'monthly') {
            SalesModel.SalesStatus(id, function (err, data) {
                if (err) {
                    res.status(500).send({
                        status: false,
                        message: 'Internal server error.',
                    })
                } else if (data.rows.length > 0) {
                    var currMonthYear = moment().format('MMM YYYY');
                    if (id == 'daily') {
                        for (var i = 0; i < data.rows.length; i++) {
                            SalesDate.push({
                                'TimeInHours': data.rows[i]['hour_of_day'],
                                'TotalSale': data.rows[i]['total_sales']
                            })
                        }
                    } else if (id == 'weekly') {
                        for (var i = 0; i < data.rows.length; i++) {
                            SalesDate.push({
                                'Date': data.rows[i]['hour_of_day']+' '+currMonthYear,
                                'TotalSale': data.rows[i]['total_sales']
                            })
                        }
                    } else if (id == 'monthly') {
                        for (var i = 0; i < data.rows.length; i++) {
                            SalesDate.push({
                                'Date': data.rows[i]['hour_of_day']+' '+currMonthYear,
                                'TotalSale': data.rows[i]['total_sales']
                            })
                        }
                    }
                    res.status(201).send({
                        status: true,
                        message: "Data found.",
                        data: SalesDate
                    })
                } else {
                    res.status(400).send({
                        status: false,
                        message: 'Something went wrong!! Please try again later!!!',
                    })
                }
            });
        } else {
            res.status(402).send({
                status: false,
                message: 'Invalid input',
            })
        }
    },

};

module.exports = salesController;