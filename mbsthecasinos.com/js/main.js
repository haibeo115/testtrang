$(document).ready(function () {
  let logoutUser = async () => {
    try {
      await fetch(location.origin + "/api/auth/destroy", {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      });

      localStorage.removeItem("user");
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  let CSKHLINKYUKO;
  let utilsLoop;
  let loggedIn = false;

  let fetchCskhLink = () => {
    fetch("/api/settings/id")
      .then((response) => response.json())
      .then((json) => {
        var tempCskhCucCang2023 = json.message;
        fetch(location.origin + "/api/auth/getUser")
          .then((response_user) => response_user.json())
          .then((json_user) => {
            if (
              json_user.data.tokenVerificationData !== undefined &&
              viewAuthed !== undefined
            )
              return logoutUser();
            if (json_user.success == false) return false;
            if (json_user.data.tokenVerificationData !== undefined)
              return false;
            loggedIn = true;
            var usernametoaddhehe = json_user.data.username;
            CSKHLINKYUKO = `https://secure.livechatinc.com/licence/${tempCskhCucCang2023}/v2/open_chat.cgi?name=${usernametoaddhehe}`;
            var footerItems = $("#chat-btn");
            footerItems.attr("target", "_blank");
            footerItems.attr("href", CSKHLINKYUKO);

            utilsLoop = setInterval(function () {
              fetch(location.origin + "/api/auth/getUser")
                .then((response) => response.json())
                .then((json) => {
                  if (json.data.tokenVerificationData !== undefined)
                    logoutUser();
                });
            }, 6000);
          });
      });
  };

  $(".login-btn").click(function () {
    location.href = `${location.origin}/login`;
  });

  $(".register-btn").click(function () {
    location.href = `${location.origin}/register`;
  });
  $(".swiper-slide").click(function () {
    if (!loggedIn) return (location.href = "/login");
    if ($(this).attr("data-ignore") == "true") return false;
    const data = $(this).attr("data-redirect");
    if (data === undefined) {
      $("#thongBaoGame").removeClass("d-none");
      setTimeout(function () {
        const elm = $("#thongBaoGame");
        if (!elm.hasClass("d-none")) $("#thongBaoGame").addClass("d-none");
      }, 3000);
    } else {
      location.href = location.origin + data;
    }
  });

  $(".close-btn").click(function () {
    const elm = $("#thongBaoGame");
    if (!elm.hasClass("d-none")) $("#thongBaoGame").addClass("d-none");
  });

  $("#openSidebar").click(() => {
    const sidebarDiv = $(".sidebar");

    !sidebarDiv.hasClass("main-nav-open")
      ? sidebarDiv.addClass("main-nav-open")
      : sidebarDiv.removeClass("main-nav-open");
  });

  $(".page-goback").on("click", function () {
    history.back();
  });

  new Swiper(".news", {
    grid: {
      fill: "row",
      rows: 1,
    },
    autoplay: true,
  });

  new Swiper(".main", {
    grid: {
      fill: "row",
      rows: 2,
    },
    width: 111,
    spaceBetween: 20,
    height: 0,
  });

  new Swiper(".normal", {
    grid: {
      fill: "row",
      rows: 2,
    },
    width: 111,
    spaceBetween: 20,
    height: 0,
  });

  fetchCskhLink();
});
