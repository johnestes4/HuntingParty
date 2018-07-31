var activeTab = 0
var dataExpanded = 0
var company = null
var fbos = []
var fboIndex = 0
var promiseFinished = false
var highestDataNumber = 4
var emailNotFound = false
var passwordWrong = false
var loggedIn = false
var currentUser = null
var localStorage = window.localStorage;
var profileDropdownOpen = false
var fboVote = 0
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

function login() {
  var username = document.getElementById("email").value.toLowerCase()
  var password = document.getElementById("password").value
  document.getElementById("loading-details").innerHTML = 'Checking if email has account...'
  document.getElementById("loading").classList.remove('inactive');
  document.getElementById("fbo-view").classList.add('inactive');
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
  document.getElementById("fbo-view").classList.add('inactive');
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
  // document.getElementById("profile-dropdown").classList.remove('inactive')
  // profileDropdownOpen = true
}

document.addEventListener("click", (evt) => {
  const profileDropdown = document.getElementById("profile-dropdown");
  const profileCircle = document.getElementById("profile-circle");
  let targetElement = evt.target; // clicked element

  do {
    if (profileDropdownOpen) {
      if (targetElement == profileDropdown) {
        // This is a click inside. Do nothing, just return.
        return;
      }
    } else {
      if (targetElement == profileCircle) {
        document.getElementById("profile-dropdown").classList.remove('inactive')
        profileDropdownOpen = true
        // This is a click inside. Do nothing, just return.
        return;
      }
    }
    // Go up the DOM
    targetElement = targetElement.parentNode;
  } while (targetElement);
  // This is a click outside.
  document.getElementById("profile-dropdown").classList.add('inactive')
  profileDropdownOpen = false
});

function switchTab(elem, num) {
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

function setActiveFbo(index) {
  if (index < 0) {
    index = fbos.length-1
  } else if (index >= fbos.length) {
    index = 0
  }
  var proxy = fbos[index]
  document.getElementById("fbo-title").innerHTML = proxy.fbo.subject;
  document.getElementById("abstract-text").innerHTML = proxy.fbo.desc;
  if (proxy.fbo.respDate) {
    document.getElementById("time-button").innerHTML = "<p>Due</p><p>"+proxy.fbo.respDate.slice(0,2)+"/"+proxy.fbo.respDate.slice(2,4)+"/"+proxy.fbo.respDate.slice(4,6)+"</p>";
  } else {
    document.getElementById("time-button").innerHTML = "No Due Date"
  }
  fboIndex = index
  updateComments(proxy)
  checkVote(proxy)
}

function checkVote(proxy) {
  for (i = 0; i < proxy.voteYes.length; i++) {
    if (proxy.voteYes[i].id == currentUser._id) {
      console.log('you voted yes')
      fboVote = 2
      break;
    }
  }
  if (fboVote !== 2) {
    for (i = 0; i < proxy.voteNo.length; i++) {
      if (proxy.voteNo[i].id == currentUser._id) {
        fboVote = 1
        break;
      }
    }
  }
  if (fboVote == 1) {
    document.getElementById("yes-button").classList.remove('voted-button');
    document.getElementById("no-button").classList.add('voted-button');
  } else if (fboVote == 2) {
    document.getElementById("yes-button").classList.add('voted-button');
    document.getElementById("no-button").classList.remove('voted-button');
  }

}

function vote(yes) {
  console.log('voting')
  var fbo = fbos[fboIndex]
  var vote = {
    id: currentUser._id,
    name: currentUser.firstName + ' ' + currentUser.lastName,
    position: ''
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

  if (fboVote !== 2 && yes) {
    for (var i = 0; i < fbo.voteNo.length; i++) {
      if (fbo.voteNo[i].id == currentUser._id) {
        fbo.voteNo.splice(i,1)
      }
    }
    voteChanged = true
    fboVote = 2
    fbo.voteYes.push(vote)
  } else if (fboVote !== 1 && !yes) {
    for (var i = 0; i < fbo.voteYes.length; i++) {
      if (fbo.voteYes[i].id == currentUser._id) {
        fbo.voteYes.splice(i,1)
      }
    }
    voteChanged = true
    fboVote = 1
    fbo.voteNo.push(vote)
  }
  if (voteChanged) {
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
      }
    };
    var url = "https://efassembly.com:4432/fbocompanyproxy/" + fbo._id;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhttp.send(JSON.stringify(req));
  }
}

function updateComments(fbo) {
  var xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function() {
    if (xhttp2.readyState == 4 && xhttp2.status == 200) {
      // Typical action to be performed when the document is ready:
      var newFbo = JSON.parse(xhttp2.responseText)
      fbo.comments = newFbo.comments
      var chatString = ''
      for (i = 0; i < newFbo.comments.length; i++) {
        var newString = '<p class="comment"><span style="font-weight: bold;">' + fbo.comments[i].name + ': </span>' + fbo.comments[i].comment + '</p>'
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

function expandData(num) {
  var a = document.getElementsByClassName('databar')
  if (dataExpanded == num) {
    for (i = 1; i <= highestDataNumber; i++) {
      document.getElementById("arrow-" + i.toString()).innerHTML = "▼";
      document.getElementById("data-box-" + i.toString()).classList.add('data-box-inactive');
    }
    dataExpanded = 0
    for (i = 0; i < a.length; i++) {
      a[i].classList.remove('databar-active');
    }
  } else {
    dataExpanded = num
    for (i = 1; i <= highestDataNumber; i++) {
      if (i == num) {
        document.getElementById("arrow-" + i.toString()).innerHTML = "▲";
        document.getElementById("data-box-" + i.toString()).classList.remove('data-box-inactive');
      } else {
        document.getElementById("arrow-" + i.toString()).innerHTML = "▼";
        document.getElementById("data-box-" + i.toString()).classList.add('data-box-inactive');
      }
    }
    for (i = 0; i < a.length; i++) {
      a[i].classList.remove('databar-active');
    }
    document.getElementById("databar-" + num).classList.add('databar-active');
  }
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
      var xhttp2 = new XMLHttpRequest();
      // xhttp.setRequestHeader("Content-type", "application/json");
      xhttp2.onreadystatechange = function() {
        if (xhttp2.readyState == 4 && xhttp2.status == 200) {
          // Typical action to be performed when the document is ready:
          company = JSON.parse(xhttp2.responseText);
          fbos = company.fboProxies
          setActiveFbo(fboIndex)
          var promiseFinished = true
          document.getElementById("loading").classList.add('inactive');
          document.getElementById("fbo-view").classList.remove('inactive');
          document.getElementById("login-view").classList.add('inactive');

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

var app = {
  // Application Constructor
  initialize: function() {
    if (localStorage.getItem('uid')) {
      console.log('we got it')
      getTheData()
    } else {
      document.getElementById("loading").classList.add('inactive');
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
