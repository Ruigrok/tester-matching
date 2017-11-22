const fs = require('fs');
const path = require('path');
const async = require('async');
const d3 = require('d3');

module.exports = app => {

  app.get("/api/data", (req, res) => {

    const dir = './data/';
    const dataFiles = {};
    const parsedData = {};

    fs.readdir(dir, (err, files) => {
      files.forEach(file => {
        dataFiles[path.basename(file, '.csv')] = dir + file;
      })

      async.forEachOf(dataFiles, (value, key, callback) => {
        fs.readFile(value, "utf8", (err, data) => {
          if (err) return callback(err);
          try {
            parsedData[key] = d3.csvParse(data);
          } catch (e) {
            return callback(e);
          }
          callback();
        });
      }, err => {
        if (err) console.error(err.message);

        const devices = parsedData.devices;
        const testers = parsedData.testers;
        const countries = [...new Set(testers.map(item => item.country))];

        const bugs = [];
        parsedData.bugs.reduce((res, value) => {
          let joinId = value.testerId + '-' + value.deviceId;
          if (!res[joinId]) {
            res[joinId] = {
              deviceId: value.deviceId,
              testerId: value.testerId,
              qty: 0
            };
            bugs.push(res[joinId])
          }
          res[joinId].qty++
          return res;
        }, {});

        // look up tester info by Id from testers
        const findTester = id => testers.find(tester => tester.testerId === id);
        bugs.forEach(bug => Object.assign(bug, findTester(bug.testerId)));

        res.send({
          devices: devices,
          countries: countries,
          bugs: bugs
        })

      });
    })
  });

}