/* $(document).ready(() => {
  
    $.get('/bugs', (data => {
  
      const devices = data.devices;
      const tester_device = data.tester_device;
      const testers = data.testers
  
      const bugs = [];
      // sum total quantity of bugs filed on each deviceId by testerId
      data.bugs.reduce((res, value) => {
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
  
      const sDevices = ['1', '2', '3'];
      const sCountries = ['US', 'JP', 'GB'];
      const match = bugs
        .filter((bug) => {
          return sDevices.indexOf(bug.deviceId) > -1
            && sCountries.indexOf(bug.country) > -1;
        })
      
        var result = [];
        match.reduce((res, value) => {
            if (!res[value.testerId]) {
                res[value.testerId] = {
                    testerId: value.testerId,
                    fullName: value.firstName + ' ' +  value.lastName,
                    country: value.country,
                    qty: 0
                };
                result.push(res[value.testerId])
            }
            res[value.testerId].qty += value.qty
            return res;
        }, {});
  
        result.sort((a, b) => {
          return b.qty - a.qty
        });
  
  
      console.log(bugs);
      console.log(match);
      console.log(result);
  
    }))
  
  })
  
   */