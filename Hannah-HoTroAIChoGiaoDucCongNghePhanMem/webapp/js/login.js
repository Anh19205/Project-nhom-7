const urlGetToken = "http://localhost:9999/api/identity/auth/token";
let usernameInput = document.querySelector(".username");
let passwordInput = document.querySelector(".password");
let sendBtn = document.querySelector(".send");
sendBtn.addEventListener("click", () => {
    let username = usernameInput.value;
    let password = passwordInput.value;
    let data = {
        "username": username,
        "password": password,
    }
    fetch(urlGetToken, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((data) => {
        return data.json();
    })
    .then((response) => {

        alert("ban da dang nhap thanh cong");
        localStorage.setItem("token", response.result.token);
        window.location.href = "index.html";
    })
    .catch((err) => {
        console.log("loi dang ki: ", err);
    })
})