var fs = require('fs');
var stringify = require('json-stringify-safe');
var newAgencies = []
var agenciesSource
var subagenciesSource
var officesSource

fs.readFile('./agenciessource.json', 'utf8', function(err, data) {
  agenciesSource = JSON.parse(data)
  fs.readFile('./subagenciessource.json', 'utf8', function(err, data) {
    subagenciesSource = JSON.parse(data)
    fs.readFile('./officessource.json', 'utf8', function(err, data) {
      officesSource = JSON.parse(data)
      for (let sourceAgency of agenciesSource) {
        var matchFound = false
        for (let i2 of newAgencies) {
          if (sourceAgency == i2.name) {
            matchFound = true
            break
          }
        }
        if (!matchFound) {
          newAgencies.push({
            name: sourceAgency,
            value: false
          })
        }
      }
      for (let sourceAgency of subagenciesSource) {
        for (let newAgency of newAgencies) {
          if (sourceAgency.agency == newAgency.name) {
            if (!newAgency.subagencies) {
              newAgency.subagencies = []
              newAgency.subagencies.push({
                name: sourceAgency.subagency,
                value: false
              })
            } else {
              var subagencyFound = false
              for (let newSubagency of newAgency.subagencies) {
                if (newSubagency.name == sourceAgency.subagency) {
                  subagencyFound = true
                  break
                }
              }
              if (!subagencyFound) {
                newAgency.subagencies.push({
                  name: sourceAgency.subagency,
                  value: false
                })
              }
            }
          }
        }
      }
      for (let sourceAgency of officesSource) {
        for (let newAgency of newAgencies) {
          if (sourceAgency.agency == newAgency.name) {
            for (let newSubagency of newAgency.subagencies) {
              if (newSubagency.name == sourceAgency.subagency) {
                if (!newSubagency.offices) {
                  newSubagency.offices = []
                  newSubagency.offices.push({
                    name: sourceAgency.office,
                    code: sourceAgency.officeCode,
                    value: false
                  })
                } else {
                  var officeFound = false
                  for (let newOffice of newSubagency.offices) {
                    if (newOffice.name == sourceAgency.office) {
                      officeFound = true
                      break
                    }
                  }
                  if (!officeFound) {
                    newSubagency.offices.push({
                      name: sourceAgency.office,
                      code: sourceAgency.officeCode,
                      value: false
                    })
                  }
                }
              }
            }
          }
        }
      }


      fs.writeFile("newagencies.json", stringify(newAgencies), function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('I THINK IT DID IT')
        }
      });



    })
  })
})
