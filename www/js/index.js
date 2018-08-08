var activeTab = 0
var dataExpanded = 0
var company = null
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
var localStorage = window.localStorage;
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


$( document ).on( "pageinit", "#whole-page", function() {
  $( document ).on( "swipeleft swiperight", "#whole-page", function( e ) {
    // We check if there is no open panel on the page because otherwise
    // a swipe to close the left panel would also open the right panel (and v.v.).
    // We do this by checking the data that the framework stores on the page element (panel: open).
    if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
      if ( e.type === "swipeleft"  ) {
        // $( "#right-panel" ).panel( "open" );
      } else if ( e.type === "swiperight" ) {
        $( "#mypanel" ).panel( "open" );
      }
    }
  });
});

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
    } else if (num == 1) {
      document.getElementById("news-view").classList.add('inactive')
      document.getElementById("search-view").classList.remove('inactive')
      document.getElementById("fbo-view").classList.add('inactive')
      document.getElementById("pipeline-view").classList.add('inactive')
    } else if (num == 2) {
      document.getElementById("news-view").classList.add('inactive')
      document.getElementById("search-view").classList.add('inactive')
      document.getElementById("fbo-view").classList.remove('inactive')
      document.getElementById("pipeline-view").classList.add('inactive')
      renderFbos()
    } else if (num == 3) {
      document.getElementById("news-view").classList.add('inactive')
      document.getElementById("search-view").classList.add('inactive')
      document.getElementById("fbo-view").classList.add('inactive')
      document.getElementById("pipeline-view").classList.remove('inactive')
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

  function renderFbos() {
    var fboHtml = ''
    var pipelineHtml = ''
    fboVote = []
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
        dueDate = "<p style='font-weight: bold;'>Due: "+proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)+"</p>"
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
        comments = comments + '<p class="comment"><span style="font-weight: bold;">' + vote.name + '</span>: YES' + voteString + '</p>'
        voteHtml = voteHtml + '<div class="fbo-item-points-dropdown-item" style="color: green;">' + proxy.voteYes[i2].name + ': Yes</div>'
      }
      for (i2 = 0; i2 < proxy.voteNo.length; i2++) {
        var vote = proxy.voteNo[i2]
        var voteString = ''
        if (vote.comment) {
          voteString = ' - "'+vote.comment+'"'
        }
        comments = comments + '<p class="comment"><span style="font-weight: bold;">' + vote.name + '</span>: NO' + voteString + '</p>'
        voteHtml = voteHtml + '<div class="fbo-item-points-dropdown-item" style="color: red;">' + proxy.voteNo[i2].name + ': No</div>'
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

      if (proxy.voteYes.length < 1 && vote !== 1) {
        fboHtml = fboHtml + '<div class="fbo-item">'+
        '<div class="second-border">'+
        ''+voteHtml+
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
    var dataText = '<p><span style="font-weight: bold">Solicitation Number:</span>'+
    proxy.fbo.solnbr +
    '</p><p><span style="font-weight: bold">Agency:</span>'+
    proxy.fbo.agency+
    '</p><p><span style="font-weight: bold">Office:</span>'+
    proxy.fbo.office+
    '</p><p><span style="font-weight: bold">Location:</span>'+
    proxy.fbo.location+
    '</p><p><span style="font-weight: bold">Contact:</span>'+
    proxy.fbo.contact+
    '</p><p style="font-weight: bold"><a href="'+proxy.fbo.url+'">More Info</a></p>'
    document.getElementById("fbo-title").innerHTML = proxy.fbo.subject;
    document.getElementById("abstract-text").innerHTML = proxy.fbo.desc;
    document.getElementById("data-text").innerHTML = dataText;
    if (proxy.fbo.respDate) {
      document.getElementById("time-button").innerHTML = "<p>Due</p><p>"+proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)+"</p>";
    } else {
      document.getElementById("time-button").innerHTML = "<p>No</p><p>Due Date</p>"
    }
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
        console.log('you voted yes')
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
      comment: ''
    }
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
          var newString = '<p class="comment"><span style="font-weight: bold;">' + vote.name + '</span>: YES' + voteString + '</p>'
          chatString = chatString + newString
        }
        for (i = 0; i < newFbo.voteNo.length; i++) {
          var vote = newFbo.voteNo[i]
          var voteString = ''
          if (vote.comment) {
            voteString = ' - "'+vote.comment+'"'
          }
          var newString = '<p class="comment"><span style="font-weight: bold;">' + vote.name + '</span>: NO' + voteString + '</p>'
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
  var id = localStorage.getItem('uid')
  var xhttp = new XMLHttpRequest();
  // xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Typical action to be performed when the document is ready:
      currentUser = JSON.parse(xhttp.responseText);
      document.getElementById("user-name").innerHTML = currentUser.firstName + ' ' + currentUser.lastName;
      document.getElementById("profile-circle-inside").innerHTML = '<img class="circle-img" src="'+currentUser.avatar+'" alt="">';
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
          fbos = company.fboProxies
          setActiveFbo(fboIndex)
          renderFbos()
          var promiseFinished = true
          document.getElementById("loading").classList.add('inactive');
          document.getElementById("main-view").classList.remove('inactive');
          document.getElementById("news-view").classList.remove('inactive');
          document.getElementById("fbo-view").classList.add('inactive');
          document.getElementById("search-view").classList.add('inactive');
          document.getElementById("login-view").classList.add('inactive');
          switchTab(2)
          goToFbo(5, 0);
          expandData(2)
          //   }
          // };
          // xobj.send(null);
        }
      };
      var companyId = currentUser.companyUserProxies[0].company._id
      xhttp2.open("GET", "https://efassembly.com:4432/company/" + companyId, true);
      xhttp2.send();
    }
  };
  xhttp.open("GET", "https://efassembly.com:4432/profiles/" + id, true);
  xhttp.send();
}


function handleExternalURLs() {
  console.log('it is: ' + device.platform)
  // Handle click events for all external URLs
  if (device.platform.toUpperCase() === 'ANDROID') {
    $(document).on('click', 'a[href^="http"]', function (e) {
      console.log('CLICKED')
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
