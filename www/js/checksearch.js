var apiUrl = 'https://efassembly.com:4432'
// var apiUrl = 'http://18.218.170.246:4200'
// var apiUrl = 'http://localhost:4200'

var hpd
var searches = []
var searchResults

function checkSearchAccuracy(num) {
  // searchPromises.push(
  if (document.getElementById("loading").classList.contains('inactive')) {
    console.log('searching')
    var searchPromises = []
    var savePromises = []
    var search = searches[num]
    document.getElementById("loading").classList.remove('inactive');

    var xhttp2 = new XMLHttpRequest();
    xhttp2.onload = function() {
      if (xhttp2.readyState == 4 && xhttp2.status == 200) {
        searchResults = JSON.parse(xhttp2.responseText);
        console.log(searchResults.length + ' long')
        for (let fbo of searchResults) {
          delete fbo.chartData
          delete fbo.interestedVendors
          delete fbo.companyProxies
          delete fbo.__v
          delete fbo.desc
          delete fbo.desc2
        }
        var parsedTerms = parseSearch(search)
        var termsString = ''
        console.log(parsedTerms)
        if (parsedTerms.type) {
          termsString = termsString + '<p>TYPE: '
          for (i = 0; i < parsedTerms.type.length; i++) {
            termsString = termsString + parsedTerms.type[i] + ', '
          }
          termsString = termsString + '</p>'
        }
        if (parsedTerms.dueDate) {
          termsString = termsString + '<p>DUE DATE: '
          for (i = 0; i < parsedTerms.dueDate.length; i++) {
            termsString = termsString + parsedTerms.dueDate[i] + ', '
          }
          termsString = termsString + '</p>'
        }
        if (parsedTerms.naics) {
          termsString = termsString + '<p>NAICS: '
          for (i = 0; i < parsedTerms.naics.length; i++) {
            termsString = termsString + parsedTerms.naics[i] + ', '
          }
          termsString = termsString + '</p>'
        }
        if (parsedTerms.psc) {
          termsString = termsString + '<p>PSC: '
          for (i = 0; i < parsedTerms.psc.length; i++) {
            termsString = termsString + parsedTerms.psc[i] + ', '
          }
          termsString = termsString + '</p>'
        }
        if (parsedTerms.agencies) {
          termsString = termsString + '<p>AGENCY: '
          for (i = 0; i < parsedTerms.agencies.length; i++) {
            termsString = termsString + parsedTerms.agencies[i] + ', '
          }
          termsString = termsString + '</p>'
        }
        if (parsedTerms.setAside) {
          termsString = termsString + '<p>SETASIDE: '
          for (i = 0; i < parsedTerms.setAside.length; i++) {
            termsString = termsString + parsedTerms.setAside[i] + ', '
          }
          termsString = termsString + '</p>'
        }
        if (parsedTerms.place) {
          termsString = termsString + '<p>LOCATION: '
          for (i = 0; i < parsedTerms.place.length; i++) {
            termsString = termsString + parsedTerms.place[i] + ', '
          }
          termsString = termsString + '</p>'
        }
        if (parsedTerms.keyword) {
          termsString = termsString + '<p>KEYWORD: ' + parsedTerms.keyword + '</p>'
        }
        document.getElementById("search-terms-box").innerHTML = termsString;
        document.getElementById("results-count").innerHTML = searchResults.length  + ' results';
        var resultsString = ''
        for (i = 0; i < searchResults.length; i++) {
          resultsString = resultsString + '<p>'
          resultsString = resultsString + 'SUBJECT: ' + searchResults[i].subject
          resultsString = resultsString + ' | SOLICITATION #: ' + searchResults[i].solnbr
          resultsString = resultsString + ' | POSTED: ' + searchResults[i].date + searchResults[i].year
          resultsString = resultsString + ' | RESP DATE: ' + searchResults[i].respDate
          resultsString = resultsString + ' | AGENCY: ' + searchResults[i].agency
          resultsString = resultsString + ' | NAICS: ' + searchResults[i].naics
          resultsString = resultsString + ' | PSC: ' + searchResults[i].classCod
          resultsString = resultsString + ' | TYPE: ' + searchResults[i].type
          if (searchResults[i].popZip) {
            var fboState = getState(searchResults[i].popZip)
            resultsString = resultsString + ' | POP STATE: ' + fboState
          }
          resultsString = resultsString + '</p> \n'
        }
        document.getElementById("search-results-box").innerHTML = resultsString;
        document.getElementById("loading").classList.add('inactive');
      }
    }
    xhttp2.open("POST", apiUrl+"/fbo/search", true);
    xhttp2.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp2.send(JSON.stringify(search));
  }
}

function parseSearch(searchTerms) {
  var searchOut = {}
  for (let i of searchTerms.type) {
    if (i.value) {
      if (!searchOut.type) {
        searchOut.type = []
      }
      searchOut.type.push(i.name)
    }
  }
  for (let i of searchTerms.dueDate) {
    if (i.value) {
      if (!searchOut.dueDate) {
        searchOut.dueDate = []
      }
      searchOut.dueDate.push(i.name)
    }
  }
  for (let i of searchTerms.naics) {
    if (i.value) {
      if (!searchOut.naics) {
        searchOut.naics = []
      }
      searchOut.naics.push(i.code + ' ' + i.name)
    }
    if (i.subcategories) {
      for (let i2 of i.subcategories) {
        if (i2.value) {
          if (!searchOut.naics) {
            searchOut.naics = []
          }
          searchOut.naics.push(i2.code + ' ' + i2.name)
        }
        if (i2.subcategories) {
          for (let i3 of i2.subcategories) {
            if (i3.value) {
              if (!searchOut.naics) {
                searchOut.naics = []
              }
              searchOut.naics.push(i3.code + ' ' + i3.name)
            }
            if (i3.subcategories) {
              for (let i4 of i3.subcategories) {
                if (i4.value) {
                  if (!searchOut.naics) {
                    searchOut.naics = []
                  }
                  searchOut.naics.push(i4.code + ' ' + i4.name)
                }
                if (i4.subcategories) {
                  for (let i5 of i4.subcategories) {
                    if (i5.value) {
                      if (!searchOut.naics) {
                        searchOut.naics = []
                      }
                      searchOut.naics.push(i5.code + ' ' + i5.name)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  for (let i of searchTerms.psc.products) {
    for (let i2 of i.psc) {
      if (i2.value || i.value) {
        if (!searchOut.psc) {
          searchOut.psc = []
        }
        searchOut.psc.push(i2.name)
      }
    }
  }
  for (let i of searchTerms.psc.services) {
    if (i.value) {
      if (!searchOut.psc) {
        searchOut.psc = []
      }
      searchOut.psc.push(i.name)
    }
  }
  for (let i of searchTerms.agency) {
    var allChecked = false
    if (i.name == 'All') {
      if (i.value) {
        allChecked = true
        if (!searchOut.agencies) {
          searchOut.agencies = []
        }
        searchOut.agencies.push(i.name)
      }
    } else {
      if (!allChecked) {
        if (i.value) {
          console.log(i.name)

          if (!searchOut.agencies) {
            searchOut.agencies = []
          }
          searchOut.agencies.push(i.name)
        }
        if (i.subagencies) {
          for (let i2 of i.subagencies) {
            if (i2.value) {
              if (!searchOut.agencies) {
                searchOut.agencies = []
              }
              searchOut.agencies.push(i2.name)
            }
            if (i2.offices) {
              for (let i3 of i2.offices) {
                if (i3.value) {
                  if (!searchOut.agencies) {
                    searchOut.agencies = []
                  }
                  searchOut.agencies.push(i3.name)
                }
              }
            }
          }
        }
      }
    }
  }
  for (let i of searchTerms.setAside) {
    if (i.value) {
      if (!searchOut.setAside) {
        searchOut.setAside = []
      }
      searchOut.setAside.push(i.fboName)
    }
  }
  for (let i of searchTerms.place) {
    if (i.value) {
      if (!searchOut.place) {
        searchOut.place = []
      }
      searchOut.place.push(i.name)
    } else if (i.regions) {
      for (let i2 of i.regions) {
        if (i2.value) {
          if (!searchOut.place) {
            searchOut.place = []
          }
          searchOut.place.push(i2.name)
        } else if (i2.regions) {
          for (let i3 of i2.regions) {
            if (i3.value) {
              if (!searchOut.place) {
                searchOut.place = []
              }
              searchOut.place.push(i3.name)
            } else if (i3.regions) {
              for (let i4 of i3.regions) {
                if (i4.value) {
                  if (!searchOut.place) {
                    searchOut.place = []
                  }
                  searchOut.place.push(i4.name)
                }
              }
            }
          }
        }
      }
    }
  }
  if (searchTerms.keyword.length > 0) {
    searchOut.keyword = searchTerms.keyword
  }
  return searchOut
}

function getState(zipcode) {

    // Ensure param is a string to prevent unpredictable parsing results
    if (typeof zipcode !== 'string') {
        console.log('Must pass the zipcode as a string.');
        return;
    }
    // Ensure you don't parse codes that start with 0 as octal values
    const thiszip = parseInt(zipcode,10);

    // Code blocks alphabetized by state
    if (thiszip >= 35000 && thiszip <= 36999) {
        thisst = 'AL';
        thisstate = "Alabama";
        }
    else if (thiszip >= 99500 && thiszip <= 99999) {
        thisst = 'AK';
        thisstate = "Alaska";
        }
    else if (thiszip >= 85000 && thiszip <= 86999) {
        thisst = 'AZ';
        thisstate = "Arizona";
        }
    else if (thiszip >= 71600 && thiszip <= 72999) {
        thisst = 'AR';
        thisstate = "Arkansas";
        }
    else if (thiszip >= 90000 && thiszip <= 96699) {
        thisst = 'CA';
        thisstate = "California";
        }
    else if (thiszip >= 80000 && thiszip <= 81999) {
        thisst = 'CO';
        thisstate = "Colorado";
        }
    else if (thiszip >= 6000 && thiszip <= 6999) {
        thisst = 'CT';
        thisstate = "Connecticut";
        }
    else if (thiszip >= 19700 && thiszip <= 19999) {
        thisst = 'DE';
        thisstate = "Deleware";
        }
    else if (thiszip >= 32000 && thiszip <= 34999) {
        thisst = 'FL';
        thisstate = "Florida";
        }
    else if (thiszip >= 30000 && thiszip <= 31999) {
        thisst = 'GA';
        thisstate = "Georgia";
        }
    else if (thiszip >= 96700 && thiszip <= 96999) {
        thisst = 'HI';
        thisstate = "Hawaii";
        }
    else if (thiszip >= 83200 && thiszip <= 83999) {
        thisst = 'ID';
        thisstate = "Idaho";
        }
    else if (thiszip >= 60000 && thiszip <= 62999) {
        thisst = 'IL';
        thisstate = "Illinois";
        }
    else if (thiszip >= 46000 && thiszip <= 47999) {
        thisst = 'IN';
        thisstate = "Indiana";
        }
    else if (thiszip >= 50000 && thiszip <= 52999) {
        thisst = 'IA';
        thisstate = "Iowa";
        }
    else if (thiszip >= 66000 && thiszip <= 67999) {
        thisst = 'KS';
        thisstate = "Kansas";
        }
    else if (thiszip >= 40000 && thiszip <= 42999) {
        thisst = 'KY';
        thisstate = "Kentucky";
        }
    else if (thiszip >= 70000 && thiszip <= 71599) {
        thisst = 'LA';
        thisstate = "Louisiana";
        }
    else if (thiszip >= 3900 && thiszip <= 4999) {
        thisst = 'ME';
        thisstate = "Maine";
        }
    else if (thiszip >= 20600 && thiszip <= 21999) {
        thisst = 'MD';
        thisstate = "Maryland";
        }
    else if (thiszip >= 1000 && thiszip <= 2799) {
        thisst = 'MA';
        thisstate = "Massachusetts";
        }
    else if (thiszip >= 48000 && thiszip <= 49999) {
        thisst = 'MI';
        thisstate = "Michigan";
        }
    else if (thiszip >= 55000 && thiszip <= 56999) {
        thisst = 'MN';
        thisstate = "Minnesota";
        }
    else if (thiszip >= 38600 && thiszip <= 39999) {
        thisst = 'MS';
        thisstate = "Mississippi";
        }
    else if (thiszip >= 63000 && thiszip <= 65999) {
        thisst = 'MO';
        thisstate = "Missouri";
        }
    else if (thiszip >= 59000 && thiszip <= 59999) {
        thisst = 'MT';
        thisstate = "Montana";
        }
    else if (thiszip >= 27000 && thiszip <= 28999) {
        thisst = 'NC';
        thisstate = "North Carolina";
        }
    else if (thiszip >= 58000 && thiszip <= 58999) {
        thisst = 'ND';
        thisstate = "North Dakota";
        }
    else if (thiszip >= 68000 && thiszip <= 69999) {
        thisst = 'NE';
        thisstate = "Nebraska";
        }
    else if (thiszip >= 88900 && thiszip <= 89999) {
        thisst = 'NV';
        thisstate = "Nevada";
        }
    else if (thiszip >= 3000 && thiszip <= 3899) {
        thisst = 'NH';
        thisstate = "New Hampshire";
        }
    else if (thiszip >= 7000 && thiszip <= 8999) {
        thisst = 'NJ';
        thisstate = "New Jersey";
        }
    else if (thiszip >= 87000 && thiszip <= 88499) {
        thisst = 'NM';
        thisstate = "New Mexico";
        }
    else if (thiszip >= 10000 && thiszip <= 14999) {
        thisst = 'NY';
        thisstate = "New York";
        }
    else if (thiszip >= 43000 && thiszip <= 45999) {
        thisst = 'OH';
        thisstate = "Ohio";
        }
    else if (thiszip >= 73000 && thiszip <= 74999) {
        thisst = 'OK';
        thisstate = "Oklahoma";
        }
    else if (thiszip >= 97000 && thiszip <= 97999) {
        thisst = 'OR';
        thisstate = "Oregon";
        }
    else if (thiszip >= 15000 && thiszip <= 19699) {
        thisst = 'PA';
        thisstate = "Pennsylvania";
        }
    else if (thiszip >= 300 && thiszip <= 999) {
        thisst = 'PR';
        thisstate = "Puerto Rico";
        }
    else if (thiszip >= 2800 && thiszip <= 2999) {
        thisst = 'RI';
        thisstate = "Rhode Island";
        }
    else if (thiszip >= 29000 && thiszip <= 29999) {
        thisst = 'SC';
        thisstate = "South Carolina";
        }
    else if (thiszip >= 57000 && thiszip <= 57999) {
        thisst = 'SD';
        thisstate = "South Dakota";
        }
    else if (thiszip >= 37000 && thiszip <= 38599) {
        thisst = 'TN';
        thisstate = "Tennessee";
        }
    else if ( (thiszip >= 75000 && thiszip <= 79999) || (thiszip >= 88500 && thiszip <= 88599) ) {
        thisst = 'TX';
        thisstate = "Texas";
        }
    else if (thiszip >= 84000 && thiszip <= 84999) {
        thisst = 'UT';
        thisstate = "Utah";
        }
    else if (thiszip >= 5000 && thiszip <= 5999) {
        thisst = 'VT';
        thisstate = "Vermont";
        }
    else if (thiszip >= 22000 && thiszip <= 24699) {
        thisst = 'VA';
        thisstate = "Virgina";
        }
    else if (thiszip >= 20000 && thiszip <= 20599) {
        thisst = 'DC';
        thisstate = "District of Columbia";
        }
    else if (thiszip >= 98000 && thiszip <= 99499) {
        thisst = 'WA';
        thisstate = "Washington";
        }
    else if (thiszip >= 24700 && thiszip <= 26999) {
        thisst = 'WV';
        thisstate = "West Virginia";
        }
    else if (thiszip >= 53000 && thiszip <= 54999) {
        thisst = 'WI';
        thisstate = "Wisconsin";
        }
    else if (thiszip >= 82000 && thiszip <= 83199) {
        thisst = 'WY';
        thisstate = "Wyoming";
        }
    else {
        thisst = 'none';
    }
   return thisstate;
}

var app = {
  // Application Constructor
  initialize: function() {
    console.log('doing it')
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log('here')
        var hpd = JSON.parse(xhttp.responseText);
        var buttonsHTML = ''
        for (i = 0; i < hpd.users.length; i++) {
          if (hpd.users[i].userId == '5a6d93e5b387170ee0bd7468' && hpd.users[i].searches) {
            console.log(hpd.users[i].searches.length + ' searches on user')
            for (i2 = 0; i2 < hpd.users[i].searches.length; i2++) {
              searches.push(hpd.users[i].searches[i2])
              buttonsHTML = buttonsHTML + '<button type="button" name="button" onclick="checkSearchAccuracy('+i2+')">'+hpd.users[i].searches[i2].name+'</button>'
            }
          }
        }
        document.getElementById("loading").classList.add('inactive');
        document.getElementById("buttons").innerHTML = buttonsHTML
        document.getElementById("content").classList.remove('inactive');
      };
    }
    var url = apiUrl+"/huntingpartydata/company/5a7a9202abeffa1440a1e061";
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp.send();
    // window.plugins.uniqueDeviceID.get(success, fail);
    // function success(uuid) {
    //   console.log('ID IS THIS: ' + uuid);
    // };
    // renderChart()
  },
}
