

document.addEventListener("DOMContentLoaded", function() {
  $(".wrong").hide();
  $("#addLink").hide();
  $("#logout").hide();
  $("#done").hide();
  //The callbacks for Chrome storage's methods are asynchronous and aren't executed till later
  chrome.storage.sync.get("userData", function(data) { 
    if (Object.keys(data).length) {
      $("#please").hide();
      $("#login").hide();
      $("#addLink").show();
      $("#logout").show();
    }
  });

  var loginButton = document.getElementById("login");
  loginButton.addEventListener("submit", function(){
    var password =  $('#password').val();
    var username = $('#username').val();


        $.ajax({
          url: "http://localhost:4000/api/users/login",
          type: "POST", 
          data: {
            "username": username, 
            "password": password
          },

      success: function(res) {
        chrome.storage.sync.set({"userData": res}, function() {
          console.log("Settings saved");
        });
        $("#please").hide();
        $("#login").hide();
        $("#addLink").show();
        $("#logout").show();
      },
      error: function(err) {
        console.log("error", JSON.stringify(err));
        $(".wrong").show()
      }
    });
    event.preventDefault();
  });

  var addLinkButton = document.getElementById("addLink");
  addLinkButton.addEventListener("click", function() {

    chrome.tabs.getSelected(null, function(tab) {
      
      chrome.storage.sync.get("userData", function(data) {
        
        $.ajax({
            url: "http://localhost:4000/api/links",
            type: "POST",
            data: {
                    "username": data.userData.fullname,
                    "url": tab.url,
                    "user_id": data.userData.user_id
            },
            headers: {
              "x-access-token": data.userData.token
            },
            success: function(res) {
              $("#addLink").hide();
              $("#done").show();
            },
            error: function(err) {
              console.log(err);
            }
        });
      });
    });
  });

  var logoutButton = document.getElementById("logout");
  logoutButton.addEventListener("click", function() {
    chrome.storage.sync.remove("userData");
    $("#please").show();
    $("#login").show();
    $("#addLink").hide();
    $("#logout").hide();
    $("#done").hide();
  });
});




