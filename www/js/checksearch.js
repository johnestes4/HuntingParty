// var apiUrl = 'https://efassembly.com:4432'
// var apiUrl = 'http://18.218.170.246:4200'
var apiUrl = 'http://localhost:4200'

var saving = false
var activeTab = 0
var dataExpanded = 0
var company = null
var huntingPartyData = null
var device
var fbos = []
var incomingFbos = []
var pipelineFbos = []
var fboIndex = 0
var promiseFinished = false
var highestDataNumber = 4
var emailNotFound = false
var passwordWrong = false
var loggedIn = false
var currentUser = null
var localStorage = window.localStorage
var profileDropdownOpen = false
var voteDropdownOpen = -1
var hamburgerMenuOpen = false
var hamburgerOpening = false
var adCounter = 0
var emailValidated = false
var searchTerms = []
var fboVote = []
var peopleToRefer = []
var emptySearchTerms2 = null
var yesRefer = []
var noRefer = []
var referRefer = []
var naics = []
var psc = []
var tosRead = 0
var tutorialsOpen = false
var allCompanies
var companyToJoin
var yourSearches = []
var fbosIn = []
var fboPipeline = []
var fbosInMax = 0
var fboPipelineMax = 0
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
