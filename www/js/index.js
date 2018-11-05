var apiUrl = 'https://efassembly.com:4432'
// var apiUrl = 'http://18.218.170.246:4200'
// var apiUrl = 'http://localhost:4200'

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
var searchItemSuggestions = {
  naics: {
    it: [
      '541511',
      '541512',
      '541513',
      '541519',
      '561320',
      '518210',
      '541990',
      '611420'
    ],
    professional: [
      '541611',
      '541618',
      '541990',
      '561110',
      '561320'
    ]
  }
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
  document.getElementById("login-register").classList.add('inactive');
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
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
                document.getElementById("loading-details").innerHTML = 'Profile info found, getting the rest of the data...'
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
  // document.getElementById("sidebar").classList.remove('inactive')
  // profileDropdownOpen = true
}

var activeSearchIndex

function checkChecked() {
  var numberChecked = 0
  var checkedName = ''
  var filtersHtml = ''
  if (searchTerms.type[0].value == true) {
    // document.getElementById("category-right-duedate").innerHTML = "All >";
    filtersHtml = filtersHtml + '<div class="filters-item">Type<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
  } else {
    for (i = 1; i < searchTerms.type.length; i++) {
      if (searchTerms.type[i].value == true) {
        numberChecked++
        checkedName = searchTerms.type[i].name
      }
    }
    // document.getElementById("category-right-duedate").innerHTML = numberChecked + " >";
    if (numberChecked > 0) {
      filtersHtml = filtersHtml + '<div class="filters-item">Type ('+numberChecked+')<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
    }
    numberChecked = 0
    checkedName = ''
  }
  if (searchTerms.dueDate[0].value == true) {
    // document.getElementById("category-right-duedate").innerHTML = "All >";
    filtersHtml = filtersHtml + '<div class="filters-item">Due Date<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
  } else {
    for (i = 1; i < searchTerms.dueDate.length; i++) {
      if (searchTerms.dueDate[i].value == true) {
        numberChecked++
        checkedName = searchTerms.dueDate[i].name
      }
    }
    // document.getElementById("category-right-duedate").innerHTML = numberChecked + " >";
    if (numberChecked > 0) {
      filtersHtml = filtersHtml + '<div class="filters-item">Due Date ('+numberChecked+')<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
    }
    numberChecked = 0
    checkedName = ''
  }
  if (searchTerms.naics[0].value == true) {
    filtersHtml = filtersHtml + '<div class="filters-item">NAICS<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
    // document.getElementById("category-right-naics").innerHTML = "All >";
  } else {
    for (i = 1; i < searchTerms.naics.length; i++) {
      if (searchTerms.naics[i].value == true) {
        numberChecked++
        checkedName = searchTerms.naics[i].code
      }
    }
    if (numberChecked > 0) {
      filtersHtml = filtersHtml + '<div class="filters-item">NAICS ('+numberChecked+')<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
    }
    numberChecked = 0
    checkedName = ''
  }
  if (searchTerms.psc.products[0].value == true) {
    filtersHtml = filtersHtml + '<div class="filters-item">Product<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
    // document.getElementById("category-right-psc").innerHTML = "All >";
  } else {
    for (i = 1; i < searchTerms.psc.products.length; i++) {
      if (searchTerms.psc.products[i].value == true) {
        numberChecked++
        checkedName = searchTerms.psc.products[i].name
      }
    }
    if (numberChecked > 0) {
      filtersHtml = filtersHtml + '<div class="filters-item">Product ('+numberChecked+')<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
    }
    // document.getElementById("category-right-psc").innerHTML = numberChecked + " >";
    numberChecked = 0
    checkedName = ''
  }
  if (searchTerms.agency[0].value == true) {
    filtersHtml = filtersHtml + '<div class="filters-item">Agency<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
    // document.getElementById("category-right-agency").innerHTML = "All >";
  } else {
    for (i = 1; i < searchTerms.agency.length; i++) {
      if (searchTerms.agency[i].value == true) {
        numberChecked++
        checkedName = searchTerms.agency[i].name
      }
    }
    if (numberChecked > 0) {
      filtersHtml = filtersHtml + '<div class="filters-item">Agency ('+numberChecked+')<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
    }
    // document.getElementById("category-right-agency").innerHTML = numberChecked + " >";
    numberChecked = 0
    checkedName = ''
  }
  if (searchTerms.place[0].value == true) {
    filtersHtml = filtersHtml + '<div class="filters-item">Location<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
  } else {
    checkedName = ''
    for (i = 0; i < searchTerms.place.length; i++) {
      if (searchTerms.place[i].value == true) {
        numberChecked++
        checkedName = searchTerms.place[i].name
      }
    }
    if (numberChecked > 0) {
      filtersHtml = filtersHtml + '<div class="filters-item">Location ('+numberChecked+')<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
    }
  }
  numberChecked = 0
  if (searchTerms.setAside[0].value == true) {
    filtersHtml = filtersHtml + '<div class="filters-item">Set Aside<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
    // document.getElementById("category-right-setaside").innerHTML = "All >";
  } else {
    for (i = 1; i < searchTerms.setAside.length; i++) {
      if (searchTerms.setAside[i].value == true) {
        numberChecked++
      }
    }
    if (numberChecked > 0) {
      filtersHtml = filtersHtml + '<div class="filters-item">Set Aside ('+numberChecked+')<div class="filters-item-x"><img src="./img/close.png" alt=""></div></div>'
    }
    // document.getElementById("category-right-setaside").innerHTML = numberChecked + " >";
    numberChecked = 0
    checkedName = ''
  }
  if (document.getElementById("search-item-filters-right")) {
    document.getElementById("search-item-filters-right").innerHTML = filtersHtml;
  }
}

function viewSearch(index) {
  if (index > -1) {
    searchTerms = yourSearches[index]
    if (!searchTerms.psc.products) {
      searchTerms.psc = emptySearchTerms.psc
    }
    if (searchTerms.place.length < 2 || !searchTerms.place[0].regions) {
      searchTerms.place = emptySearchTerms.place
    }
    activeSearchIndex = index
    document.getElementById("delete-search-button").classList.remove('inactive')
  } else {
    searchTerms = emptySearchTerms
    activeSearchIndex = -1
    document.getElementById("delete-search-button").classList.add('inactive')
  }

  renderSearch()
  var a = document.getElementsByClassName('checkbox-duedate')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.dueDate[i].value
  }
  a = document.getElementsByClassName('checkbox-naics')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.naics[i].value
    if (searchTerms.naics[i].subcategories) {
      for (i2 = 0; i2 < searchTerms.naics[i].subcategories.length; i2++) {
        document.getElementById('checkbox-subnaics-'+i+'-'+i2).checked = searchTerms.naics[i].subcategories[i2].value
        if (searchTerms.naics[i].subcategories[i2].subcategories) {
          for (i3 = 0; i3 < searchTerms.naics[i].subcategories[i2].subcategories.length; i3++) {
            document.getElementById('checkbox-subnaics-'+i+'-'+i2+'-'+i3).checked = searchTerms.naics[i].subcategories[i2].subcategories[i3].value
            if (searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories) {
              for (i4 = 0; i4 < searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories.length; i4++) {
                document.getElementById('checkbox-subnaics-'+i+'-'+i2+'-'+i3+'-'+i4).checked = searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].value
                if (searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories) {
                  for (i5 = 0; i5 < searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories.length; i5++) {
                    document.getElementById('checkbox-subnaics-'+i+'-'+i2+'-'+i3+'-'+i4+'-'+i5).checked = searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories[i5].value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  a = document.getElementsByClassName('checkbox-psc-product')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.psc.products[i].value
    if (searchTerms.psc.products[i].psc) {
      for (i2 = 0; i2 < searchTerms.psc.products[i].psc.length; i2++) {
        document.getElementById("psc-product-checkbox-"+i+"-"+i2).checked = searchTerms.psc.products[i].psc[i2].value
      }
    }
  }
  a = document.getElementsByClassName('checkbox-psc-service')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.psc.services[i].value
    if (searchTerms.psc.services[i].psc) {
      for (i2 = 0; i2 < searchTerms.psc.services[i].psc.length; i2++) {
        document.getElementById("psc-service-checkbox"+i+"-"+i2).checked = searchTerms.psc.services[i].psc[i2].value
      }
    }
  }
  a = document.getElementsByClassName('checkbox-agency')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.agency[i].value
    if (searchTerms.agency[i]) {
    }
  }
  a = document.getElementsByClassName('checkbox-place')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.place[i].value
    if (searchTerms.place[i].regions) {
      for (i2 = 0; i2 < searchTerms.place[i].regions.length; i2++) {
        document.getElementById("search-box-checkbox-"+i+"-"+i2).checked = searchTerms.place[i].regions[i2].value
        if (searchTerms.place[i].regions[i2].regions) {
          for (i3 = 0; i3 < searchTerms.place[i].regions[i2].regions.length; i3++) {
            document.getElementById("search-box-checkbox-"+i+"-"+i2+"-"+i3).checked = searchTerms.place[i].regions[i2].regions[i3].value
          }
        }
      }
    }
  }
  a = document.getElementsByClassName('checkbox-setaside')
  for (i = 0; i < a.length; i++) {
    a[i].checked = searchTerms.setAside[i].value
  }
  if (document.getElementById("search-name")) {
    if (searchTerms.name) {
      document.getElementById("search-name").value = searchTerms.name
      console.log(searchTerms.name)
    } else {
      document.getElementById("search-name").value = ''
    }
  }
  checkChecked()
  document.getElementById("topbar-center-text").innerHTML = "Filter"
  document.getElementById("topbar-left").innerHTML = ''
  // document.getElementById("topbar-right").innerHTML = '<div class="topbar-right-button" onclick="saveSearchTerms()"><p id="topbar-right-text">Done</p></div>'
}

function openSearchBox(which) {
  if (which == 0) {
    if (document.getElementById("search-box-time").classList.contains('inactive')) {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("search-box-time").classList.remove('inactive')
      document.getElementById("category-arrow-duedate").classList.add('rotate')
    } else {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("category-arrow-duedate").classList.remove('rotate')
    }
  } else if (which == 1) {
    if (document.getElementById("search-box-naics").classList.contains('inactive')) {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("search-box-naics").classList.remove('inactive')
      document.getElementById("category-arrow-naics").classList.add('rotate')
    } else {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("category-arrow-naics").classList.remove('rotate')
    }
  } else if (which == 2) {
    if (document.getElementById("search-box-psc").classList.contains('inactive')) {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("search-box-psc").classList.remove('inactive')
      document.getElementById("category-arrow-psc").classList.add('rotate')
    } else {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("category-arrow-psc").classList.remove('rotate')
    }
  } else if (which == 3) {
    if (document.getElementById("search-box-agency").classList.contains('inactive')) {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("search-box-agency").classList.remove('inactive')
      document.getElementById("category-arrow-agency").classList.add('rotate')
    } else {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("category-arrow-agency").classList.remove('rotate')
    }
  } else if (which == 4) {
    if (document.getElementById("search-box-location").classList.contains('inactive')) {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("search-box-location").classList.remove('inactive')
      document.getElementById("category-arrow-location").classList.add('rotate')
    } else {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("category-arrow-location").classList.remove('rotate')
    }
  } else if (which == 5) {
    if (document.getElementById("search-box-setaside").classList.contains('inactive')) {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("search-box-setaside").classList.remove('inactive')
      document.getElementById("category-arrow-setaside").classList.add('rotate')
    } else {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("category-arrow-setaside").classList.remove('rotate')
    }
  } else if (which == 6) {
    if (document.getElementById("search-box-type").classList.contains('inactive')) {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("search-box-type").classList.remove('inactive')
      document.getElementById("category-arrow-type").classList.add('rotate')
    } else {
      a = document.getElementsByClassName('search-box')
      for (i = 0; i < a.length; i++) {
        a[i].classList.add('inactive')
      }
      document.getElementById("category-arrow-type").classList.remove('rotate')
    }
  }
}
function renderSavedSearches() {
  var html = ''
  // '<option disabled selected value> -- select an option -- </option>'
  // console.log(huntingPartyData.searches)
  // yourSearches = huntingPartyData.searches

  yourSearches = []
  var searchDropdownHtml = '<option value="-1">All Searches</option>'
  for (i = 0; i < huntingPartyData.users.length; i++) {
    if (huntingPartyData.users[i].userId == currentUser._id) {
      if (huntingPartyData.users[i].searches) {
        for (i2 = 0; i2 < huntingPartyData.users[i].searches.length; i2++) {
          yourSearches.push(huntingPartyData.users[i].searches[i2])
          searchDropdownHtml = searchDropdownHtml + '<option value="'+i2+'">'+huntingPartyData.users[i].searches[i2].name+'</option>'
        }
      }
    }
  }
  for (i = 0; i < huntingPartyData.users.length; i++) {
    if (huntingPartyData.users[i].userId !== currentUser._id) {
      if (huntingPartyData.users[i].searches) {
        for (i2 = 0; i2 < huntingPartyData.users[i].searches.length; i2++) {
          yourSearches.push(huntingPartyData.users[i].searches[i2])
          searchDropdownHtml = searchDropdownHtml + '<option value="'+i2+'">'+huntingPartyData.users[i].searches[i2].name+'</option>'
        }
      }
    }
  }
  document.getElementById("opportunities-topbar-select").innerHTML = searchDropdownHtml
  html = html + '<div class="search-item">'+
  '<div class="search-item-header" onclick="openSearchItems('+0+')">'+
  '<div class="category-text">'+
  'Saved Searches: '+
  '</div>'+
  '<div class="category-right">'+
  '<p class="category-arrow" id="category-arrow-0">›</p>'+
  '</div>'+
  '</div>'+
  '<div id="saved-searches" class="search-item-subbox inactive">'

  for (i = 0; i < yourSearches.length; i++) {
    var arrowIndex = i+2
    html = html + '<div class="search-item">'+
    '<div class="search-item-header" onclick="openSearchItems('+arrowIndex+')">'+
    '<div class="category-text">'+
    yourSearches[i].name+
    '</div>'+
    '<div class="category-right">'+
    '<p class="category-arrow" id="category-arrow-'+arrowIndex+'">›</p>'+
    '</div>'+
    '</div>'+
    '<div id="search-item-'+arrowIndex+'" class="search-item-subbox inactive">'+
    'asdasdasd'+
    '</div>'+
    '</div>'
  }
  html = html + '</div>'+
  '</div>'

  document.getElementById("saved-search-view").innerHTML = html
}


function generateSearchHTML(where) {
  var inputHtml = '<div class="search-item-filters">'+
  '<div class="search-item-filters-left">'+
  '<p>Filters:</p>'+
  '</div>'+
  '<div id="search-item-filters-right">'+
  '</div>'+
  '</div>'

  html = '<div id="search-terms-items" class="">'+
    inputHtml+
    '<div class="category">'+
      '<div class="category-img-box">'+
        '<img class="category-img" src="./img/keyword.png" alt="">'+
      '</div>'+
      '<div class="category-left">'+
        '<input id="search-input-keyword" class="category-input" type="text" name="" value="" style="margin-left: -8px; margin-bottom: 4px;" placeholder="Keyword">'+
      '</div>'+
      '<div class="category-right-2">'+
        '<div class="" style="float: left; width: 50%; height: 26px; position: relative; padding-top: 4px;">'+
          '<div id="search-box-keyword-left" class="search-box-keyword-active" onclick="switchKeywordSearch(0)">'+
            'Title Only'+
          '</div>'+
        '</div>'+
        '<div class="" style="float: left; width: 50%; height: 26px; position: relative; padding-top: 4px;">'+
          '<div id="search-box-keyword-right" class="" onclick="switchKeywordSearch(1)">'+
            'All Text'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="category" onclick="openSearchBox(6)">'+
      '<div class="category-img-box">'+
        '<img class="category-img" src="./img/type.png" alt="">'+
      '</div>'+
      '<div class="category-text">'+
        'Type'+
      '</div>'+
      '<div id="category-right-type" class="category-right">'+
      '<p class="category-arrow" id="category-arrow-type">›</p>'+
      '</div>'+
    '</div>'+
    '<div id="search-box-type" class="search-box inactive">'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox checkbox-type" type="checkbox" name="" value="All" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> All</span>'+
        '<div class="" style="width: 100%; float: left;">'+
          '<p style="margin-bottom: 2px;">----------</p>'+
        '</div>'+
      '</div>'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox checkbox-type" type="checkbox" name="" value="Open RFPs" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> Open: RFPs</span>'+
      '</div>'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox checkbox-type" type="checkbox" name="" value="Open RFIs" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> Open: RFIs</span>'+
      '</div>'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox checkbox-type" type="checkbox" name="" value="Historical (closed) and projected RFPs" style="float: left; height: 20px;" onclick="calculateSearch(this)"> <span style="line-height: 25px;"> Projected opportunities</span>'+
      '</div>'+
    '</div>'+
    '<div class="category" onclick="openSearchBox(0)">'+
      '<div class="category-img-box">'+
        '<img class="category-img" src="./img/duedate.png" alt="">'+
      '</div>'+
      '<div class="category-text">'+
        'Due Date'+
      '</div>'+
      '<div id="category-right-duedate" class="category-right">'+
        '<p class="category-arrow" id="category-arrow-duedate">›</p>'+
      '</div>'+
    '</div>'+
    '<div id="search-box-time" class="search-box inactive">'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> Due  Time</span>'+
        '<div class="" style="width: 100%; float: left;">'+
          '<p style="margin-bottom: 2px;">----------</p>'+
        '</div>'+
      '</div>'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> Due In Next 2 Weeks</span>'+
      '</div>'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> Due In Next 2-4 Weeks</span>'+
      '</div>'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> Due More Than 4 Weeks From Now</span>'+
      '</div>'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> Due More Than 6 Months From Now</span>'+
      '</div>'+
    '</div>'+
    '<div class="category" onclick="openSearchBox(1)">'+
      '<div class="category-img-box">'+
        '<img class="category-img" src="./img/naics.png" alt="">'+
      '</div>'+
      '<div class="category-text">'+
        'NAICS Codes'+
      '</div>'+
      '<div id="category-right-naics" class="category-right">'+
      '<p class="category-arrow" id="category-arrow-naics">›</p>'+
      '</div>'+
    '</div>'+
    '<div id="search-box-naics" class="search-box inactive">'+
    '<div class="" style="width: 100%; float: left; position: relative;">'+
    '<input id="search-item-suggestion-0" class="search-box-checkbox" type="checkbox" name="" onclick="calculateSuggestion(0)" value=""> <div class="search-box-checkbox-text" >Typical IT services</div>'+
    '</div>'+
    '<div class="" style="width: 100%; float: left; position: relative;">'+
    '<input id="search-item-suggestion-1" class="search-box-checkbox" type="checkbox" name="" onclick="calculateSuggestion(1)" value=""> <div class="search-box-checkbox-text" >Typical professional services</div>'+
    '</div>'+
      '<input id="search-filter-0" class="category-input" onkeyup="searchFilter(0)" type="text" name="" value="" placeholder="Filter">'+
      '<div id="search-box-naics-list" class="">'+
        '<div class="" style="width: 100%; float: left;">'+
          '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> All</span>'+
        '</div>'+
        '<div class="" style="width: 100%; float: left;">'+
          '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> </span>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="category" onclick="openSearchBox(2)">'+
      '<div class="category-img-box">'+
        '<img class="category-img" src="./img/productservice.png" alt="">'+
      '</div>'+
      '<div class="category-text">'+
        'Product/Service Description'+
      '</div>'+
      '<div id="category-right-psc" class="category-right">'+
      '<p class="category-arrow" id="category-arrow-psc">›</p>'+
      '</div>'+
    '</div>'+
    '<div id="search-box-psc" class="search-box inactive">'+
      '<input id="search-filter-1" class="category-input" onkeyup="searchFilter(1)" type="text" name="" value="" placeholder="Filter">'+
      '<div id="search-box-psc-list" class="">'+
        '<div class="" style="width: 100%; float: left;">'+
          '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> All</span>'+
        '</div>'+
        '<div class="" style="width: 100%; float: left;">'+
          '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> </span>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="category" onclick="openSearchBox(3)">'+
      '<div class="category-img-box">'+
        '<img class="category-img" src="./img/agencyoffice.png" alt="">'+
      '</div>'+
      '<div class="category-text">'+
        'Agency/Office'+
      '</div>'+
      '<div id="category-right-agency" class="category-right">'+
      '<p class="category-arrow" id="category-arrow-agency">›</p>'+
      '</div>'+
    '</div>'+
    '<div id="search-box-agency" class="search-box inactive">'+
      '<input id="search-filter-2" class="category-input" onkeyup="searchFilter(2)" type="text" name="" value="" placeholder="Filter">'+
      '<div id="search-box-agency-list" class="">'+
        '<div class="" style="width: 100%; float: left;">'+
          '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> All</span>'+
        '</div>'+
        '<div class="" style="width: 100%; float: left;">'+
          '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> </span>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="category" onclick="openSearchBox(4)">'+
      '<div class="category-img-box">'+
        '<img class="category-img" src="./img/location.png" alt="">'+
      '</div>'+
      '<div class="category-text">'+
        'Location'+
      '</div>'+
      '<div id="category-right-location" class="category-right">'+
      '<p class="category-arrow" id="category-arrow-location">›</p>'+
      '</div>'+
    '</div>'+
    '<div id="search-box-location" class="search-box inactive">'+
      '<input id="search-filter-3" class="category-input" onkeyup="searchFilter(3)" type="text" name="" value="" placeholder="Filter">'+
      '<div id="search-box-location-list" class="">'+
        '<div class="" style="width: 100%; float: left;">'+
          '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> All</span>'+
        '</div>'+
        '<div class="" style="width: 100%; float: left;">'+
          '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> </span>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="category" onclick="openSearchBox(5)">'+
      '<div class="category-img-box">'+
        '<img class="category-img" src="./img/setaside.png" alt="">'+
      '</div>'+
      '<div class="category-text">'+
        'Set Aside'+
      '</div>'+
      '<div id="category-right-setaside" class="category-right">'+
      '<p class="category-arrow" id="category-arrow-setaside">›</p>'+
      '</div>'+
    '</div>'+
    '<div id="search-box-setaside" class="search-box inactive">'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> All</span>'+
      '</div>'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> 8(a)</span>'+
      '</div>'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> Small business</span>'+
      '</div>'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> SDVOSB</span>'+
      '</div>'+
      '<div class="" style="width: 100%; float: left;">'+
        '<input class="search-box-checkbox" type="checkbox" name="" value="" style="float: left; height: 20px;"> <span style="line-height: 25px;"> VOSB</span>'+
      '</div>'+
    '</div>'+
    '<div id="double-search-buttons">'+
    '<button class="delete-button" type="button" name="button" onclick="deleteSearchTerms()" >DELETE</button>'+
    '<button type="button" name="button" onclick="saveSearchTerms()" >SAVE</button>'+
    '</div>'+
    '<div id="single-search-button" class="inactive">'+
    '<button type="button" name="button" onclick="saveSearchTerms()" >SAVE</button>'+
    '</div>'+
  '</div>'

  if (where == 1) {
    document.getElementById("new-search").innerHTML = html
  } else {
    document.getElementById("search-item-"+where).innerHTML = html
  }
}

function calculateSuggestion(which) {
  var toRun = []
  if (which == 0) {
    var a = document.getElementsByClassName('checkbox-subnaics')
    for (i = 0; i < a.length; i++) {
      if (searchItemSuggestions.naics.it.includes(a[i].value)) {
        console.log(a[i].value)
        toRun.push(a[i])
      }
    }
    for (i = 0; i < toRun.length; i++) {
      toRun[i].checked = document.getElementById("search-item-suggestion-0").checked
      calculateSearch(toRun[i])
    }
  } else if (which == 1) {
    var a = document.getElementsByClassName('checkbox-subnaics')
    for (i = 0; i < a.length; i++) {
      if (searchItemSuggestions.naics.professional.includes(a[i].value)) {
        console.log(a[i].value)
        toRun.push(a[i])
      }
    }
    for (i = 0; i < toRun.length; i++) {
      toRun[i].checked = document.getElementById("search-item-suggestion-1").checked
      calculateSearch(toRun[i])
    }
  }
}

var previousSearchTermsIndex = null
function openSearchItems(which) {
  if (which == 0) {
    if (document.getElementById("saved-searches").classList.contains('inactive')) {
      document.getElementById("saved-searches").classList.remove('inactive')
      document.getElementById("category-arrow-"+which).classList.add('rotate')
    } else {
      document.getElementById("saved-searches").classList.add('inactive')
      document.getElementById("category-arrow-"+which).classList.remove('rotate')
    }
  } else if (which == 1) {
    if (previousSearchTermsIndex) {
      document.getElementById("search-item-"+previousSearchTermsIndex).innerHTML = ''
      previousSearchTermsIndex = null
    }
    if (document.getElementById("new-search").classList.contains('inactive')) {
      generateSearchHTML(which)
      viewSearch(-1)
      document.getElementById("double-search-buttons").classList.add('inactive')
      document.getElementById("single-search-button").classList.remove('inactive')
      document.getElementById("new-search").classList.remove('inactive')
      document.getElementById("search-name").classList.remove('inactive')
      document.getElementById("category-arrow-"+which).classList.add('rotate')
    } else {
      document.getElementById("double-search-buttons").classList.remove('inactive')
      document.getElementById("single-search-button").classList.add('inactive')
      document.getElementById("new-search").innerHTML = ''
      document.getElementById("new-search").classList.add('inactive')
      document.getElementById("search-name").classList.add('inactive')
      document.getElementById("category-arrow-"+which).classList.remove('rotate')
    }
  } else {
    if (previousSearchTermsIndex) {
      document.getElementById("search-item-"+previousSearchTermsIndex).innerHTML = ''
      previousSearchTermsIndex = null
    }
    if (document.getElementById("search-item-"+which).classList.contains('inactive')) {
      if (document.getElementById("double-search-buttons") && document.getElementById("single-search-button")) {
        document.getElementById("double-search-buttons").classList.remove('inactive')
        document.getElementById("single-search-button").classList.add('inactive')
      }
      document.getElementById("new-search").innerHTML = ''
      document.getElementById("new-search").classList.add('inactive')
      document.getElementById("search-name").classList.add('inactive')
      document.getElementById("category-arrow-"+which).classList.add('rotate')
      generateSearchHTML(which)
      var searchIndex = which - 2
      viewSearch(searchIndex)
      document.getElementById("search-item-"+which).classList.remove('inactive')
      previousSearchTermsIndex = which
    } else {
      document.getElementById("search-item-"+which).innerHTML = ''
      document.getElementById("search-item-"+which).classList.add('inactive')
      document.getElementById("category-arrow-"+which).classList.remove('rotate')
    }
  }
}

function filterOpportunitiesBySearch(elem) {
  var searchIndex = elem.value
  if (searchIndex > -1) {
    searchFilterName = yourSearches[searchIndex].name
  } else {
    searchFilterName = null
  }
  renderFbos()
}

function deleteSearchTerms() {
  if (activeSearchIndex > -1) {
    var searchSucceeded = false
    for (i = 0; i < huntingPartyData.users.length; i++) {
      if (huntingPartyData.users[i].userId == currentUser._id) {
        if (huntingPartyData.users[i].searches) {
          huntingPartyData.users[i].searches.splice(activeSearchIndex,1)
          searchSucceeded = true
          theindex = i
          break
        }
      }
    }
    if (searchSucceeded) {
      var id = huntingPartyData._id
      var xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log('search is gone!')
          yourSearches = []
          renderSavedSearches()
          switchTab(1)
        }
      };
      var url = apiUrl+"/huntingpartydata/" + id;
      xhttp.open("PUT", url, true);
      xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhttp.send(JSON.stringify(huntingPartyData));
    } else {
      console.log('it failed somehow')
    }
  }
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
        html = html + '<div class="search-box-checkbox-item">'+
        '<input class="search-box-checkbox checkbox-naics" type="checkbox" name="" onclick="calculateSearch(this)" '+checkedHtml+'> <div class="search-box-checkbox-text"> '+searchTerms.naics[i].name+'</span>'
        html = html + '<div class="search-box-checkbox-item">'+
        '<p style="margin: 0px;">----------</p>'+
        '</div>'
      } else if (isNaN(string)) {
        if (searchTerms.naics[i].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.naics[i].value == true) {
          html = html + '<div class="search-box-checkbox-item">'+
          '<input class="search-box-checkbox checkbox-naics" type="checkbox" name="" onclick="calculateSearch(this)" value="'+searchTerms.naics[i].code+'" '+checkedHtml+'> <div class="search-box-checkbox-text" onclick="calculateNaicsSearch(searchTerms.naics['+i+'], '+i+', this)"> '+searchTerms.naics[i].code+' '+searchTerms.naics[i].name+'<span id="naics-arrow-'+i+'" class="checkbox-text-arrow">▼</span></div></div>'+
          '<div id="naics-subcategory-box-'+i+'"></div>'
        } else {
          html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
          '<input class="search-box-checkbox checkbox-naics" type="checkbox" name="" onclick="calculateSearch(this)" value="'+searchTerms.naics[i].code+'" '+checkedHtml+'> <div class="search-box-checkbox-text"> '+searchTerms.naics[i].code+' '+searchTerms.naics[i].name+'<span id="naics-arrow-'+i+'" class="checkbox-text-arrow">▼</span></div></div>'+
          '<div id="naics-subcategory-box-'+i+'" class="inactive"></div>'
        }
      } else if (!isNaN(string)) {
        if (searchTerms.naics[i].code.toString().includes(string) || searchTerms.naics[i].value == true) {
          html = html + '<div class="" style="width: 100%; float: left; position: relative;">'+
          '<input class="search-box-checkbox checkbox-naics" type="checkbox" name="" onclick="calculateSearch(this)" value="'+searchTerms.naics[i].code+'" '+checkedHtml+'> <div class="search-box-checkbox-text" onclick="calculateNaicsSearch(searchTerms.naics['+i+'], '+i+', this)"> '+searchTerms.naics[i].code+' '+searchTerms.naics[i].name+'<span id="naics-arrow-'+i+'" class="checkbox-text-arrow">▼</span></div></div>'+
          '<div id="naics-subcategory-box-'+i+'"></div>'
        } else {
          html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
          '<input class="search-box-checkbox checkbox-naics" type="checkbox" name="" onclick="calculateSearch(this)" value="'+searchTerms.naics[i].code+'" '+checkedHtml+'> <div class="search-box-checkbox-text"> '+searchTerms.naics[i].code+' '+searchTerms.naics[i].name+'<span id="naics-arrow-'+i+'" class="checkbox-text-arrow">▼</span></div></div>'+
          '<div id="naics-subcategory-box-'+i+'" class="inactive"></div>'
        }
      }
      html = html + '</div>'
    }
    document.getElementById("search-box-naics-list").innerHTML = html
  }
  if (which == 1) {
    html = '<div class="search-box-checkbox-item">'+
    '<div class="search-box-checkbox-text" onclick="openPscCategory(0)">Products<span id="psc-product-arrow" class="checkbox-text-arrow">▼</span></div>'+
    '</div>'+
    '<div id="products-subcategory-box" class="subcategory-box">'
    for (i = 0; i < searchTerms.psc.products.length; i++) {
      var checkedHtml = ''
      if (searchTerms.psc.products[i].value) {
        checkedHtml = ' checked'
      }
      var matchFound = false
      if (searchTerms.psc.products[i].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.psc.products[i].value == true) {
        var inactiveHtml = ''
        var arrowHtml = '<span id="psc-product-arrow-'+i+'" class="checkbox-text-arrow">▲</span>'
        if (document.getElementById("psc-product-subcategory-box-"+i).classList.contains('inactive')) {
          inactiveHtml = ' inactive'
          arrowHtml = '<span id="psc-product-arrow-'+i+'" class="checkbox-text-arrow">▼</span>'
        }
        html = html + '<div class="search-box-checkbox-item">'+
        '<input id="psc-product-checkbox-'+i+'" class="search-box-checkbox checkbox-psc-product" type="checkbox" name="" value="'+searchTerms.psc.products[i].name+'" onclick="calculateSearch(this)" '+checkedHtml+'> <div class="search-box-checkbox-text" onclick="calculatePscSearch('+i+')"> '+searchTerms.psc.products[i].name+arrowHtml+'</div>'+
        '<div id="psc-product-subcategory-box-'+i+'" class="subcategory-box'+inactiveHtml+'">'
        if (searchTerms.psc.products[i].psc) {
          for (pscIndex = 0; pscIndex < searchTerms.psc.products[i].psc.length; pscIndex++) {
            if (searchTerms.psc.products[i].psc[pscIndex].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.psc.products[i].psc[pscIndex].value == true) {
              html = html + '<div class="search-box-checkbox-item">'+
              '<input id="psc-product-checkbox-'+i+'-'+pscIndex+'" class="search-box-checkbox checkbox-subpsc" type="checkbox" name="" value="'+searchTerms.psc.products[i].psc[pscIndex].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text"> '+searchTerms.psc.products[i].psc[pscIndex].name+'</div>'+
              '</div>'
              matchFound = true
            }
          }
        }
        html = html + '</div>'
        matchFound = true
      } else if (searchTerms.psc.products[i].psc) {
        // var pscHtml = ''
        // for (pscIndex = 0; pscIndex < searchTerms.psc[i].psc.length; pscIndex++) {
        //   if (searchTerms.psc[i].psc[pscIndex].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.psc[i].psc[pscIndex].value == true) {
        //     pscHtml = pscHtml + '<div class="search-box-checkbox-item">'+
        //     '<input id="psc-product-checkbox-'+i+'-'+pscIndex+'" class="search-box-checkbox checkbox-subpsc" type="checkbox" name="" value="'+searchTerms.psc[i].psc[pscIndex].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text"> '+searchTerms.psc[i].psc[pscIndex].name+'</div>'+
        //     '</div>'
        //     matchFound = true
        //   } else {
        //     pscHtml = pscHtml + '<div class="search-box-checkbox-item inactive">'+
        //     '<input id="psc-product-checkbox-'+i+'-'+pscIndex+'" class="search-box-checkbox checkbox-subpsc" type="checkbox" name="" value="'+searchTerms.psc[i].psc[pscIndex].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text"> '+searchTerms.psc[i].psc[pscIndex].name+'</div>'+
        //     '</div>'
        //   }
        // }
      }
      if (!matchFound) {
        html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
        '<input id="psc-product-checkbox-'+i+'" class="search-box-checkbox checkbox-psc-product" type="checkbox" name="" onclick="calculateSearch(this)" '+checkedHtml+'> <div class="search-box-checkbox-text"> '+searchTerms.psc.products[i].name+'</div>'+
        '<div id="psc-product-subcategory-box-'+i+'" class="subcategory-box inactive">'+
        '</div>'
      }
      html = html + '</div>'
    }
    html = html + '</div></div>'
    html = html + '<div class="search-box-checkbox-item">'+
    '<div class="search-box-checkbox-text" onclick="openPscCategory(1)">Services<span id="psc-service-arrow" class="checkbox-text-arrow">▲</span></div>'+
    '</div>'+
    '<div id="services-subcategory-box" class="subcategory-box">'
    for (i = 0; i < searchTerms.psc.services.length; i++) {
      var checkedHtml = ''
      if (searchTerms.psc.services[i].value) {
        checkedHtml = ' checked'
      }
      var matchFound = false
      if (searchTerms.psc.services[i].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.psc.services[i].value == true) {
        html = html + '<div class="search-box-checkbox-item">'+
        '<input id="psc-service-checkbox'+i+'" class="search-box-checkbox checkbox-psc-service" type="checkbox" name="" value="'+searchTerms.psc.services[i].name+'" onclick="calculateSearch(this)" '+checkedHtml+'> <div class="search-box-checkbox-text" onclick="calculatePscSearch2('+i+')"> '+searchTerms.psc.services[i].name+arrowHtml+'</div>'+
        '</div>'
        matchFound = true
      }
      if (!matchFound) {
        html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
        '<input id="psc-service-checkbox'+i+'" class="search-box-checkbox checkbox-psc-service" type="checkbox" name="" onclick="calculateSearch(this)" '+checkedHtml+'> <div class="search-box-checkbox-text"> '+searchTerms.psc.services[i].name+'</div>'+
        '</div>'
      }
    }
    html = html + '</div>'
    document.getElementById("search-box-psc-list").innerHTML = html
  }
  if (which == 2) {
    for (i = 0; i < searchTerms.agency.length; i++) {
      var checkedHtml = ''
      if (searchTerms.agency[i].value == true) {
        checkedHtml = ' checked'
      }
      if (i == 0) {
        html = html + '<div class="search-box-checkbox-item">'+
        '<input class="search-box-checkbox checkbox-agency" type="checkbox" name="" onclick="calculateSearch(this)" '+checkedHtml+'> <div class="search-box-checkbox-text"> '+searchTerms.agency[i].name+'</div></div>'
        html = html + '<div class="search-box-checkbox-item">'+
        '<p style="margin: 0px;">----------</p>'+
        '</div>'
      } else if (searchTerms.agency[i].name.toLowerCase().includes(string.toLowerCase()) || searchTerms.agency[i].value == true) {
        html = html + '<div class="search-box-checkbox-item">'+
        '<input class="search-box-checkbox checkbox-agency" type="checkbox" name="" onclick="calculateSearch(this)" '+checkedHtml+'> <div class="search-box-checkbox-text" onclick="calculateAgencySearch('+i+')"> '+searchTerms.agency[i].name+'</div></div>'
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
            html = html + '<div class="search-box-checkbox-item">'+
            '<input class="search-box-checkbox checkbox-subagency" type="checkbox" name="" value="'+searchTerms.agency[i].subagencies[subagencyIndex].name+'" onclick="calculateSearch(this)" '+subCheckedHTML+'> <div class="search-box-checkbox-text" onclick="calculateOfficeSearch('+i+','+subagencyIndex+')"> '+searchTerms.agency[i].subagencies[subagencyIndex].name+'</div></div>'+
            '<div id="subagency-subcategory-box-'+i+'-'+subagencyIndex+'" class="subcategory-box '+inactiveHtml2+'"></div>'
          } else {
            html = html + '<div class="inactive" style="width: 100%; float: left;">'+
            '<input class="search-box-checkbox checkbox-subagency" type="checkbox" name="" value="'+searchTerms.agency[i].subagencies[subagencyIndex].name+'" onclick="calculateSearch(this)" '+subCheckedHTML+'> <div class="search-box-checkbox-text" onclick="calculateOfficeSearch('+i+','+subagencyIndex+')"> '+searchTerms.agency[i].subagencies[subagencyIndex].name+'</div></div>'+
            '<div id="subagency-subcategory-box-'+i+'-'+subagencyIndex+'" class="subcategory-box '+inactiveHtml2+'"></div>'
          }
        }
        html = html + '</div>'
      } else {
        html = html + '<div class="" style="width: 100%; float: left; display: none;">'+
        '<input class="search-box-checkbox checkbox-agency" type="checkbox" name="" onclick="calculateSearch(this)" '+checkedHtml+'> <div class="search-box-checkbox-text"> '+searchTerms.agency[i].name+'</div></div>'+
        '<div id="agency-subcategory-box-'+i+'"></div>'
      }
    }
    document.getElementById("search-box-agency-list").innerHTML = html
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
  if (which == 3) {
    for (i = 0; i < searchTerms.place.length; i++) {
      var checkedHtml = ''
      if (searchTerms.place[i].value == true) {
        checkedHtml = ' checked'
      }
      var inactiveHtml = ''
      if (!searchTerms.place[i].name.toLowerCase().includes(string.toLowerCase()) && searchTerms.place[i].value == false) {
        inactiveHtml = ' inactive'
      }
      var arrowHtml = ''
      var onclickHtml = ''
      if (searchTerms.place[i].regions) {
        arrowHtml = '<span id="place-arrow-'+i+'" class="checkbox-text-arrow">▼</span>'
        onclickHtml = 'onclick="calculateLocationSearch('+i+', null)"'
      }
      html = html + '<div class="search-box-checkbox-item '+inactiveHtml+'">'+
      '<input id="search-box-checkbox-'+i+'" class="search-box-checkbox checkbox-place" type="checkbox" name="" value="'+searchTerms.place[i].name+'" onclick="calculateSearch(this)" '+checkedHtml+'> <div class="search-box-checkbox-text" '+onclickHtml+'> '+searchTerms.place[i].name+arrowHtml+'</div>'
      if (searchTerms.place[i].regions) {
        var inactiveHtml2 = ''
        if (document.getElementById("location-subcategory-box-"+i+"").classList.contains('inactive')) {
          inactiveHtml2 = ' inactive'
        }
        html = html + '<div id="location-subcategory-box-'+i+'" class="subcategory-box '+inactiveHtml2+'">'
        for (subcategoryIndex = 0; subcategoryIndex < searchTerms.place[i].regions.length; subcategoryIndex++) {
          var arrowHtml = ''
          var onclickHtml = ''
          if (searchTerms.place[i].regions[subcategoryIndex].regions) {
            arrowHtml = '<span id="place-arrow-'+i+'-'+subcategoryIndex+'" class="checkbox-text-arrow">▼</span>'
            onclickHtml = 'onclick="calculateLocationSearch('+i+', '+subcategoryIndex+')"'
          }
          var inactiveHtml3 = ''
          if (!searchTerms.place[i].regions[subcategoryIndex].name.toLowerCase().includes(string.toLowerCase()) && searchTerms.place[i].regions[subcategoryIndex].value == false) {
            inactiveHtml3 = ' inactive'
          }
          var subCheckedHTML = ''
          if (searchTerms.place[i].regions[subcategoryIndex].value) {
            subCheckedHTML = ' checked'
          }
          html = html + '<div class="search-box-checkbox-item '+inactiveHtml3+'">'+
          '<input id="search-box-checkbox-'+i+'-'+subcategoryIndex+'" class="search-box-checkbox checkbox-subplace" type="checkbox" name="" value="'+searchTerms.place[i].regions[subcategoryIndex].name+'" onclick="calculateSearch(this)" '+subCheckedHTML+'> <div class="search-box-checkbox-text" '+onclickHtml+'> '+searchTerms.place[i].regions[subcategoryIndex].name+arrowHtml+'</div>'
          if (searchTerms.place[i].regions[subcategoryIndex].regions) {
            var inactiveHtml4 = ''
            if (document.getElementById("location-subcategory-box-"+i+"-"+subcategoryIndex).classList.contains('inactive')) {
              inactiveHtml4 = ' inactive'
            }
            html = html + '<div id="location-subcategory-box-'+i+'-'+subcategoryIndex+'" class="subcategory-box '+inactiveHtml4+'">'
            for (subcategoryIndex2 = 0; subcategoryIndex2 < searchTerms.place[i].regions[subcategoryIndex].regions.length; subcategoryIndex2++) {
              var inactiveHtml5 = ''
              if (!searchTerms.place[i].regions[subcategoryIndex].regions[subcategoryIndex2].name.toLowerCase().includes(string.toLowerCase()) && searchTerms.place[i].regions[subcategoryIndex].regions[subcategoryIndex2].value == false) {
                inactiveHtml5 = ' inactive'
              }
              var subCheckedHTML = ''
              if (searchTerms.place[i].regions[subcategoryIndex].regions[subcategoryIndex2].value) {
                subCheckedHTML = ' checked'
              }
              html = html + '<div class="search-box-checkbox-item '+inactiveHtml5+'">'+
              '<input id="search-box-checkbox-'+i+'-'+subcategoryIndex+'-'+subcategoryIndex2+'" class="search-box-checkbox checkbox-subplace" type="checkbox" name="" value="'+searchTerms.place[i].regions[subcategoryIndex].regions[subcategoryIndex2].name+'" onclick="calculateSearch(this)" '+subCheckedHTML+'> <div class="search-box-checkbox-text"> '+searchTerms.place[i].regions[subcategoryIndex].regions[subcategoryIndex2].name+'</div>'+
              '</div>'
            }
            html = html + '</div>'
          }
          html = html + '</div>'
        }
        html = html + '</div>'
      }
      if (i == 0) {
        html = html + '<div class="search-box-checkbox-item">'+
        '<p style="margin: 0px;">----------</p>'+
        '</div>'
      }
      html = html + '</div>'
    }
    document.getElementById("search-box-location-list").innerHTML = html
  }
}

function renderSearch() {
  var html = ''
  for (i = 0; i < searchTerms.dueDate.length; i++) {
    html = html + '<div class="search-box-checkbox-item">'+
    '<input class="search-box-checkbox checkbox-duedate" type="checkbox" name="" value="'+searchTerms.dueDate[i].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text"> '+searchTerms.dueDate[i].name+'</div>'
    if (i == 0) {
      html = html + '<div class="search-box-checkbox-item">'+
      '<p style="margin: 0px;">----------</p>'+
      '</div>'
    }
    html = html + '</div>'
  }
  document.getElementById("search-box-time").innerHTML = html
  html = ''
  var naicsIndex = 0
  for (i = 0; i < searchTerms.naics.length; i++) {
    if (i == 0) {
      html = html + '<div class="search-box-checkbox-item">'+
      '<input class="search-box-checkbox checkbox-naics" type="checkbox" name="" value="0" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text"> '+searchTerms.naics[i].name+'</div>'+
      '<div id="naics-subcategory-box-'+i+'"></div>'+
      '<div class="search-box-checkbox-item">'+
      '<p style="margin: 0px;">----------</p>'+
      '</div>'
    } else {
      html = html + '<div class="search-box-checkbox-item">'+
      '<input class="search-box-checkbox checkbox-naics" type="checkbox" name="" value="'+searchTerms.naics[i].code+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text" onclick="calculateNaicsSearch(\''+i+'\')"> '+
      searchTerms.naics[i].code+' '+searchTerms.naics[i].name+'<span id="naics-arrow-'+i+'" class="checkbox-text-arrow">▼</span></div>'
      if (searchTerms.naics[i].subcategories) {
        html = html + '<div id="naics-subcategory-box-'+i+'" class="subcategory-box inactive">'
        for (i2 = 0; i2 < searchTerms.naics[i].subcategories.length; i2++) {
          html = html + '<div class="search-box-checkbox-item">'+
          '<input id="checkbox-subnaics-'+i+'-'+i2+'" class="search-box-checkbox checkbox-subnaics" type="checkbox" name="" value="'+searchTerms.naics[i].subcategories[i2].code+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text" onclick="calculateNaicsSearch(\''+i+'-'+i2+'\')"> '+
          searchTerms.naics[i].subcategories[i2].code+' '+searchTerms.naics[i].subcategories[i2].name+'<span id="naics-arrow-'+i+'-'+i2+'" class="checkbox-text-arrow">▼</span></div>'
          if (searchTerms.naics[i].subcategories[i2].subcategories) {
            html = html + '<div id="naics-subcategory-box-'+i+'-'+i2+'" class="subcategory-box inactive">'
            for (i3 = 0; i3 < searchTerms.naics[i].subcategories[i2].subcategories.length; i3++) {
              html = html + '<div class="search-box-checkbox-item">'+
              '<input id="checkbox-subnaics-'+i+'-'+i2+'-'+i3+'" class="search-box-checkbox checkbox-subnaics" type="checkbox" name="" value="'+searchTerms.naics[i].subcategories[i2].subcategories[i3].code+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text" onclick="calculateNaicsSearch(\''+i+'-'+i2+'-'+i3+'\')"> '+
              searchTerms.naics[i].subcategories[i2].subcategories[i3].code+' '+searchTerms.naics[i].subcategories[i2].subcategories[i3].name+'<span id="naics-arrow-'+i+'-'+i2+'-'+i3+'" class="checkbox-text-arrow">▼</span></div>'
              if (searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories) {
                html = html + '<div id="naics-subcategory-box-'+i+'-'+i2+'-'+i3+'" class="subcategory-box inactive">'
                for (i4 = 0; i4 < searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories.length; i4++) {
                  html = html + '<div class="search-box-checkbox-item">'+
                  '<input id="checkbox-subnaics-'+i+'-'+i2+'-'+i3+'-'+i4+'" class="search-box-checkbox checkbox-subnaics" type="checkbox" name="" value="'+searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].code+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text" onclick="calculateNaicsSearch(\''+i+'-'+i2+'-'+i3+'-'+i4+'\')"> '+
                  searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].code+' '+searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].name+'<span id="naics-arrow-'+i+'-'+i2+'-'+i3+'-'+i4+'" class="checkbox-text-arrow">▼</span></div>'
                  if (searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories) {
                    html = html + '<div id="naics-subcategory-box-'+i+'-'+i2+'-'+i3+'-'+i4+'" class="subcategory-box inactive">'
                    for (i5 = 0; i5 < searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories.length; i5++) {
                      html = html + '<div class="search-box-checkbox-item">'+
                      '<input id="checkbox-subnaics-'+i+'-'+i2+'-'+i3+'-'+i4+'-'+i5+'" class="search-box-checkbox checkbox-subnaics" type="checkbox" name="" value="'+searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories[i5].code+'" onclick="calculateSearch(this)">'+
                      '<div class="search-box-checkbox-text"> '+
                        searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories[i5].code+' '+searchTerms.naics[i].subcategories[i2].subcategories[i3].subcategories[i4].subcategories[i5].name+
                      '</div>'+
                      '</div>'
                    }
                    html = html + '</div>'
                  }
                  html = html + '</div>'
                }
                html = html + '</div>'
              }
              html = html + '</div>'
            }
            html = html + '</div>'
          }
          html = html + '</div>'
        }
        html = html + '</div>'
      }
      html = html + '</div>'
    }
  }
  document.getElementById("search-box-naics-list").innerHTML = html
  html = '<div class="search-box-checkbox-item">'+
  '<div class="search-box-checkbox-text" onclick="openPscCategory(0)">Products<span id="psc-product-arrow" class="checkbox-text-arrow">▼</span></div>'+
  '</div>'+
  '<div id="products-subcategory-box" class="subcategory-box inactive">'
  for (i = 0; i < searchTerms.psc.products.length; i++) {
    html = html + '<div class="search-box-checkbox-item">'+
    '<input id="psc-product-checkbox-'+i+'" class="search-box-checkbox checkbox-psc-product" type="checkbox" name="" value="'+searchTerms.psc.products[i].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text" onclick="calculatePscSearch('+i+')"> '+searchTerms.psc.products[i].name+'<span id="psc-product-arrow-'+i+'" class="checkbox-text-arrow">▼</span></div>'+
    '<div id="psc-product-subcategory-box-'+i+'" class="subcategory-box inactive">'
    if (searchTerms.psc.products[i].psc) {
      for (pscIndex = 0; pscIndex < searchTerms.psc.products[i].psc.length; pscIndex++) {
        html = html + '<div class="search-box-checkbox-item">'+
        '<input id="psc-product-checkbox-'+i+'-'+pscIndex+'" class="search-box-checkbox checkbox-subpsc" type="checkbox" name="" value="'+searchTerms.psc.products[i].psc[pscIndex].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text"> '+searchTerms.psc.products[i].psc[pscIndex].name+'</div>'+
        '</div>'
      }
    }
    html = html + '</div>'
    html = html + '</div>'
  }
  html = html + '</div>'
  html = html + '<div class="search-box-checkbox-item">'+
  '<div class="search-box-checkbox-text" onclick="openPscCategory(1)">Services<span id="psc-service-arrow" class="checkbox-text-arrow">▼</span></div>'+
  '</div>'+
  '<div id="services-subcategory-box" class="subcategory-box inactive">'
  for (i = 0; i < searchTerms.psc.services.length; i++) {
    html = html + '<div class="search-box-checkbox-item">'+
    '<input id="psc-service-checkbox'+i+'" class="search-box-checkbox checkbox-psc-service" type="checkbox" name="" value="'+searchTerms.psc.services[i].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text" onclick="calculatePscSearch2('+i+')"> '+searchTerms.psc.services[i].name+'<span id="psc-service-arrow'+i+'" class="checkbox-text-arrow">▼</span></div>'+
    '<div id="psc-service-subcategory-box-'+i+'" class="subcategory-box inactive">'
    html = html + '</div>'
    html = html + '</div>'
  }
  html = html + '</div>'
  document.getElementById("search-box-psc-list").innerHTML = html
  html = ''
  for (i = 0; i < searchTerms.agency.length; i++) {
    if (i == 0) {
      html = html + '<div class="search-box-checkbox-item">'+
      '<input class="search-box-checkbox checkbox-agency" type="checkbox" name="" value="'+searchTerms.agency[i].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text"> '+searchTerms.agency[i].name+'</div></div>'+
      '<div id="agency-subcategory-box-'+i+'"></div>'+
      '<div class="search-box-checkbox-item">'+
      '<p style="margin: 0px;">----------</p>'+
      '</div>'
    } else {
      html = html + '<div class="search-box-checkbox-item">'+
      '<input class="search-box-checkbox checkbox-agency" type="checkbox" name="" value="'+searchTerms.agency[i].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text" onclick="calculateAgencySearch('+i+')"> '+searchTerms.agency[i].name+'</div></div>'+
      '<div id="agency-subcategory-box-'+i+'" class="subcategory-box inactive">'
      if (searchTerms.agency[i].subagencies) {
        for (subagencyIndex = 0; subagencyIndex < searchTerms.agency[i].subagencies.length; subagencyIndex++) {
          html = html + '<div class="search-box-checkbox-item">'+
          '<input class="search-box-checkbox checkbox-subagency" type="checkbox" name="" value="'+searchTerms.agency[i].subagencies[subagencyIndex].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text" onclick="calculateOfficeSearch('+i+', '+subagencyIndex+')"> '+searchTerms.agency[i].subagencies[subagencyIndex].name+'</div></div>'+
          '<div id="subagency-subcategory-box-'+i+'-'+subagencyIndex+'" class="subcategory-box inactive">'
          if (searchTerms.agency[i].subagencies[subagencyIndex].offices) {
            for (officeIndex = 0; officeIndex < searchTerms.agency[i].subagencies[subagencyIndex].offices.length; officeIndex++) {
              html = html + '<div class="search-box-checkbox-item">'+
              '<input class="search-box-checkbox checkbox-subagency" type="checkbox" name="" value="'+searchTerms.agency[i].subagencies[subagencyIndex].offices[officeIndex].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text"> '+searchTerms.agency[i].subagencies[subagencyIndex].offices[officeIndex].name+'</div></div>'
            }
          }
          html = html + '</div>'
        }
      }
      html = html + '</div>'
    }
  }
  document.getElementById("search-box-agency-list").innerHTML = html
  html = ''
  for (i = 0; i < searchTerms.place.length; i++) {
    var arrowHtml = ''
    var onclickHtml = ''
    if (searchTerms.place[i].regions) {
      arrowHtml = '<span id="place-arrow-'+i+'" class="checkbox-text-arrow">▼</span>'
      onclickHtml = 'onclick="calculateLocationSearch('+i+', null)"'
    }
    html = html + '<div class="search-box-checkbox-item">'+
    '<input id="search-box-checkbox-'+i+'" class="search-box-checkbox checkbox-place" type="checkbox" name="" value="'+searchTerms.place[i].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text" '+onclickHtml+'> '+searchTerms.place[i].name+arrowHtml+'</div>'
    if (searchTerms.place[i].regions) {
      html = html + '<div id="location-subcategory-box-'+i+'" class="subcategory-box inactive">'
      for (subcategoryIndex = 0; subcategoryIndex < searchTerms.place[i].regions.length; subcategoryIndex++) {
        if (searchTerms.place[i].regions[subcategoryIndex].regions) {
          arrowHtml = '<span id="place-arrow-'+i+'-'+subcategoryIndex+'" class="checkbox-text-arrow">▼</span>'
          onclickHtml = 'onclick="calculateLocationSearch('+i+', '+subcategoryIndex+')"'
        }
        html = html + '<div class="search-box-checkbox-item">'+
        '<input id="search-box-checkbox-'+i+'-'+subcategoryIndex+'" class="search-box-checkbox checkbox-subplace" type="checkbox" name="" value="'+searchTerms.place[i].regions[subcategoryIndex].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text" '+onclickHtml+'> '+searchTerms.place[i].regions[subcategoryIndex].name+arrowHtml+'</div>'
        if (searchTerms.place[i].regions[subcategoryIndex].regions) {
          html = html + '<div id="location-subcategory-box-'+i+'-'+subcategoryIndex+'" class="subcategory-box inactive">'
          for (subcategoryIndex2 = 0; subcategoryIndex2 < searchTerms.place[i].regions[subcategoryIndex].regions.length; subcategoryIndex2++) {
            html = html + '<div class="search-box-checkbox-item">'+
            '<input id="search-box-checkbox-'+i+'-'+subcategoryIndex+'-'+subcategoryIndex2+'" class="search-box-checkbox checkbox-subplace" type="checkbox" name="" value="'+searchTerms.place[i].regions[subcategoryIndex].regions[subcategoryIndex2].name+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text"> '+searchTerms.place[i].regions[subcategoryIndex].regions[subcategoryIndex2].name+'</div>'+
            '</div>'
          }
          html = html + '</div>'
        }
        html = html + '</div>'
      }
      html = html + '</div>'
    }
    if (i == 0) {
      html = html + '<div class="search-box-checkbox-item">'+
      '<p style="margin: 0px;">----------</p>'+
      '</div>'
    }
    html = html + '</div>'
  }
  document.getElementById("search-box-location-list").innerHTML = html
  html = ''
  for (i = 0; i < searchTerms.setAside.length; i++) {
    html = html + '<div class="search-box-checkbox-item">'+
    '<input class="search-box-checkbox checkbox-setaside" type="checkbox" name="" value="'+searchTerms.setAside[i].name+'"> <div class="search-box-checkbox-text"> '+searchTerms.setAside[i].name+'</div>'
    if (i == 0) {
      html = html + '<div class="search-box-checkbox-item">'+
      '<p style="margin: 0px;">----------</p>'+
      '</div>'
    }
    html = html + '</div>'
  }
  document.getElementById("search-box-setaside").innerHTML = html
}

function calculateNaicsSearch(idString) {
  if (!document.getElementById('naics-subcategory-box-'+idString).classList.contains('inactive')) {
    document.getElementById('naics-subcategory-box-'+idString).classList.add('inactive')
    document.getElementById('naics-arrow-'+idString).innerHTML = '▼'
  } else {
    document.getElementById('naics-subcategory-box-'+idString).classList.remove('inactive')
    document.getElementById('naics-arrow-'+idString).innerHTML = '▲'
  }
}

function calculateNaicsSubSearch(naicsItemIndex, subIndex1, subIndex2, subIndex3, subIndex4, boxId, elem) {
  var naicsItem = searchTerms.naics[naicsItemIndex]
  var divIdNum = ''
  if (subIndex4 > -1) {
    naicsItem = searchTerms.naics[naicsItemIndex].subcategories[subIndex1].subcategories[subIndex2].subcategories[subIndex3].subcategories[subIndex4]
  } else if (subIndex3 > -1) {
    naicsItem = searchTerms.naics[naicsItemIndex].subcategories[subIndex1].subcategories[subIndex2].subcategories[subIndex3]
  } else if (subIndex2 > -1) {
    naicsItem = searchTerms.naics[naicsItemIndex].subcategories[subIndex1].subcategories[subIndex2]
  } else if (subIndex1 > -1) {
    naicsItem = searchTerms.naics[naicsItemIndex].subcategories[subIndex1]
  }
  if (!elem.classList.contains('naics-open')) {
    if (naicsItem.subcategories) {
      var html = '<div class="naics-subcategory-box subcategory-box">'
      for (i = 0; i < naicsItem.subcategories.length; i++) {
        var onclickString = 'calculateNaicsSubSearch('+naicsItemIndex+', -1, -1, -1, -1, \''+divIdNum+'\', this)'
        if (subIndex4 > -1) {
          divIdNum = ''+naicsItemIndex+'-'+subIndex1+'-'+subIndex2+'-'+subIndex3+'-'+subIndex4+'-'+i
          onclickString = 'calculateNaicsSubSearch('+naicsItemIndex+', '+subIndex1+', '+subIndex2+', '+subIndex3+', '+subIndex4+', \''+divIdNum+'\', this)'
        } else if (subIndex3 > -1) {
          divIdNum = ''+naicsItemIndex+'-'+subIndex1+'-'+subIndex2+'-'+subIndex3+'-'+i
          onclickString = 'calculateNaicsSubSearch('+naicsItemIndex+', '+subIndex1+', '+subIndex2+', '+subIndex3+', '+i+', \''+divIdNum+'\', this)'
        } else if (subIndex2 > -1) {
          divIdNum = ''+naicsItemIndex+'-'+subIndex1+'-'+subIndex2+'-'+i
          onclickString = 'calculateNaicsSubSearch('+naicsItemIndex+', '+subIndex1+', '+subIndex2+', '+i+', -1, \''+divIdNum+'\', this)'
        } else if (subIndex1 > -1) {
          divIdNum = ''+naicsItemIndex+'-'+subIndex1+'-'+i
          onclickString = 'calculateNaicsSubSearch('+naicsItemIndex+', '+subIndex1+', '+i+', -1, -1, \''+divIdNum+'\', this)'
        }
        var arrowHtml = ''
        var onclickHtml = ''
        if (naicsItem.subcategories[i].subcategories) {
          arrowHtml = '<span id="naics-arrow-'+divIdNum+'" class="checkbox-text-arrow">▼</span>'
          onclickHtml = 'onclick="'+onclickString+'"'
        }

        html = html + '<div class="search-box-checkbox-item">'+
        '<input class="search-box-checkbox checkbox-naics" type="checkbox" name="" value="'+naicsItem.subcategories[i].code+'" onclick="calculateSearch(this)"> <div class="search-box-checkbox-text" '+onclickHtml+'> '+naicsItem.subcategories[i].code+' '+naicsItem.subcategories[i].name+arrowHtml+'</div>'+
        '<div id="naics-subcategory-box-'+divIdNum+'"></div>'+
        '</div>'
      }
      html = html + '</div>'
      elem.classList.add('naics-open');
      document.getElementById('naics-arrow-'+boxId).innerHTML = '▲'
      document.getElementById('naics-subcategory-box-'+boxId).innerHTML = html
    }
  } else {
    document.getElementById('naics-subcategory-box-'+boxId).innerHTML = ''
    document.getElementById('naics-arrow-'+boxId).innerHTML = '▼'
    elem.classList.remove('naics-open');
  }
}

function openPscCategory(which) {
  if (which == 0) {
    if (!document.getElementById('products-subcategory-box').classList.contains('inactive')) {
      document.getElementById('products-subcategory-box').classList.add('inactive')
      document.getElementById('psc-product-arrow').innerHTML = '▼'

    } else {
      document.getElementById('products-subcategory-box').classList.remove('inactive')
      document.getElementById('psc-product-arrow').innerHTML = '▲'
    }
  } else if (which == 1) {
    if (!document.getElementById('services-subcategory-box').classList.contains('inactive')) {
      document.getElementById('services-subcategory-box').classList.add('inactive')
      document.getElementById('psc-service-arrow').innerHTML = '▼'

    } else {
      document.getElementById('services-subcategory-box').classList.remove('inactive')
      document.getElementById('psc-service-arrow').innerHTML = '▲'
    }
  }
}

function calculatePscSearch(pscIndex) {
  if (!document.getElementById('psc-product-subcategory-box-'+pscIndex+'').classList.contains('inactive')) {
    document.getElementById('psc-product-subcategory-box-'+pscIndex+'').classList.add('inactive')
    document.getElementById('psc-product-arrow-'+pscIndex).innerHTML = '▼'

  } else {
    document.getElementById('psc-product-subcategory-box-'+pscIndex+'').classList.remove('inactive')
    document.getElementById('psc-product-arrow-'+pscIndex).innerHTML = '▲'
  }
}
function calculatePscSearch2(pscIndex) {
  if (!document.getElementById('psc-service-subcategory-box-'+pscIndex+'').classList.contains('inactive')) {
    document.getElementById('psc-service-subcategory-box-'+pscIndex+'').classList.add('inactive')
    document.getElementById('psc-service-arrow'+pscIndex).innerHTML = '▼'

  } else {
    document.getElementById('psc-service-subcategory-box-'+pscIndex+'').classList.remove('inactive')
    document.getElementById('psc-service-arrow'+pscIndex).innerHTML = '▲'
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

function calculateLocationSearch(locationIndex, subLocationIndex) {
  if (subLocationIndex !== null) {
    if (!document.getElementById('location-subcategory-box-'+locationIndex+'-'+subLocationIndex+'').classList.contains('inactive')) {
      document.getElementById('location-subcategory-box-'+locationIndex+'-'+subLocationIndex+'').classList.add('inactive')
      document.getElementById('place-arrow-'+locationIndex+'-'+subLocationIndex).innerHTML = '▼'
    } else {
      document.getElementById('location-subcategory-box-'+locationIndex+'-'+subLocationIndex+'').classList.remove('inactive')
      document.getElementById('place-arrow-'+locationIndex+'-'+subLocationIndex).innerHTML = '▲'
    }
  } else {
    if (!document.getElementById('location-subcategory-box-'+locationIndex+'').classList.contains('inactive')) {
      document.getElementById('location-subcategory-box-'+locationIndex+'').classList.add('inactive')
      document.getElementById('place-arrow-'+locationIndex).innerHTML = '▼'
    } else {
      document.getElementById('location-subcategory-box-'+locationIndex+'').classList.remove('inactive')
      document.getElementById('place-arrow-'+locationIndex).innerHTML = '▲'
    }
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
  if (elem.classList.contains('checkbox-type')) {
    if (elem.value == searchTerms.type[0].name) {
      for (i = 0; i < searchTerms.type.length; i++) {
        searchTerms.type[i].value = elem.checked
      }
      var a = document.getElementsByClassName('checkbox-type')
      for (i2 = 0; i2 < a.length; i2++) {
        a[i2].checked = elem.checked
      }
    } else {
      for (i = 0; i < searchTerms.type.length; i++) {
        if (searchTerms.type[i].name == elem.value) {
          searchTerms.type[i].value = elem.checked
          if (!elem.checked) {
            searchTerms.type[0].value = false
            var a = document.getElementsByClassName('checkbox-type')
            a[0].checked = false
          }
          break;
        }
      }
    }
  } else if (elem.classList.contains('checkbox-duedate')) {
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
  } else if (elem.classList.contains('checkbox-psc-service')) {
    for (i = 0; i < searchTerms.psc.services.length; i++) {
      if (searchTerms.psc.services[i].name == elem.value) {
        searchTerms.psc.services[i].value = elem.checked
      }
    }
  } else if (elem.classList.contains('checkbox-psc-product')) {
    for (i = 0; i < searchTerms.psc.products.length; i++) {
      if (searchTerms.psc.products[i].name == elem.value) {
        searchTerms.psc.products[i].value = elem.checked
        if (searchTerms.psc.products[i].psc) {
          for (pscIndex = 0; pscIndex < searchTerms.psc.products[i].psc.length; pscIndex++) {
            searchTerms.psc.products[i].psc[pscIndex].value = elem.checked
            var a = document.getElementsByClassName('checkbox-subpsc')
            document.getElementById('psc-product-checkbox-'+i+'-'+pscIndex).checked = elem.checked
          }
        }
      }
    }
  } else if (elem.classList.contains('checkbox-subpsc')) {
    for (i = 0; i < searchTerms.psc.products.length; i++) {
      if (searchTerms.psc.products[i].psc) {
        var allChecked = true
        var matchFound = false
        for (pscIndex = 0; pscIndex < searchTerms.psc.products[i].psc.length; pscIndex++) {
          if (searchTerms.psc.products[i].psc[pscIndex].name == elem.value) {
            matchFound = true
            if (!elem.checked) {
              document.getElementById('psc-product-checkbox-'+i).checked = false
              searchTerms.psc.products[i].value = false
            }
            searchTerms.psc.products[i].psc[pscIndex].value = elem.checked
          }
          if (searchTerms.psc.products[i].psc[pscIndex].value == false) {
            allChecked = false
          }
        }
        if (matchFound && allChecked) {
          document.getElementById('psc-product-checkbox-'+i).checked = true
          searchTerms.psc.products[i].value = elem.checked
        }
      }
    }

  } else if (elem.classList.contains('checkbox-agency') || elem.classList.contains('checkbox-subagency')) {
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
    for (i = 0; i < searchTerms.place.length; i++) {
      if (searchTerms.place[i].name == elem.value) {
        searchTerms.place[i].value = elem.checked
        if (searchTerms.place[i].regions) {
          for (regionIndex = 0; regionIndex < searchTerms.place[i].regions.length; regionIndex++) {
            searchTerms.place[i].regions[regionIndex].value = elem.checked
            document.getElementById('search-box-checkbox-'+i+'-'+regionIndex).checked = elem.checked
            if (searchTerms.place[i].regions[regionIndex].regions) {
              for (regionIndex2 = 0; regionIndex2 < searchTerms.place[i].regions[regionIndex].regions.length; regionIndex2++) {
                searchTerms.place[i].regions[regionIndex].regions[regionIndex2].value = elem.checked
                document.getElementById('search-box-checkbox-'+i+'-'+regionIndex+'-'+regionIndex2).checked = elem.checked
              }
            }
          }
        }
      }
    }
  } else if (elem.classList.contains('checkbox-subplace')) {
    console.log('subplace')
    for (i = 0; i < searchTerms.place.length; i++) {
      if (searchTerms.place[i].regions) {
        var allChecked = true
        var matchFound = false
        for (regionIndex = 0; regionIndex < searchTerms.place[i].regions.length; regionIndex++) {
          if (searchTerms.place[i].regions[regionIndex].name == elem.value) {
            matchFound = true
            if (!elem.checked) {
              document.getElementById('search-box-checkbox-'+i).checked = false
              searchTerms.place[i].value = false
            }
            searchTerms.place[i].regions[regionIndex].value = elem.checked
            if (searchTerms.place[i].regions[regionIndex].regions) {
              for (regionIndex2 = 0; regionIndex2 < searchTerms.place[i].regions[regionIndex].regions.length; regionIndex2++) {
                searchTerms.place[i].regions[regionIndex].regions[regionIndex2].value = elem.checked
                document.getElementById('search-box-checkbox-'+i+'-'+regionIndex+'-'+regionIndex2).checked = elem.checked
              }
            }
          } else if (searchTerms.place[i].regions[regionIndex].regions) {
            var allChecked2 = true
            for (regionIndex2 = 0; regionIndex2 < searchTerms.place[i].regions[regionIndex].regions.length; regionIndex2++) {
              if (searchTerms.place[i].regions[regionIndex].regions[regionIndex2].name == elem.value) {
                matchFound = true
                searchTerms.place[i].regions[regionIndex].regions[regionIndex2].value = elem.checked
                if (!elem.checked) {
                  document.getElementById('search-box-checkbox-'+i).checked = false
                  document.getElementById('search-box-checkbox-'+i+'-'+regionIndex).checked = false
                  searchTerms.place[i].value = false
                }
              }
              if (searchTerms.place[i].regions[regionIndex].regions[regionIndex2].value == false) {
                allChecked = false
                allChecked2 = false
              }
            }
            if (matchFound && allChecked2) {
              document.getElementById('search-box-checkbox-'+i+'-'+regionIndex).checked = true
              searchTerms.place[i].regions[regionIndex].value = elem.checked
            }
          }
          if (searchTerms.place[i].regions[regionIndex].value == false) {
            allChecked = false
          }
        }
        if (matchFound && allChecked) {
          document.getElementById('search-box-checkbox-'+i).checked = true
          searchTerms.place[i].value = elem.checked
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
  checkChecked()
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
    }
    terms.name = document.getElementById("search-name").value
    if (activeSearchIndex > -1) {
      yourSearches[activeSearchIndex] = terms
    } else {
      for (i = 0; i < huntingPartyData.users.length; i++) {
        if (huntingPartyData.users[i].userId == currentUser._id) {
          if (!huntingPartyData.users[i].searches) {
            huntingPartyData.users[i].searches = []
          }
          huntingPartyData.users[i].searches.push(terms)
        }
      }
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
          document.getElementById('search-save-popup').classList.remove('inactive')
          document.getElementById('search-save-popup-bg').classList.remove('inactive')
          document.getElementById('search-save-popup-text').innerHTML = terms.name + ' has been saved!'
          renderSavedSearches()
          if (!document.getElementById("new-search").classList.contains('inactive')) {
            openSearchItems(1)
          }
          if (document.getElementById("saved-searches").classList.contains('inactive')) {
            openSearchItems(0)
          }
          switchTab(1)
          console.log('UPDATED')
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
    const profilePopup = document.getElementById("bottombar-popup");
    const profilePopupButton = document.getElementById("bottombar-img-profile");
    const voteDropdown = document.getElementById("vote-circle-dropdown-"+voteDropdownOpen);
    const voteCircle = document.getElementById("vote-circle-"+voteDropdownOpen);
    let targetElement = evt.target; // clicked element
    var profilePopupOpen = !profilePopup.classList.contains('inactive')
    var profileInside = false
    do {
      if (profilePopupOpen) {
        if (targetElement == profilePopup || targetElement == profilePopupButton) {
          // This is a click inside. Do nothing, just return.
          profileInside = true;
        }
      }
      // Go up the DOM
      targetElement = targetElement.parentNode;
    } while (targetElement);
    // This is a click outside.
    if (!profileInside) {
      profilePopup.classList.add('inactive');
    }

  });

  function openBottombarPopup() {
    if (document.getElementById("bottombar-popup").classList.contains('inactive')) {
      document.getElementById("bottombar-popup").classList.remove('inactive')
    } else {
      document.getElementById("bottombar-popup").classList.add('inactive')
    }
  }

  function switchTab(num) {
    document.getElementById("fbo-list-view").classList.remove('inactive');
    document.getElementById("fbo-detail-view").classList.add('inactive');
    tutorialsOpen = true
    openTutorials()
    if (num == 0) {
      document.getElementById("news-block").classList.remove('inactive')
      document.getElementById("search-view").classList.add('inactive')
      document.getElementById("fbo-view").classList.add('inactive')
      document.getElementById("pipeline-view").classList.add('inactive')
      document.getElementById("bottombar-img-home").classList.add('icon-2-active')
      document.getElementById("bottombar-img-opportunities").classList.remove('icon-2-active')
      document.getElementById("bottombar-img-search").classList.remove('icon-2-active')
      document.getElementById("bottombar-img-pipeline").classList.remove('icon-2-active')
      document.getElementById("fbo-detail-top").classList.remove('fbo-detail-top-larger')
      document.getElementById("fbo-detail-middle").classList.remove('inactive')
      document.getElementById("bottombar-text-0").classList.add('bottombar-item-text-active')
      document.getElementById("bottombar-text-1").classList.remove('bottombar-item-text-active')
      document.getElementById("bottombar-text-2").classList.remove('bottombar-item-text-active')
      document.getElementById("bottombar-text-3").classList.remove('bottombar-item-text-active')
      document.getElementById("topbar-center-text").innerHTML = "To Do/News"
      document.getElementById("topbar-right").innerHTML = ''
    } else if (num == 1) {
      document.getElementById("news-block").classList.add('inactive')
      document.getElementById("search-view").classList.remove('inactive')
      document.getElementById("fbo-view").classList.add('inactive')
      document.getElementById("pipeline-view").classList.add('inactive')
      document.getElementById("topbar-center-text").innerHTML = "Search"
      document.getElementById("topbar-right").innerHTML = ''
      document.getElementById("saved-search-view").classList.remove('inactive')
      document.getElementById("search-terms-view").classList.add('inactive')
      document.getElementById("bottombar-img-home").classList.remove('icon-2-active')
      document.getElementById("bottombar-img-opportunities").classList.remove('icon-2-active')
      document.getElementById("bottombar-img-search").classList.add('icon-2-active')
      document.getElementById("bottombar-img-pipeline").classList.remove('icon-2-active')
      document.getElementById("fbo-detail-top").classList.remove('fbo-detail-top-larger')
      document.getElementById("bottombar-text-0").classList.remove('bottombar-item-text-active')
      document.getElementById("bottombar-text-1").classList.add('bottombar-item-text-active')
      document.getElementById("bottombar-text-2").classList.remove('bottombar-item-text-active')
      document.getElementById("bottombar-text-3").classList.remove('bottombar-item-text-active')
      document.getElementById("fbo-detail-middle").classList.remove('inactive')
    } else if (num == 2) {
      document.getElementById("news-block").classList.add('inactive')
      document.getElementById("search-view").classList.add('inactive')
      document.getElementById("fbo-view").classList.remove('inactive')
      document.getElementById("pipeline-view").classList.add('inactive')
      document.getElementById("topbar-center-text").innerHTML = "Opportunities"
      document.getElementById("topbar-right").innerHTML = ''
      document.getElementById("bottombar-img-home").classList.remove('icon-2-active')
      document.getElementById("bottombar-img-opportunities").classList.add('icon-2-active')
      document.getElementById("bottombar-img-search").classList.remove('icon-2-active')
      document.getElementById("bottombar-img-pipeline").classList.remove('icon-2-active')
      document.getElementById("fbo-detail-top").classList.remove('fbo-detail-top-larger')
      document.getElementById("bottombar-text-0").classList.remove('bottombar-item-text-active')
      document.getElementById("bottombar-text-1").classList.remove('bottombar-item-text-active')
      document.getElementById("bottombar-text-2").classList.add('bottombar-item-text-active')
      document.getElementById("bottombar-text-3").classList.remove('bottombar-item-text-active')
      document.getElementById("fbo-detail-middle").classList.remove('inactive')
      renderFbos()
    } else if (num == 3) {
      document.getElementById("news-block").classList.add('inactive')
      document.getElementById("search-view").classList.add('inactive')
      document.getElementById("fbo-view").classList.add('inactive')
      document.getElementById("pipeline-view").classList.remove('inactive')
      document.getElementById("topbar-center-text").innerHTML = "Pipeline"
      document.getElementById("topbar-right").innerHTML = ''
      document.getElementById("bottombar-img-home").classList.remove('icon-2-active')
      document.getElementById("bottombar-img-opportunities").classList.remove('icon-2-active')
      document.getElementById("bottombar-img-search").classList.remove('icon-2-active')
      document.getElementById("bottombar-img-pipeline").classList.add('icon-2-active')
      document.getElementById("fbo-detail-top").classList.remove('fbo-detail-top-larger')
      document.getElementById("fbo-detail-middle").classList.remove('inactive')
      document.getElementById("bottombar-text-0").classList.remove('bottombar-item-text-active')
      document.getElementById("bottombar-text-1").classList.remove('bottombar-item-text-active')
      document.getElementById("bottombar-text-2").classList.remove('bottombar-item-text-active')
      document.getElementById("bottombar-text-3").classList.add('bottombar-item-text-active')
    }
    activeTab = num
    document.getElementById("topbar-left").innerHTML = ''
    var a = document.getElementsByClassName('iconbar-icon')
    for (i = 0; i < a.length; i++) {
      if (i == num) {
        a[i].classList.add('iconbar-icon-active');
      } else {
        a[i].classList.remove('iconbar-icon-active');
      }
    }
    closeSidebar()
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
  function generateOptions(){
    renderSavedSearches()
    renderSortOptions()
    // parseProxy()
  }
  function generateFbos(){
    sortFboRenders()
    renderFbos()
  }
  function runFilters(elem){
    filterOpportunitiesBySearch(elem)
    renderFbos()
  }
  function runSort(fboProxy, elem){
    var selected = elem.value
    // console.log("Current Val:", selected, typeof selected)
    sortFboRenders(fboProxy, parseInt(selected))
    // renderFbos(fboProxy)
    renderFbos()
  }
  function renderSortOptions(){
    var sortID = document.getElementById("sort-select")
    var sortOptions = [
      {
        "text": "Earliest Due",
        "value": 0
      },
      {
        "text": "Latest Due",
        "value": 1
      },
      {
        "text": "Date Posted (Inactive)",
        "value": 2
      },
      {
        "text": "Alpha A-Z",
        "value": 3
      },
      {
        "text": "Alpha Z-A",
        "value": 4
      },
      {
        "text": "Agency A-Z",
        "value": 5
      },
      {
        "text": "Agency Z-A",
        "value": 6
      }
    ]

   sortOptions.forEach(function (item){
      var option = document.createElement("option")
      option.text = item.text
      option.value = item.value
      sortID.add(option)
   });
  }
  function sortFboRenders(fboProxy, renderOption){
    const BY_EARLIEST_DUE = 0 //Also most recent expired for pipeline
    const BY_LATEST_DUE = 1 //Includes data with no deadline at top; Also oldest expired for pipeline
    const BY_DATE_POSTED = 2 //Most recent date to oldest; Inactive
    const BY_ALPHA_ASC = 3 //Alphanumeric Order (1 - Z)
    const BY_ALPHA_DEC = 4 //Reverse Alphanumeric
    const BY_AGENCY_ASC = 5 //Sorts by Agency (Second criteria is duedate)
    const BY_AGENCY_DEC = 6 //Reverse agency (duedate still in order)
    const DEFAULT = 99 //Unknown Criteria; Kept Just in case

    // console.log("Current Option:", renderOption)
    // renderOption = BY_EARLIEST_DUE
    switch(renderOption){
      case BY_EARLIEST_DUE: //By Earliest Due
      fboProxy.sort(function(p1, p2){
        //[mm,dd,yy]
        var due1, due2
        var duenum1 = 0
        var duenum2 = 0
        if (p1.fbo.respDate){
          mm = p1.fbo.respDate.slice(0,2)
          dd = p1.fbo.respDate.slice(2,4)
          yy = p1.fbo.respDate.slice(4,6)
          due1 = [parseInt(mm), parseInt(dd), parseInt(yy)]
          duenum1 = ((-1 + due1[0]) * 30) + due1[1]+ (1000 * due1[2])
        }
        else{due1 = "No Date", duenum1 = 99999}
        if (p2.fbo.respDate){
          mm = p2.fbo.respDate.slice(0,2)
          dd = p2.fbo.respDate.slice(2,4)
          yy = p2.fbo.respDate.slice(4,6)
          due2 = [parseInt(mm), parseInt(dd), parseInt(yy)]
          duenum2 = ((-1 + due2[0]) * 30) + due2[1] + (1000 * due2[2])
        }
        else{due2 = "No Date", duenum2 = 99999}
        // console.log("Proxy 1:", duenum1, "\nProxy 2:",duenum2,"Sum:", duenum1 - duenum2)
        return duenum1 - duenum2
      });
      break;
      case BY_LATEST_DUE:
      fboProxy.sort(function(p1, p2){
        //[mm,dd,yy]
        var due1, due2
        var duenum1 = 0
        var duenum2 = 0
        if (p1.fbo.respDate){
          mm = p1.fbo.respDate.slice(0,2)
          dd = p1.fbo.respDate.slice(2,4)
          yy = p1.fbo.respDate.slice(4,6)
          due1 = [parseInt(mm), parseInt(dd), parseInt(yy)]
          duenum1 = ((-1 + due1[0]) * 30) + due1[1]+ (1000 * due1[2])
        }
        else{due1 = "No Date", duenum1 = 99999}
        if (p2.fbo.respDate){
          mm = p2.fbo.respDate.slice(0,2)
          dd = p2.fbo.respDate.slice(2,4)
          yy = p2.fbo.respDate.slice(4,6)
          due2 = [parseInt(mm), parseInt(dd), parseInt(yy)]
          duenum2 = ((-1 + due2[0]) * 30) + due2[1] + (1000 * due2[2])
        }
        else{due2 = "No Date", duenum2 = 99999}
        // console.log("Proxy 1:", duenum1, "\nProxy 2:",duenum2,"Sum:", duenum1 - duenum2)
        return duenum1 - duenum2
      });
      fboProxy.reverse()
      break;
     // case BY_DATE_POSTED: //On Hold until I figure out how to set this one up
      case BY_ALPHA_ASC:
      fboProxy.sort(function(p1, p2){

        var prox1 = p1.fbo.subject.toUpperCase(), prox2 = p2.fbo.subject.toUpperCase()
        prox1bool = isNaN(parseInt(prox1.slice(0,2)))
        prox2bool = isNaN(parseInt(prox2.slice(0,2)))

        if (!prox1bool && !prox2bool){ // If both are numbers
          prox1num = parseInt(prox1.slice(0,2))
          prox2num = parseInt(prox2.slice(0,2))

          if (prox1num > prox2num){
            return 1
          }
          else if (prox2num < prox1num){
            return -1
          }
        }
        else if (prox1bool && !prox2bool){ //if proxy 2 is number
          return 1
        }
        else if (!prox1bool && prox2bool){ //if prox 1 is number
          return -1
        }
        return prox1.localeCompare(prox2) //If neither are numbers or first 2 numbers are identical
      });
      break;
      case BY_ALPHA_DEC:
      fboProxy.sort(function(p1, p2){
        var prox1 = p1.fbo.subject.toUpperCase(), prox2 = p2.fbo.subject.toUpperCase()
        prox1bool = isNaN(parseInt(prox1.slice(0,2)))
        prox2bool = isNaN(parseInt(prox2.slice(0,2)))

        if (!prox1bool && !prox2bool){ // If both are numbers
          prox1num = parseInt(prox1.slice(0,2))
          prox2num = parseInt(prox2.slice(0,2))

          if (prox1num > prox2num){
            return 1
          }
          else if (prox2num < prox1num){
            return -1
          }
        }
        else if (prox1bool && !prox2bool){ //if proxy 2 is number
          return 1
        }
        else if (!prox1bool && prox2bool){ //if prox 1 is number
          return -1
        }
        return prox1.localeCompare(prox2) //If neither are numbers or first 2 numbers are identical
      });
      fboProxy.reverse();
      break;
      case BY_AGENCY_ASC:
      fboProxy.sort(function(p1, p2){
        prox1 = p1.fbo.agency
        prox2 = p2.fbo.agency

        if (prox1.localeCompare(prox2) == 0){
          var due1, due2
          var duenum1 = 0
          var duenum2 = 0
          if (p1.fbo.respDate){
            mm = p1.fbo.respDate.slice(0,2)
            dd = p1.fbo.respDate.slice(2,4)
            yy = p1.fbo.respDate.slice(4,6)
            due1 = [parseInt(mm), parseInt(dd), parseInt(yy)]
            duenum1 = ((-1 + due1[0]) * 30) + due1[1]+ (1000 * due1[2])
          }
          else{due1 = "No Date", duenum1 = 99999}
          if (p2.fbo.respDate){
            mm = p2.fbo.respDate.slice(0,2)
            dd = p2.fbo.respDate.slice(2,4)
            yy = p2.fbo.respDate.slice(4,6)
            due2 = [parseInt(mm), parseInt(dd), parseInt(yy)]
            duenum2 = ((-1 + due2[0]) * 30) + due2[1] + (1000 * due2[2])
          }
          else{due2 = "No Date", duenum2 = 99999}
          return duenum1 - duenum2
        }
        else{
          return prox1.localeCompare(prox2)
        }
      });
      break;
      case BY_AGENCY_DEC:
      fboProxy.sort(function(p1, p2){
        prox1 = p1.fbo.agency
        prox2 = p2.fbo.agency

        if (prox1.localeCompare(prox2) == 0){
          var due1, due2
          var duenum1 = 0
          var duenum2 = 0
          if (p1.fbo.respDate){
            mm = p1.fbo.respDate.slice(0,2)
            dd = p1.fbo.respDate.slice(2,4)
            yy = p1.fbo.respDate.slice(4,6)
            due1 = [parseInt(mm), parseInt(dd), parseInt(yy)]
            duenum1 = ((-1 + due1[0]) * 30) + due1[1]+ (1000 * due1[2])
          }
          else{due1 = "No Date", duenum1 = 99999}
          if (p2.fbo.respDate){
            mm = p2.fbo.respDate.slice(0,2)
            dd = p2.fbo.respDate.slice(2,4)
            yy = p2.fbo.respDate.slice(4,6)
            due2 = [parseInt(mm), parseInt(dd), parseInt(yy)]
            duenum2 = ((-1 + due2[0]) * 30) + due2[1] + (1000 * due2[2])
          }
          else{due2 = "No Date", duenum2 = 99999}
          return duenum2 - duenum1
        }
        else{
          return prox1.localeCompare(prox2)
        }
      });

      fboProxy.reverse()
      break;
      default:
      fboProxy.sort(function(proxy1, proxy2){
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
    }


  }

  var searchFilterName = null

  //Sorts thru all existing data and organizes them
  function parseFbos(){}

  function renderFbos() {
    var fboHtml = ''
    var pipelineHtml = ''
    fboVote = []
    // console.log(company.fboProxies[0])
    var updateNeeded
    var toDeleteIds = []
    var logCount = 0
    var noProxies = 0
    function parseProxy(proxy, index) {
      var dueDate = ''
      var due = 'No Due Date'
      // console.log(proxy.fbo)
      if (!proxy.fbo) {
        noProxies++
      } else {
        if (proxy.fbo.respDate) {
          var todayarray = [], duearray = []
          var today = getToday()
          today = today.slice(5,7)+"/"+today.slice(8,10)+"/"+today.slice(2,4)
          todayarray = [today.slice(0,2), today.slice(3,5), today.slice(6,8)]

          due = proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)
          duearray = [due.slice(0,2), due.slice(3,5), due.slice(6,8)]

          var date2 = new Date(today);
          var date1 = new Date(due);
          var expired = false

          if (duearray[2] < todayarray[2]) {
            expired = true
          }
          else if (duearray[2] > todayarray[2]){
            expired = false
          }
          else{
            if(duearray[0] < todayarray[0]){
              expired = true
            }
            else if (duearray[0] > todayarray[0]){
              expired = false
            }
            else{
              if (duearray[1] < todayarray[1]){
                expired = true
              }
              else{
                expired = false
              }
            }
          }

          var timeDiff = (date1.getTime() - date2.getTime());
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
        // var voteHtml = ''
        // var comments = ''
        // var voteScore = proxy.voteYes.length - proxy.voteNo.length
        // if (voteScore < 0) {
        //   voteHtml = '<div id="vote-circle-'+i+'" class="fbo-item-points" onclick="showVotes('+i+')"><p style="color: red;">'+voteScore+'</p></div>'
        // } else if (voteScore > 0) {
        //   voteHtml = '<div id="vote-circle-'+i+'" class="fbo-item-points" onclick="showVotes('+i+')"><p style="color: green;">+'+voteScore+'</p></div>'
        // } else if (voteScore == 0 && ((proxy.voteYes.length + proxy.voteNo.length) > 0)) {
        //   voteHtml = '<div id="vote-circle-'+i+'" class="fbo-item-points" onclick="showVotes('+i+')"><p style="color: black;">+'+voteScore+'</p></div>'
        // } else {
        //   voteHtml = '<div id="vote-circle-'+i+'" class="fbo-item-points inactive" onclick="showVotes('+i+')"><p style="color: green;">+'+voteScore+'</p></div>'
        // }
        // voteHtml = voteHtml + '<div id="vote-circle-dropdown-'+i+'" class="fbo-item-points-dropdown inactive">'
        // for (i2 = 0; i2 < proxy.voteYes.length; i2++) {
        //   var vote = proxy.voteYes[i2]
        //   var voteString = ''
        //   if (vote.comment) {
        //     voteString = ' - "'+vote.comment+'"'
        //   }
        //   comments = comments + '<p class="comment yes-comment"><img class="comment-icon" src="./img/thumbsup.png" alt=""><span style="font-weight: bold;">' + vote.name + '</span>' + voteString + '</p>'
        //   voteHtml = voteHtml + '<div class="fbo-item-points-dropdown-item" style="color: green;">' + proxy.voteYes[i2].name + ': Yes</div>'
        // }
        // for (i2 = 0; i2 < proxy.voteNo.length; i2++) {
        //   var vote = proxy.voteNo[i2]
        //   var voteString = ''
        //   if (vote.comment) {
        //     voteString = ' - "'+vote.comment+'"'
        //   }
        //   comments = comments + '<p class="comment no-comment"><img class="comment-icon" src="./img/thumbsdown.png" alt=""><span style="font-weight: bold;">' + vote.name + '</span>' + voteString + '</p>'
        //   voteHtml = voteHtml + '<div class="fbo-item-points-dropdown-item" style="color: red;">' + proxy.voteNo[i2].name + '</div>'
        // }
        // if (comments.length < 1) {
        //   comments = '<p style="color: gray;">Comments</p>'
        // }
        // voteHtml = voteHtml + '</div>'
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
        var commentsCount = proxy.voteYes.length + proxy.voteNo.length
        var votesYesCount = proxy.voteYes.length
        var votesNoCount = proxy.voteNo.length
        if (searchFilterName && activeTab == 2 && proxy.originSearch !== searchFilterName) {
          expired = true
        }
        if (proxy.voteYes.length < 1 && vote !== 1) {
          // if (timeToDue < -14) {
          //   expired = true
          //   updateNeeded = true
          // }
          if (!expired) {
            fboHtml = fboHtml + '<div class="fbo-item-wrapper">'+
            '<div class="fbo-item-wrapper-inner">'+
            '<div class="fbo-item" onclick="goToFbo(' + index + ', 0)">'+
            // '<div class="fbo-item-origin">'+proxy.originSearch+'</div>'+
            '<div class="fbo-item-avatar">'+
            '<img class="fbo-item-avatar-img" src="'+imgString+'" alt="">'+
            '</div>'+
            '<div class="fbo-item-body">'+
            '<div class="fbo-item-title">'+
            '<p class="fbo-item-title-text">'+proxy.fbo.subject+'</p>'+
            '</div>'+
            '<div class="fbo-item-icons">'+
            '<div class="fbo-item-icon-item"><div class="fbo-item-icon-item-inner" style="width: 40px;"><img class="fbo-item-icon-img" src="./img/comment.png" alt="">'+commentsCount+'</div></div>'+
            '<div class="fbo-item-icon-item"><div class="fbo-item-icon-item-inner" style="width: 36px;"><img class="fbo-item-icon-img" src="./img/thumbsup.png" alt="">'+votesYesCount+'</div></div>'+
            '<div class="fbo-item-icon-item"><div class="fbo-item-icon-item-inner" style="width: 36px;"><img class="fbo-item-icon-img" src="./img/thumbsdown.png" alt="">'+votesNoCount+'</div></div>'+
            '<div class="fbo-item-icon-date"><div class="fbo-item-icon-item-inner" style="width: 70px;"><img class="fbo-item-icon-img" src="./img/calendar.png" alt="">'+due+'</div></div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="fbo-item-slide">'+
            '<div class="fbo-item-slide-half" style="background: rgba(60,85,136,1);">'+
            '<img class="fbo-item-slide-img icon" src="./img/comment.png" alt="">'+
            '</div>'+
            '<div class="fbo-item-slide-half">'+
            '<img class="fbo-item-slide-img icon" src="./img/forward2.png" alt="">'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'
          }
        } else if (proxy.voteYes.length > 0 && vote !== 1) {
          // if (timeToDue < -60) {
          //   expired = true
          //   updateNeeded = true
          // }
          pipelineHtml = pipelineHtml +
          '<div class="fbo-item-wrapper">'+
          '<div class="fbo-item-wrapper-inner">'+
          '<div class="fbo-item" onclick="goToFbo(' + index + ', 1)">'+
          // '<div class="fbo-item-origin">'+proxy.originSearch+'</div>'+
          '<div class="fbo-item-avatar">'+
          '<img class="fbo-item-avatar-img" src="'+imgString+'" alt="">'+
          '</div>'+
          '<div class="fbo-item-body">'+
          '<div class="fbo-item-title">'+
          '<p class="fbo-item-title-text">'+proxy.fbo.subject+'</p>'+
          '</div>'+
          '<div class="fbo-item-icons">'+
          '<div class="fbo-item-icon-item"><div class="fbo-item-icon-item-inner" style="width: 40px;"><img class="fbo-item-icon-img" src="./img/comment.png" alt="">'+commentsCount+'</div></div>'+
          '<div class="fbo-item-icon-item"><div class="fbo-item-icon-item-inner" style="width: 36px;"><img class="fbo-item-icon-img" src="./img/thumbsup.png" alt="">'+votesYesCount+'</div></div>'+
          '<div class="fbo-item-icon-item"><div class="fbo-item-icon-item-inner" style="width: 36px;"><img class="fbo-item-icon-img" src="./img/thumbsdown.png" alt="">'+votesNoCount+'</div></div>'+
          '<div class="fbo-item-icon-date"><div class="fbo-item-icon-item-inner" style="width: 70px;"><img class="fbo-item-icon-img" src="./img/calendar.png" alt="">'+due+'</div></div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '<div class="fbo-item-slide">'+
          '<div class="fbo-item-slide-half" style="background: rgba(60,85,136,1);">'+
          '<img class="fbo-item-slide-img icon" src="./img/comment.png" alt="">'+
          '</div>'+
          '<div class="fbo-item-slide-half">'+
          '<img class="fbo-item-slide-img icon" src="./img/forward2.png" alt="">'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'

        }
        // if (expired) {
        //   toDeleteIds.push(company.fboProxies[i]._id)
        //   company.fboProxies.splice(i,1)
        //   i = i - 1
        // }
      }
    }
    // sortFboRenders(fbosIn, 0)
    for (var i = 0; i < fbosIn.length; i++) {
      parseProxy(fbosIn[i], i)
    }
    // sortFboRenders(fboPipeline, 1)
    for (var i = 0; i < fboPipeline.length; i++) {
      parseProxy(fboPipeline[i], i)
    }
    console.log(noProxies + ' busted proxies')
    var fboHTMLContent = document.getElementById("fbo-items")
    var pipelineHTMLContent = document.getElementById("pipeline-items")
    // if (updateNeeded) {
    //   for (i = 0; i < toDeleteIds.length; i++) {
    //     var xhttp = new XMLHttpRequest();
    //     xhttp.onload = function() {
    //       if (xhttp.readyState == 4 && xhttp.status == 200) {
    //         // var res = JSON.parse(xhttp.responseText);
    //         console.log('deleted one')
    //       }
    //     }
    //     xhttp.open("DELETE", apiUrl+'/fbocompanyproxy/' + toDeleteIds[i], true);
    //     xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    //     xhttp.send();
    //   }
    // }
    fboHTMLContent.innerHTML = fboHtml;
    pipelineHTMLContent.innerHTML = pipelineHtml;
    // for (i = 0; i < company.fboProxies.length; i++) {
    //   checkVote(company.fboProxies[i], i)
    // }

  }

  function addPoints(points) {
    var user = null
    for (i = 0; i < huntingPartyData.users.length; i++) {
      if (huntingPartyData.users[i].userId == currentUser._id) {
        if (huntingPartyData.users[i].score) {
          delete huntingPartyData.users[i].score
        }
        user = huntingPartyData.users[i]
        huntingPartyData.users[i].points = huntingPartyData.users[i].points + 50
        break
      }
    }
    if (user) {
      // if (!user.points) {
      //   user.points = 0
      // }
      // var pointsUpdate = {
      //   uid: currentUser._id,
      //   points: points
      // }
      delete huntingPartyData['__v']
      var xhttpHPD = new XMLHttpRequest();
      xhttpHPD.onreadystatechange = function() {
        if (xhttpHPD.readyState == 4 && xhttpHPD.status == 200) {
          huntingPartyData = JSON.parse(xhttpHPD.responseText);
          for (i = 0; i < huntingPartyData.users.length; i++) {
            if (huntingPartyData.users[i].userId == currentUser._id) {
              document.getElementById("sidebar-points-text").innerHTML = huntingPartyData.users[i].points + ' Points'
              break
            }
          }
          console.log('updated your score')
          console.log(huntingPartyData)
        }
      }
      xhttpHPD.open("PUT", apiUrl+"/huntingpartydata/" + huntingPartyData._id, true);
      xhttpHPD.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhttpHPD.send(JSON.stringify(huntingPartyData));
    }
  }

  function parseThroughFboDesc(desc) {
    var separators = [' ', '\n'];
    var outputArray = desc.split(new RegExp(separators.join('|'), 'g'));
    var outputArray2 = []
    var index2 = 0
    var htmlCode = ''
    var htmlClosed = true
    for (i = 0; i < outputArray.length; i++) {
      var newOne = outputArray[i]
      var startIndex = null
      var endIndex = null
      for (i2 = 0; i2 < outputArray[i].length; i2++) {
        if (htmlCode.length > 0) {
          if (outputArray[i][i2] == '>') {
            if (!startIndex) {
              startIndex = 0
            }
            htmlCode = htmlCode + ' ' + outputArray[i].slice(startIndex,i2+1)
            // console.log('CLOSED: ' + htmlCode)
            outputArray2.push(htmlCode)
            index2++
            htmlCode = ''
            htmlClosed = true
            startIndex = i2+1
          }
        } else {
          if (outputArray[i][i2] == '<') {
            htmlClosed = false
            if (i2 > 0) {
              if (!startIndex) {
                startIndex = 0
              }
              if (outputArray[i].slice(startIndex,i2).length > 0) {
                // console.log(outputArray[i].slice(startIndex,i2))
                outputArray2.push('<span onclick="fboDescClick('+index2+',\''+outputArray[i].slice(startIndex,i2)+'\', this)">' + outputArray[i].slice(startIndex,i2) + '</span>')
                index2++
              }
            }
            startIndex = i2
          } else if (startIndex !== null && outputArray[i][i2] == '>') {
            htmlClosed = true
            // console.log('CLOSED: ' + outputArray[i].slice(startIndex,i2+1))
            outputArray2.push(outputArray[i].slice(startIndex,i2+1))
            index2++
            startIndex = i2+1
          }
        }
      }
      if (!startIndex) {
        startIndex = 0
      }
      if (!htmlClosed) {
        if (htmlCode.length < 1) {
          htmlCode = htmlCode + outputArray[i].slice(startIndex)
        } else {
          htmlCode = htmlCode + ' ' + outputArray[i].slice(startIndex)
        }
      } else {
        outputArray2.push('<span onclick="fboDescClick('+index2+',\''+outputArray[i].slice(startIndex)+'\', this)">' + outputArray[i].slice(startIndex) + ' </span>')
        index2++
      }
    }
    // console.log(outputArray2[0])
    // console.log(outputArray2[1])
    // console.log(outputArray2[2])

    return outputArray2
  }

  function openFboDetail(which) {
    if (document.getElementById("fbo-detail-middle-"+which).classList.contains('inactive')) {
      document.getElementById("fbo-detail-middle-"+which).classList.remove('inactive')
      document.getElementById("fbo-detail-middle-item-arrow-"+which).classList.add('rotate')
    } else {
      document.getElementById("fbo-detail-middle-"+which).classList.add('inactive')
      document.getElementById("fbo-detail-middle-item-arrow-"+which).classList.remove('rotate')
    }
  }

  var fboClickOpen = false
  var fboHighlightOpen
  var fboHighlightClose
  var activeFboDesc

  var highlightOn = false
  var grayOn = false

  function turnOnHighlight(gray) {
    if (!gray) {
      if (!highlightOn) {
        highlightOn = true
        grayOn = false
        document.getElementById("highlight-button-1").classList.add('highlight-button-active')
        document.getElementById("highlight-button-2").classList.remove('highlight-button-active')
        document.getElementById("highlight-tutorial").classList.remove('inactive')
      } else {
        highlightOn = false
        grayOn = false
        document.getElementById("highlight-button-1").classList.remove('highlight-button-active')
        document.getElementById("highlight-button-2").classList.remove('highlight-button-active')
        document.getElementById("highlight-tutorial").classList.add('inactive')
      }
    } else {
      if (!grayOn) {
        highlightOn = false
        grayOn = true
        document.getElementById("highlight-button-1").classList.remove('highlight-button-active')
        document.getElementById("highlight-button-2").classList.add('highlight-button-active')
        document.getElementById("highlight-tutorial").classList.remove('inactive')
        fboClickOpen = false
        fboHighlightOpen = null
        fboHighlightClose = null
      } else {
        highlightOn = false
        grayOn = false
        document.getElementById("highlight-button-1").classList.remove('highlight-button-active')
        document.getElementById("highlight-button-2").classList.remove('highlight-button-active')
        document.getElementById("highlight-tutorial").classList.add('inactive')
        fboClickOpen = false
        fboHighlightOpen = null
        fboHighlightClose = null
      }
    }
  }

  function fboDescClick(index, text, elem) {
    if (grayOn || highlightOn) {
      var elemString = elem.toString()
      if (!fboClickOpen) {
        fboHighlightOpen = index
        var fbo
        if (activeTab == 2) {
          fbo = fbosIn[fboIndex]
        } else if (activeTab == 3) {
          fbo = fboPipeline[fboIndex]
        }
        elem.classList.add('fbo-desc-word-start')
        if (highlightOn) {
          elem.classList.add('highlighted')
        } else if (grayOn) {
          elem.classList.add('grayed')
        }
        fboClickOpen = true
      } else {
        if (index < fboHighlightOpen) {
          fboHighlightClose = fboHighlightOpen
          fboHighlightOpen = index
        } else {
          fboHighlightClose = index
        }
        var fbo
        if (activeTab == 2) {
          fbo = fbosIn[fboIndex]
        } else if (activeTab == 3) {
          fbo = fboPipeline[fboIndex]
        } else {
          console.log('tab is messed up - its ' + activeTab)
        }
        if (highlightOn) {
          for (i = fboHighlightOpen; i <= fboHighlightClose; i++) {
            if (activeFboDesc[i].slice(0,50) == '<span class="fbo-desc-word" onclick="fboDescClick(' || activeFboDesc[i].slice(0,21) == '<span class="grayed">') {
              if (activeFboDesc[i].slice(0,21) == '<span class="grayed">') {
                var endPoint = activeFboDesc[i].length - 7
                activeFboDesc[i] = activeFboDesc[i].slice(21, endPoint)
              }
              activeFboDesc[i] = '<span class="highlighted">' + activeFboDesc[i] + '</span>'
            }
          }
        } else if (grayOn) {
          for (i = fboHighlightOpen; i <= fboHighlightClose; i++) {
            if (activeFboDesc[i].slice(0,50) == '<span class="fbo-desc-word" onclick="fboDescClick(' || activeFboDesc[i].slice(0,26) == '<span class="highlighted">') {
              if (activeFboDesc[i].slice(0,26) == '<span class="highlighted">') {
                var endPoint = activeFboDesc[i].length - 7
                activeFboDesc[i] = activeFboDesc[i].slice(26, endPoint)
              }
              activeFboDesc[i] = '<span class="grayed">' + activeFboDesc[i] + '</span>'
            }
          }
          // activeFboDesc[fboHighlightOpen] = '<span class="grayed">' + activeFboDesc[fboHighlightOpen]
        }
        // activeFboDesc[fboHighlightClose] = activeFboDesc[fboHighlightClose] + '</span>'
        var fboDescHTML = ''
        for (i = 0; i < activeFboDesc.length; i++) {
          fboDescHTML = fboDescHTML + activeFboDesc[i]
        }
        fbo.fboDesc = activeFboDesc
        document.getElementById("highlight-tutorial").classList.add('inactive')
        document.getElementById("abstract-text").innerHTML = fboDescHTML;
        document.getElementById("highlight-button-1").classList.remove('highlight-button-active')
        document.getElementById("highlight-button-2").classList.remove('highlight-button-active')
        highlightOn = false
        grayOn = false
        fboClickOpen = false
        fboHighlightOpen = null
        fboHighlightClose = null
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log('saved the proxy')
            fbo = JSON.parse(xhttp.responseText)
            console.log(fbo)
          }
        };
        var url = apiUrl+"/fbocompanyproxy/" + fbo._id;
        xhttp.open("PUT", url, true);
        xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhttp.send(JSON.stringify(fbo));
      }
      // elem.classList.add('bold')
      console.log(elem)
    }
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
    console.log('Loading FBO Details')
    console.log(num)
    fboIndex = num
    setActiveFbo(num, tab)
    document.getElementById("news-block").classList.add('inactive');
    document.getElementById("fbo-view").classList.add('inactive');
    document.getElementById("search-view").classList.add('inactive');
    document.getElementById("pipeline-view").classList.add('inactive');
    document.getElementById("fbo-detail-view").classList.remove('inactive');
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
    document.getElementById("loading").classList.add('inactive')
    document.getElementById("login-view").classList.add('inactive')
  }
  function goToLogin() {
    document.getElementById("register-view").classList.add('inactive')
    document.getElementById("login-view").classList.remove('inactive')
    document.getElementById("company-create-view").classList.add('inactive')
    document.getElementById("company-confirm-view").classList.add('inactive')
    document.getElementById("company-search-view").classList.remove('inactive')
    if (currentUser) {
      logOut()
    }
  }
  function goToCompanyCreate() {
    document.getElementById("login-register").classList.remove('inactive')
    document.getElementById("register-view").classList.add('inactive')
    document.getElementById("main-view").classList.add('inactive')
    document.getElementById("login-view").classList.add('inactive')
    document.getElementById("loading").classList.add('inactive')
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
    document.getElementById("loading-overlay").classList.remove('inactive')
    document.getElementById("loading-overlay-text").innerHTML = 'Loading your company...'

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
        document.getElementById("loading-overlay").classList.add('inactive')
        document.getElementById("loading-overlay-text").innerHTML = ''

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

  function expandAbstract() {
    if (document.getElementById("fbo-detail-top").classList.contains('fbo-detail-top-larger')) {
      document.getElementById("fbo-detail-top").classList.remove('fbo-detail-top-larger')
      document.getElementById("abstract-box").classList.remove('abstract-box-larger')
      document.getElementById("fbo-detail-middle").classList.remove('inactive')
    } else {
      document.getElementById("fbo-detail-top").classList.add('fbo-detail-top-larger')
      document.getElementById("abstract-box").classList.add('abstract-box-larger')
      document.getElementById("fbo-detail-middle").classList.add('inactive')
    }
  }

  function addInterestedVendor() {
    var fbo = fbosIn[fboIndex]
    if (activeTab == 2) {
      fbo = fbosIn[fboIndex]
    } else if (activeTab == 3) {
      fbo = fboPipeline[fboIndex]
    }
    if (!fbo.fbo.interestedVendors) {
      fbo.fbo.interestedVendors = []
    }
    var companyThere = false
    for (i = 0; i < fbo.fbo.interestedVendors.length; i++) {
      if (fbo.fbo.interestedVendors[i].id == company._id) {
        companyThere = true
        break
      }
    }
    if (!companyThere) {
      fbo.fbo.interestedVendors.push({
        name: company.name,
        id: company._id
      })
      var xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log('done???')
          var newFbo = JSON.parse(xhttp.responseText)
          fbo.fbo = newFbo
          var partiesHtml = ''
          var companyAlreadyInterested = false
          document.getElementById("interested-vendors").innerHTML = ''
          if (fbo.fbo.interestedVendors.length < 1) {
            partiesHtml = '<div class="interested-vendor">'+
              'No interested vendors yet'+
            '</div>'
          } else {
            for (i = 0; i < fbo.fbo.interestedVendors.length; i++) {
              if (fbo.fbo.interestedVendors[i].id == company._id) {
                companyAlreadyInterested = true
              }
              partiesHtml = partiesHtml + '<div class="interested-vendor">'+
              fbo.fbo.interestedVendors[i].name+
              '</div>'
            }
          }
          document.getElementById("interested-vendors").innerHTML = partiesHtml
          if (companyAlreadyInterested) {
            document.getElementById("interested-vendor-button").classList.add('inactive')
          }
          if (document.getElementById("fbo-detail-middle-4").classList.contains('inactive')) {
            openFboDetail(4)
          }
        }
      };
      var url = apiUrl+"/fbo/" + fbo.fbo._id;
      xhttp.open("PUT", url, true);
      xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhttp.setRequestHeader('secretcode','SECRET-FUN-TIME-LETS-DO-POSTS');
      xhttp.send(JSON.stringify(fbo.fbo));
    }
  }

  var activeFbo
  function setActiveFbo(index, tab) {
    var proxy
    if (tab == 0) {
      proxy = fbosIn[index]
      document.getElementById("topbar-left").innerHTML = '<div id="topbar-back" onclick="switchTab(2)"><p>‹</p></div>'
      // document.getElementById("topbar-left").innerHTML = '<img id="topbar-back" class="topbar-side-img icon" src="./img/back.png" alt="" onclick="switchTab(2)">'
      document.getElementById("fbo-details-comments").classList.add('inactive')
    } else if (tab == 1) {
      proxy = fboPipeline[index]
      document.getElementById("topbar-left").innerHTML = ''
      document.getElementById("fbo-details-comments").classList.remove('inactive')
    }
    console.log(proxy)
    if (!proxy.fbo.interestedVendors) {
      proxy.fbo.interestedVendors = []
    }
    var partiesHtml = ''
    var companyAlreadyInterested = false
    document.getElementById("interested-vendors").innerHTML = ''
    if (proxy.fbo.interestedVendors.length < 1) {
      partiesHtml = '<div class="interested-vendor">'+
        'No interested vendors yet'+
      '</div>'
    } else {
      for (i = 0; i < proxy.fbo.interestedVendors.length; i++) {
        if (proxy.fbo.interestedVendors[i].id == company._id) {
          companyAlreadyInterested = true
        }
        partiesHtml = partiesHtml + '<div class="interested-vendor">'+
        proxy.fbo.interestedVendors[i].name+
        '</div>'
      }
    }
    document.getElementById("interested-vendors").innerHTML = partiesHtml
    if (companyAlreadyInterested) {
      document.getElementById("interested-vendor-button").classList.add('inactive')
    }
    var dueDateHtml = 'No Due Date'
    if (proxy.fbo.respDate && proxy.fbo.respDate !== 'undefined') {
      dueDateHtml = proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)
    } else {
      dueDateHtml = 'No Due Date'
    }
    // document.getElementById("fbo-details-input").value = ''
    var dataText = '<p><span style="font-weight: bold">Item: </span>'+
    proxy.fbo.type +
    '<p><span style="font-weight: bold">Solicitation Number: </span>'+
    proxy.fbo.solnbr +
    '</p><p><span style="font-weight: bold">Agency: </span>'+
    proxy.fbo.agency+
    '</p><p><span style="font-weight: bold">NAICS: </span>'+
    proxy.fbo.classCod+
    '</p><p><span style="font-weight: bold">Office: </span>'+
    proxy.fbo.office+
    '</p><p><span style="font-weight: bold">Location: </span>'+
    proxy.fbo.location+
    '</p><p><span style="font-weight: bold">Setaside: </span>'+
    proxy.fbo.setaside+
    '</p><p><span style="font-weight: bold">Due Date: </span>'+
    dueDateHtml+
    '</p><p><span style="font-weight: bold">Contact: </span>'+
    proxy.fbo.contact+
    '</p><p style="font-weight: bold"><a href="'+proxy.fbo.url+'">More Info</a></p>'
    document.getElementById("topbar-center-text").innerHTML = '<p class="topbar-center-text-2">'+proxy.fbo.subject+'</p>';
    var fboDescHTML = ''
    var outputArray2 = proxy.fboDesc
    activeFboDesc = outputArray2
    for (i = 0; i < outputArray2.length; i++) {
      if (outputArray2[i].slice(0,27) == '<span onclick="fboDescClick') {
        var proxyCopy = outputArray2[i]
        // if (i == 0) {
        //   proxy.fboDesc[i] = proxyCopy.slice(0,6) + 'class="fbo-desc-word fbo-desc-word-start" ' + proxyCopy.slice(6)
        // } else {
        // }
        outputArray2[i] = proxyCopy.slice(0,5) + ' class="fbo-desc-word"' + proxyCopy.slice(5)
      }
      fboDescHTML = fboDescHTML + outputArray2[i]
    }
    document.getElementById("abstract-text").innerHTML = fboDescHTML;
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
      document.getElementById("fbo-details-date").innerHTML = due
    } else {
      dueDate = "<p'>No Due Date</p>"
      document.getElementById("fbo-detail-left-details-date").innerHTML = 'No Due Date'
    }
    // document.getElementById("fbo-details-comments").innerHTML = proxy.voteYes.length + proxy.voteNo.length + ' Comments'
    document.getElementById("fbo-details-likes").innerHTML = proxy.voteYes.length
    document.getElementById("fbo-details-dislikes").innerHTML = proxy.voteNo.length

    activeFbo = proxy
    fboIndex = index
    if (!proxy.viewed) {
      proxy.viewed = []
    }
    if (!proxy.viewed.includes(currentUser._id)) {
      proxy.viewed.push(currentUser._id)
      var xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          console.log('marked as read')
          proxy = JSON.parse(xhttp.responseText)
          checkProxiesViewed()
        }
      };
      var url = apiUrl+"/fbocompanyproxy/" + proxy._id;
      xhttp.open("PUT", url, true);
      xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhttp.send(JSON.stringify(proxy));
    }
    renderChart()
    updateComments(proxy)
    checkVote(proxy, index)
  }

  var fbosInUnread = 0
  var pipelineUnread = 0

  function checkProxiesViewed() {
    fbosInUnread = 0
    pipelineUnread = 0
    for (i = 0; i < fbosIn.length; i++) {
      if (fbosIn[i].viewed) {
        if (!fbosIn[i].viewed.includes(currentUser._id)) {
          fbosInUnread++
        }
      } else {
        fbosInUnread++
      }
    }
    for (i = 0; i < fboPipeline.length; i++) {
      if (fboPipeline[i].viewed) {
        if (!fboPipeline[i].viewed.includes(currentUser._id)) {
          pipelineUnread++
        }
      } else {
        pipelineUnread++
      }
    }
    document.getElementById("sidebar-item-unread-popup-fbosin").innerHTML = fbosInUnread
    document.getElementById("sidebar-item-unread-popup-pipeline").innerHTML = pipelineUnread

  }

  function switchFboDetailTab(which) {
    if (which == 0) {
      document.getElementById("fbo-detail-topbar-arrow-left").classList.remove('inactive');
      document.getElementById("fbo-detail-info").classList.remove('inactive');
      document.getElementById("fbo-detail-topbar-arrow-right").classList.add('inactive');
      document.getElementById("fbo-detail-data").classList.add('inactive');
      document.getElementById("fbo-detail-topbar-left").classList.add('topbar-half-active');
      document.getElementById("fbo-detail-topbar-right").classList.remove('topbar-half-active');
    } else if (which == 1) {
      document.getElementById("fbo-detail-topbar-arrow-left").classList.add('inactive');
      document.getElementById("fbo-detail-info").classList.add('inactive');
      document.getElementById("fbo-detail-topbar-arrow-right").classList.remove('inactive');
      document.getElementById("fbo-detail-data").classList.remove('inactive');
      document.getElementById("fbo-detail-topbar-left").classList.remove('topbar-half-active');
      document.getElementById("fbo-detail-topbar-right").classList.add('topbar-half-active');
    }
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
    } else if (fboVote[index] == 2) {
    } else {
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
      fboIndex = fboIndex+1
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
    if (activeTab == 2) {
      fbo = fbosIn[index]
    } else if (activeTab == 3) {
      fbo = fboPipeline[index]
    }
    var vote = {
      id: currentUser._id,
      name: currentUser.firstName + ' ' + currentUser.lastName,
      avatar: currentUser.avatar,
      position: '',
      comment: '',
      date: ''
    }
    var now = new Date()
    now = now.getTime()
    vote.date = now
    for (var i = 0; i < currentUser.companyUserProxies.length; i++) {
      if (currentUser.companyUserProxies[i].company) {
        if (currentUser.companyUserProxies[i].company._id == fbo.company._id) {
          vote.position = currentUser.companyUserProxies[i].position
          break
        }
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
      vote.comment = document.getElementById("fbo-details-input").value
      fbo.voteYes.push(vote)
    } else if (fboVote[index] !== 1 && !yes) {
      for (var i = 0; i < fbo.voteYes.length; i++) {
        if (fbo.voteYes[i].id == currentUser._id) {
          fbo.voteYes.splice(i,1)
        }
      }
      voteChanged = true
      fboVote[index] = 1
      vote.comment = document.getElementById("fbo-details-input").value
      fbo.voteNo.push(vote)
    }
    console.log(vote)
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
        document.getElementById("fbo-details-input").value = ''
        generateNewsItem(newsItem)
        if (adCounter >= 3) {
          showAd()
        } else {
          adCounter++
          closePopups(true)
          switchTab(activeTab)

        }
        addPoints(50)
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
        console.log(newFbo)
        fbo.voteYes = newFbo.voteYes
        fbo.voteNo = newFbo.voteNo
        var chatString = ''
        var allComments = []
        for (i = 0; i < newFbo.voteYes.length; i++) {
          var vote = newFbo.voteYes[i]
          vote.vote = 'yes'
          allComments.push(vote)
        }
        for (i = 0; i < newFbo.voteNo.length; i++) {
          var vote = newFbo.voteNo[i]
          vote.vote = 'no'
          allComments.push(vote)
        }
        for (i = 0; i < newFbo.comments.length; i++) {
          var vote = newFbo.comments[i]
          allComments.push(vote)
        }
        allComments.sort(function(vote1, vote2){
          return vote1.date - vote2.date
        });
        for (i = 0; i < allComments.length; i++) {
          var vote = allComments[i]
          var voteString = 'No Text '
          if (vote.comment) {
            voteString = vote.comment
          }
          var avatar = './img/user.png'
          if (vote.avatar) {
            avatar = vote.avatar
          }
          var imgString = ''
          if (vote.vote == 'yes') {
            imgString = '<img class="icon" src="./img/like-light.png" alt="">'
          } else if (vote.vote == 'no') {
            imgString = '<img class="icon" src="./img/dislike-light.png" alt="">'
          }
          if (vote.id == currentUser._id) {
            var newString = '<div class="comment">'+
            '<div class="comment-right">'+
              '<div class="comment-bubble-yours">'+
              // '<img class="comment-avatar-vote" src="./img/thumbsup.png" alt="">'+
              // '<div class="comment-title" style="margin: none!important">'+
              //   '<p class="comment-name">'+vote.name+'</p>'+
              //   '<p class="comment-time">99 mins</p>'+
              // '</div>'+
                '<p class="comment-text">'+imgString+voteString+'</p>'+
              '</div>'+
            '</div>'+
            '<div class="comment-left">'+
              '<div class="comment-avatar-padding">'+
              '</div>'+
              '<div class="comment-avatar">'+
              '<img class="comment-avatar-img" src="'+avatar+'" alt="">'+
              '</div>'+
            '</div>'+
            '</div>'

            chatString = chatString + newString
          } else {
            var newString = '<div class="comment">'+
            '<div class="comment-left">'+
            '<div class="comment-avatar-padding">'+
            '</div>'+
            '<div class="comment-avatar">'+
            '<img class="comment-avatar-img" src="'+avatar+'" alt="">'+
            '</div>'+
            '</div>'+
            '<div class="comment-right">'+
            '<div class="comment-bubble">'+
            // '<img class="comment-avatar-vote" src="./img/thumbsup.png" alt="">'+
            // '<div class="comment-title" style="margin: none!important">'+
            //   '<p class="comment-name">'+vote.name+'</p>'+
            //   '<p class="comment-time">99 mins</p>'+
            // '</div>'+
            '<p class="comment-text">'+imgString+voteString+'</p>'+
            '</div>'+
            '</div>'+
            '</div>'

            chatString = chatString + newString
          }
        }
        if (allComments.length < 1) {
          var newString = '<div class="comment">'+
          '<div class="comment-left">'+
          '</div>'+
          '<div class="comment-right">'+
          '<div class="" style="width: 100%; float: left; margin: 0px!important; padding: 0px!important">'+
          '<div class="comment-text" style="padding: none!important">No Comments Yet</div>'+
          '</div>'+
          '</div>'+
          '</div>'
          chatString = chatString + newString
        }
        document.getElementById("fbo-details-comments").innerHTML = ''
        document.getElementById("fbo-details-comments").innerHTML = chatString;
        console.log('comments updated')
      }
    };
    xhttp2.open("GET", apiUrl+"/fbocompanyproxy/" + fbo._id, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.send();
  }

  function sendComment() {
    var comment = document.getElementById("new-comment-input").value
    if (comment.length > 0) {
      var vote = {
        id: currentUser._id,
        name: currentUser.firstName + ' ' + currentUser.lastName,
        avatar: currentUser.avatar,
        position: '',
        comment: comment,
        date: ''
      }
      var fbo = fbosIn[fboIndex]
      if (activeTab == 2) {
        fbo = fbosIn[fboIndex]
      } else if (activeTab == 3) {
        fbo = fboPipeline[fboIndex]
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
      fbo.comments.push(vote)
      var xhttp3 = new XMLHttpRequest();
      xhttp3.onload = function() {
        if (xhttp3.readyState == 4 && xhttp3.status == 200) {
          // Typical action to be performed when the document is ready:
          var newFbo = JSON.parse(xhttp3.responseText)
          console.log(newFbo.comments)
          console.log('sent the comment i think')
          if (activeTab == 2) {
            fbosIn[fboIndex] = newFbo
          } else if (activeTab == 3) {
            fboPipeline[fboIndex] = newFbo
          }
          updateComments(fbo)
          document.getElementById("new-comment-input").value = ''
        } else {
          console.log('it didnt send i dont know why')
        }
      };

      var url = apiUrl+"/fbocompanyproxy/" + fbo._id;

      xhttp3.open("PUT", url, true);
      xhttp3.setRequestHeader('Content-type','application/json; charset=utf-8');
      var savedId = fbo._id
      var toSend = fbo
      delete toSend['_id'];
      console.log(toSend)
      xhttp3.send(JSON.stringify(toSend));
      toSend['_id'] = savedId
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
    document.getElementById("loading-details").innerHTML = 'Getting full user data...'
    var xhttp = new XMLHttpRequest();
    // xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        // Typical action to be performed when the document is ready:
        currentUser = JSON.parse(xhttp.responseText);
        // document.getElementById("user-name").innerHTML = currentUser.firstName + ' ' + currentUser.lastName;
        var avatar = currentUser.avatar
        if (avatar == '../../assets/img/user.png') {
          avatar = './img/user.png'
        }
        document.getElementById("profile-circle-inside").innerHTML = '<img class="circle-img" src="'+avatar+'" alt="">';
        document.getElementById("loading-details").innerHTML = 'Getting full company data...'
        var xhttp2 = new XMLHttpRequest();
        // xhttp.setRequestHeader("Content-type", "application/json");
        xhttp2.onreadystatechange = function() {
          if (xhttp2.readyState == 4 && xhttp2.status == 200) {
            // Typical action to be performed when the document is ready:
            company = JSON.parse(xhttp2.responseText);
            document.getElementById("company-info").innerHTML = '<div class="company-info-img-wrapper"><div class="second-border" style="border: none;"><img class="company-info-img" src="'+company.avatar+'"></div></div><div style="height: 25vh;"></div><p class="company-info-text">'+company.name+'</p>'
            // var xobj = new XMLHttpRequest();
            // xobj.overrideMimeType("application/json");
            // xobj.open('GET', 'json/agencylogos.json', true); // Replace 'my_data' with the path to your file
            // xobj.onreadystatechange = function () {
            // if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            // agencyLogos = JSON.parse(xobj.responseText);
            var xhttp3 = new XMLHttpRequest();
            // xhttp3.setRequestHeader("Content-type", "application/json");
            document.getElementById("loading-details").innerHTML = 'Getting full search terms...'
            xhttp3.onreadystatechange = function() {
              if (xhttp3.readyState == 4 && xhttp3.status == 200) {
                searchTerms = JSON.parse(xhttp3.responseText);
                emptySearchTerms = JSON.parse(xhttp3.responseText);
                var proxyRequest = {
                  startIndex: 0,
                  which: 2
                }
                document.getElementById("loading-details").innerHTML = 'Getting fbo proxies...'
                var xhttp3b = new XMLHttpRequest();
                xhttp3b.onreadystatechange = function() {
                  if (xhttp3b.readyState == 4 && xhttp3b.status == 200) {
                    console.log('got the thing')
                    proxiesRes = JSON.parse(xhttp3b.responseText);
                    console.log(proxiesRes)
                    fbosIn = proxiesRes.fbosIn
                    fboPipeline = proxiesRes.fboPipeline
                    fbosInMax = proxiesRes.fbosInMax
                    fboPipelineMax = proxiesRes.fboPipelineMax
                    checkProxiesViewed()
                    if (!fbosIn) {
                      fbosIn = []
                    } else if (!fboPipeline) {
                      fboPipeline = []
                    }
                    var xhttp4 = new XMLHttpRequest();
                    // xhttp4.setRequestHeader("Content-type", "application/json");
                    document.getElementById("loading-details").innerHTML = 'Getting huntingpartydata...'
                    xhttp4.onreadystatechange = function() {
                      if (xhttp4.readyState == 4 && xhttp4.status == 200) {
                        if (xhttp4.responseText === 'false') {
                          document.getElementById("loading-details").innerHTML = 'No huntingpartydata found, creating one...'
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
                            tosRead: 0,
                            points: 0
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
                              document.getElementById("loading-details").innerHTML = 'Huntingpartydata created, finishing...'

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
                          document.getElementById("loading-details").innerHTML = 'Got all data, finishing...'
                          huntingPartyData = JSON.parse(xhttp4.responseText);
                          console.log(huntingPartyData)
                          var userInList = false
                          if (!huntingPartyData.users) {
                            huntingPartyData.users = []
                          }
                          var doTheUpdateAnyway = false
                          for (i = 0; i < huntingPartyData.users.length; i++) {
                            console.log(huntingPartyData.users[i])
                            if (huntingPartyData.users[i].points == undefined) {
                              huntingPartyData.users[i].points = 0
                              console.log('no points!');
                              doTheUpdateAnyway = true
                            }
                            if (huntingPartyData.users[i].userId == currentUser._id) {
                              userInList = true
                              if (huntingPartyData.users[i].points !== undefined) {
                                console.log('YOUR POINTS: ' + huntingPartyData.users[i].points)
                                document.getElementById("sidebar-points-text").innerHTML = huntingPartyData.users[i].points + ' Points'
                              }
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
                          if (device !== undefined || !userInList || doTheUpdateAnyway) {
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
                                  tosRead: 0,
                                  points: 0
                                })
                                tosRead = 0
                              }
                              var xhttpHPD = new XMLHttpRequest();
                              xhttpHPD.onreadystatechange = function() {
                                if (xhttpHPD.readyState == 4 && xhttpHPD.status == 200) {
                                  huntingPartyData = JSON.parse(xhttpHPD.responseText);
                                  if (tosRead < 1) {
                                    document.getElementById("loading").classList.add('inactive');
                                    document.getElementById("tos-popup").classList.remove('inactive');
                                    // document.getElementById("login-register").classList.remove('inactive');
                                  } else {
                                    console.log('updated HPD')
                                    document.getElementById("loading-details").innerHTML = 'Done'
                                    startMainApp()
                                  }
                                }
                              }
                              xhttpHPD.open("PUT", apiUrl+"/huntingpartydata/" + huntingPartyData._id, true);
                              xhttpHPD.setRequestHeader('Content-type','application/json; charset=utf-8');
                              xhttpHPD.send(JSON.stringify(huntingPartyData));
                            }
                          } else {
                            if (tosRead < 1) {
                              document.getElementById("loading").classList.add('inactive');
                              document.getElementById("tos-popup").classList.remove('inactive');
                              // document.getElementById("login-register").classList.remove('inactive');
                            } else {
                              document.getElementById("loading-details").innerHTML = 'Done'
                              startMainApp()
                            }
                          }
                        }
                      }
                    }
                    xhttp4.open("GET", apiUrl+"/huntingpartydata/company/" + company._id, true);
                    xhttp4.send();
                  }
                }
                xhttp3b.open("PUT", apiUrl+"/company/" + company._id + "/somefbos/", true);
                xhttp3b.setRequestHeader('Content-type','application/json; charset=utf-8');
                xhttp3b.send(JSON.stringify(proxyRequest));
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
          xhttp2.open("GET", apiUrl+"/company/" + companyId + "/light/", true);
          xhttp2.send();
        } else {
          goToCompanyCreate()
          // document.getElementById("loading-details").innerHTML = "Your profile doesn't have any companies so I'm going to stop the login right now! Eventually I'll get something for this"
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
        // console.log(huntingPartyData.news[i])
        // console.log(huntingPartyData.news[i].body)
        if (huntingPartyData.news[i].type) {
          if (huntingPartyData.news[i].type == 'vote') {
            img = 'contact'
          }
        }

        //Might not be the cleanest solution but it works dangit
        var fboI = -1
        for (f = 0; f < fboPipeline.length; f++){
          if (huntingPartyData.news[i].body.includes(fboPipeline[f].fbo.subject)){
            // console.log(
            //   "The Fbo Subject: " + fbos[f].fbo.subject
            //   + " is included in "+ huntingPartyData.news[i].body)
            fboI = f
            // console.log("F: " +f+ ", FboI: " + fboI)
          }
        }
        if (fboI == -1){
          // console.log("Pipeline FBO for '"+ huntingPartyData.news[i].body +"'was not found.")
          newsHtml = newsHtml + '<div class="news-item">'
        }
        else{
          newsHtml = newsHtml + '<div class="news-item" onclick="goToFbo('+ fboI +', 1)">'
        }
        newsHtml += '<div class="" style="width: 15%; height: 4vh; float: left; position: relative;">'+
        '<img class="iconbar-img" src="./img/'+img+'.png" alt="">'+
        '</div>'+
        '<p class="news-text">'+huntingPartyData.news[i].body+'</p>'+
        '</div>'
      }
      document.getElementById("news-items").innerHTML = newsHtml
    }
  }

  function startMainApp() {
    console.log(fbosIn)
    console.log(fboPipeline)
    if (fbosIn.length + fboPipeline.length > 0) {
      // setActiveFbo(fboIndex)
      generateSearchHTML(1)
      renderSearch()
      generateOptions()
      sortFboRenders(fbosIn, 0)
      renderFbos()
      renderNews()
      var promiseFinished = true
      document.getElementById("tos-popup").classList.add('inactive');
      document.getElementById("loading").classList.add('inactive');
      document.getElementById("main-view").classList.remove('inactive');
      document.getElementById("news-block").classList.remove('inactive');
      document.getElementById("fbo-view").classList.add('inactive');
      document.getElementById("search-view").classList.add('inactive');
      document.getElementById("login-register").classList.add('inactive');
    } else {
      renderSearch()
      generateOptions()
      // renderFbos()
      renderNews()
      document.getElementById("loading").classList.add('inactive');
      document.getElementById("tos-popup").classList.add('inactive');
      document.getElementById("main-view").classList.remove('inactive');
      document.getElementById("news-block").classList.remove('inactive');
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
    // TAB SWITCH HERE
    switchTab(2)
    openSearchItems(0)
    // goToFbo(0,0);
    // openFboDetail(4)
    // viewSearch(0)
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

  function switchKeywordSearch(which) {
    if (which == 0) {
      document.getElementById("search-box-keyword-left").classList.add('search-box-keyword-active');
      document.getElementById("search-box-keyword-right").classList.remove('search-box-keyword-active');
    } else if (which == 1) {
      document.getElementById("search-box-keyword-left").classList.remove('search-box-keyword-active');
      document.getElementById("search-box-keyword-right").classList.add('search-box-keyword-active');

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
    var proxy
    var noFbo = false
    if (activeTab == 0) {
      if (fboPipeline[fboIndex]) {
        proxy = fboPipeline[fboIndex]
      } else {
        noFbo = true
      }
    } else if (activeTab == 2) {
      if (fbosIn[fboIndex]) {
        proxy = fbosIn[fboIndex]
      } else {
        noFbo = true
      }
    } else if (activeTab == 3) {
      if (fboPipeline[fboIndex]) {
        proxy = fboPipeline[fboIndex]
      } else {
        noFbo = true
      }
    }
    if (!noFbo) {
      var currentFbo = proxy.fbo
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
      if (!proxy.chartData) {
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
              if (queryResults.length > 1000) {
                queryResults = queryResults.slice(0,1000)
              }
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
            Chart.defaults.global.defaultFontColor = 'rgba(96,97,97,1)';
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
      } else {
        var myChart1 = new Chart(chart1, {
          type: 'bar',
          data: {
            labels: ["0-100k", "100k-250k", "250k-1m", "1m-5m", "5m+"],
            datasets: [{
              label: 'Prices',
              data: proxy.chartData.prices,
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
        var myChart2 = new Chart(chart2, {
          type: 'bar',
          data: {
            label: 'Prices',
            labels: ["1", "2-3", "4-5", "6+"],
            datasets: [{
              data: proxy.chartData.offers,
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
        var myChart3 = new Chart(chart3, {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Scatter Dataset',
              data: proxy.chartData.scatterData,
              backgroundColor: proxy.chartData.colors
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
  function openSidebar() {
    console.log('its doing it')
    document.getElementById("sidebar").classList.remove('inactive')
    document.getElementById("sidebar").classList.remove('sidebar-out')
    document.getElementById("sidebar").classList.add('sidebar-in')
    profileDropdownOpen = true
  }
  function closeSidebar(){
    document.getElementById("sidebar").classList.add('sidebar-out');
    document.getElementById("sidebar").classList.remove('sidebar-in')
    profileDropdownOpen = false
  }

  $(document).ready(function(){
    $('#fbo-scroll-box').bind('scroll',fboScroll);
    $('#pipeline-view').bind('scroll',pipelineScroll);
  });
  var loadInProgress = false
  function fboScroll(e) {
    // console.log('scrolling')
    var elem = $(e.currentTarget);
    if (elem[0].scrollHeight - elem.scrollTop() <= elem.outerHeight() + 900)
    {
      if (!loadInProgress) {
        if (fbosIn.length < fbosInMax) {
          loadInProgress = true
          getMoreProxies()
        }
      }
    }
  }
  function pipelineScroll(e) {
    // console.log('scrolling')
    var elem = $(e.currentTarget);
    if (elem[0].scrollHeight - elem.scrollTop() <= elem.outerHeight() + 900)
    {
      if (!loadInProgress) {
        if (fboPipeline.length < fboPipelineMax) {
          loadInProgress = true
          getMoreProxies()
        }
      }
    }
  }

  function getMoreProxies() {
    console.log('getting more')
    loadInProgress = true
    document.getElementById("fbo-item-load-buffer").classList.remove('inactive');
    var proxyRequest = {
      startIndex: fbosIn.length,
      which: 0
    }
    var xhttp3b = new XMLHttpRequest();
    xhttp3b.onreadystatechange = function() {
      if (xhttp3b.readyState == 4 && xhttp3b.status == 200) {
        proxiesRes = JSON.parse(xhttp3b.responseText);
        for (i = 0; i < proxiesRes.fbosIn.length; i++) {
          fbosIn.push(proxiesRes.fbosIn[i])
        }
        renderFbos()
        loadInProgress = false
        document.getElementById("fbo-item-load-buffer").classList.add('inactive');
      }
    }
    xhttp3b.open("PUT", apiUrl+"/company/" + company._id + "/somefbos/", true);
    xhttp3b.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp3b.send(JSON.stringify(proxyRequest));
  }
  function getMorePipelineProxies() {
    console.log('getting more')
    loadInProgress = true
    document.getElementById("pipeline-item-load-buffer").classList.remove('inactive');
    var proxyRequest = {
      startIndex: fboPipeline.length,
      which: 1
    }
    var xhttp3b = new XMLHttpRequest();
    xhttp3b.onreadystatechange = function() {
      if (xhttp3b.readyState == 4 && xhttp3b.status == 200) {
        proxiesRes = JSON.parse(xhttp3b.responseText);
        for (i = 0; i < proxiesRes.fboPipeline.length; i++) {
          fboPipeline.push(proxiesRes.fboPipeline[i])
        }
        renderFbos()
        loadInProgress = false
        document.getElementById("fbo-item-load-buffer").classList.add('inactive');
      }
    }
    xhttp3b.open("PUT", apiUrl+"/company/" + company._id + "/somefbos/", true);
    xhttp3b.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp3b.send(JSON.stringify(proxyRequest));
  }


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
      $("#sidebar").removeClass('inactive')
      $("#sidebar").removeClass('sidebar-out')
      $("#sidebar").addClass('sidebar-in')
      profileDropdownOpen = true
    }
    function closeSidebar(){
      $("#sidebar").addClass('sidebar-out');
      $("#sidebar").removeClass('sidebar-in')
      profileDropdownOpen = false
    }
  });
