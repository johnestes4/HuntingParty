var activeTab = 0
var dataExpanded = 0
var company = null
var huntingPartyData = null
var deviceId
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

function login() {
  var username = document.getElementById("email").value.toLowerCase()
  var password = document.getElementById("password").value
  document.getElementById("loading-details").innerHTML = 'Checking if email has account...'
  document.getElementById("loading").classList.remove('inactive');
  document.getElementById("main-view").classList.add('inactive');
  document.getElementById("fbo-view").classList.add('inactive');
  document.getElementById("fbo-list-view").classList.add('inactive');
  document.getElementById("fbo-detail-view").classList.add('inactive');
  document.getElementById("login-view").classList.add('inactive');
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Typical action to be performed when the document is ready:
      document.getElementById("loading-details").innerHTML = 'Sending login request...'
      var res = JSON.parse(xhttp.responseText)
      if (res.id) {
        var xhttp2 = new XMLHttpRequest();
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
            xhttp3.open("GET", "https://efassembly.com:4432/profiles/" + res.id, true);
            xhttp3.setRequestHeader("Content-type", "application/json");
            xhttp3.send();
          }
        };
        var body = {
          email: username,
          password: password
        }
        xhttp2.open("POST", "https://efassembly.com:4432/auth/login/" + res.id, true);
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
  xhttp.open("GET", "https://efassembly.com:4432/profiles/email/" + username, true);
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
  document.getElementById("login-view").classList.remove('inactive');
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
    a[i].checked = searchTerms.agency[i].value
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
      } else if (searchTerms.naics[i].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.naics[i].value == true) {
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<input class="checkbox-naics" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.naics[i].name+'</span>'
      } else {
        html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
        '<input class="checkbox-naics" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.naics[i].name+'</span>'
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
        '<input class="checkbox-psc" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.psc[i].name+'</span>'
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<p style="margin-bottom: 2px;">----------</p>'+
        '</div>'
      } else if (searchTerms.psc[i].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.psc[i].value == true) {
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<input class="checkbox-psc" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.psc[i].name+'</span>'
      } else {
        html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
        '<input class="checkbox-psc" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.psc[i].name+'</span>'
      }
      html = html + '</div>'
    }
    document.getElementById("search-box-psc").innerHTML = html
  }
  if (which == 2) {
    for (i = 0; i < searchTerms.agency.length; i++) {
      var checkedHtml = ''
      if (searchTerms.agency[i].value) {
        checkedHtml = ' checked'
      }

      if (i == 0) {
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<input class="checkbox-agency" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.agency[i].name+'</span>'
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<p style="margin-bottom: 2px;">----------</p>'+
        '</div>'
      } else if (searchTerms.agency[i].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.agency[i].value == true) {
        html = html + '<div class="" style="width: 100%; float: left;">'+
        '<input class="checkbox-agency" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.agency[i].name+'</span>'
      } else {
        html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
        '<input class="checkbox-agency" type="checkbox" name="" style="float: left; height: 20px;" onclick="calculateSearch(this)" '+checkedHtml+'> <span style="line-height: 25px;"> '+searchTerms.agency[i].name+'</span>'
      }
      html = html + '</div>'
    }
    document.getElementById("search-box-agency").innerHTML = html
  }
}

function renderSearch() {
  var html = ''
  for (i = 0; i < searchTerms.dueDate.length; i++) {
    html = html + '<div class="" style="width: 100%; float: left;">'+
    '<input class="checkbox-duedate" type="checkbox" name="" value="'+searchTerms.dueDate[i].value+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> '+searchTerms.dueDate[i].name+'</span>'
    if (i == 0) {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<p style="margin-bottom: 2px;">----------</p>'+
      '</div>'
    }
    html = html + '</div>'
  }
  document.getElementById("search-box-time").innerHTML = html
  html = ''
  for (i = 0; i < searchTerms.naics.length; i++) {
    html = html + '<div class="" style="width: 100%; float: left;">'+
    '<input class="checkbox-naics" type="checkbox" name="" value="'+searchTerms.naics[i].value+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> '+searchTerms.naics[i].name+'</span>'
    if (i == 0) {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<p style="margin-bottom: 2px;">----------</p>'+
      '</div>'
    }
    html = html + '</div>'
  }
  document.getElementById("search-box-naics").innerHTML = html
  html = ''
  for (i = 0; i < searchTerms.psc.length; i++) {
    html = html + '<div class="" style="width: 100%; float: left;">'+
    '<input class="checkbox-psc" type="checkbox" name="" value="'+searchTerms.psc[i].value+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> '+searchTerms.psc[i].name+'</span>'
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
    html = html + '<div class="" style="width: 100%; float: left;">'+
    '<input class="checkbox-agency" type="checkbox" name="" value="'+searchTerms.agency[i].value+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> '+searchTerms.agency[i].name+'</span>'
    if (i == 0) {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<p style="margin-bottom: 2px;">----------</p>'+
      '</div>'
    }
    html = html + '</div>'
  }
  document.getElementById("search-box-agency").innerHTML = html
  html = ''
  for (i = 0; i < searchTerms.place.length; i++) {
    html = html + '<div class="" style="width: 100%; float: left;">'+
    '<input class="checkbox-place" type="checkbox" name="" value="'+searchTerms.place[i].value+'" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> '+searchTerms.place[i].name+'</span>'
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
    '<input class="checkbox-setaside" type="checkbox" name="" value="'+searchTerms.setAside[i].value+'" style="float: left; height: 20px;"> <span style="line-height: 25px;"> '+searchTerms.setAside[i].name+'</span>'
    if (i == 0) {
      html = html + '<div class="" style="width: 100%; float: left;">'+
      '<p style="margin-bottom: 2px;">----------</p>'+
      '</div>'
    }
    html = html + '</div>'
  }
  document.getElementById("search-box-setaside").innerHTML = html
}

function calculateSearch(elem) {
  var a = document.getElementsByClassName('checkbox-duedate')
  var firstClicked = false
  var anyFalse = false
  for (i = 0; i < a.length; i++) {
    firstClicked = (elem == a[0])
    if (elem == a[i]) {
      console.log('you just clicked on ' + searchTerms.dueDate[i].name + ' and turned it to ' + a[i].checked)
    }
    if (!firstClicked || i == 0) {
      searchTerms.dueDate[i].value = a[i].checked
    } else if (firstClicked) {
      searchTerms.dueDate[i].value = a[0].checked
      a[i].checked = a[0].checked
    } else {
      searchTerms.dueDate[i].value = a[i].checked
    }
    if (a[i].checked == false) {
      a[0].checked = false
      if (i > 0) {
        anyFalse = true
      }
    }
    if (i == (a.length-1) && !anyFalse && a.length > 1) {
      a[0].checked = true
    }
  }
  a = document.getElementsByClassName('checkbox-naics')
  firstClicked = false
  anyFalse = false
  for (i = 0; i < a.length; i++) {
    firstClicked = (elem == a[0])
    if (elem == a[i]) {
      console.log('you just clicked on ' + searchTerms.naics[i].name + ' and turned it to ' + a[i].checked)
    }
    if (!firstClicked || i == 0) {
      searchTerms.naics[i].value = a[i].checked
    } else if (firstClicked) {
      searchTerms.naics[i].value = a[0].checked
      a[i].checked = a[0].checked
    } else {
      searchTerms.naics[i].value = a[i].checked
    }
    if (a[i].checked == false) {
      a[0].checked = false
      if (i > 0) {
        anyFalse = true
      }
    }
    if (i == (a.length-1) && !anyFalse && a.length > 1) {
      a[0].checked = true
    }
  }
  a = document.getElementsByClassName('checkbox-psc')
  allChecked = false
  anyFalse = false
  for (i = 0; i < a.length; i++) {
    firstClicked = (elem == a[0])
    if (elem == a[i]) {
      console.log('you just clicked on ' + searchTerms.psc[i].name + ' and turned it to ' + a[i].checked)
    }
    if (!firstClicked || i == 0) {
      searchTerms.psc[i].value = a[i].checked
    } else if (firstClicked) {
      searchTerms.psc[i].value = a[0].checked
      a[i].checked = a[0].checked
    } else {
      searchTerms.psc[i].value = a[i].checked
    }
    if (a[i].checked == false) {
      a[0].checked = false
      if (i > 0) {
        anyFalse = true
      }
    }
    if (i == (a.length-1) && !anyFalse && a.length > 1) {
      a[0].checked = true
    }
  }
  a = document.getElementsByClassName('checkbox-agency')
  allChecked = false
  anyFalse = false
  for (i = 0; i < a.length; i++) {
    firstClicked = (elem == a[0])
    if (elem == a[i]) {
      console.log('you just clicked on ' + searchTerms.agency[i].name + ' and turned it to ' + a[i].checked)
    }
    if (!firstClicked || i == 0) {
      searchTerms.agency[i].value = a[i].checked
    } else if (firstClicked) {
      searchTerms.agency[i].value = a[0].checked
      a[i].checked = a[0].checked
    } else {
      searchTerms.agency[i].value = a[i].checked
    }
    if (a[i].checked == false) {
      a[0].checked = false
      if (i > 0) {
        anyFalse = true
      }
    }
    if (i == (a.length-1) && !anyFalse && a.length > 1) {
      a[0].checked = true
    }
  }
  a = document.getElementsByClassName('checkbox-place')
  allChecked = false
  anyFalse = false
  for (i = 0; i < a.length; i++) {
    firstClicked = (elem == a[0])
    if (elem == a[i]) {
      console.log('you just clicked on ' + searchTerms.place[i].name + ' and turned it to ' + a[i].checked)
    }
    if (!firstClicked || i == 0) {
      searchTerms.place[i].value = a[i].checked
    } else if (firstClicked) {
      searchTerms.place[i].value = a[0].checked
      a[i].checked = a[0].checked
    } else {
      searchTerms.place[i].value = a[i].checked
    }
    if (a[i].checked == false) {
      a[0].checked = false
      if (i > 0) {
        anyFalse = true
      }
    }
    if (i == (a.length-1) && !anyFalse && a.length > 1) {
      a[0].checked = true
    }
  }
  a = document.getElementsByClassName('checkbox-setaside')
  allChecked = false
  anyFalse = false
  for (i = 0; i < a.length; i++) {
    firstClicked = (elem == a[0])
    if (elem == a[i]) {
      console.log('you just clicked on ' + searchTerms.setAside[i].name + ' and turned it to ' + a[i].checked)
    }
    if (!firstClicked || i == 0) {
      searchTerms.setAside[i].value = a[i].checked
    } else if (firstClicked) {
      searchTerms.setAside[i].value = a[0].checked
      a[i].checked = a[0].checked
    } else {
      searchTerms.setAside[i].value = a[i].checked
    }
    if (a[i].checked == false) {
      a[0].checked = false
      if (i > 0) {
        anyFalse = true
      }
    }
    if (i == (a.length-1) && !anyFalse && a.length > 1) {
      a[0].checked = true
    }
  }


  console.log(searchTerms)
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
        }
      };
      var url = "https://efassembly.com:4432/huntingpartydata/add";
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
        }
      };
      var url = "https://efassembly.com:4432/huntingpartydata/" + id;
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
        '<div id="no-button-' + i + '" class="medium-circle fbo-item-no-button' + noString + '" onclick="openPopups(false)">'+
        '<div class="second-border">'+
        '<img class="circle-img-2" src="./img/thumbsdown.png" alt="">'+
        '</div>'+
        '</div>'+
        '<div class="fbo-item-time-button">'+
        dueDate+
        '</div>'+
        '<div id="yes-button-' + i + '" class="medium-circle fbo-item-yes-button' + yesString + '" onclick="openPopups(true)">'+
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
    for (i = 1; i <=4; i++) {
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
    '</p><p><span style="font-weight: bold">Contact: </span>'+
    proxy.fbo.contact+
    '</p><p style="font-weight: bold"><a href="'+proxy.fbo.url+'">More Info</a></p>'
    document.getElementById("fbo-title").innerHTML = proxy.fbo.subject;
    document.getElementById("abstract-text").innerHTML = proxy.fbo.desc;
    document.getElementById("data-text").innerHTML = dataText;
    if (proxy.fbo.respDate) {
      "<p>Due</p><p>"+proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)+"</p>";
    } else {
      document.getElementById("time-button").innerHTML = "<p>No</p><p>Due Date</p>"
    }
    var dueDate = ''
    if (proxy.fbo.respDate) {
      var today = getToday()
      var due = proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)
      var date2 = new Date(today);
      var date1 = new Date(due);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var timeToDue = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (timeToDue >= 365) {
        dueDate = "<p>Due:</p><p>"+Math.round(timeToDue / 365).toString()+" Years </p>"
      } else if (timeToDue >= 60) {
        dueDate = "<p>Due:</p><p>"+Math.round(timeToDue / 30).toString()+" Months</p>"
      } else if (timeToDue >= 14) {
        dueDate = "<p>Due:</p><p>"+Math.round(timeToDue / 7).toString()+" Weeks</p>"
      } else {
        dueDate = "<p>Due:</p><p>"+timeToDue+" Days</p>"
      }
      // dueDate = "<p style='font-weight: bold;'>Due: "+proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)+"</p><p>"+timeToDue+"</p>"
    } else {
      dueDate = "<p'>No</p><p>Due Date</p>"
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

  function closePopups(tab) {
    document.getElementById("fbo-popups").classList.add('inactive');
    var a = document.getElementsByClassName('vote-popup')
    for (i = 0; i < a.length; i++) {
      a[i].classList.add('inactive');
    }
    document.getElementById("yes-refer").classList.add('inactive');
    document.getElementById("no-refer").classList.add('inactive');
    document.getElementById("yes-refer-button").classList.remove('inactive');
    document.getElementById("no-refer-button").classList.remove('inactive');
    renderFbos()
    switchTab(tab)
  }

  function openPopups(yes) {
    document.getElementById("fbo-popups").classList.remove('inactive');
    if (yes) {
      var a = document.getElementsByClassName('yes-popup')
      for (i = 0; i < a.length; i++) {
        a[i].classList.remove('inactive');
      }
      var usersHtml = ''
      for (i = 0; i < huntingPartyData.users.length; i++) {
        usersHtml = usersHtml + '<p class="popup-user">'+huntingPartyData.users[i].name+'</p>'
      }
      document.getElementById("yes-popup-users-list").innerHTML = usersHtml
    } else {
      var a = document.getElementsByClassName('no-popup')
      for (i = 0; i < a.length; i++) {
        a[i].classList.remove('inactive');
      }
    }
  }

  function vote(index, yes) {
    console.log('voting')
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
        closePopups(2)
      }
    };
    var url = "https://efassembly.com:4432/fbocompanyproxy/" + fbo._id;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp.send(JSON.stringify(req));
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
    xhttp2.open("GET", "https://efassembly.com:4432/fbocompanyproxy/" + fbo._id, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.send();
  }

  function sendComment() {
    var comment = document.getElementById("chat-input").value
    if (comment.length > 0) {
      fbos[fboIndex].comments.push({
        id: "59d696ac0fa6f90a6006d3d3",
        name: "John",
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

      var url = "https://efassembly.com:4432/fbocompanyproxy/" + fbos[fboIndex]._id;

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
      'REFER',
      'COMMENTS & QUESTIONS'
    ]
    document.getElementById("databar-title").innerHTML = titles[num-1]
    toggleHamburgerMenu()
  }

  var commentInput = document.getElementById("chat-input");
  commentInput.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
    sendComment();
  }
});

function getTheData() {
  document.getElementById("error-popup").classList.remove('inactive');

  var id = localStorage.getItem('uid')
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
          xhttp3.onreadystatechange = function() {
            if (xhttp3.readyState == 4 && xhttp3.status == 200) {
              searchTerms = JSON.parse(xhttp3.responseText);
              emptySearchTerms = JSON.parse(xhttp3.responseText);
              var xhttp4 = new XMLHttpRequest();
              // xhttp4.setRequestHeader("Content-type", "application/json");
              xhttp4.onreadystatechange = function() {
                if (xhttp4.readyState == 4 && xhttp4.status == 200) {
                  huntingPartyData = JSON.parse(xhttp4.responseText);
                  deviceId = device.uuid
                  var userInList = false
                  if (!huntingPartyData.users) {
                    huntingPartyData.users = []
                  }
                  var doTheUpdateAnyway = false
                  for (i = 0; i < huntingPartyData.users.length; i++) {
                    if (huntingPartyData.users[i].userId == currentUser._id) {
                      userInList = true
                      if (!huntingPartyData.users[i].regId || huntingPartyData.users[i].regId !== localStorage.getItem('registrationId')) {
                        doTheUpdateAnyway = true
                        huntingPartyData.users[i].regId = localStorage.getItem('registrationId')
                      }
                      if (!huntingPartyData.users[i].deviceId || huntingPartyData.users[i].deviceId !== device.uuid) {
                        doTheUpdateAnyway = true
                        huntingPartyData.users[i].deviceId = device.uuid
                      }
                    }
                  }
                  if (!userInList || doTheUpdateAnyway) {
                    console.log('not in the list')
                    if (!userInList) {
                      huntingPartyData.users.push({
                        userId: currentUser._id,
                        name: currentUser.firstName + ' ' + currentUser.lastName,
                        email: currentUser.username,
                        deviceId: device.uuid,
                        regId: localStorage.getItem('registrationId')
                      })
                    }
                    var xhttpHPD = new XMLHttpRequest();
                    xhttpHPD.onreadystatechange = function() {
                      if (xhttpHPD.readyState == 4 && xhttpHPD.status == 200) {
                        huntingPartyData = JSON.parse(xhttpHPD.responseText);
                      }
                    }
                    xhttpHPD.open("PUT", "https://efassembly.com:4432/huntingpartydata/" + huntingPartyData._id, true);
                    xhttpHPD.setRequestHeader('Content-type','application/json; charset=utf-8');
                    xhttpHPD.send(JSON.stringify(huntingPartyData));
                  }
                  if (company.fboProxies.length > 0) {
                    fbos = company.fboProxies
                    setActiveFbo(fboIndex)
                    renderSavedSearches()
                    renderSearch()
                    renderFbos()
                    var promiseFinished = true
                    document.getElementById("loading").classList.add('inactive');
                    document.getElementById("main-view").classList.remove('inactive');
                    document.getElementById("news-view").classList.remove('inactive');
                    document.getElementById("fbo-view").classList.add('inactive');
                    document.getElementById("search-view").classList.add('inactive');
                    document.getElementById("login-view").classList.add('inactive');
                  } else {
                    document.getElementById("loading").classList.add('inactive');
                    document.getElementById("main-view").classList.remove('inactive');
                    document.getElementById("news-view").classList.remove('inactive');
                    document.getElementById("fbo-view").classList.add('inactive');
                    document.getElementById("search-view").classList.add('inactive');
                    document.getElementById("login-view").classList.add('inactive');
                    document.getElementById("fbo-popups").classList.remove('inactive');
                    document.getElementById("error-popup").classList.remove('inactive');
                    document.getElementById("error-text").innerHTML = "Your current company has no FBOs attached right now. Use SEARCH to add some search criteria, and check back tomorrow to see if any have been found! <br><br><br> (note: none of that is implemented yet, please just use a different account)"
                    // document.getElementById("iconbar-3").classList.add('inactive');
                    // document.getElementById("iconbar-4").classList.add('inactive');
                    // document.getElementById("iconbar-5").classList.add('inactive');
                  }
                  // switchTab(2)
                  // goToFbo(5, 0);

                  // expandData(2)
                }
              }
              xhttp4.open("GET", "https://efassembly.com:4432/huntingpartydata/company/" + company._id, true);
              xhttp4.send();
            }
          }
          xhttp3.open("GET", "https://efassembly.com:4432/fbo/getsearchterms/", true);
          xhttp3.send();
          //   }
          // };
          // xobj.send(null);
        }
      };
      if (currentUser.companyUserProxies.length > 0) {
        var companyId = currentUser.companyUserProxies[0].company._id
        xhttp2.open("GET", "https://efassembly.com:4432/company/" + companyId, true);
        xhttp2.send();
      } else {
        document.getElementById("loading-details").innerHTML = "Your profile doesn't have any companies so I'm going to stop the login right now! Eventually I'll get something in here for this"
      }
    }
  };
  xhttp.open("GET", "https://efassembly.com:4432/profiles/" + id, true);
  xhttp.send();
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

var app = {
  // Application Constructor
  initialize: function() {
    if (localStorage.getItem('uid')) {
      getTheData()
    } else {
      document.getElementById("loading").classList.add('inactive');
      document.getElementById("main-view").classList.add('inactive');
      document.getElementById("fbo-view").classList.add('inactive');
      document.getElementById("login-view").classList.remove('inactive');
    }
    this.bindEvents();
    // window.plugins.uniqueDeviceID.get(success, fail);
    // function success(uuid) {
    //   console.log('ID IS THIS: ' + uuid);
    // };
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
      console.log('reg id: ' + localStorage.getItem('registrationId'))
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
