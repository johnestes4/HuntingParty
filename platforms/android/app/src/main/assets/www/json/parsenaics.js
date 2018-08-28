var fs = require('fs');
var stringify = require('json-stringify-safe');

fs.readFile('./naics2.json', 'utf8', function(err, data) {
  var naics = JSON.parse(data)
  console.log(naics[0])
  var previousCode
  var previousCategory
  var toPush
  var newNaics = []
  var index = 0
  for (let i of naics) {
    if (newNaics.length < 1) {
      newNaics.push(i)
    } else {
      var matchFound
      for (let i2 of newNaics) {
        var firstCode
        var secondCode
        var thirdCode
        if (i2.code.slice(2,3) == '-') {
          firstCode = (+i2.code.slice(0,2))
          if (+i2.code.slice(3,5)- (+i2.code.slice(0,2)) == 2) {
            secondCode = +i2.code.slice(3,5) - 1
            thirdCode = +i2.code.slice(3,5)
          }
          console.log('dash')
        }
        if (i.code.slice(0,i2.code.length) == i2.code || (+i.code.slice(0,2) == firstCode || +i.code.slice(0,2) == secondCode || +i.code.slice(0,2) == thirdCode)) {
          matchFound = true
          if (!i2.subcategories) {
            i2.subcategories = []
            i2.subcategories.push(i)
            break
          } else {
            i2.subcategories.push(i)
            var i3match = false
            for (let i3 of i2.subcategories) {
              if (i.code.slice(0,i3.code.length) == i3.code) {
                i3match = true
                //
                if (!i3.subcategories) {
                  i3.subcategories = []
                  i3.subcategories.push(i)
                } else {
                  var i4match = false
                  for (let i4 of i3.subcategories) {
                    if (i.code.slice(0,i4.code.length) == i4.code) {
                      i4match = true
                      //
                      if (!i4.subcategories) {
                        i4.subcategories = []
                        i4.subcategories.push(i)
                      } else {
                        var i5match = false
                        for (let i5 of i4.subcategories) {
                          if (i.code.slice(0,i5.code.length) == i5.code) {
                            i5match = true
                            //
                            if (!i5.subcategories) {
                              i5.subcategories = []
                              i5.subcategories.push(i)
                            } else {
                              var i6match = false
                              for (let i6 of i5.subcategories) {
                                if (i.code.slice(0,i6.code.length) == i6.code) {
                                  i6match = true
                                }
                              }
                              if (!i6match) {
                                i5.subcategories.push(i)
                                break;
                              }
                            }
                            //
                          }
                        }
                        if (!i5match) {
                          i4.subcategories.push(i)
                          break;
                        }
                      }
                      //
                    }
                  }
                  if (!i4match) {
                    i3.subcategories.push(i)
                    break;
                  }
                }
                //
              }
            }
            if (!i3match) {
              i2.subcategories.push(i)
              break;
            }
          }
        }
      }
      if (!matchFound) {
        newNaics.push(i)
      }
    }
  }

  fs.writeFile("naicsOutput.json", stringify(newNaics), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('I THINK IT DID IT')
    }
  });


})
