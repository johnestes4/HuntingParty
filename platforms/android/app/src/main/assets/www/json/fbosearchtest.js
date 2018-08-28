const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
// const request = require('request');
const request = require('request-promise');
var querystring = require('querystring');
var fs = require('fs');
var ftp = require('ftp-get')
var apn = require('apn');
var gcm = require('node-gcm');

// var FboService = require('./controllers/fbo.service');

// const authHttp = require('../src/app/classes/auth-http')

var year = new Date().getFullYear()
var fboString = 'FBOFeed' + year + month + day
var url = 'ftp://ftp.fbo.gov/' + fboString
var parsed
var newFbos = []
var allProxies = []
var searchPromises = []

function theFunction() {
  ftp.get(url, 'fbo/today.xml', function (err, res) {
    if (err) {
      console.log('error: ' + err)
    } else {
      console.log('complete! ' + res)
      fs.readFile(res, 'utf8', function(err, data) {
        if (!err) {
          parsed = JSON.stringify(parseFBO(data))
          var parsed2 = parseFBO(data)
          fs.writeFile('fbo/today.json', parsed, 'utf8', function(err, data) {
            if (!err) {
              var parsedFiltered = []
              for (let i of parsed2) {
                var toPush = null
                if (i[0].PRESOL) {
                  toPush = i[0].PRESOL
                  toPush.type = 'RFI'
                  parsedFiltered.push(toPush)
                } else if (i[0].SRCSGT) {
                  toPush = i[0].SRCSGT
                  toPush.type = 'RFP'
                  parsedFiltered.push(toPush)
                } else if (i[0].COMBINE) {
                  toPush = i[0].COMBINE
                  toPush.type = 'RFI'
                  parsedFiltered.push(toPush)
                }
              }
              console.log(parsedFiltered.length + ' in the array')

              request({
                url: "https://efassembly.com:4432/fbo/",
                method: "GET",
                json: true   // <--Very important!!!
              }).then(function (response){
                if (!response) {
                  console.log('GET call to backend failed')
                } else {
                  console.log('GET call to backend worked')
                  // console.log(response)
                  var allFbos = response
                  var alreadyThereCount = 0
                  var notThereCount = 0
                  var fboPromises = []
                  parsedFiltered = parsedFiltered.slice(0,100)
                  fs.writeFile("test.json", JSON.stringify(parsedFiltered[0]), function(err) {
                    if (err) {
                      console.log(err);
                    }
                  });
                  for (let i of parsedFiltered) {
                    var toPush = {
                      agency: i.AGENCY,
                      classCod: i.CLASSCOD,
                      contact: i.CONTACT,
                      date: i.DATE,
                      desc: i.DESC,
                      desc2: i.DESC2,
                      link: i.LINK,
                      location: i.LOCATION,
                      naics: i.NAICS,
                      offAdd: i.OFFADD,
                      office: i.OFFICE,
                      popAddress: i.POPADDRESS,
                      popCountry: i.POPCOUNTRY,
                      popZip: i.POPZIP,
                      respDate: i.RESPDATE,
                      setaside: i.SETASIDE,
                      solnbr: i.SOLNBR,
                      subject: i.SUBJECT,
                      url: i.URL,
                      year: i.YEAR,
                      zip: i.ZIP,
                      type: i.type
                    }
                    var alreadyThere = false
                    // console.log(JSON.stringify(allFbos).slice(0,500))
                    for (let i2 of allFbos) {
                      if (toPush.url == i2.url) {
                        if (toPush.desc == i2.desc) {
                          alreadyThere = true
                          alreadyThereCount++
                        }
                      }
                    }
                    if (!alreadyThere) {
                      if (notThereCount == 0) {
                        console.log('gonna try to post')
                        // console.log(toPush)
                      }
                      let headers = {
                        'secretCode': 'SECRET-FUN-TIME-LETS-DO-POSTS'
                      };
                      fboPromises.push(request({
                        url: "https://efassembly.com:4432/fbo/add/",
                        method: "POST",
                        json: true,   // <--Very important!!!
                        headers: headers,
                        body: toPush
                      }).then(function (response){
                        if (!response) {
                          console.log('POST call to backend failed')
                        } else {
                          console.log('POST call to backend successful')
                          newFbos.push(response)
                          // console.log(response);
                          // console.log('if it broke then this doesnt know')
                        }
                      }))
                      notThereCount++
                    }
                  }
                  console.log('FBO FROM XML: ' + parsedFiltered.length)
                  console.log('FBO FROM BACKEND: ' + allFbos.length)
                  console.log('ALREADY THERE COUNT: ' + alreadyThereCount)
                  console.log('NOT THERE COUNT: ' + notThereCount)
                  Promise.all(fboPromises).then(res=>{
                    console.log('this should be second')
                    searchPromises = []
                    async function searchAndCheck() {
                      console.log('it did this')

                      await request({
                        url: "https://efassembly.com:4432/huntingpartydata/",
                        method: "GET",
                        json: true
                      }).then(function (response){
                        var huntingPartyData = response
                        var companiesWithGoodSearches = []
                        var proxiesDone = []
                        var fboNotifications = []
                        for (let i of huntingPartyData) {
                          var deviceIds = []
                          for (let p of i.users) {
                            deviceIds.push(p.regId)
                          }
                          var numberOfNewProxies = 0
                          for (let search of i.searches) {
                            var searchResults = runSearch(newFbos, search)
                            for (let fbo of searchResults.fboSorted) {
                              var alreadyThere = false
                              for (let proxy of proxiesDone) {
                                if (proxy.fbo == fbo._id && proxy.company == i.companyId) {
                                  alreadyThere = true
                                  break;
                                }
                              }
                              if (!alreadyThere) {
                                var date = new Date()
                                var newProxy = {
                                  fbo: fbo._id,
                                  company: i.companyId,
                                  fboDesc: fbo.desc,
                                  voteYes: [],
                                  voteNo: [],
                                  date: date.getTime(),
                                  originSearch: searchResults.search
                                }
                                console.log('Adding a proxy from the saved search '+searchResults.search+'!')
                                allProxies.push(newProxy)
                                if (!companiesWithGoodSearches.includes(i.companyId)) {
                                  companiesWithGoodSearches.push(i.companyId)
                                }
                                numberOfNewProxies++;
                                proxiesDone.push(newProxy)
                              }
                            }
                          }
                          fboNotifications.push({
                            companyId: i.companyId,
                            numberAdded: numberOfNewProxies,
                            employeeDeviceIds: deviceIds
                          })
                        }
                        for (let fbo of newFbos) {
                          var rfpSearchTerms = {
                            company: true,
                            person: false,
                            pastPerformance: false,
                            agency: fbo.agency,
                            skill: null,
                            position: null,
                            freelancer: false
                          };
                          async function searchAndCheck2() {
                            await request({
                              url: "https://efassembly.com:4432/search/rfp/",
                              method: "POST",
                              json: true,   // <--Very important!!!
                              body: rfpSearchTerms
                            }).then(function (response){
                              if (!response) {
                                console.log('POST call to backend (for search pt2) failed')
                              } else {
                                console.log('POST call to backend (for search pt2) successful')
                                var funString = ''
                                var proxyPromises = []
                                var proxies = []
                                if (response.companies.length < 1) {
                                  console.log('no companies returned')
                                } else {
                                  for (let x of response.companies) {
                                    if (!companiesWithGoodSearches.includes(x.company._id)) {
                                      if (x.score >= 5) {
                                        console.log("we're gonna make a proxy for " + x.company.name + " now!")
                                        var date = new Date()
                                        var newProxy = {
                                          fbo: fbo._id,
                                          company: x.company._id,
                                          fboDesc: fbo.desc,
                                          voteYes: [],
                                          voteNo: [],
                                          date: date.getTime(),
                                          originSearch: ''
                                        }
                                        var companyThere = false
                                        for (let notif of fboNotifications) {
                                          if (notif.companyId == x.company._id) {
                                            companyThere = true
                                            notif.numberAdded++
                                          }
                                        }
                                        allProxies.push(newProxy)
                                      } else {
                                        console.log("we're not gonna make a proxy for " + x.company.name + " because its score is only " + x.score + "!")
                                        // console.log(x)
                                      }
                                    }
                                  }
                                }
                              }
                            })
                          }
                          searchAndCheck2()
                        }
                        for (let notif of fboNotifications) {
                          var notifTitle = "" + notif.numberAdded + " New FBOs"
                          var notifBody = "Open your Hunting Party to see them"
                          for (let id of notif.employeeDeviceIds) {
                            androidNotification(id, notifTitle, notifBody)
                          }
                        }
                      })
                    }
                    searchAndCheck().then(function (response){
                      console.log('this should be third')
                      if (allProxies.length > 0) {
                        console.log('doing it - length at ' + allProxies.length)
                        let headers = {
                          'secretCode': 'SECRET-FUN-TIME-LETS-DO-POSTS'
                        };
                        request({
                          url: "https://efassembly.com:4432/fbocompanyproxy/addmany/",
                          method: "POST",
                          json: true,   // <--Very important!!!
                          headers: headers,
                          body: allProxies
                        }).then(function (response){
                          if (!response) {
                            console.log('POST call to backend (for proxy creation) failed')
                          } else {
                            console.log('POST call to backend (for proxy creation) successful')
                            console.log('it may have done it! i dont know! LETS FIND OUT TOGETHER')
                          }
                        })
                      } else {
                        console.log('oops! i should have put this in before huh')
                      }
                    })
                  })
                }
              })
            }
          })
        }
      });
      // var parsed = parseFBO(res)
      // console.log(parsed)
    }
  })
}

theFunction();

function PostCode(toPost) {
  console.log('this should be first')
  return new Promise((resolve, reject) => {
  })
  let headers = {
    'secretCode': 'SECRET-FUN-TIME-LETS-DO-POSTS'
  };
}

function rfpSearch(fbo) {

}

function createFbo(req) {
  var response = authHttp.post(environment.apiRoot + "fbo/add", req)
  return response;
}

function androidNotification(deviceID, title, body) {
  var apiKey = "AAAAYN8Xkcc:APA91bFmayQWkOcojJxn8BvA8LsL6fp3cjWhSaWgFzOGDFewaXGrmm7KBPUJW7EWyMXZN0J4z60lkmVQzqAe4Z26kSPUv6L-BOMBLPGwo4LiDNmNlTMca6JkPciqDFJEixv3baG0o-HJMbPExUK3bIIiaStFVksA7Q ";

  var service = new gcm.Sender(apiKey);
  var message = new gcm.Message();
  message.addData('title', title);
  message.addData('body', body);

  service.send(message, { registrationTokens: [ deviceID ] }, function (err, response) {
    if(err) console.error('ERROR: ' + err);
    else 	console.log(response);
  });

}

function parseFBO(thingIn) {
  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

    peg$FAILED = {},

    peg$startRuleFunctions = { start: peg$parsestart },
    peg$startRuleFunction  = peg$parsestart,

    peg$c0 = [],
    peg$c1 = function(records) { return [].concat(records) },
    peg$c2 = peg$FAILED,
    peg$c3 = function(recname, data) {
      var record = {};
      var obj = {};

      // FBO has multiple attributes with the same key.
      // We'll append a number to the key if it has already been used.
      for (var i = 0, len = data.length; i < len; ++i) {
        var trySave = function(key, val, increment) {
          var newKey = (increment === undefined ? key : key + increment)
          if (typeof obj[newKey] === 'undefined') {
            obj[newKey] = val;
          } else {
            increment = (increment === undefined ? 2 : increment + 1)
            trySave(key, val, increment)
          }
        }

        trySave(data[i][0], data[i][1]);
      }

      record[recname] = obj;
      return [record];
    },
    peg$c4 = "<",
    peg$c5 = { type: "literal", value: "<", description: "\"<\"" },
    peg$c6 = ">",
    peg$c7 = { type: "literal", value: ">", description: "\">\"" },
    peg$c8 = function(tag) { return tag },
    peg$c9 = "</",
    peg$c10 = { type: "literal", value: "</", description: "\"</\"" },
    peg$c11 = function(key, val) { return [key, val] },
    peg$c12 = function(chars) { return chars.join("").trim() },
    peg$c13 = /^[\n\r]/,
    peg$c14 = { type: "class", value: "[\\n\\r]", description: "[\\n\\r]" },
    peg$c15 = /^[0-9a-zA-Z "'=\-]/,
    peg$c16 = { type: "class", value: "[0-9a-zA-Z \"'=\\-]", description: "[0-9a-zA-Z \"'=\\-]" },
    peg$c17 = function(chars) { return chars.join("") },
    peg$c18 = /^[A-Z]/i,
    peg$c19 = { type: "class", value: "[A-Z]i", description: "[A-Z]i" },
    peg$c20 = "</EMAIL>",
    peg$c21 = { type: "literal", value: "</EMAIL>", description: "\"</EMAIL>\"" },
    peg$c22 = "<BR>",
    peg$c23 = { type: "literal", value: "<BR>", description: "\"<BR>\"" },
    peg$c24 = "</A>",
    peg$c25 = { type: "literal", value: "</A>", description: "\"</A>\"" },
    peg$c26 = "<P>",
    peg$c27 = { type: "literal", value: "<P>", description: "\"<P>\"" },
    peg$c28 = void 0,
    peg$c29 = null,
    peg$c30 = "/",
    peg$c31 = { type: "literal", value: "/", description: "\"/\"" },
    peg$c32 = /^[A-Z]/,
    peg$c33 = { type: "class", value: "[A-Z]", description: "[A-Z]" },
    peg$c34 = { type: "any", description: "any character" },
    peg$c35 = function(nnt, val) { return nnt ? nnt + val : val },

    peg$currPos          = 0,
    peg$reportedPos      = 0,
    peg$cachedPos        = 0,
    peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
    peg$maxFailPos       = 0,
    peg$maxFailExpected  = [],
    peg$silentFails      = 0,

    peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
          .replace(/\\/g,   '\\\\')
          .replace(/"/g,    '\\"')
          .replace(/\x08/g, '\\b')
          .replace(/\t/g,   '\\t')
          .replace(/\n/g,   '\\n')
          .replace(/\f/g,   '\\f')
          .replace(/\r/g,   '\\r')
          .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
          .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
          .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
          .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
        expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
        ? expectedDescs.slice(0, -1).join(", ")
        + " or "
        + expectedDescs[expected.length - 1]
        : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
      found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parserecord();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parserecord();
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parserecord() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseopenTag();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsedatum();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsedatum();
          }
        } else {
          s2 = peg$c2;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsecloseTag();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsecloseTag();
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c3(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseopenTag() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 60) {
        s1 = peg$c4;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c5); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsevalidTag();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 62) {
            s3 = peg$c6;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c7); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parselinebreaks();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c8(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsecloseTag() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c9) {
        s1 = peg$c9;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c10); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsevalidTag();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 62) {
            s3 = peg$c6;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c7); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parselinebreaks();
            if (s4 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsedatum() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsedatumName();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsedatumVal();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c11(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsedatumName() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 60) {
        s1 = peg$c4;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c5); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsevalidAttr();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 62) {
            s3 = peg$c6;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c7); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c8(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsedatumVal() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsevalidchar();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsevalidchar();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parselinebreaks();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c12(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parselinebreaks() {
      var s0, s1;

      s0 = [];
      if (peg$c13.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c14); }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c13.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c14); }
        }
      }

      return s0;
    }

    function peg$parsevalidTag() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c15.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c15.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c16); }
          }
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c17(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsevalidAttr() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c18.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c19); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c18.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c19); }
          }
        }
      } else {
        s1 = peg$c2;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c17(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsenotNewTag() {
      var s0, s1;

      if (input.substr(peg$currPos, 8) === peg$c20) {
        s0 = peg$c20;
        peg$currPos += 8;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c22) {
          s0 = peg$c22;
          peg$currPos += 4;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c24) {
            s0 = peg$c24;
            peg$currPos += 4;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c25); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c26) {
              s0 = peg$c26;
              peg$currPos += 3;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c27); }
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              peg$silentFails++;
              s1 = peg$parsenewTag();
              peg$silentFails--;
              if (s1 === peg$FAILED) {
                s0 = peg$c28;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsenewTag() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 60) {
        s1 = peg$c4;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c5); }
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 47) {
          s2 = peg$c30;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c31); }
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c29;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c32.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c33); }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c32.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c33); }
              }
            }
          } else {
            s3 = peg$c2;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 62) {
              s4 = peg$c6;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c7); }
            }
            if (s4 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsevalidchar() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsenotNewTag();
      if (s1 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c34); }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c35(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }
      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }
  return (parse(thingIn))
}

function runSearch(allFbos, searchTerms) {
  var fboSorted = []
  var month = new Date().getMonth()+1
  var day = new Date().getDate()
  var year = new Date().getUTCFullYear()
  var yearString = '' + year
  year = +yearString.slice(2,4)
  var date = +('' + month + day + year)
  for (let fbo of allFbos) {
    var valid = {
      type: {required: false, value: false},
      dueDate: {required: false, value: false},
      naics: {required: false, value: false},
      psc: {required: false, value: false},
      agency: {required: false, value: false},
      place: {required: false, value: false},
      setAside: {required: false, value: false},
      keyword: {required: false, value: false}
    }
    // for (let i of searchTerms.type) {
    //
    // }
    for (let i of searchTerms.dueDate) {
      if (i.value) {
        valid.dueDate.required = true
        var dateString = ''+date
        var checkDate = +(''+month+day)
        var fboDate = +((''+fbo.respDate).slice(0,4))
        noneChecked = false
        if (i.name == 'Due any time') {
          valid.dueDate.value = true
        } else if (i.name == 'Due this week') {
          var newMonth = month
          var newDay = +day + 7
          var endDate = +('' + newMonth + newDay)
          if (newDay > 30) {
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
              if (newDay > 31) {
                newMonth = month + 1
                newDay = newDay - 31
              }
            } else if (month == 4 || month == 6 || month == 9 || month == 11) {
              newMonth = month + 1
              newDay = newDay - 30
            } else if (month == 2) {
              newMonth = month + 1
            }
            if (newDay < 10) {
              endDate = +(''+newMonth+'0'+newDay)
            } else {
              endDate = +(''+newMonth+newDay)
            }
          }
          if (fboDate <= endDate && fboDate >= checkDate) {
            valid.dueDate.value = true
          }
        } else if (i.name == 'Due next week') {
          var newMonth = month
          var newDay = +day + 7
          var endDate = +('' + newMonth + newDay)
          if (newDay > 30) {
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
              if (newDay > 31) {
                newMonth = month + 1
                newDay = newDay - 31
              }
            } else if (month == 4 || month == 6 || month == 9 || month == 11) {
              newMonth = month + 1
              newDay = newDay - 30
            } else if (month == 2) {
              newMonth = month + 1
            }
            if (newDay < 10) {
              endDate = +(''+newMonth+'0'+newDay)
            } else {
              endDate = +(''+newMonth+newDay)
            }
          }
          newMonth = month
          newDay = +day + 14
          var endDate2 = +('' + newMonth + newDay)
          if (newDay > 30) {
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
              if (newDay > 31) {
                newMonth = month + 1
                newDay = newDay - 31
              }
            } else if (month == 4 || month == 6 || month == 9 || month == 11) {
              newMonth = month + 1
              newDay = newDay - 30
            } else if (month == 2) {
              newMonth = month + 1
            }
            if (newDay < 10) {
              endDate2 = +(''+newMonth+'0'+newDay)
            } else {
              endDate2 = +(''+newMonth+newDay)
            }
          }
          if (fboDate <= endDate2 && fboDate >= endDate) {
            valid.dueDate.value = true
          }
        } else if (i.name == 'Due in next 2-4 weeks') {
          var newMonth = month
          var newDay = +day + 14
          var endDate = +('' + newMonth + newDay)
          if (newDay > 30) {
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
              if (newDay > 31) {
                newMonth = month + 1
                newDay = newDay - 31
              }
            } else if (month == 4 || month == 6 || month == 9 || month == 11) {
              newMonth = month + 1
              newDay = newDay - 30
            } else if (month == 2) {
              newMonth = month + 1
            }
            if (newDay < 10) {
              endDate = +(''+newMonth+'0'+newDay)
            } else {
              endDate = +(''+newMonth+newDay)
            }
          }
          newMonth = month
          newDay = +day + 28
          var endDate2 = +('' + newMonth + newDay)
          if (newDay > 30) {
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
              if (newDay > 31) {
                newMonth = month + 1
                newDay = newDay - 31
              }
            } else if (month == 4 || month == 6 || month == 9 || month == 11) {
              newMonth = month + 1
              newDay = newDay - 30
            } else if (month == 2) {
              newMonth = month + 1
            }
            if (newDay < 10) {
              endDate2 = +(''+newMonth+'0'+newDay)
            } else {
              endDate2 = +(''+newMonth+newDay)
            }
          }
          if (fboDate <= endDate2 && fboDate >= endDate) {
            valid.dueDate.value = true
          }
        } else if (i.name == 'Due more than 4 weeks from now') {
          var newMonth = month
          var newDay = +day + 28
          var endDate = +('' + newMonth + newDay)
          if (newDay > 30) {
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
              if (newDay > 31) {
                newMonth = month + 1
                newDay = newDay - 31
              }
            } else if (month == 4 || month == 6 || month == 9 || month == 11) {
              newMonth = month + 1
              newDay = newDay - 30
            } else if (month == 2) {
              newMonth = month + 1
            }
            if (newDay < 10) {
              endDate = +(''+newMonth+'0'+newDay)
            } else {
              endDate = +(''+newMonth+newDay)
            }
          }
          if (fboDate >= endDate) {
            valid.dueDate.value = true
          }
        }
      }
    }
    for (let i of searchTerms.naics) {
      if (i.value) {
        valid.naics.required = true
        noneChecked = false
        if (i.name.slice(0,2) == (''+fbo.naics).slice(0,2) || i.name == 'All') {
          valid.naics.value = true
        }
      }
    }
    // for (let i of searchTerms.psc) {
    //
    // }
    for (let i of searchTerms.agency) {
      if (i.value) {
        valid.agency.required = true
        noneChecked = false
        if (i.name == fbo.agency || i.name == 'All') {
          valid.agency.value = true
        }
      }
    }
    // for (let i of searchTerms.place) {
    //
    // }
    for (let i of searchTerms.setAside) {
      if (i.value) {
        valid.setAside.required = true
        noneChecked = false
        if (i.name == fbo.setaside || i.name == 'All') {
          valid.setAside.value = true
        }
      }
    }
    if (searchTerms.keyword) {
      valid.keyword.required = true
      if (fbo.desc.toLowerCase().includes(searchTerms.keyword.toLowerCase()) ||
        fbo.subject.toLowerCase().includes(searchTerms.keyword.toLowerCase()) ||
        fbo.contact.toLowerCase().includes(searchTerms.keyword.toLowerCase())
      ) {
        valid.keyword.value = true
      }
    }
    var allValid = true
    if (
      (valid.type.required && !valid.type.value) ||
      (valid.dueDate.required && !valid.dueDate.value) ||
      (valid.naics.required && !valid.naics.value) ||
      (valid.psc.required && !valid.psc.value) ||
      (valid.agency.required && !valid.agency.value) ||
      (valid.place.required && !valid.place.value) ||
      (valid.setAside.required && !valid.setAside.value) ||
      (valid.keyword.required && !valid.keyword.value)
    ) {
      allValid = false
    }
    if (allValid) {
      fboSorted.push(fbo)
    }
  }
  console.log(fboSorted.length)
  var res = {
    search: searchTerms.name,
    fboSorted: fboSorted
  }
  return res
}
