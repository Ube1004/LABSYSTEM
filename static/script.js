//global variable
let borrowData = {};
let returningItems = [];
let user = "superadmin";
let scannedItems = [];
const curruser = "{{ session['name'] }}";

function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Login Success');
            window.location.href = '/dashboard';
        } else {
            alert('Invalid credentials');
        }


    });

}

function gotologin(){
    window.location.href = "/gotologin";
}

function qrscan(){
    fetch('/qrscan')
    
    /*.then(data => {
        
     let rows = "";

        data.items.forEach(item => {
            rows += `
                <tr>
                    <td style="width: 50px;">${item.ItemID}</td>
                    <td style="width: 50px;">${item.Code}</td>
                    <td style="width: 50px;">${item.Category}</td>
                    <td style="width: 50px;">${item.Type}</td>
                    <td style="width: 50px;">${item.Status}</td>
                    <td style="width: 50px;"><button onclick="handleAction('${item.Code}', '${item.Status}')">
                     ${item.Status === "Available" ? "Borrow" : "Return"}</td>
                        

                </tr>
            `;
        });

        document.getElementById("tableBody").innerHTML = rows;
        if(data.missing && data.missing.length > 0){
        alert("item: " + data.missing.join(", ") + " Are not on Database");
    }
        
    });

    
*/
}


function qrscanform(){

    let studentid = document.getElementById("StudentID").value;
    let name = document.getElementById("Name").value;
    let email = document.getElementById("Email").value;
    let institute = document.getElementById("Institute").value;
    let contact = document.getElementById("Contact").value;
    let dateB = document.getElementById("dateBorrowed").value;
    let dateR = document.getElementById("dateReturn").value;
    let approvedBy = document.getElementById("approvedBy").value;
    if (!studentid || !name || !email || !institute || !contact || !approvedBy) {
        document.getElementById("mydiv").showPopover();
        return;
    }

    fetch('/qrscan')
    .then(res => res.json())
    .then(data => {  let html = document.getElementById("itemBox").innerHTML;
        data.items.forEach(item => {
            html += `
                <div class="item">
                   ${item.Type} with code ${item.Code}
                </div>
            `;
        });

        document.getElementById("itemBox").innerHTML = html;

        //show missing
        if (data.missing && data.missing.length > 0){
            alert("Missing/Not on Database: " + data.missing.join(", "));
        }

        borrowData = {
                    studentid,
                    name,
                    email,
                    institute,
                    contact,
                    items: data.items,
                    dateB,
                    dateR,
                    approvedBy
                };


        showCButton();
        
        

    });
}
function confirmborrow(borrowData){
    fetch('/confirmborrow' ,{ method: 'POST',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(borrowData) })
        .then(res => res.json())
        .then(data => { console.log(data);
        

        alert("Data Successfully inserted")
        returning()
        
    });
        


}

function returnscan(){

    fetch('/confirmreturn')
    .then(res => res.json())
    .then(data => {
      alert(JSON.stringify(data) + studentid + name + email + institute + contact + dateB + dateR);
        showCButton();
    });



}






function test(){
    let studentid = document.getElementById("StudentID").value;
    let name = document.getElementById("Name").value;
    let email = document.getElementById("Email").value;
    let institute = document.getElementById("Institute").value;
    let contact = document.getElementById("Contact").value;
    let dateB = document.getElementById("dateBorrowed").value;
    let dateR = document.getElementById("dateReturn").value;
    fetch('/test')
    .then(res => res.json())
    .then(data => {

        // show data
        alert(JSON.stringify(data) + studentid + name + email + institute + contact + dateB + dateR);
        showCButton();
    });
}
function closeForm(formId) {
    document.getElementById(formId).style.display = "none";
}
function openForm(formId) {
    document.getElementById(formId).style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
    let today = new Date().toISOString().split('T')[0];
    let returnDateObj = new Date(today);
    returnDateObj.setDate(returnDateObj.getDate() + 7)
    document.getElementById("dateBorrowed").value = today;
    document.getElementById("dateReturn").value = returnDateObj.toISOString().split('T')[0];
});

function qrmaker(){
    fetch('/qrmaker' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category: category, type: type })
        })
    }
function test1(){
    alert("Hello world")

}

function returning(){
    
    window.location.href = "/returning";

}

function borrowin(){
    let name ="";


}

//variable for borrowing
function borrowform(){
        let name = document.getElementById("Name").value;
        let email = document.getElementById("Email").value;
        let StudentID = document.getElementById("StudentID").value;
        let Institute = document.getElementById("Institute").value;
        let Conctact = document.getElementById("Contact").value;
        let dateB = document.getElementById("dateBorrowed").value;
        let dateR = document.getElementById("dateReturn").value;
        
        if (!name || !email || !StudentID || !Institute || !Conctact || !dateB || !dateR) {
            alert("Please fill in all fields.");
            
            return;
        }




    

}


function confirmReturn(){

    fetch('/updatereturn', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            items: returningItems
        })

    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

    });

}

function ItemReturning(items){

    let html = "";

    items.forEach(item => {

        html += `
            <div class="item">
                ${item.Type} borrowed by ${item.BorrowerName}
            </div>
        `;

    });

    document.getElementById("itemBox").innerHTML = html;

}

function manualReturn() {
    let studentId = document.getElementById("studentId").value;
    let code = document.getElementById("code").value;

    fetch('/manualReturn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            studentId: studentId,
            code: code
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);

        if (data.item) {
            document.getElementById("itemBox").innerHTML =
                `<p>${data.item}</p>`;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Request failed.");
    });
}



function returns(){

    fetch('/confirmreturn')

    .then(res => res.json())

    .then(data => {

        returningItems = data.items;

        let html = "";

        data.items.forEach(item => {

            html += `
                <div class="item">
                    ${item.Type} borrowed by ${item.BorrowerName}
                </div>
            `;

        });

        document.getElementById("itemBox").innerHTML = html;

    });

}



//item box for borrowing
function loadItems(){
    fetch('/items')
    .then(res => res.json())
    .then(data => {

        let html = "";

        data.items.forEach(item => {
    html += `
        <div class="item">
           ${item.Type} with code ${item.Code}
        </div>
    `;
})
})
};



function showCButton() {
    document.getElementById("confirmBtn").style.display = "block";
}

function modifyRecord(id) {
    window.location.href = "/modify/" + id;
}

const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const preview = document.getElementById("preview");
const previewContainer = document.getElementById("previewContainer");

let photos = [];
let imageData = "";
preview.src = imageData;

// Open camera
navigator.mediaDevices.getUserMedia({
    video: true
}).then(stream => {
    video.srcObject = stream;
});

function takePhoto() {

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/jpeg");

    photos.push(image);

    renderPhotos();
}
// Upload photo
function uploadPhotos(){

    fetch("/savephotos",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            
            images: photos
        })

    })
    .then(res=>res.json())
    .then(data=>{
        alert(data.message);
    });

}

function renderPhotos() {

    previewContainer.innerHTML = "";

    photos.forEach((photo, index) => {

        previewContainer.innerHTML += `
            <div class="photo-card">
                <img src="${photo}" width="150">

                <br>

                <button onclick="removePhoto(${index})">
                    ❌ Remove
                </button>
            </div>
        `;

    });

}

function removePhoto(index) {

    photos.splice(index, 1);

    renderPhotos();

}


function confirmCreate(){

    let name = document.getElementById("createName").value;
    let password = document.getElementById("createPassword").value;

    if (!name || !password) {
        alert("Please fill in all fields.");
        return;
    }

    fetch('/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
    })
    .then(res => res.json())
    .then(data => {

        if (data.success) {
            alert('User created successfully');
            window.location.href = '/dashboard';
        }})
    }


function logout(){

window.location.href = "/";

}



function checkID() {

    let studentID = document.getElementById("studentID").value;

    if (studentID === "") {
        alert("Please enter Student ID.");
        return;
    }

    fetch(`/get_student/${studentID}`)
        .then(response => response.json())
        .then(data => {

            document.getElementById("checkID").style.display = "none";
            document.getElementById("borrowForm").style.display = "block";

            document.getElementById("StudentID").value = studentID;

            if (data.success) {

                
                document.getElementById("studentID").value = data.studentID;
                document.getElementById("Name").value = data.name;
                document.getElementById("Email").value = data.email;
                document.getElementById("Institute").value = data.department;
                document.getElementById("Contact").value = data.contact;
                document.getElementById("approvedBy").value = data.approvedBy;

            } else {

                
                document.getElementById("Name").value = "";
                document.getElementById("Email").value = "";
                document.getElementById("Institute").value = "";
                document.getElementById("Contact").value = "";

            }
           

        })



        .catch(error => {
            console.error("Error:", error);
        });



}

//manage account


function manageAccount() {
    fetch('/manageAccount')
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                alert("Failed to load accounts.");
                return;
            }

            const tbody = document.getElementById("accountTableBody");
            tbody.innerHTML = ""; 

            data.users.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.UserID}</td>
                    <td>${user.Name}</td>
                    <td>${user.Status}</td>
                    <td><button onclick="openUserDetails('${user.UserID}')">Manage</button></td>
                `;
                tbody.appendChild(row);
            });

            openForm("manageAccount");
        })
        .catch(error => console.error(error));
}

function openUserDetails(userID) {
    fetch(`/get_user/${userID}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById("userID").value = data.userID;
                document.getElementById("userName").value = data.name;
                document.getElementById("userPassword").value = data.password;
                document.getElementById("userStatus").value = data.status;

                openForm("manageUserDetails");
            } else {
                alert("User not found.");
            }
        })
        .catch(error => console.error(error));
}

function saveUserChanges() {
    const payload = {
        userID: document.getElementById("userID").value,
        name: document.getElementById("userName").value,
        password: document.getElementById("userPassword").value,
        status: document.getElementById("userStatus").value
    };

    fetch(`/update_user/${payload.userID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("User updated.");
                closeForm("manageUserDetails");
                manageAccount();
            } else {
                alert("Update failed.");
            }
        })
        .catch(error => console.error(error));
}

//analytics graph
/* =========================================================
   LABORATORY INVENTORY SEARCH
   ========================================================= */

function searchInventory() {

    const searchInput = document
        .getElementById("inventorySearch")
        .value
        .toLowerCase()
        .trim();

    const categories = document.querySelectorAll(
        ".inventory-category"
    );

    let totalMatches = 0;


    /* =====================================================
       CHECK EVERY CATEGORY
       ===================================================== */

    categories.forEach(function(category) {

        const rows = category.querySelectorAll(
            ".inventory-table tbody tr"
        );

        /*
         * CHECK IF THE SEARCH TERM MATCHES
         * THIS CATEGORY'S HEADER (e.g. "Toxic Chemicals").
         * Emoji and other symbols are stripped out first
         * so only the actual text is compared.
         */

        const headerElement = category.querySelector(
            ".category-header h3"
        );

        const categoryName = headerElement
            ? headerElement.textContent
                .replace(/[^\p{L}\p{N}\s]/gu, "")
                .toLowerCase()
                .trim()
            : "";

        const categoryHeaderMatches =
            searchInput !== "" &&
            categoryName.includes(searchInput);

        let categoryMatches = 0;


        /* =================================================
           CHECK EVERY ITEM
           ================================================= */

        rows.forEach(function(row) {

            const itemName = row
                .querySelector("td:first-child")
                .textContent
                .toLowerCase()
                .trim();

            /*
             * SHOW THE ROW IF:
             * - the item name matches, OR
             * - the whole category header matches
             *   (in which case every row in it counts).
             */

            if (
                itemName.includes(searchInput) ||
                categoryHeaderMatches
            ) {

                row.style.display = "";

                categoryMatches++;

                totalMatches++;

            } else {

                row.style.display = "none";

            }

        });


        /* =================================================
           HIDE CATEGORY IF NO ITEM MATCHES
           ================================================= */

        if (categoryMatches === 0) {

            category.style.display = "none";

        } else {

            category.style.display = "";

        }


        /* =================================================
           UPDATE CATEGORY COUNT
           ================================================= */

        const countElement = category.querySelector(
            ".category-visible-count"
        );

        if (countElement) {

            countElement.textContent = categoryMatches;

        }

    });


    const noResult = document.getElementById(
        "noInventoryResult"
    );

    const searchResult = document.getElementById(
        "searchResult"
    );


    /* =====================================================
       EMPTY SEARCH
       ===================================================== */

    if (searchInput === "") {

        categories.forEach(function(category) {

            category.style.display = "";


            const rows = category.querySelectorAll(
                ".inventory-table tbody tr"
            );


            rows.forEach(function(row) {

                row.style.display = "";

            });


            const countElement = category.querySelector(
                ".category-visible-count"
            );

            if (countElement) {

                countElement.textContent = rows.length;

            }

        });


        searchResult.innerHTML =
            "Showing all laboratory inventory items.";

        noResult.style.display = "none";

        return;
    }


    /* =====================================================
       DISPLAY SEARCH RESULTS
       ===================================================== */

    if (totalMatches > 0) {

        searchResult.innerHTML =
            "Found <strong>" +
            totalMatches +
            "</strong> matching item" +
            (totalMatches !== 1 ? "s" : "") +
            ".";

        noResult.style.display = "none";

    } else {

        searchResult.innerHTML =
            "No inventory items match <strong>\"" +
            searchInput +
            "\"</strong>.";

        noResult.style.display = "block";

    }

}