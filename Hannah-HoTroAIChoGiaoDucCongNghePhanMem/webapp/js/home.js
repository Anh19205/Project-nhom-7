function checkUserNewOrNot(){
    const token = localStorage.getItem('token');
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64); // base64 decode
    const payload = JSON.parse(payloadJson);
    console.log("payload: ", payload);
    let userId = payload.sub;
    console.log("userId: ", userId);

    const urlGetProfileFromUserId = `http://localhost:9999/api/profile/profiles/getProfile/fromUserId/${userId}`;
    fetch(urlGetProfileFromUserId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
        localStorage.setItem('profileId', data.result.id);
        localStorage.setItem('gender', data.result.gender);
        if(data.result.fullName == null){
            console.log(data.result.fullName);
            alert('sss')
            window.location.href = "UpdateProfileNewUser.html";        
        }
        let user = JSON.parse(localStorage.getItem('user'));
        if(user == null){
            user = {
                "id": data.result.id,
                "userId": data.result.userId,
                "avatar": data.result.avatar,
                "fullName": data.result.fullName,
                "dob": data.result.dob,
                "gender": data.result.gender,
                "address": data.result.address,
                "phoneNumber": data.result.phoneNumber
            };
            localStorage.setItem('user', JSON.stringify(user));
        }
        console.log('user: ', user);
    })
    .catch((err) => {
        console.log('error when get profile from user id ', err);
    })
}

function checkUserHasBeenLogin(){
    const authButtons = document.getElementById("auth-buttons");
    const token = localStorage.getItem("token");
    if(token){
        authButtons.innerHTML = `
        <button
            class="bg-red-600 text-white rounded-md px-4 py-1 font-semibold hover:bg-red-700 transition"
            type="button"
            id="logoutBtn"
        >
            Log out
        </button>
        `;
        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
        });
    } 
}

function userRoleTeacher(){
    const urlUserRoleTeacher = "http://localhost:9999/api/identity/users/getUserRoleTeacher";
    fetch(urlUserRoleTeacher, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const frameTeacher = document.getElementById('frameTeacher');
        console.log(data);
        data.result.forEach(profile => {
            const article = document.createElement("article");
            article.className = `class="flex flex-col bg-gray-50 rounded-lg p-5 shadow hover:shadow-md transition-shadow h-full"
                style="min-height: 220px;"`;
            article.innerHTML = `
            <div class="flex items-center space-x-4 mb-4">
            <div
                class="rounded-full w-14 h-14 flex items-center justify-center font-semibold text-indigo-600 bg-indigo-100"
            >
                <img src="${profile.avatar}" alt="Avatar" class="w-full h-full object-cover rounded-full">
            </div>
            <div>
                <h2 class="font-semibold text-lg text-gray-900 leading-tight">
                ${profile.fullName}
                </h2>
                <p class="text-gray-600 text-sm leading-relaxed">
                address: ${profile.address} /
                phoneNumber: ${profile.phoneNumber} 
                </p>
            </div>
            </div>
            <div class="flex items-center justify-between mt-auto">
            <div
                class="border border-indigo-600 rounded-md px-3 py-1 font-semibold text-indigo-600 bg-indigo-100"
            >
                32 bài
            </div>
            <button
                class="border border-indigo-600 rounded-md px-6 py-2 text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white transition"
                type="button"
            >
                vào học
            </button>
            </div>
            `;
            frameTeacher.appendChild(article)
        });
    })
    .catch((err) => {
        console.log("error when get profile teacher: ", err);
        alert("loi");
    })
}

window.addEventListener("DOMContentLoaded", () => {
    console.log("token: ", localStorage.getItem("token"));
    checkUserNewOrNot();
    checkUserHasBeenLogin();
    userRoleTeacher();
})