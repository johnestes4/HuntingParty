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
          if (sourceAgency == i2.agency) {
            matchFound = true
            break
          }
        }
        if (!matchFound) {
          newAgencies.push({
            agency: sourceAgency
          })
        }
      }
      for (let sourceAgency of subagenciesSource) {
        for (let newAgency of newAgencies) {
          if (sourceAgency.agency == newAgency.agency) {
            if (!newAgency.subagencies) {
              newAgency.subagencies = []
              newAgency.subagencies.push({
                subagency: sourceAgency.subagency
              })
            } else {
              var subagencyFound = false
              for (let newSubagency of newAgency.subagencies) {
                if (newSubagency.subagency == sourceAgency.subagency) {
                  subagencyFound = true
                  break
                }
              }
              if (!subagencyFound) {
                newAgency.subagencies.push({
                  subagency: sourceAgency.subagency
                })
              }
            }
          }
        }
      }
      for (let sourceAgency of officesSource) {
        for (let newAgency of newAgencies) {
          if (sourceAgency.agency == newAgency.agency) {
            for (let newSubagency of newAgency.subagencies) {
              if (newSubagency.subagency == sourceAgency.subagency) {
                if (!newSubagency.offices) {
                  newSubagency.offices = []
                  newSubagency.offices.push({
                    office: sourceAgency.office,
                    officeCode: sourceAgency.officeCode
                  })
                } else {
                  var officeFound = false
                  for (let newOffice of newSubagency.offices) {
                    if (newOffice.office == sourceAgency.office) {
                      officeFound = true
                      break
                    }
                  }
                  if (!officeFound) {
                    newSubagency.offices.push({
                      office: sourceAgency.office,
                      officeCode: sourceAgency.officeCode
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
