var apiUrl = 'https://efassembly.com:4432'
// var apiUrl = 'http://18.218.170.246:4432'

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
var agencyLogos = [
  {
    "agency": "Department of the Air Force",
    "img": "af.png"
  },
  {
    "agency": "Department of the Army",
    "img": "army.png"
  },
  {
    "agency": "Department of the Interior",
    "img": "doi.png"
  },
  {
    "agency": "Department of the Navy",
    "img": "navy.png"
  },
  {
    "agency": "Department of Veterans Affairs",
    "img": "va.jpg"
  },
  {
    "agency": "Defense Logistics Agency",
    "img": "dla.png"
  },
  {
    "agency": "Department of Homeland Security",
    "img": "dhs.png"
  },
  {
    "agency": "Department of Agriculture",
    "img": ""
  },
  {
    "agency": "Department of Health and Human Services",
    "img": ""
  },
  {
    "agency": "Department of the Treasury",
    "img": "treas.png"
  },
  {
    "agency": "Department of State",
    "img": "state.png"
  },
  {
    "agency": "Social Security Administration",
    "img": "ssa.png"
  },
  {
    "agency": "Environmental Protection Agency",
    "img": ""
  },
  {
    "agency": "General Services Administration",
    "img": "gsa.png"
  },
  {
    "agency": "Department of Commerce",
    "img": "doc.png"
  },
  {
    "agency": "Department of Justice",
    "img": "doj.png"
  },
  {
    "agency": "Nuclear Regulatory Commission",
    "img": "nrc.png"
  },
  {
    "agency": "Department of Transportation",
    "img": "dot.png"
  },
  {
    "agency": "Defense Information Systems Agency",
    "img": "disa.png"
  },
  {
    "agency": "Library of Congress",
    "img": "loc.png"
  },
  {
    "agency": "National Aeronautics and Space Administration",
    "img": "nasa.png"
  },
  {
    "agency": "Agency for International Development",
    "img": "usaid.png"
  },
  {
    "agency": "Government Publishing Office",
    "img": "gpo.png"
  },
  {
    "agency": "Federal Energy Regulatory Commission",
    "img": "ferc.png"
  },
  {
    "agency": "National Archives and Records Administration",
    "img": "nara.png"
  },
  {
    "agency": "Federal Retirement Thrift Investment Board",
    "img": "frtib.png"
  },
  {
    "agency": "Department of Energy",
    "img": "doe.gif"
  },
  {
    "agency": "Department of Health and Human Services",
    "img": "dhhs.png"
  },
  {
    "agency": "Department of Agriculture",
    "img": "doa.png"
  }
]
var searchTerms = []
var fboVote = []
var peopleToRefer = []
var tabIds = [
  {
    id: 0,
    allowed: [1,2]
  },
  {
    id: 1,
    allowed: [3]
  },
  {
    id: 2,
    allowed: [4]
  }
]
var searchTerms = {
  type: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Open RFPs',
      value: false
    },
    {
      name: 'Open RFIs',
      value: false
    },
    {
      name: 'Historical (closed) and projected RFPs',
      value: false
    }
  ],
  dueDate: [
    {
      name: 'Due any time',
      value: false
    },{
      name: 'Due this week',
      value: false
    },{
      name: 'Due next week',
      value: false
    },{
      name: 'Due in next 2-4 weeks',
      value: false
    },{
      name: 'Due more than 4 weeks from now',
      value: false
    }
  ],
  naics: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Option 2',
      value: true
    }
  ],
  psc: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Option 2',
      value: true
    }
  ],
  agency: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Option 2',
      value: true
    }
  ],
  place: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Option 2',
      value: true
    }
  ],
  setAside: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Option 2',
      value: true
    }
  ],
  keyword: '',
}
var emptySearchTerms = {
  type: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Open RFPs',
      value: false
    },
    {
      name: 'Open RFIs',
      value: false
    },
    {
      name: 'Historical (closed) and projected RFPs',
      value: false
    }
  ],
  dueDate: [
    {
      name: 'Due any time',
      value: false
    },{
      name: 'Due this week',
      value: false
    },{
      name: 'Due next week',
      value: false
    },{
      name: 'Due in next 2-4 weeks',
      value: false
    },{
      name: 'Due more than 4 weeks from now',
      value: false
    }
  ],
  naics: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Option 2',
      value: true
    }
  ],
  psc: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Option 2',
      value: true
    }
  ],
  agency: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Option 2',
      value: true
    }
  ],
  place: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Option 2',
      value: true
    }
  ],
  setAside: [
    {
      name: 'All',
      value: false
    },
    {
      name: 'Option 2',
      value: true
    }
  ],
  keyword: '',
}
var yesRefer = []
var naics = []
var psc = [
  "10 Weapons",
  "11 Nuclear ordnance",
  "12 Fire control equipment",
  "13 Ammunition & explosives",
  "14 Guided missiles",
  "15 Aircraft & airframe structural components",
  "16 Aircraft components & accessories",
  "17 Aircraft launching, landing & ground handling equipment",
  "18 Space vehicles",
  "19 Ships, small craft, pontoons & floating docks",
  "20 Ship and marine equipment",
  "22 Railway equipment",
  "23 Ground effects vehicles, motor vehicles, trailers & cycles",
  "24 Tractors",
  "25 Vehicular equipment components",
  "26 Tires and tubes",
  "28 Engines, turbines & components",
  "29 Engine accessories",
  "30 Mechanical power transmission equipment",
  "31 Bearings",
  "32 Woodworking machinery and equipment",
  "34 Metalworking machinery",
  "35 Service and trade equipment",
  "36 Special industry machinery",
  "37 Agricultural machinery & equipment",
  "38 Construction, mining, excavating & highway maintenance equipment",
  "39 Materials handling equipment",
  "40 Rope, cable, chain & fittings",
  "41 Refrigeration, air-conditioning & air circulating equipment",
  "42 Fire fighting, rescue & safety equipment",
  "43 Pumps & compressors",
  "44 Furnace, steam plant & drying equipment; & nuclear reactors",
  "45 Plumbing, heating, & sanitation equipment",
  "46 Water purification & sewage treatment equipment",
  "47 Pipe, tubing, hose & fittings",
  "48 Valves",
  "49 Maintenance & repair shop equipment",
  "51 Hand tools",
  "52 Measuring tools",
  "53 Hardware & abrasives",
  "54 Prefabricated structures and scaffolding",
  "55 Lumber, millwork, plywood & veneer",
  "56 Construction & building materials",
  "58 Communication, detection, & coherent radiation equipment",
  "59 Electrical and electronic equipment components",
  "60 Fiber optics materials, components, assemblies & accessories",
  "61 Electric wire & power & distribution equipment",
  "62 Lighting fixtures & lamps",
  "63 Alarm, signal & security detection equipment",
  "65 Medical, dental & veterinary equipment & supplies",
  "66 Instruments & laboratory equipment",
  "67 Photographic equipment",
  "68 Chemicals & chemical products",
  "69 Training aids & devices",
  "70 General purpose information technology equipment",
  "71 Furniture",
  "72 Household & commercial furnishings & appliances",
  "73 Food preparation and serving equipment",
  "74 Office machines, text processing systems & visible record equipment",
  "75 Office supplies and devices",
  "76 Books, maps & other publications",
  "77 Musical instruments, phonographs & home-type radios",
  "78 Recreational & athletic equipment",
  "79 Cleaning equipment and supplies",
  "80 Brushes, paints, sealers & adhesives",
  "81 Containers, packaging, & packing supplies",
  "83 Textiles, leather, furs, apparel & shoe findings, tents & flags",
  "84 Clothing, individual equipment & insignia",
  "85 Toiletries",
  "87 Agricultural supplies",
  "88 Live animals",
  "89 Subsistence",
  "91 Fuels, lubricants, oils & waxes",
  "93 Nonmetallic fabricated materials",
  "94 Nonmetallic crude materials",
  "95 Metal bars, sheets & shapes",
  "96 Ores, minerals & their primary products",
  "99 Miscellaneous"
]
var tosRead = 0
var tutorialsOpen = false
var allCompanies
var companyToJoin

function login() {
  var username = document.getElementById("email").value.toLowerCase()
  var password = document.getElementById("password").value
  document.getElementById("loading-details").innerHTML = 'Checking if email has account...'
  document.getElementById("loading").classList.remove('inactive');
  document.getElementById("main-view").classList.add('inactive');
  document.getElementById("fbo-view").classList.add('inactive');
  document.getElementById("fbo-list-view").classList.add('inactive');
  document.getElementById("fbo-detail-view").classList.add('inactive');
  document.getElementById("login-register").classList.add('inactive');
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      console.log('why doesnt this work')

      // Typical action to be performed when the document is ready:
      document.getElementById("loading-details").innerHTML = 'Sending login request...'
      var res = JSON.parse(xhttp.responseText)
      if (res.id) {
        var xhttp2 = new XMLHttpRequest();
        console.log('why doesnt this work')
        xhttp2.onreadystatechange = function() {
          if (xhttp2.readyState == 4 && xhttp2.status == 200) {
            document.getElementById("loading-details").innerHTML = 'Login successful, fetching profile info...'
            // console.log(res.id)
            var xhttp3 = new XMLHttpRequest();
            xhttp3.onreadystatechange = function() {
              if (xhttp3.readyState == 4 && xhttp3.status == 200) {
                document.getElementById("loading-details").innerHTML = 'Profile info found, finishing up...'
                localStorage.setItem('uid', res.id)
                loggedIn = true
                currentUser = JSON.parse(xhttp3.responseText)
                console.log('we did it')
                getTheData()
                // console.log(currentUser)
              }
            };
            xhttp3.open("GET", apiUrl+"/profiles/" + res.id, true);
            xhttp3.setRequestHeader("Content-type", "application/json");
            xhttp3.send();
          } else if (xhttp2.readyState == 4 && xhttp2.status == 400) {
            document.getElementById("loading").classList.add('inactive');
            document.getElementById("main-view").classList.add('inactive');
            document.getElementById("fbo-view").classList.add('inactive');
            document.getElementById("fbo-list-view").classList.add('inactive');
            document.getElementById("fbo-detail-view").classList.add('inactive');
            document.getElementById("login-register").classList.remove('inactive');
            document.getElementById("login-error-text").innerHTML = 'Password/username mismatch'
          }
        };
        var body = {
          email: username,
          password: password
        }
        xhttp2.open("POST", apiUrl+"/auth/login/" + res.id, true);
        xhttp2.setRequestHeader("Content-type", "application/json");
        xhttp2.send(JSON.stringify(body));
      } else {
        emailNotFound = true
      }
    } else if (xhttp.status !== 200) {
      document.getElementById("loading-details").innerHTML = 'Status code ' + xhttp.status + ', status ' + xhttp.statusText
    } else {
      document.getElementById("loading-details").innerHTML = 'Ready state ' + xhttp.readyState + ', status code ' + xhttp.status
    }
  };
  console.log(username)
  xhttp.open("GET", apiUrl+"/profiles/email/" + username, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}

function logOut() {
  localStorage.removeItem('uid');
  currentUser = null;
  company = null;
  fbos = [];
  loggedIn = false;
  document.getElementById("loading").classList.add('inactive');
  document.getElementById("main-view").classList.add('inactive');
  document.getElementById("fbo-view").classList.add('inactive');
  document.getElementById("fbo-list-view").classList.add('inactive');
  document.getElementById("fbo-detail-view").classList.add('inactive');
  document.getElementById("login-register").classList.remove('inactive');
}

function hello() {
  document.getElementById("text").innerHTML = "CLICKED";
  console.log('hello')
  navigator.notification.alert(
    'You got a notification!',  // message
    null,         // callback
    'Congratulations',            // title
    'I did it'                  // buttonName
  );
}

function openProfileDropdown() {
  // document.getElementById("profile-sidebar").classList.add('slide-to-right');
  // document.getElementById("profile-dropdown").classList.remove('inactive')
  // profileDropdownOpen = true
}

function viewSearch() {
  if (document.getElementById("saved-searches").value > -1) {
    searchTerms = huntingPartyData.searches[document.getElementById("saved-searches").value]
    // activeSavedSearch = document.getElementById("saved-searches").value
  } else {
    searchTerms = emptySearchTerms
  }
  renderSearch()
  var a = document.getElementsByClassName('checkbox-duedate')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.dueDate[i].value
  }
  a = document.getElementsByClassName('checkbox-naics')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.naics[i].value
  }
  a = document.getElementsByClassName('checkbox-psc')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.psc[i].value
  }
  a = document.getElementsByClassName('checkbox-agency')
  for (i = 0; i < a.length; i++) {
    if (searchTerms.agency[i]) {
      a[i].checked = searchTerms.agency[i].value
    }
  }
  a = document.getElementsByClassName('checkbox-place')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.place[i].value
  }
  a = document.getElementsByClassName('checkbox-setaside')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.setAside[i].value
  }
  document.getElementById("search-name").value = searchTerms.name
}

function renderSavedSearches() {
  var html = '<option value="-1">---Create New Search---</option>'
  // '<option disabled selected value> -- select an option -- </option>'
  console.log(huntingPartyData.searches)
  for (i = 0; i < huntingPartyData.searches.length; i++) {
    html = html + '<option value="'+i+'">'+huntingPartyData.searches[i].name+'</option>'
  }
  document.getElementById("saved-searches").innerHTML = html
}


function searchFilter(which) {
  var string = document.getElementById("search-filter-" + which).value
  var html = ''
  if (which == 0) {
    for (i = 0; i < searchTerms.naics.length; i++) {
      var checkedHtml = ''
      if (searchTerms.naics[i].value) {
        checkedHtml = ' checked'
      }
      if (i == 0) {
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<input class="checkbox-naics" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.naics[i].name+'</span>'
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<p style="margin-bottom: 2px;">----------</p>'+
        '</div>'
      } else if (isNaN(string)) {
        if (searchTerms.naics[i].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.naics[i].value == true) {
          html = html + '<div class="" style="width: 100%; float: left;">'+
          '<input class="checkbox-naics" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" value="'+searchTerms.naics[i].code+'" '+checkedHtml+'> <span style="line-height: 25px;" onclick="calculateNaicsSearch(searchTerms.naics['+i+'], '+i+', this)"> '+searchTerms.naics[i].code+' '+searchTerms.naics[i].name+'<span id="naics-arrow-'+i+'" style="position: absolute; right: 0px; top: 0px;">▼</span></span></div>'+
          '<div id="naics-subcategory-box-'+i+'"></div>'
        } else {
          html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
          '<input class="checkbox-naics" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" value="'+searchTerms.naics[i].code+'" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.naics[i].code+' '+searchTerms.naics[i].name+'<span id="naics-arrow-'+i+'" style="position: absolute; right: 0px; top: 0px;">▼</span></span></div>'+
          '<div id="naics-subcategory-box-'+i+'"></div>'
        }
      } else if (!isNaN(string)) {
        if (searchTerms.naics[i].code.toString().includes(string) || searchTerms.naics[i].value == true) {
          html = html + '<div class="" style="width: 100%; float: left;">'+
          '<input class="checkbox-naics" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" value="'+searchTerms.naics[i].code+'" '+checkedHtml+'> <span style="line-height: 25px;" onclick="calculateNaicsSearch(searchTerms.naics['+i+'], '+i+', this)"> '+searchTerms.naics[i].code+' '+searchTerms.naics[i].name+'</span></div>'+
          '<div id="naics-subcategory-box-'+i+'"></div>'
        } else {
          html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
          '<input class="checkbox-naics" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" value="'+searchTerms.naics[i].code+'" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.naics[i].code+' '+searchTerms.naics[i].name+'</span></div>'+
          '<div id="naics-subcategory-box-'+i+'"></div>'
        }
      }
      html = html + '</div>'
    }
    document.getElementById("search-box-naics").innerHTML = html
  }
  if (which == 1) {
    for (i = 0; i < searchTerms.psc.length; i++) {
      var checkedHtml = ''
      if (searchTerms.psc[i].value) {
        checkedHtml = ' checked'
      }

      if (i == 0) {
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<input class="checkbox-psc" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.psc[i].name+'</span></div>'
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<p style="margin-bottom: 2px;">----------</p>'+
        '</div>'
      } else if (searchTerms.psc[i].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.psc[i].value == true) {
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<input class="checkbox-psc" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.psc[i].name+'</span></div>'
      } else {
        html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
        '<input class="checkbox-psc" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.psc[i].name+'</span></div>'
      }
      html = html + '</div>'
    }
    document.getElementById("search-box-psc").innerHTML = html
  }
  if (which == 2) {
    console.log('sss')
    for (i = 0; i < searchTerms.agency.length; i++) {
      var checkedHtml = ''
      if (searchTerms.agency[i].value == true) {
        console.log(searchTerms.agency[i].name + ' is checked')
        checkedHtml = ' checked'
      }
      if (i == 0) {
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<input class="checkbox-agency" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.agency[i].name+'</span></div>'
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<p style="margin-bottom: 2px;">----------</p>'+
        '</div>'
      } else if (searchTerms.agency[i].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.agency[i].value == true) {
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<input class="checkbox-agency" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;" onclick="calculateAgencySearch('+i+')"> '+searchTerms.agency[i].name+'</span></div>'
        var inactiveHtml = ''
        if (document.getElementById("agency-subcategory-box-"+i+"").classList.contains('inactive')) {
          inactiveHtml = ' inactive'
        }
        html = html + '<div id="agency-subcategory-box-'+i+'" class="subcategory-box '+inactiveHtml+'">'
        for (subagencyIndex = 0; subagencyIndex < searchTerms.agency[i].subagencies.length; subagencyIndex++) {
          var subCheckedHTML = ''
          if (searchTerms.agency[i].subagencies[subagencyIndex].value) {
            subCheckedHTML = ' checked'
          }
          if (searchTerms.agency[i].subagencies[subagencyIndex].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.agency[i].subagencies[subagencyIndex].value == true) {
            var inactiveHtml2 = ''
            if (document.getElementById('subagency-subcategory-box-'+i+'-'+subagencyIndex+'')) {
              if (document.getElementById('subagency-subcategory-box-'+i+'-'+subagencyIndex+'').classList.contains('inactive')) {
                inactiveHtml2 = ' inactive'
              }
            } else {
              inactiveHtml2 = ' inactive'
            }
            var checked = ''
            if (searchTerms.agency[i].subagencies[subagencyIndex]) {
              checked = ' checked'
            }
            html = html + '<div class="" style="width: 100%; float: left;">'+
            '<input class="checkbox-agency" type="checkbox" name="" value="'+searchTerms.agency[i].subagencies[subagencyIndex].name+'" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+subCheckedHTML+'> <span style="line-height: 25px;" onclick="calculateOfficeSearch('+i+','+subagencyIndex+')"> '+searchTerms.agency[i].subagencies[subagencyIndex].name+'</span></div>'+
            '<div id="subagency-subcategory-box-'+i+'-'+subagencyIndex+'" class="subcategory-box '+inactiveHtml2+'"></div>'
          } else {
            html = html + '<div class="inactive" style="width: 100%; float: left;">'+
            '<input class="checkbox-agency" type="checkbox" name="" value="'+searchTerms.agency[i].subagencies[subagencyIndex].name+'" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+subCheckedHTML+'> <span style="line-height: 25px;" onclick="calculateOfficeSearch('+i+','+subagencyIndex+')"> '+searchTerms.agency[i].subagencies[subagencyIndex].name+'</span></div>'+
            '<div id="subagency-subcategory-box-'+i+'-'+subagencyIndex+'" class="subcategory-box '+inactiveHtml2+'"></div>'
          }
        }
        html = html + '</div>'
      } else {
        html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
        '<input class="checkbox-agency" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.agency[i].name+'</span></div>'+
        '<div id="agency-subcategory-box-'+i+'"></div>'
      }
    }
    document.getElementById("search-box-agency").innerHTML = html
    //
    // if (searchTerms.agency[agencyIndex].name == a[i].value) {
    //   if (!searchTerms.agency[agencyIndex].name.toLowerCase().includes(string.toLowerCase()) || !searchTerms.agency[agencyIndex].value) {
    //     a[i].classList.add('inactive')
    //   } else {
    //     a[i].classList.remove('inactive')
    //   }
    // } else if (searchTerms.agency[agencyIndex].subagencies) {
    //   for (subagencyIndex = 0; subagencyIndex < searchTerms.agency[agencyIndex].subagencies.length; subagencyIndex++) {
    //     if (searchTerms.agency[agencyIndex].subagencies[subagencyIndex].name == a[i].value) {
    //       if (!searchTerms.agency[agencyIndex].subagencies[subagencyIndex].name.toLowerCase().includes(string.toLowerCase()) || !searchTerms.agency[agencyIndex].subagencies[subagencyIndex].value) {
    //         a[i].classList.add('inactive')
    //       } else {
    //         a[i].classList.remove('inactive')
    //       }
    //       break;
    //     } else if (searchTerms.agency[agencyIndex].subagencies[subagencyIndex].offices) {
    //       for (officeIndex = 0; officeIndex < searchTerms.agency[agencyIndex].subagencies[subagencyIndex].offices.length; officeIndex++) {
    //         if (searchTerms.agency[agencyIndex].subagencies[subagencyIndex].office[officeIndex].name == a[i].value) {
    //           if (!searchTerms.agency[agencyIndex].subagencies[subagencyIndex].office[officeIndex].name.toLowerCase().includes(string.toLowerCase()) || !searchTerms.agency[agencyIndex].subagencies[subagencyIndex].office[officeIndex].value) {
    //             a[i].classList.add('inactive')
    //           } else {
    //             a[i].classList.remove('inactive')
    //           }
    //           break;
    //         }
    //       }
    //     }
    //   }
    // }
  }
}

function renderSearch() {
  var html = ''
  for (i = 0; i < searchTerms.dueDate.length; i++) {
    html = html + '<div class="" style="width: 100%; float: left;">'+
    '<input class="checkbox-duedate" type="checkbox" name="" value="'+searchTerms.dueDate[i].name+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> '+searchTerms.dueDate[i].name+'</span>'
    if (i == 0) {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<p style="margin-bottom: 2px;">----------</p>'+
      '</div>'
    }
    html = html + '</div>'
  }
  document.getElementById("search-box-time").innerHTML = html
  html = ''
  var naicsIndex = 0
  for (i = 0; i < searchTerms.naics.length; i++) {
    if (i == 0) {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<input class="checkbox-naics" type="checkbox" name="" value="0" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <div style="line-height: 25px; width: calc(100% - 15px); float: left;"> '+searchTerms.naics[i].name+'</div>'+
      '<div id="naics-subcategory-box-'+i+'"></div>'+
      '<div class="" style="width: 100%; float: left;">'+
      '<p style="margin-bottom: 2px;">----------</p>'+
      '</div>'
    } else {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<input class="checkbox-naics" type="checkbox" name="" value="'+searchTerms.naics[i].code+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <div style="line-height: 25px; position: relative; width: calc(100% - 15px); float: left;" onclick="calculateNaicsSearch(searchTerms.naics['+i+'], '+i+', this)"> '+
      searchTerms.naics[i].code+' '+searchTerms.naics[i].name+'<span id="naics-arrow-'+i+'" style="position: absolute; right: 0px; top: 0px;">▼</span></div>'+
      '<div id="naics-subcategory-box-'+i+'"></div>'
    }
    html = html + '</div>'
    naicsIndex++
  }
  document.getElementById("search-box-naics").innerHTML = html
  html = ''
  for (i = 0; i < searchTerms.psc.length; i++) {
    html = html + '<div class="" style="width: 100%; float: left;">'+
    '<input class="checkbox-psc" type="checkbox" name="" value="'+searchTerms.psc[i].name+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> '+searchTerms.psc[i].name+'</span>'
    if (i == 0) {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<p style="margin-bottom: 2px;">----------</p>'+
      '</div>'
    }
    html = html + '</div>'
  }
  document.getElementById("search-box-psc").innerHTML = html
  html = ''
  for (i = 0; i < searchTerms.agency.length; i++) {
    if (i == 0) {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<input class="checkbox-agency" type="checkbox" name="" value="'+searchTerms.agency[i].name+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> '+searchTerms.agency[i].name+'</span></div>'+
      '<div id="agency-subcategory-box-'+i+'"></div>'+
      '<div class="" style="width: 100%; float: left;">'+
      '<p style="margin-bottom: 2px;">----------</p>'+
      '</div>'
    } else {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<input class="checkbox-agency" type="checkbox" name="" value="'+searchTerms.agency[i].name+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;" onclick="calculateAgencySearch('+i+')"> '+searchTerms.agency[i].name+'</span></div>'+
      '<div id="agency-subcategory-box-'+i+'" class="subcategory-box inactive">'
      if (searchTerms.agency[i].subagencies) {
        for (subagencyIndex = 0; subagencyIndex < searchTerms.agency[i].subagencies.length; subagencyIndex++) {
          html = html + '<div class="" style="width: 100%; float: left;">'+
          '<input class="checkbox-agency" type="checkbox" name="" value="'+searchTerms.agency[i].subagencies[subagencyIndex].name+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;" onclick="calculateOfficeSearch('+i+', '+subagencyIndex+')"> '+searchTerms.agency[i].subagencies[subagencyIndex].name+'</span></div>'+
          '<div id="subagency-subcategory-box-'+i+'-'+subagencyIndex+'" class="subcategory-box inactive">'
          if (searchTerms.agency[i].subagencies[subagencyIndex].offices) {
            for (officeIndex = 0; officeIndex < searchTerms.agency[i].subagencies[subagencyIndex].offices.length; officeIndex++) {
              html = html + '<div class="" style="width: 100%; float: left;">'+
              '<input class="checkbox-agency" type="checkbox" name="" value="'+searchTerms.agency[i].subagencies[subagencyIndex].offices[officeIndex].name+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> '+searchTerms.agency[i].subagencies[subagencyIndex].offices[officeIndex].name+'</span></div>'
            }
          }
          html = html + '</div>'
        }
      }
      html = html + '</div>'
    }
  }
  document.getElementById("search-box-agency").innerHTML = html
  html = ''
  for (i = 0; i < searchTerms.place.length; i++) {
    html = html + '<div class="" style="width: 100%; float: left;">'+
    '<input class="checkbox-place" type="checkbox" name="" value="'+searchTerms.place[i].name+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> '+searchTerms.place[i].name+'</span>'
    if (i == 0) {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<p style="margin-bottom: 2px;">----------</p>'+
      '</div>'
    }
    html = html + '</div>'
  }
  document.getElementById("search-box-location").innerHTML = html
  html = ''
  for (i = 0; i < searchTerms.setAside.length; i++) {
    html = html + '<div class="" style="width: 100%; float: left;">'+
    '<input class="checkbox-setaside" type="checkbox" name="" value="'+searchTerms.setAside[i].name+'" style="float: left; height: 20px;"> <span style="line-height: 25px;"> '+searchTerms.setAside[i].name+'</span>'
    if (i == 0) {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<p style="margin-bottom: 2px;">----------</p>'+
      '</div>'
    }
    html = html + '</div>'
  }
  document.getElementById("search-box-setaside").innerHTML = html
}

function calculateNaicsSearch(naicsItem, index, elem) {
  var divId = 'naics-subcategory-box-'+index
  if (!elem.classList.contains('naics-open')) {
    if (naicsItem.subcategories) {
      var html = '<div class="naics-subcategory-box subcategory-box">'
      for (i = 0; i < naicsItem.subcategories.length; i++) {
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<input class="checkbox-naics" type="checkbox" name="" value="'+naicsItem.subcategories[i].name+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> '+naicsItem.subcategories[i].code+' '+naicsItem.subcategories[i].name+'</span></div>'
      }
      html = html + '</div>'
      elem.classList.add('naics-open');
      document.getElementById('naics-arrow-'+index).innerHTML = '▲'
      document.getElementById(divId).innerHTML = html
    }
  } else {
    document.getElementById(divId).innerHTML = ''
    document.getElementById('naics-arrow-'+index).innerHTML = '▼'
    elem.classList.remove('naics-open');
  }
}

function calculateAgencySearch(agencyIndex) {
  if (!document.getElementById('agency-subcategory-box-'+agencyIndex+'').classList.contains('inactive')) {
    document.getElementById('agency-subcategory-box-'+agencyIndex+'').classList.add('inactive')
  } else {
    document.getElementById('agency-subcategory-box-'+agencyIndex+'').classList.remove('inactive')
  }
}

function calculateOfficeSearch(agencyIndex, subagencyIndex) {
  if (!document.getElementById('subagency-subcategory-box-'+agencyIndex+'-'+subagencyIndex+'').classList.contains('inactive')) {
    document.getElementById('subagency-subcategory-box-'+agencyIndex+'-'+subagencyIndex+'').classList.add('inactive')
  } else {
    document.getElementById('subagency-subcategory-box-'+agencyIndex+'-'+subagencyIndex+'').classList.remove('inactive')
  }
}

function openTutorials() {
  var a = document.getElementsByClassName('tutorial-view')
  if (!tutorialsOpen) {
    for (i = 0; i < a.length; i++) {
      a[i].classList.remove('inactive')
    }
    tutorialsOpen = true
  } else {
    for (i = 0; i < a.length; i++) {
      a[i].classList.add('inactive')
    }
    tutorialsOpen = false
  }
}

function calculateSearch(elem) {
  var anyFalse = false
  if (elem.classList.contains('checkbox-duedate')) {
    if (elem.value == searchTerms.dueDate[0].name) {
      for (i = 0; i < searchTerms.dueDate.length; i++) {
        searchTerms.dueDate[i].value = elem.checked
      }
      var a = document.getElementsByClassName('checkbox-duedate')
      for (i2 = 0; i2 < a.length; i2++) {
        a[i2].checked = elem.checked
      }
    } else {
      for (i = 0; i < searchTerms.dueDate.length; i++) {
        if (searchTerms.dueDate[i].name == elem.value) {
          searchTerms.dueDate[i].value = elem.checked
          if (!elem.checked) {
            searchTerms.dueDate[0].value = false
            var a = document.getElementsByClassName('checkbox-duedate')
            a[0].checked = false
          }
          break;
        }
      }
    }
  } else if (elem.classList.contains('checkbox-naics')) {
    if (elem.value == searchTerms.naics[0].code) {
      for (i = 0; i < searchTerms.naics.length; i++) {
        searchTerms.naics[i].value = elem.checked
      }
      var a = document.getElementsByClassName('checkbox-naics')
      for (i2 = 0; i2 < a.length; i2++) {
        a[i2].checked = elem.checked
      }
    } else {
      for (i = 0; i < searchTerms.naics.length; i++) {
        if (searchTerms.naics[i].code == elem.value) {
          searchTerms.naics[i].value = elem.checked
          if (!elem.checked) {
            searchTerms.naics[0].value = false
            var a = document.getElementsByClassName('checkbox-naics')
            a[0].checked = false
          }
          break;
        } else if (elem.value.slice(0,searchTerms.naics[i].code.length) == searchTerms.naics[i].code) {
          if (searchTerms.naics[i].subcategories) {
            // LEVEL 1 OF SUBCATEGORIES
            for (i2 = 0; i2 < searchTerms.naics[i].subcategories.length; i2++) {
              if (searchTerms.naics[i].subcategories[i2].code == elem.value) {
                searchTerms.naics[i].subcategories[i2].value = elem.checked
                if (!elem.checked) {
                  searchTerms.naics[0].value = false
                  var a = document.getElementsByClassName('checkbox-naics')
                  a[0].checked = false
                }
                break;
              } else if (elem.value.slice(0,searchTerms.naics[i].subcategories[i2].code.length) == searchTerms.naics[i].subcategories[i2].code) {
                if (searchTerms.naics[i].subcategories[i2].subcategories) {
                  // LEVEL 2 OF SUBCATEGORIES
                  for (i3 = 0; i3 < searchTerms.naics[i].subcategories[i2].subcategories.length; i3++) {
                    if (searchTerms.naics[i].subcategories[i2].subcategories[i3].code == elem.value) {
                      searchTerms.naics[i].subcategories[i2].subcategories[i3].value = elem.checked
                      if (!elem.checked) {
                        searchTerms.naics[0].value = false
                        var a = document.getElementsByClassName('checkbox-naics')
                        a[0].checked = false
                      }
                      break;
                    } else if (elem.value.slice(0,searchTerms.naics[i].subcategories[i2].subcategories[i3].code.length) == searchTerms.naics[i].subcategories[i2].subcategories[i3].code) {
                      if (searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories) {
                        // LEVEL 3 OF SUBCATEGORIES
                        for (i4 = 0; i4 < searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories.length; i4++) {
                          if (searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].code == elem.value) {
                            searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].value = elem.checked
                            if (!elem.checked) {
                              searchTerms.naics[0].value = false
                              var a = document.getElementsByClassName('checkbox-naics')
                              a[0].checked = false
                            }
                            break;
                          } else if (elem.value.slice(0,searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].code.length) == searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].code) {
                            if (searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories) {
                              // LEVEL 4 OF SUBCATEGORIES
                              for (i5 = 0; i5 < searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories.length; i5++) {
                                if (searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories[i5].code == elem.value) {
                                  searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories[i5].value = elem.checked
                                  if (!elem.checked) {
                                    searchTerms.naics[0].value = false
                                    var a = document.getElementsByClassName('checkbox-naics')
                                    a[0].checked = false
                                  }
                                  break;
                                }
                              }
                              //
                            }
                          }
                        }
                        //
                      }
                    }
                  }
                  //
                }
              }
            }
            //
          }
        }
      }
    }
  } else if (elem.classList.contains('checkbox-psc')) {
    if (elem.value == searchTerms.psc[0].name) {
      for (i = 0; i < searchTerms.psc.length; i++) {
        searchTerms.psc[i].value = elem.checked
      }
      var a = document.getElementsByClassName('checkbox-psc')
      for (i2 = 0; i2 < a.length; i2++) {
        a[i2].checked = elem.checked
      }
    } else {
      for (i = 0; i < searchTerms.psc.length; i++) {
        if (searchTerms.psc[i].name == elem.value) {
          searchTerms.psc[i].value = elem.checked
          if (!elem.checked) {
            searchTerms.psc[0].value = false
            var a = document.getElementsByClassName('checkbox-psc')
            a[0].checked = false
          }
        }
      }
    }
  } else if (elem.classList.contains('checkbox-agency')) {
    console.log(elem.value + ' - ' + elem.checked)
    if (elem.value == searchTerms.agency[0].name) {
      for (i = 0; i < searchTerms.agency.length; i++) {
        searchTerms.agency[i].value = elem.checked
      }
      var a = document.getElementsByClassName('checkbox-agency')
      for (i2 = 0; i2 < a.length; i2++) {
        a[i2].checked = elem.checked
      }
    } else {
      for (agencyIndex = 0; agencyIndex < searchTerms.agency.length; agencyIndex++) {
        if (searchTerms.agency[agencyIndex].name == elem.value) {
          console.log('found a match')
          searchTerms.agency[agencyIndex].value = elem.checked
          console.log('now its ' + elem.checked + ' ' + searchTerms.agency[agencyIndex].value)
          if (!elem.checked) {
            searchTerms.agency[0].value = false
            var a = document.getElementsByClassName('checkbox-agency')
            a[0].checked = false
          }
        } else if (searchTerms.agency[agencyIndex].subagencies) {
          for (subagencyIndex = 0; subagencyIndex < searchTerms.agency[agencyIndex].subagencies.length; subagencyIndex++) {
            if (searchTerms.agency[agencyIndex].subagencies[subagencyIndex].name == elem.value) {
              console.log('found a match')
              searchTerms.agency[agencyIndex].subagencies[subagencyIndex].value = elem.checked
              console.log('now its ' + elem.checked + ' ' + searchTerms.agency[agencyIndex].subagencies[subagencyIndex].value)
            } else if (searchTerms.agency[agencyIndex].subagencies[subagencyIndex].offices) {
              for (officeIndex = 0; officeIndex < searchTerms.agency[agencyIndex].subagencies[subagencyIndex].offices.length; officeIndex++) {
                if (searchTerms.agency[agencyIndex].subagencies[subagencyIndex].offices[officeIndex].name == elem.value) {
                  console.log('found a match')
                  searchTerms.agency[agencyIndex].subagencies[subagencyIndex].offices[officeIndex].value = elem.checked
                  console.log('now its ' + elem.checked + ' ' + searchTerms.agency[agencyIndex].subagencies[subagencyIndex].offices[officeIndex].value)
                }
              }
            }
          }
        }
      }
    }
  } else if (elem.classList.contains('checkbox-place')) {
    if (elem.value == searchTerms.place[0].name) {
      for (i = 0; i < searchTerms.place.length; i++) {
        searchTerms.place[i].value = elem.checked
      }
      var a = document.getElementsByClassName('checkbox-place')
      for (i2 = 0; i2 < a.length; i2++) {
        a[i2].checked = elem.checked
      }
    } else {
      for (i = 0; i < searchTerms.place.length; i++) {
        if (searchTerms.place[i].name == elem.value) {
          searchTerms.place[i].value = elem.checked
          if (!elem.checked) {
            searchTerms.place[0].value = false
            var a = document.getElementsByClassName('checkbox-place')
            a[0].checked = false
          }
        }
      }
    }
  } else if (elem.classList.contains('checkbox-setaside')) {
    if (elem.value == searchTerms.setaside[0].name) {
      for (i = 0; i < searchTerms.setaside.length; i++) {
        searchTerms.setaside[i].value = elem.checked
      }
      var a = document.getElementsByClassName('checkbox-setaside')
      for (i2 = 0; i2 < a.length; i2++) {
        a[i2].checked = elem.checked
      }
    } else {
      for (i = 0; i < searchTerms.setaside.length; i++) {
        if (searchTerms.setaside[i].name == elem.value) {
          searchTerms.setaside[i].value = elem.checked
          if (!elem.checked) {
            searchTerms.setaside[0].value = false
            var a = document.getElementsByClassName('checkbox-setaside')
            a[0].checked = false
          }
        }
      }
    }
  }
}

function closeSearchPopup() {
  document.getElementById('search-save-popup').classList.add('inactive')
  document.getElementById('search-save-popup-bg').classList.add('inactive')
}

function saveSearchTerms() {
  if (document.getElementById("search-name").value.length > 0) {
    var terms = searchTerms
    var creatingNew = false
    if (!huntingPartyData) {
      huntingPartyData = {
        companyId: company._id,
        users: [],
        searches: []
      }
      creatingNew = true
    } else if (!huntingPartyData.users) {
      huntingPartyData.users = []
    }
    terms.name = document.getElementById("search-name").value
    if (document.getElementById("saved-searches").value > -1) {
      huntingPartyData.searches[document.getElementById("saved-searches").value] = terms
    } else {
      huntingPartyData.searches.push(terms)
    }
    if (creatingNew) {
      var xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log('CREATED')
          document.getElementById('search-save-popup').classList.remove('inactive')
          document.getElementById('search-save-popup-bg').classList.remove('inactive')
          document.getElementById('search-save-popup-text').innerHTML = terms.name + ' has been saved!'
        }
      };
      var url = apiUrl+"/huntingpartydata/add";
      xhttp.open("POST", url, true);
      xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhttp.send(JSON.stringify(huntingPartyData));

    } else {
      var id = huntingPartyData._id
      delete huntingPartyData['_id'];
      var xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log('UPDATED')
          document.getElementById('search-save-popup').classList.remove('inactive')
          document.getElementById('search-save-popup-bg').classList.remove('inactive')
          document.getElementById('search-save-popup-text').innerHTML = terms.name + ' has been updated!'
        }
      };
      var url = apiUrl+"/huntingpartydata/" + id;
      xhttp.open("PUT", url, true);
      xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhttp.send(JSON.stringify(huntingPartyData));
    }
  }
}

function toggleHamburgerMenu() {
  if (hamburgerMenuOpen) {
    document.getElementById("hamburger-menu").classList.add('hamburger-out');
    document.getElementById("hamburger-menu").classList.remove('hamburger-in')
    hamburgerMenuOpen = false
  } else {
    document.getElementById("hamburger-menu").classList.add('hamburger-in');
    document.getElementById("hamburger-menu").classList.remove('hamburger-out')
    document.getElementById("hamburger-menu").classList.remove('inactive')
    hamburgerOpening = true
    hamburgerMenuOpen = true
    setTimeout(
      function () {
        hamburgerOpening = false
      }, 500);
    }
  }

  document.addEventListener("click", (evt) => {
    const profileDropdown = document.getElementById("profile-dropdown");
    const profileCircle = document.getElementById("profile-circle");
    const voteDropdown = document.getElementById("vote-circle-dropdown-"+voteDropdownOpen);
    const voteCircle = document.getElementById("vote-circle-"+voteDropdownOpen);
    const hamburgerMenu = document.getElementById("hamburger-menu");
    let targetElement = evt.target; // clicked element
    var profileInside = false
    do {
      if (profileDropdownOpen) {
        if (targetElement == profileDropdown) {
          // This is a click inside. Do nothing, just return.
          profileInside = true;
        }
      } else {
        if (targetElement == profileCircle) {
          profileDropdown.classList.remove('inactive')
          profileDropdown.classList.remove('dropdown-out');
          profileDropdown.classList.add('dropdown-in')
          profileDropdownOpen = true
          profileInside = true;
        }
      }
      // Go up the DOM
      targetElement = targetElement.parentNode;
    } while (targetElement);
    // This is a click outside.
    if (!profileInside) {
      profileDropdown.classList.add('dropdown-out');
      profileDropdown.classList.remove('dropdown-in')
      profileDropdownOpen = false
    }

    if (voteDropdownOpen > -1) {
      targetElement = evt.target
      do {
        if (targetElement == voteDropdown) {
          // This is a click inside. Do nothing, just return.
          return;
        } else if (targetElement == voteCircle) {
          // This is a click inside. Do nothing, just return.
          return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
      } while (targetElement);
      // This is a click outside.
      document.getElementById("vote-circle-dropdown-"+voteDropdownOpen).classList.add('inactive')
      // var a = document.getElementsByClassName('fbo-item-points-dropdown')
      // for (i = 0; i < a.length; i++) {
      //   a[i].classList.add('inactive');
      // }
      voteDropdownOpen = -1
    }
    if (hamburgerMenuOpen && !hamburgerOpening) {
      targetElement = evt.target
      do {
        if (targetElement == hamburgerMenu) {
          // This is a click inside. Do nothing, just return.
          return;
          // Go up the DOM
        }
        targetElement = targetElement.parentNode;
      } while (targetElement);
      // This is a click outside.
      toggleHamburgerMenu()
    }
  });

  function switchTab(num) {
    document.getElementById("fbo-list-view").classList.remove('inactive');
    document.getElementById("fbo-detail-view").classList.add('inactive');
    tutorialsOpen = true
    openTutorials()
    if (num == 0) {
      document.getElementById("news-view").classList.remove('inactive')
      document.getElementById("search-view").classList.add('inactive')
      document.getElementById("fbo-view").classList.add('inactive')
      document.getElementById("pipeline-view").classList.add('inactive')
      document.getElementById("floating-hamburger").classList.add('inactive')
    } else if (num == 1) {
      document.getElementById("news-view").classList.add('inactive')
      document.getElementById("search-view").classList.remove('inactive')
      document.getElementById("fbo-view").classList.add('inactive')
      document.getElementById("pipeline-view").classList.add('inactive')
      document.getElementById("floating-hamburger").classList.add('inactive')
    } else if (num == 2) {
      document.getElementById("news-view").classList.add('inactive')
      document.getElementById("search-view").classList.add('inactive')
      document.getElementById("fbo-view").classList.remove('inactive')
      document.getElementById("pipeline-view").classList.add('inactive')
      document.getElementById("hamburger-menu").classList.remove('hamburger-out')
      document.getElementById("hamburger-menu").classList.add('inactive')
      document.getElementById("floating-hamburger").classList.add('inactive')
      renderFbos()
    } else if (num == 3) {
      document.getElementById("news-view").classList.add('inactive')
      document.getElementById("search-view").classList.add('inactive')
      document.getElementById("fbo-view").classList.add('inactive')
      document.getElementById("pipeline-view").classList.remove('inactive')
      document.getElementById("hamburger-menu").classList.remove('hamburger-out')
      document.getElementById("hamburger-menu").classList.add('inactive')
      document.getElementById("floating-hamburger").classList.add('inactive')
    }
    activeTab = num
    var a = document.getElementsByClassName('iconbar-icon')
    for (i = 0; i < a.length; i++) {
      if (i == num) {
        a[i].classList.add('iconbar-icon-active');
      } else {
        a[i].classList.remove('iconbar-icon-active');
      }
    }
  }

  function getToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
      dd='0'+dd
    }
    if(mm<10) {
      mm='0'+mm
    }
    today = yyyy+'/'+mm+'/'+dd;
    return today
  }

  function renderFbos() {
    var fboHtml = ''
    var pipelineHtml = ''
    fboVote = []
    company.fboProxies.sort(function(proxy1, proxy2){
      var p1num = 0
      for (i = 0; i < proxy1.voteYes.length; i++) {
        var proxy = proxy1.voteYes[i]
        if(proxy.date) {
          if (proxy.date * 10 > p1num) {
            p1num = proxy.date * 10
          }
        }
      }
      for (i = 0; i < proxy1.voteNo.length; i++) {
        var proxy = proxy1.voteNo[i]
        if(proxy.date) {
          if (proxy.date * 10 > p1num) {
            p1num = proxy.date * 10
          }
        }
      }
      var p2num = 0
      for (i = 0; i < proxy2.voteYes.length; i++) {
        var proxy = proxy2.voteYes[i]
        if(proxy.date) {
          if (proxy.date * 10 > p2num) {
            p2num = proxy.date * 10
          }
        }
      }
      for (i = 0; i < proxy2.voteNo.length; i++) {
        var proxy = proxy2.voteNo[i]
        if(proxy.date) {
          if (proxy.date * 10 > p2num) {
            p2num = proxy.date
          }
        }
      }
      if (p1num == 0 && ((proxy1.voteYes.length + proxy1.voteNo.length) > 0)) {
        p1num = proxy1.voteYes.length + proxy1.voteNo.length
      } else if (p1num == 0 && proxy1.date) {
        p1num = proxy1.date
      }
      if (p2num == 0 && ((proxy2.voteYes.length + proxy2.voteNo.length) > 0)) {
        p2num = proxy2.voteYes.length + proxy2.voteNo.length
      } else if (p2num == 0 && proxy2.date){
        p2num = proxy2.date
      }
      return p2num - p1num
    });
    for (i = 0; i < company.fboProxies.length; i++) {
      proxy = company.fboProxies[i]
      // if (company.fboProxies[i].comments.length == 0) {
      //   comments = '<p style="color: gray;">Comments</p>'
      // } else {
      //   for (i2 = 0; i2 < proxy.comments.length; i2++) {
      //     var comment = proxy.comments[i2];
      //     comments = comments + '<p class="comment"><span style="font-weight: bold;">' + comment.name + ': </span>' + comment.comment + '</p>'
      //   }
      // }
      var dueDate = ''

      if (proxy.fbo.respDate) {
        var today = getToday()
        var due = proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)
        var date2 = new Date(today);
        var date1 = new Date(due);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var timeToDue = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (timeToDue >= 365) {
          dueDate = "<p style='font-weight: bold;'>Due: "+Math.round(timeToDue / 365).toString()+" Years</p>"
        } else if (timeToDue >= 60) {
          dueDate = "<p style='font-weight: bold;'>Due: "+Math.round(timeToDue / 30).toString()+" Months</p>"
        } else if (timeToDue >= 14) {
          dueDate = "<p style='font-weight: bold;'>Due: "+Math.round(timeToDue / 7).toString()+" Weeks</p>"
        } else {
          dueDate = "<p style='font-weight: bold;'>Due: "+timeToDue+" Days</p>"
        }
        // dueDate = "<p style='font-weight: bold;'>Due: "+proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)+"</p><p>"+timeToDue+"</p>"
      } else {
        dueDate = "<p style='font-weight: bold;'>No Due Date</p>"
      }
      var voteHtml = ''
      var comments = ''
      var voteScore = proxy.voteYes.length - proxy.voteNo.length
      if (voteScore < 0) {
        voteHtml = '<div id="vote-circle-'+i+'" class="fbo-item-points" onclick="showVotes('+i+')"><p style="color: red;">'+voteScore+'</p></div>'
      } else if (voteScore > 0) {
        voteHtml = '<div id="vote-circle-'+i+'" class="fbo-item-points" onclick="showVotes('+i+')"><p style="color: green;">+'+voteScore+'</p></div>'
      } else if (voteScore == 0 && ((proxy.voteYes.length + proxy.voteNo.length) > 0)) {
        voteHtml = '<div id="vote-circle-'+i+'" class="fbo-item-points" onclick="showVotes('+i+')"><p style="color: black;">+'+voteScore+'</p></div>'
      } else {
        voteHtml = '<div id="vote-circle-'+i+'" class="fbo-item-points inactive" onclick="showVotes('+i+')"><p style="color: green;">+'+voteScore+'</p></div>'
      }
      voteHtml = voteHtml + '<div id="vote-circle-dropdown-'+i+'" class="fbo-item-points-dropdown inactive">'
      for (i2 = 0; i2 < proxy.voteYes.length; i2++) {
        var vote = proxy.voteYes[i2]
        var voteString = ''
        if (vote.comment) {
          voteString = ' - "'+vote.comment+'"'
        }
        comments = comments + '<p class="comment yes-comment"><img class="comment-icon" src="./img/thumbsup.png" alt=""><span style="font-weight: bold;">' + vote.name + '</span>' + voteString + '</p>'
        voteHtml = voteHtml + '<div class="fbo-item-points-dropdown-item" style="color: green;">' + proxy.voteYes[i2].name + ': Yes</div>'
      }
      for (i2 = 0; i2 < proxy.voteNo.length; i2++) {
        var vote = proxy.voteNo[i2]
        var voteString = ''
        if (vote.comment) {
          voteString = ' - "'+vote.comment+'"'
        }
        comments = comments + '<p class="comment no-comment"><img class="comment-icon" src="./img/thumbsdown.png" alt=""><span style="font-weight: bold;">' + vote.name + '</span>' + voteString + '</p>'
        voteHtml = voteHtml + '<div class="fbo-item-points-dropdown-item" style="color: red;">' + proxy.voteNo[i2].name + '</div>'
      }
      if (comments.length < 1) {
        comments = '<p style="color: gray;">Comments</p>'
      }
      voteHtml = voteHtml + '</div>'
      var vote = null
      for (i2 = 0; i2 < proxy.voteYes.length; i2++) {
        if (proxy.voteYes[i2].id == currentUser._id) {
          vote = 2
          break;
        }
      }
      if (vote !== 2) {
        for (i2 = 0; i2 < proxy.voteNo.length; i2++) {
          if (proxy.voteNo[i2].id == currentUser._id) {
            vote = 1
            break;
          }
        }
      }
      var yesString = ''
      var noString = ''
      if (vote == 1) {
        noString = ' voted-button'
        fboVote.push(1)
      } else if (vote == 2) {
        yesString = ' voted-button'
        fboVote.push(2)
      } else {
        fboVote.push(0)
      }
      var imgString = ''
      for (i2 = 0; i2 < agencyLogos.length; i2++) {
        if (proxy.fbo.agency.toLowerCase() == agencyLogos[i2].agency.toLowerCase()) {
          imgString = 'img/agencies/'+agencyLogos[i2].img
          break;
        }
      }
      var originHtml = ''
      if (proxy.originSearch) {
        originHtml = '<div class="fbo-item-origin">'+proxy.originSearch+'</div>'
      }

      if (proxy.voteYes.length < 1 && vote !== 1) {
        fboHtml = fboHtml + '<div class="fbo-item">'+
        '<div class="second-border">'+
        ''+voteHtml+
        ''+originHtml+
        '<div class="fbo-item-title" onclick="goToFbo(' + i + ', 0)">'+
        '<p class="fbo-item-title-text">'+proxy.fbo.subject+'</p>'+
        '<div class="fbo-item-title-bg"></div>'+
        '<img class="fbo-item-title-img-left" src="'+imgString+'" alt="">'+
        '</div>'+
        '<div class="fbo-item-comments">'+
        comments+
        '</div>'+
        '<div class="fbo-item-buttons">'+
        '<div id="no-button-' + i + '" class="medium-circle fbo-item-no-button' + noString + '" onclick="openPopups(1)">'+
        '<div class="second-border">'+
        '<img class="circle-img-2" src="./img/thumbsdown.png" alt="">'+
        '</div>'+
        '</div>'+
        '<div class="fbo-item-time-button">'+
        dueDate+
        '</div>'+
        '<div id="yes-button-' + i + '" class="medium-circle fbo-item-yes-button' + yesString + '" onclick="openPopups(0)">'+
        '<div class="second-border">'+
        '<img class="circle-img-2" src="./img/thumbsup.png" alt="">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'
      } else if (proxy.voteYes.length > 0 && vote !== 1) {
        pipelineHtml = pipelineHtml + '<div class="fbo-item">'+
        '<div class="second-border">'+
        ''+voteHtml+
        '<div class="fbo-item-title" onclick="goToFbo(' + i + ', 1)">'+
        '<p class="fbo-item-title-text">'+proxy.fbo.subject+'</p>'+
        '<div class="fbo-item-title-bg"></div>'+
        '<img class="fbo-item-title-img-left" src="'+imgString+'" alt="">'+
        '</div>'+
        '<div class="fbo-item-comments">'+
        comments+
        '</div>'+
        '<div class="fbo-item-buttons">'+
        '<div class="fbo-item-time-button">'+
        dueDate+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'
      }
    }
    document.getElementById("fbo-items").innerHTML = fboHtml;
    document.getElementById("pipeline-items").innerHTML = pipelineHtml;
    // for (i = 0; i < company.fboProxies.length; i++) {
    //   checkVote(company.fboProxies[i], i)
    // }

  }

  function showVotes(index) {
    voteDropdownOpen = index
    var a = document.getElementsByClassName('fbo-item-points-dropdown')
    for (i = 0; i < a.length; i++) {
      if (i == index) {
        a[i].classList.remove('inactive');
      } else {
        a[i].classList.add('inactive');
      }
    }
  }

  function addYesRefer() {
    yesRefer.push(document.getElementById("yes-refer-input").value)
    var html = ''
    for (i = 0; i < yesRefer.length; i++) {
      html = html + '<p>'+yesRefer[i]+'</p>'
    }
    document.getElementById("yes-popup-refer-list").innerHTML = html
  }

  function goToFbo(num, tab) {
    fboIndex = num
    setActiveFbo(num, tab)
    document.getElementById("news-view").classList.add('inactive');
    document.getElementById("fbo-view").classList.add('inactive');
    document.getElementById("search-view").classList.add('inactive');
    document.getElementById("pipeline-view").classList.add('inactive');
    document.getElementById("fbo-detail-view").classList.remove('inactive');
    document.getElementById("floating-hamburger").classList.remove('inactive')
  }

  function checkEmail() {
    var email = document.getElementById("email-register").value
    if (invalidEmail(email)) {
      document.getElementById("email-register").classList.add('invalid-input')
      document.getElementById("register-alert-3").innerHTML = 'Invalid email'
      emailValidated = false
    } else {
      var xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var res = JSON.parse(xhttp.responseText);
          if (res.found) {
            document.getElementById("email-register").classList.add('invalid-input')
            document.getElementById("register-alert-3").innerHTML = 'Email already in use'
            emailValidated = false
          } else {
            document.getElementById("email-register").classList.remove('invalid-input')
            document.getElementById("register-alert-3").innerHTML = ''
            emailValidated = true
          }
        }
      }
      xhttp.open("get", apiUrl+'/profiles/email/' + email, true);
      xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhttp.send();
    }
  }

  function checkPasswords() {
    var password1 = document.getElementById("password-register").value
    var password2 = document.getElementById("password2").value
    if (password1.length < 6) {
      document.getElementById("password-register").classList.add('invalid-input')
      document.getElementById("register-alert-4").innerHTML = 'Password must be at least 6 characters'
    } else {
      document.getElementById("password-register").classList.remove('invalid-input')
      document.getElementById("register-alert-4").innerHTML = ''
    }
    if (password1.length >= 6 && password1 !== password2) {
      document.getElementById("password2").classList.add('invalid-input')
      document.getElementById("register-alert-5").innerHTML = 'Passwords must match'
    } else if (password1.length >= 6 && password1 == password2) {
      document.getElementById("password-register").classList.remove('invalid-input')
      document.getElementById("password2").classList.remove('invalid-input')
      document.getElementById("register-alert-4").innerHTML = ''
      document.getElementById("register-alert-5").innerHTML = ''
    }
  }

  function invalidEmail(email) {
    return (email.length > 0 && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
  }

  function goToRegister() {
    document.getElementById("register-view").classList.remove('inactive')
    document.getElementById("login-view").classList.add('inactive')
  }
  function goToLogin() {
    document.getElementById("register-view").classList.add('inactive')
    document.getElementById("login-view").classList.remove('inactive')
  }
  function goToCompanyCreate() {
    document.getElementById("login-register").classList.remove('inactive')
    document.getElementById("register-view").classList.add('inactive')
    document.getElementById("main-view").classList.add('inactive')
    document.getElementById("login-view").classList.add('inactive')
    document.getElementById("company-create-view").classList.remove('inactive')
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        allCompanies = JSON.parse(xhttp.responseText);
        allCompanies.sort(function(a,b) {
          var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
          if (nameA < nameB) //sort string ascending
            return -1
          if (nameA > nameB)
            return 1
          return 0 //default return value (no sorting)
        })
        console.log('got em')
      }
    }
    xhttp.open("GET", apiUrl+'/company/light', true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp.send();
  }

  function companySearch() {
    var searchTerm = document.getElementById("company-search").value.toLowerCase()
    var html = ''
    for (i = 0; i < allCompanies.length; i++) {
      if (searchTerm.length > 1 && allCompanies[i].name.toLowerCase().includes(searchTerm)) {
        html = html + '<div class="company-search-item" onclick="pickCompanyToJoin('+i+')">'+allCompanies[i].name+'</div>'
      }
    }
    document.getElementById("company-search-dropdown").innerHTML = html
    if (html.length < 1) {
      document.getElementById("company-search-dropdown").classList.add('inactive')
    } else {
      document.getElementById("company-search-dropdown").classList.remove('inactive')
    }
  }

  function pickCompanyToJoin(index) {
    companyToJoin = allCompanies[index]
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        companyToJoin = JSON.parse(xhttp.responseText);
        console.log(companyToJoin)
        document.getElementById("company-confirm-view").classList.remove('inactive')
        document.getElementById("company-search-view").classList.add('inactive')
        document.getElementById("company-confirm-img-wrapper").innerHTML = '<img class="company-confirm-img" src="'+companyToJoin.avatar+'" alt="">'
        document.getElementById("company-confirm-desc").innerHTML = '<h4>'+companyToJoin.name+'</h4>'+
        '<p>'+companyToJoin.address+'</p>'+
        '<p>'+companyToJoin.email+'</p>'+
        '<h5>Do you want to request to join?</h5>'+
        "<p>If you choose JOIN, we'll send a join request to "+companyToJoin.name+". If they accept, we'll notify you, and you'll then have full access to their Hunting Party.</p>"
      }
    }
    xhttp.open("GET", apiUrl+'/company/' + companyToJoin.id, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp.send();
  }

  function sendCompanyRequest() {
    var platform = ''
    if (device) {
      if (device.platform.toLowerCase() === 'android') {
        platform = 'android'
      } else if (device.platform.toLowerCase() === 'ios') {
        platform = 'ios'
      }
    }
    var regId = ''
    if (localStorage.getItem('registrationId')) {
      regId = localStorage.getItem('registrationId')
    }
    var request = {
      userId: currentUser._id,
      companyId: companyToJoin._id,
      platform: platform,
      registrationId: regId
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log(JSON.parse(xhttp.responseText))
        console.log('did it i think')
        document.getElementById("company-confirm-view").classList.add('inactive')
        document.getElementById("company-confirm-confirm-view").classList.remove('inactive')
      }
    }
    xhttp.open("POST", apiUrl+'/messages/huntingpartyrequest/', true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp.send(JSON.stringify(request));
  }

  function leaveCompanyConfirm() {
    document.getElementById("company-search").value = ''
    companySearch()
    document.getElementById("company-confirm-view").classList.add('inactive')
    document.getElementById("company-search-view").classList.remove('inactive')
    companyToJoin = null
  }

  function onPhoneChange(event) {
    // remove all mask characters (keep only numeric)
    var newVal = document.getElementById("new-company-phone").value.replace(/\D/g, '');
    // special handling of backspace necessary otherwise
    // deleting of non-numeric characters is not recognized
    // this laves room for improvement for example if you delete in the
    // middle of the string
    var keynum
    if(window.event) { // IE
      keynum = event.keyCode;
    } else if(event.which){ // Netscape/Firefox/Opera
      keynum = event.which;
    }
    if (keynum == 8) {
      newVal = newVal.substring(0, newVal.length);
    }

    // don't show braces for empty value
    if (newVal.length == 0) {
    newVal = '';
    } else if (newVal.length < 3) {
      newVal = newVal
    }
    // don't show braces for empty groups at the end
    else if (newVal.length == 3) {
    newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1)-$2');
    }  else {
      if (newVal.length > 10){
        newVal = newVal.substring(0,10)
      }
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1)-$2-$3');
    }
    // set the new value
    document.getElementById("new-company-phone").value = newVal
  }

  function register() {
    var firstName = document.getElementById("first-name").value
    var lastName = document.getElementById("last-name").value
    var email = document.getElementById("email-register").value
    var password1 = document.getElementById("password-register").value
    var password2 = document.getElementById("password2").value

    if (password1.length >= 6 && password1 == password2 && emailValidated) {
      var newUser = {
        username: email,
        firstName: firstName,
        lastName: lastName,
        password: password1,
        huntingparty: true
      }
      var xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          document.getElementById("email").value = email
          document.getElementById("password").value = password1
          login()
        }
      }
      xhttp.open("POST", apiUrl+'/register/', true);
      xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhttp.send(JSON.stringify(newUser));
    } else {
      checkEmail()
      checkPasswords()
    }
  }

  function createCompany() {
    if (
      document.getElementById("new-company-name").value.length > 0 &&
      document.getElementById("new-company-email").value.length > 0 &&
      document.getElementById("new-company-phone").value.length == 14 &&
      document.getElementById("new-company-address").value.length > 0 &&
      document.getElementById("new-company-city").value.length > 0 &&
      document.getElementById("new-company-state").value.length > 0 &&
      document.getElementById("new-company-zip").value.length > 0
    ) {
      var newCompany = {
        name: document.getElementById("new-company-name").value,
        email: document.getElementById("new-company-email").value,
        avatar: '',
        contactNumber: document.getElementById("new-company-phone").value,
        address: document.getElementById("new-company-address").value,
        city: document.getElementById("new-company-city").value,
        state: document.getElementById("new-company-state").value,
        zip:  document.getElementById("new-company-zip").value
      }

      var xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var company2 = JSON.parse(xhttp.responseText);
          var xhttp2 = new XMLHttpRequest();
          xhttp2.onload = function() {
            if (xhttp2.readyState == 4 && xhttp2.status == 200) {
              var role = JSON.parse(xhttp2.responseText);
              var currentDate = (new Date().getMonth()+1) + '-' + new Date().getDate() + '-' + new Date().getFullYear()
              var request = {
                "userProfile": currentUser._id,
                "company": company2._id,
                "startDate": currentDate,
                "endDate": currentDate,
                "stillAffiliated": true,
                "role": role._id
              }
              var xhttp3 = new XMLHttpRequest();
              xhttp3.onload = function() {
                if (xhttp3.readyState == 4 && xhttp3.status == 200) {
                  getTheData()
                }
              }
              xhttp3.open("POST", apiUrl+'/companyuserproxy/add/', true);
              xhttp3.setRequestHeader('Content-type','application/json; charset=utf-8');
              xhttp3.setRequestHeader('Authorization','application/json; charset=utf-8');
              xhttp3.setRequestHeader('id',currentUser._id);
              xhttp3.send(JSON.stringify(request));
            }
          }
          xhttp2.open("GET", apiUrl+'/role/title/', true);
          xhttp2.setRequestHeader('Content-type','application/json; charset=utf-8');
          xhttp2.send("admin");
        }
      }
      xhttp.open("POST", apiUrl+'/company/add/', true);
      xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhttp.send(JSON.stringify(newCompany));
    } else {
      console.log(document.getElementById("new-company-phone").value.length)
      console.log('nah')
    }

  }


  function getTime() {
    var i = new Date()
    document.getElementById("test-button").innerHTML = i.getTime()
  }

  function switchFboTab(elem, num) {
    var a = document.getElementsByClassName('buttonbar-tab')
    for (i = 0; i < a.length; i++) {
      a[i].classList.remove('buttonbar-tab-active');
    }
    var b = document.getElementsByClassName('lower')
    for (i = 0; i < b.length; i++) {
      b[i].classList.remove('inactive');
    }
    var activeTab = num
    for (i = 0; i < 3; i++) {
      if (i !== num) {
        document.getElementById("lower-" + (i+1).toString()).classList.add('inactive')
      }
    }
    for (i = 1; i <=3; i++) {
      if (!tabIds[num].allowed.includes(i)) {
        document.getElementById("data-box-" + i.toString()).classList.add('data-box-inactive');
        document.getElementById("arrow-" + i.toString()).innerHTML = "▼";
        document.getElementById("databar-" + i.toString()).classList.remove('databar-active');
      }
    }
    elem.classList.add('buttonbar-tab-active');
  }

  function setActiveFbo(index, tab) {
    if (index < 0) {
      index = fbos.length-1
    } else if (index >= fbos.length) {
      index = 0
    }

    var proxy = fbos[index]
    var dataText = '<p><span style="font-weight: bold">Solicitation Number: </span>'+
    proxy.fbo.solnbr +
    '</p><p><span style="font-weight: bold">Agency: </span>'+
    proxy.fbo.agency+
    '</p><p><span style="font-weight: bold">Office: </span>'+
    proxy.fbo.office+
    '</p><p><span style="font-weight: bold">Location: </span>'+
    proxy.fbo.location+
    '</p><p><span style="font-weight: bold">Setaside: </span>'+
    proxy.fbo.setaside+
    '</p><p><span style="font-weight: bold">Due Date: </span>'+
    proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)+
    '</p><p><span style="font-weight: bold">Contact: </span>'+
    proxy.fbo.contact+
    '</p><p style="font-weight: bold"><a href="'+proxy.fbo.url+'">More Info</a></p>'
    document.getElementById("fbo-title").innerHTML = proxy.fbo.subject;
    document.getElementById("abstract-text").innerHTML = proxy.fbo.desc;
    document.getElementById("data-text").innerHTML = dataText;
    var dueDate = ''
    if (proxy.fbo.respDate) {
      var today = getToday()
      var due = proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)
      var date2 = new Date(today);
      var date1 = new Date(due);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var timeToDue = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (timeToDue >= 365) {
        dueDate = "<p>Due: "+Math.round(timeToDue / 365).toString()+" Years </p>"
      } else if (timeToDue >= 60) {
        dueDate = "<p>Due: "+Math.round(timeToDue / 30).toString()+" Months</p>"
      } else if (timeToDue >= 14) {
        dueDate = "<p>Due: "+Math.round(timeToDue / 7).toString()+" Weeks</p>"
      } else {
        dueDate = "<p>Due: "+timeToDue+" Days</p>"
      }
      // dueDate = "<p style='font-weight: bold;'>Due: "+proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)+"</p><p>"+timeToDue+"</p>"
    } else {
      dueDate = "<p'>No Due Date</p>"
    }
    document.getElementById("time-button").innerHTML = dueDate
    if (tab == 1) {
      document.getElementById("big-yes-button").classList.add('inactive');
      document.getElementById("big-no-button").classList.add('inactive');
    } else if (tab == 0) {
      document.getElementById("big-yes-button").classList.remove('inactive');
      document.getElementById("big-no-button").classList.remove('inactive');
    }
    fboIndex = index
    renderChart()
    updateComments(proxy)
    checkVote(proxy, index)
  }

  function checkVote(proxy, index) {
    for (i = 0; i < proxy.voteYes.length; i++) {
      if (proxy.voteYes[i].id == currentUser._id) {
        fboVote[index] = 2
        break;
      }
    }
    if (fboVote[index] !== 2) {
      for (i = 0; i < proxy.voteNo.length; i++) {
        if (proxy.voteNo[i].id == currentUser._id) {
          fboVote[index] = 1
          break;
        }
      }
    }
    if (fboVote[index] == 1) {
      document.getElementById("big-yes-button").classList.remove('voted-button');
      document.getElementById("big-no-button").classList.add('voted-button');
    } else if (fboVote[index] == 2) {
      document.getElementById("big-yes-button").classList.add('voted-button');
      document.getElementById("big-no-button").classList.remove('voted-button');
    } else {
      document.getElementById("big-yes-button").classList.remove('voted-button');
      document.getElementById("big-no-button").classList.remove('voted-button');
    }
  }

  function openRefer() {
    document.getElementById("fbo-popups").classList.remove('inactive');
    document.getElementById("refer-popup").classList.remove('inactive');
  }

  function closePopups(moveOn) {
    document.getElementById("fbo-popups").classList.add('inactive');
    var a = document.getElementsByClassName('vote-popup')
    for (i = 0; i < a.length; i++) {
      a[i].classList.add('inactive');
    }
    document.getElementById("yes-refer").classList.add('inactive');
    document.getElementById("no-refer").classList.add('inactive');
    renderFbos()
    peopleToRefer = []
    if (moveOn) {
      goToFbo(fboIndex,0)
    }
    // switchTab(tab)
  }

  function openPopups(which) {
    document.getElementById("fbo-popups").classList.remove('inactive');
    if (which == 0) {
      var a = document.getElementsByClassName('yes-popup')
      for (i = 0; i < a.length; i++) {
        a[i].classList.remove('inactive');
      }
      var usersHtml = ''
      var usersList = huntingPartyData.users
      for (i = 0; i < usersList.length; i++) {
        usersHtml = usersHtml + '<div class="refer-item"><input id="refer-checkbox-'+i+'" style="z-index: 2;" class="refer-checkbox" type="checkbox" name="" value="" onclick="calculateRefers('+i+')"><div style="width: 100%; height: 100%;" onclick="checkReferItem('+i+')">'+usersList[i].name+'</div></div>'
        if (i < usersList.length-1) {
          usersHtml = usersHtml + '<div style="width: 100%; height: 1px; background: 1px solid rgba(0,0,0,0.75);"></div>'
        }
      }
      document.getElementById("yes-popup-users-list").innerHTML = usersHtml
      document.getElementById("refer-users-list").innerHTML = ''
    } else if (which == 1) {
      var a = document.getElementsByClassName('no-popup')
      for (i = 0; i < a.length; i++) {
        a[i].classList.remove('inactive');
      }
    } else if (which == 2) {
      document.getElementById("refer-popup").classList.remove('inactive');
      var usersHtml = ''
      var usersList = huntingPartyData.users
      for (i = 0; i < usersList.length; i++) {
        usersHtml = usersHtml + '<div class="refer-item"><input id="refer-checkbox-'+i+'" style="z-index: 2;" class="refer-checkbox" type="checkbox" name="" value="" onclick="calculateRefers('+i+')"><div style="width: 100%; height: 100%;" onclick="checkReferItem('+i+')">'+usersList[i].name+'</div></div>'
        if (i < usersList.length-1) {
          usersHtml = usersHtml + '<div style="width: 100%; height: 1px; background: 1px solid rgba(0,0,0,0.75);"></div>'
        }
      }
      document.getElementById("refer-users-list").innerHTML = usersHtml
      document.getElementById("yes-popup-users-list").innerHTML = ''
    }
  }

  function checkReferItem(i) {
    if (document.getElementById("refer-checkbox-"+i+"").checked) {
      document.getElementById("refer-checkbox-"+i+"").checked = false
    } else {
      document.getElementById("refer-checkbox-"+i+"").checked = true
    }
    calculateRefers(i)
  }

  function calculateRefers(index) {
    console.log(index)
    if (document.getElementById("refer-checkbox-"+index).checked == true) {
      peopleToRefer.push(huntingPartyData.users[index])
      console.log(peopleToRefer)
    } else {
      for (i = 0; i < peopleToRefer.length; i++) {
        if (huntingPartyData.users[index].name == peopleToRefer[i].name) {
          peopleToRefer.splice(i,1)
          break;
        }
      }
      console.log('it should be gone now')
      console.log(peopleToRefer)
    }
  }

  function sendReferNotifications() {
    console.log('doing the notification guy')
    var deviceIds = []
    for (i = 0; i < peopleToRefer.length; i++) {
      if (peopleToRefer[i].regId) {
        deviceIds.push(peopleToRefer[i].regId)
      }
    }
    var notification = {
      title: currentUser.firstName + ' Has A Referral For You',
      body: 'Open your Hunting Party to see it',
      platform: 'android',
      deviceIds: deviceIds
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log('it sent i think')
        peopleToRefer = []
      } else {
        console.log('status: ' + xhttp.status)
      }
    }
    xhttp.open("POST", apiUrl+"/huntingpartydata/notification/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(notification));
  }

  function vote(index, yes) {
    console.log('length of the thing is ' + peopleToRefer.length)
    var fbo = fbos[index]
    var vote = {
      id: currentUser._id,
      name: currentUser.firstName + ' ' + currentUser.lastName,
      position: '',
      comment: '',
      date: ''
    }
    var now = new Date()
    now = now.getTime()
    vote.date = now
    for (var i = 0; i < currentUser.companyUserProxies.length; i++) {
      if (currentUser.companyUserProxies[i].company._id == fbo.company._id) {
        vote.position = currentUser.companyUserProxies[i].position
        break
      }
    }
    var voteChanged = false
    // fbo.voteNo = []
    // fbo.voteYes = []

    if (fboVote[index] !== 2 && yes) {
      for (var i = 0; i < fbo.voteNo.length; i++) {
        if (fbo.voteNo[i].id == currentUser._id) {
          fbo.voteNo.splice(i,1)
        }
      }
      voteChanged = true
      fboVote[index] = 2
      vote.comment = document.getElementById("yes-popup-comment").value
      fbo.voteYes.push(vote)
    } else if (fboVote[index] !== 1 && !yes) {
      for (var i = 0; i < fbo.voteYes.length; i++) {
        if (fbo.voteYes[i].id == currentUser._id) {
          fbo.voteYes.splice(i,1)
        }
      }
      voteChanged = true
      fboVote[index] = 1
      vote.comment = document.getElementById("no-popup-comment").value
      fbo.voteNo.push(vote)
    }
    console.log(vote)
    var fbo = fbos[index]
    var fboSubject = fbo.fbo.subject
    var req = {};
    req['voteYes'] = fbo.voteYes;
    req['voteNo'] = fbo.voteNo;
    var fboId = fbo._id
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log('it voted')
        fbo = JSON.parse(xhttp.responseText)
        checkVote(fbo)
        var voteScore = fbo.voteYes.length - fbo.voteNo.length
        if (document.getElementById("vote-circle-" + index)) {
          if (voteScore < 0) {
            document.getElementById("vote-circle-" + index).innerHTML = '<p style="color: red;">'+voteScore+'</p>'
            document.getElementById("vote-circle-" + index).classList.remove('inactive')
          } else if (voteScore > 0) {
            document.getElementById("vote-circle-" + index).innerHTML = '<p style="color: green;">+'+voteScore+'</p>'
            document.getElementById("vote-circle-" + index).classList.remove('inactive')
          } else if (voteScore == 0 && ((fbo.voteNo.length + fbo.voteYes.length) > 0)) {
            document.getElementById("vote-circle-" + index).innerHTML = '<p style="color: white;">+'+voteScore+'</p>'
            document.getElementById("vote-circle-" + index).classList.remove('inactive')
          } else {
            document.getElementById("vote-circle-" + index).innerHTML = '<p style="color: green;">+'+voteScore+'</p>'
            document.getElementById("vote-circle-" + index).classList.add('inactive')
          }
        }
        if (peopleToRefer.length > 0) {
          sendReferNotifications()
        }
        var newsString = ''
        console.log(fbo)
        if (yes) {
          newsString = currentUser.firstName + ' ' + currentUser.lastName + ' voted YES on ' + fboSubject
        } else {
          newsString = currentUser.firstName + ' ' + currentUser.lastName + ' voted NO on ' + fboSubject
        }
        var newsItem = {
          type: 'vote',
          body: newsString
        }
        generateNewsItem(newsItem)
        if (adCounter >= 3) {
          showAd()
        } else {
          adCounter++
          closePopups(true)
        }
      }
    };
    var url = apiUrl+"/fbocompanyproxy/" + fbo._id;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp.send(JSON.stringify(req));
  }

  function showAd() {
    document.getElementById("fbo-popups").classList.remove('inactive');
    document.getElementById("error-popup").classList.remove('inactive');
    document.getElementById("error-popup").innerHTML = '<div style="width: 98%; height: 98%; margin-left: 1%; position: relative;"><button class="popup-close" type="button" name="button" onclick="closeAd()">X</button><img class="ad-img" src="./img/ads/Neostek design 2.png" alt=""></img></div>'
  }

  function closeAd() {
    document.getElementById("fbo-popups").classList.add('inactive');
    document.getElementById("error-popup").classList.add('inactive');
    document.getElementById("error-popup").innerHTML = ''
    adCounter = 0;
    closePopups(true)
  }

  function updateComments(fbo) {
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
      if (xhttp2.readyState == 4 && xhttp2.status == 200) {
        // Typical action to be performed when the document is ready:
        var newFbo = JSON.parse(xhttp2.responseText)
        fbo.voteYes = newFbo.voteYes
        fbo.voteNo = newFbo.voteNo
        var chatString = ''
        for (i = 0; i < newFbo.voteYes.length; i++) {
          var vote = newFbo.voteYes[i]
          var voteString = ''
          if (vote.comment) {
            voteString = ' - "'+vote.comment+'"'
          }
          var newString = '<p class="comment yes-comment"><img class="comment-icon" src="./img/thumbsup.png" alt=""><span style="font-weight: bold;">' + vote.name + '</span>' + voteString + '</p>'

          chatString = chatString + newString
        }
        for (i = 0; i < newFbo.voteNo.length; i++) {
          var vote = newFbo.voteNo[i]
          var voteString = ''
          if (vote.comment) {
            voteString = ' - "'+vote.comment+'"'
          }
          var newString = '<p class="comment no-comment"><img class="comment-icon" src="./img/thumbsdown.png" alt=""><span style="font-weight: bold;">' + vote.name + '</span>' + voteString + '</p>'
          chatString = chatString + newString
        }

        document.getElementById("chat-box").innerHTML = chatString;
        console.log('comments updated')
      }
    };
    xhttp2.open("GET", apiUrl+"/fbocompanyproxy/" + fbo._id, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.send();
  }

  function sendComment() {
    var comment = document.getElementById("chat-input").value
    if (comment.length > 0) {
      fbos[fboIndex].comments.push({
        id: currentUser._id,
        name: currentUser.firstName,
        comment: comment
      })
      var xhttp3 = new XMLHttpRequest();
      xhttp3.onload = function() {
        if (xhttp3.readyState == 4 && xhttp3.status == 200) {
          // Typical action to be performed when the document is ready:
          var newFbo = JSON.parse(xhttp3.responseText)
          console.log('sent the comment i think')
          var chatString = ''
          for (i = 0; i < newFbo.comments.length; i++) {
            var newString = '<p class="comment"><span style="font-weight: bold;">' + newFbo.comments[i].name + ': </span>' + newFbo.comments[i].comment + '</p>'
            chatString = chatString + newString
          }
          document.getElementById("chat-box").innerHTML = chatString;
          document.getElementById("chat-input").value = ''
          fbos[fboIndex] = newFbo
        } else {
          console.log('it didnt send i dont know why')
        }
      };

      var url = apiUrl+"/fbocompanyproxy/" + fbos[fboIndex]._id;

      xhttp3.open("PUT", url, true);
      xhttp3.setRequestHeader('Content-type','application/json; charset=utf-8');
      var toSend = fbos[fboIndex]
      delete toSend['_id'];
      console.log(toSend)
      xhttp3.send(JSON.stringify(toSend));
    }
  }

  function turnOnRefer(which) {
    if (which == 0) {
      document.getElementById("yes-refer").classList.remove('inactive');
      document.getElementById("yes-refer-button").classList.add('inactive');
    } else if (which == 1) {
      document.getElementById("no-refer").classList.remove('inactive');
      document.getElementById("no-refer-button").classList.add('inactive');
    }
  }

  function expandData(num) {
    var a = document.getElementsByClassName('data-box')
    for (i = 0; i < a.length; i++) {
      if (i == num-1) {
        a[i].classList.remove('inactive');
      } else {
        a[i].classList.add('inactive');
      }
    }
    document.getElementById("databar-active").classList.remove('inactive');
    var titles = [
      'ABSTRACT',
      'DATA',
      'COMMENTS'
    ]
    document.getElementById("databar-title").innerHTML = titles[num-1]
    toggleHamburgerMenu()
  }

  function getTheData() {
    if (localStorage.getItem('uid')) {
      var id = localStorage.getItem('uid')
    } else if (currentUser) {
      var id = currentUser._id
    }
    var xhttp = new XMLHttpRequest();
    // xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        // Typical action to be performed when the document is ready:
        currentUser = JSON.parse(xhttp.responseText);
        document.getElementById("user-name").innerHTML = currentUser.firstName + ' ' + currentUser.lastName;
        var avatar = currentUser.avatar
        if (avatar == '../../assets/img/user.png') {
          avatar = './img/user.png'
        }
        document.getElementById("profile-circle-inside").innerHTML = '<img class="circle-img" src="'+avatar+'" alt="">';
        var xhttp2 = new XMLHttpRequest();
        // xhttp.setRequestHeader("Content-type", "application/json");
        xhttp2.onreadystatechange = function() {
          if (xhttp2.readyState == 4 && xhttp2.status == 200) {
            // Typical action to be performed when the document is ready:
            company = JSON.parse(xhttp2.responseText);
            // var xobj = new XMLHttpRequest();
            // xobj.overrideMimeType("application/json");
            // xobj.open('GET', 'json/agencylogos.json', true); // Replace 'my_data' with the path to your file
            // xobj.onreadystatechange = function () {
            // if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            // agencyLogos = JSON.parse(xobj.responseText);
            var xhttp3 = new XMLHttpRequest();
            // xhttp3.setRequestHeader("Content-type", "application/json");
            console.log(window.device)
            xhttp3.onreadystatechange = function() {
              if (xhttp3.readyState == 4 && xhttp3.status == 200) {
                searchTerms = JSON.parse(xhttp3.responseText);
                emptySearchTerms = JSON.parse(xhttp3.responseText);
                var xhttp4 = new XMLHttpRequest();
                // xhttp4.setRequestHeader("Content-type", "application/json");
                xhttp4.onreadystatechange = function() {
                  if (xhttp4.readyState == 4 && xhttp4.status == 200) {
                    if (xhttp4.responseText === 'false') {
                      console.log('did the right one')
                      huntingPartyData = {
                        companyId: company._id,
                        users: [],
                        searches: []
                      }

                      huntingPartyData.users.push({
                        userId: currentUser._id,
                        name: currentUser.firstName + ' ' + currentUser.lastName,
                        email: currentUser.username,
                        deviceId: null,
                        regId: null,
                        tosRead: 0
                      })
                      if ((!huntingPartyData.users[0].regId || huntingPartyData.users[0].regId !== localStorage.getItem('registrationId')) && localStorage.getItem('registrationId')) {
                        doTheUpdateAnyway = true
                        huntingPartyData.users[0].regId = localStorage.getItem('registrationId')
                      }
                      if (device !== undefined) {
                        if ((!huntingPartyData.users[0].deviceId || huntingPartyData.users[0].deviceId !== device.uuid) && device.uuid) {
                          doTheUpdateAnyway = true
                          huntingPartyData.users[0].deviceId = device.uuid
                        }
                      }
                      var xhttpNewHPD = new XMLHttpRequest();
                      xhttpNewHPD.onload = function() {
                        if (xhttpNewHPD.readyState == 4 && xhttpNewHPD.status == 200) {
                          huntingPartyData = JSON.parse(xhttpNewHPD.responseText);
                          console.log('CREATED')
                          document.getElementById("loading").classList.add('inactive');
                          document.getElementById("tos-popup").classList.remove('inactive');
                        }
                      };
                      var url = apiUrl+"/huntingpartydata/add";
                      xhttpNewHPD.open("POST", url, true);
                      xhttpNewHPD.setRequestHeader('Content-type','application/json; charset=utf-8');
                      xhttpNewHPD.send(JSON.stringify(huntingPartyData));
                    } else if (JSON.parse(xhttp4.responseText)._id && JSON.parse(xhttp4.responseText).companyId){
                      huntingPartyData = JSON.parse(xhttp4.responseText);
                      console.log(huntingPartyData)
                      var userInList = false
                      if (!huntingPartyData.users) {
                        huntingPartyData.users = []
                      }
                      var doTheUpdateAnyway = false
                      for (i = 0; i < huntingPartyData.users.length; i++) {
                        if (huntingPartyData.users[i].userId == currentUser._id) {
                          userInList = true
                          if (huntingPartyData.users[i].tosRead) {
                            tosRead = huntingPartyData.users[i].tosRead
                          }
                          if ((!huntingPartyData.users[i].regId || huntingPartyData.users[i].regId !== localStorage.getItem('registrationId')) && localStorage.getItem('registrationId')) {
                            doTheUpdateAnyway = true
                            huntingPartyData.users[i].regId = localStorage.getItem('registrationId')
                          }
                          if (device !== undefined) {
                            if ((!huntingPartyData.users[i].deviceId || huntingPartyData.users[i].deviceId !== device.uuid) && device.uuid) {
                              doTheUpdateAnyway = true
                              huntingPartyData.users[i].deviceId = device.uuid
                            }
                          }
                        }
                      }
                      if (device !== undefined || !userInList) {
                        if (!userInList || doTheUpdateAnyway) {
                          console.log('not in the list')
                          if (!userInList) {
                            var deviceId = ''
                            var regId = ''
                            if (device) {
                              deviceId = device.uuid
                            }
                            if (localStorage.getItem('registrationId')) {
                              regId = localStorage.getItem('registrationId')
                            }
                            huntingPartyData.users.push({
                              userId: currentUser._id,
                              name: currentUser.firstName + ' ' + currentUser.lastName,
                              email: currentUser.username,
                              deviceId: deviceId,
                              regId: regId,
                              tosRead: 0
                            })
                            tosRead = 0
                          }
                          var xhttpHPD = new XMLHttpRequest();
                          xhttpHPD.onreadystatechange = function() {
                            if (xhttpHPD.readyState == 4 && xhttpHPD.status == 200) {
                              huntingPartyData = JSON.parse(xhttpHPD.responseText);
                            }
                          }
                          xhttpHPD.open("PUT", apiUrl+"/huntingpartydata/" + huntingPartyData._id, true);
                          xhttpHPD.setRequestHeader('Content-type','application/json; charset=utf-8');
                          xhttpHPD.send(JSON.stringify(huntingPartyData));
                        }
                      }
                      if (tosRead < 1) {
                        document.getElementById("loading").classList.add('inactive');
                        document.getElementById("tos-popup").classList.remove('inactive');
                        // document.getElementById("login-register").classList.remove('inactive');
                      } else {
                        startMainApp()
                      }
                    }
                  }
                }
                xhttp4.open("GET", apiUrl+"/huntingpartydata/company/" + company._id, true);
                xhttp4.send();
              }
            }
            xhttp3.open("GET", apiUrl+"/fbo/getsearchterms/", true);
            xhttp3.send();
            //   }
            // };
            // xobj.send(null);
          }
        };
        if (currentUser.companyUserProxies.length > 0) {
          var companyId = currentUser.companyUserProxies[0].company._id
          xhttp2.open("GET", apiUrl+"/company/" + companyId, true);
          xhttp2.send();
        } else {
          goToCompanyCreate()
          // document.getElementById("loading-details").innerHTML = "Your profile doesn't have any companies so I'm going to stop the login right now! Eventually I'll get something in here for this"
        }
      }
    };
    xhttp.open("GET", apiUrl+"/profiles/" + id, true);
    xhttp.send();
  }

  function acceptTOS() {
    for (i = 0; i < huntingPartyData.users.length; i++) {
      if (huntingPartyData.users[i].userId == currentUser._id) {
        console.log('setting tos read')
        huntingPartyData.users[i].tosRead = 1
      }
    }
    tosRead = 1
    var xhttpHPD = new XMLHttpRequest();
    xhttpHPD.onreadystatechange = function() {
      if (xhttpHPD.readyState == 4 && xhttpHPD.status == 200) {
        huntingPartyData = JSON.parse(xhttpHPD.responseText);
        startMainApp()
      }
    }
    xhttpHPD.open("PUT", apiUrl+"/huntingpartydata/" + huntingPartyData._id, true);
    xhttpHPD.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttpHPD.send(JSON.stringify(huntingPartyData));
  }

  function generateNewsItem(newsItem) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        var res = JSON.parse(xhttp.responseText)
        huntingPartyData.news = res.news;
        renderNews()
      }
    }
    xhttp.open("PUT", apiUrl+"/huntingpartydata/news/" + huntingPartyData._id, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp.send(JSON.stringify(newsItem));
  }

  function renderNews() {
    if (huntingPartyData) {
      var newsHtml = ''
      for (i = huntingPartyData.news.length-1; i >=0; i--) {
        var img = 'profile'
        if (huntingPartyData.news[i].type) {
          if (huntingPartyData.news[i].type == 'vote') {
            img = 'contact'
          }
        }
        newsHtml = newsHtml + '<div class="news-item">'+
        '<div class="" style="width: 15%; height: 4vh; float: left; position: relative;">'+
        '<img class="iconbar-img" src="./img/'+img+'.png" alt="">'+
        '</div>'+
        '<p class="news-text">'+huntingPartyData.news[i].body+'</p>'+
        '</div>'
      }
      document.getElementById("news-items").innerHTML = newsHtml
    }
  }

  function startMainApp() {
    if (company.fboProxies.length > 0) {
      fbos = company.fboProxies
      // setActiveFbo(fboIndex)
      renderSavedSearches()
      renderSearch()
      renderFbos()
      renderNews()
      var promiseFinished = true
      document.getElementById("tos-popup").classList.add('inactive');
      document.getElementById("loading").classList.add('inactive');
      document.getElementById("main-view").classList.remove('inactive');
      document.getElementById("news-view").classList.remove('inactive');
      document.getElementById("fbo-view").classList.add('inactive');
      document.getElementById("search-view").classList.add('inactive');
      document.getElementById("login-register").classList.add('inactive');
    } else {
      document.getElementById("loading").classList.add('inactive');
      document.getElementById("tos-popup").classList.add('inactive');
      document.getElementById("main-view").classList.remove('inactive');
      document.getElementById("news-view").classList.remove('inactive');
      document.getElementById("fbo-view").classList.add('inactive');
      document.getElementById("search-view").classList.add('inactive');
      document.getElementById("login-register").classList.add('inactive');
      document.getElementById("fbo-popups").classList.remove('inactive');
      document.getElementById("error-popup").classList.remove('inactive');
      document.getElementById("error-text").innerHTML = "Your current company has no FBOs attached right now. Use SEARCH to add some search criteria, and check back tomorrow to see if any have been found! <br>"
      // document.getElementById("iconbar-3").classList.add('inactive');
      // document.getElementById("iconbar-4").classList.add('inactive');
      // document.getElementById("iconbar-5").classList.add('inactive');
    }
    // showAd()
    // switchTab(2)
    // goToFbo(5, 0);
    // openPopups(2)
    // goToCompanyCreate()
    // expandData(2)
  }

  function handleEnterLogin(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
      login()
    }
  }

  function handleExternalURLs() {
    // Handle click events for all external URLs
    if (device.platform.toUpperCase() === 'ANDROID') {
      $(document).on('click', 'a[href^="http"]', function (e) {
        var url = $(this).attr('href');
        // navigator.app.loadUrl(url, { openExternal: true });
        window.open(url, '_system');
        e.preventDefault();
      });
    }
    else if (device.platform.toUpperCase() === 'IOS') {
      $(document).on('click', 'a[href^="http"]', function (e) {
        var url = $(this).attr('href');
        window.open(url, '_system');
        e.preventDefault();
      });
    }
    else {
      // Leave standard behaviour
    }
  }

  function renderChart() {
    var chart1 = document.getElementById("chart1").getContext('2d');
    var chart2 = document.getElementById("chart2").getContext('2d');
    var chart3 = document.getElementById("chart3").getContext('2d');
    if (fbos[fboIndex]) {
      if (fbos[fboIndex].fbo) {
        var currentFbo = fbos[fboIndex].fbo
        console.log(currentFbo)
        var nameFilters = [
          {fbo: 'Department of Defense', agency: true, fpds: 'DEPARTMENT OF DEFENSE (DOD)'},
          {fbo: 'Department of the Army', agency: false, fpds: 'DEPT OF THE ARMY'},
          {fbo: 'Department of the Navy', agency: false, fpds: 'DEPT OF THE NAVY'},
          {fbo: 'Department of the Air Force', agency: false, fpds: 'DEPT OF THE AIR FORCE'},
          {fbo: 'Department of the Interior', agency: true, fpds: 'DEPARTMENT OF THE INTERIOR (DOI)'},
          {fbo: 'Department of Agriculture', agency: true, fpds: 'DEPARTMENT OF AGRICULTURE (USDA)'},
          {fbo: 'Defense Logistics Agency', agency: false, fpds: 'DEFENSE LOGISTICS AGENCY'},
          {fbo: 'Department of Veterans Affairs', agency: true, fpds: 'DEPARTMENT OF VETERANS AFFAIRS (VA)'},
          {fbo: 'Department of Homeland Security', agency: true, fpds: 'DEPARTMENT OF HOMELAND SECURITY (DHS)'}
        ]
        var query = ''
        for (i = 0; i < nameFilters.length; i++) {
          if (currentFbo.agency.toLowerCase() == nameFilters[i].fbo.toLowerCase()) {
            if (nameFilters[i].agency) {
              query = {naics_code: parseInt(currentFbo.naics), agency_name: nameFilters[i].fpds, modification_number: '0'}
            } else {
              query = {naics_code: parseInt(currentFbo.naics), subagency_name: nameFilters[i].fpds, modification_number: '0'}
            }
            break
          }
        }
        if (query.length < 1) {
          query = {naics_code: parseInt(currentFbo.naics), agency_name: currentFbo.agency.toUpperCase(), modification_number: '0'}
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var queryResults = JSON.parse(xhttp.responseText);
            if (queryResults.length < 1) {
              console.log('no results found')
            } else {
              console.log('we got '+queryResults.length+' results')
              console.log(queryResults)
            }
            var prices = [
              0,
              0,
              0,
              0,
              0
            ]
            for (i = 0; i < queryResults.length; i++) {
              var bigPrice = Math.max(queryResults[i].federal_action_obligation, queryResults[i].base_and_all_options_value, queryResults[i].base_and_exercised_options_value)
              if (bigPrice > 0 && bigPrice < 100000) {
                prices[0]++
              } else if (bigPrice >= 100000 && bigPrice < 250000) {
                prices[1]++
              } else if (bigPrice >= 250000 && bigPrice < 1000000) {
                prices[2]++
              } else if (bigPrice >= 1000000 && bigPrice < 5000000) {
                prices[3]++
              } else if (bigPrice >= 5000000) {
                prices[4]++
              }
            }
            // console.log('heres the prices')
            // console.log(prices)
            Chart.defaults.global.defaultFontColor = 'white';
            var myChart1 = new Chart(chart1, {
              type: 'bar',
              data: {
                labels: ["0-100k", "100k-250k", "250k-1m", "1m-5m", "5m+"],
                datasets: [{
                  label: 'Prices',
                  data: prices,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                legend: {
                  display: false,
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero:true
                    },
                    scaleLabel: {
                      display: true,
                      labelString: '# Of FPDS'
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Values'
                    }
                  }]
                }
              }
            });
            var offers = [
              0,
              0,
              0,
              0
            ]
            for (i = 0; i < queryResults.length; i++) {
              if (queryResults[i].number_of_offers_received == 1) {
                offers[0]++
              } else if (queryResults[i].number_of_offers_received >= 2 && queryResults[i].number_of_offers_received <= 3) {
                offers[1]++
              } else if (queryResults[i].number_of_offers_received >= 4 && queryResults[i].number_of_offers_received <= 5) {
                offers[2]++
              } else if (queryResults[i].number_of_offers_received >= 6) {
                offers[3]++
              }
            }
            var myChart2 = new Chart(chart2, {
              type: 'bar',
              data: {
                label: 'Prices',
                labels: ["1", "2-3", "4-5", "6+"],
                datasets: [{
                  data: offers,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                legend: {
                  display: false,
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero:true
                    },
                    scaleLabel: {
                      display: true,
                      labelString: '# Of FPDS'
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Offers Received'
                    }
                  }]
                }
              }
            });
            var scatterData = []
            var colors = []
            for (i = 0; i < queryResults.length; i++) {
              var awardSize = Math.max(queryResults[i].federal_action_obligation, queryResults[i].base_and_all_options_value, queryResults[i].base_and_exercised_options_value)
              scatterData.push({x: awardSize, y: queryResults[i].number_of_offers_received})
              if (queryResults[i].type_of_set_aside !== 'N/A') {
                colors.push('rgba(255,50,50,0.4)')
              } else {
                colors.push('rgba(50,50,255,0.4)')

              }
            }

            var myChart3 = new Chart(chart3, {
              type: 'scatter',
              data: {
                datasets: [{
                  label: 'Scatter Dataset',
                  data: scatterData,
                  backgroundColor: colors
                }]
              },
              options: {
                legend: {
                  display: false,
                },
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Offers Received'
                    }
                  }],
                  xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                      callback: function(value) {
                        if (value.toString().length == 9) {
                          return value.toString().substr(0, 3) + 'm'; //truncate
                        } else if (value.toString().length == 8) {
                          return value.toString().substr(0, 2) + 'm'; //truncate
                        } else if (value.toString().length == 7) {
                          return value.toString().substr(0, 1) + 'm'; //truncate
                        } else if (value.toString().length == 6) {
                          return value.toString().substr(0, 3) + 'k'; //truncate
                        } else if (value.toString().length == 5) {
                          return value.toString().substr(0, 2) + 'k'; //truncate
                        } else if (value.toString().length == 4) {
                          return value.toString().substr(0, 1) + 'k'; //truncate
                        } else {
                          return value
                        }
                      },
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Values'
                    }
                  }]
                }
              }
            });
          }
        }
        xhttp.open("POST", apiUrl+"/fpds/query/", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(query));
      }
    }
  }

  var app = {
    // Application Constructor
    initialize: function() {
      if (localStorage.getItem('uid')) {
        getTheData()
      } else {
        document.getElementById("loading").classList.add('inactive');
        document.getElementById("main-view").classList.add('inactive');
        document.getElementById("fbo-view").classList.add('inactive');
        document.getElementById("login-register").classList.remove('inactive');
      }
      this.bindEvents();
      // window.plugins.uniqueDeviceID.get(success, fail);
      // function success(uuid) {
      //   console.log('ID IS THIS: ' + uuid);
      // };
      // renderChart()
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      document.getElementById("reg-id").value = 'it did ondeviceready'
      // app.receivedEvent('deviceready');
      app.push = PushNotification.init({
        "android": {
          "senderID": "416059724231"
        },
        "ios": {
          "sound": true,
          "vibration": true,
          "badge": true
        },
        "windows": {}
      });

      app.push.on('registration', function(data) {
        console.log("registration event: " + data.registrationId);
        var oldRegId = localStorage.getItem('registrationId');
        if (oldRegId !== data.registrationId) {
          // Save new registration ID
          localStorage.setItem('registrationId', data.registrationId);
          // Post registrationId to your app server as the value has changed
        }
        if (data.registrationId) {
          document.getElementById("reg-id").value = data.registrationId
        } else {
          document.getElementById("reg-id").value = 'no id but it did call this function'
        }
      });

      app.push.on('error', function(e) {
        console.log("push error = " + e.message);
      });

      app.push.on('notification', function(data) {
        console.log('notification event');
        navigator.notification.alert(
          data.message,         // message
          null,                 // callback
          data.title,           // title
          'Ok'                  // buttonName
        );
      });

      if (!window.device) {
        window.device = { platform: 'Browser' };
      }

      window.open = cordova.InAppBrowser.open
      handleExternalURLs();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
      var parentElement = document.getElementById(id);
      if (!parentElement) {
        console.log("BUG: " + id + " isn't working with received event, i don't know why")
      } else {
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
      }
    }
  };

  $(function() {
    $("#sidebar-detector").swipe( {
      swipeRight:function(event, distance, duration, fingerCount, fingerData, currentDirection) {
        openSidebar()
      },
    });
    $("#main-view").swipe( {
      swipeLeft:function(event, distance, duration, fingerCount, fingerData, currentDirection) {
        closeSidebar()
      },
    });
    function openSidebar() {
      $("#profile-dropdown").removeClass('inactive')
      $("#profile-dropdown").removeClass('dropdown-out')
      $("#profile-dropdown").addClass('dropdown-in')
      profileDropdownOpen = true
    }
    function closeSidebar(){
      $("#profile-dropdown").addClass('dropdown-out');
      $("#profile-dropdown").removeClass('dropdown-in')
      profileDropdownOpen = false
    }
  });
