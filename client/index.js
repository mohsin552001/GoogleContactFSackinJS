
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5300/getAll')
        .then(res => res.json())
        .then(data => loadHTMLTable(data['data']));

    fetch('http://localhost:5300/getAllDivsdata')
        .then(res => res.json())
        .then(data => loadHTMLDataWithDivs(data['data']));


})

document.querySelector('table .tbody').addEventListener('click', function (event) {
    if (event.target.className === 'delete-row-btn') {
        deleteRowById(event.target.dataset.id)
    }
    if (event.target.className === 'edit-row-btn') {
        handleUpdateRow(event.target.dataset.id)
    }
})


let updatebtn = document.querySelector('#update-row-btn')
let editbutn = document.querySelector('.edit-row-btn')

function deleteRowById(id) {
    fetch('http://localhost:5300/delete/' + id, {
        method: 'DELETE'
    })
        .then((res) => res.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })

}

function handleUpdateRow(id) {
    let updatesection = document.querySelector('#update-row')
    updatesection.hidden = false
    document.querySelector('#update-name-input').dataset.id = id;
    document.querySelector('#update-email-input').dataset.id = id;
    document.querySelector('#update-phonenumber-input').dataset.id = id;
    document.querySelector('#update-company-input').dataset.id = id;
}

updatebtn.onclick = function () {

    let UpdateNameInput = document.querySelector('#update-name-input');
    let UpdateEmailInput = document.querySelector('#update-email-input');
    let UpdatephoneNumberInput = document.querySelector('#update-phonenumber-input');
    let UpdatejobAndCompInput = document.querySelector('#update-company-input');
    fetch('http://localhost:5300/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: UpdateNameInput.dataset.id,
            Name: UpdateNameInput.value,
            email: UpdateEmailInput.value,
            phoneNumber: UpdatephoneNumberInput.value,
            jobTitleAndComp: UpdatejobAndCompInput.value
        })
    }).then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload()
            }
        })

}

let addBtn = document.querySelector('#add-name-btn')

addBtn.onclick = function () {
    let nameInput = document.querySelector('#name-input');
    let emaiInput = document.querySelector('#email-input');
    let phoneNumberInput = document.querySelector('#phonenumber-input');
    let jobTitleAndCompInput = document.querySelector('#company-input');
    let email = emaiInput.value;
    let phoneNumber = phoneNumberInput.value;
    let jobTitleAndComp = jobTitleAndCompInput.value;
    let Name = nameInput.value;
    nameInput.value = "";
    emaiInput.value = "";
    phoneNumberInput.value = "";
    jobTitleAndCompInput.value = "";


    fetch('http://localhost:5300/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ Name: Name, email: email, phoneNumber: phoneNumber, jobTitleAndComp: jobTitleAndComp })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']))

}



function insertRowIntoTable(data) {
    let table = document.querySelector('table .tbody')
    let isTableData = document.querySelector('.no-data')


    let tableHtml = "<tr>"

    data.forEach(function ({ id, Name, email, phoneNumber, jobTitleAndComp }) {
        tableHtml += `<td class="idhide">${id}</td>`
        tableHtml += `<td>${Name}</td>`
        tableHtml += `<td>${email}</td>`
        tableHtml += `<td>${phoneNumber}</td>`
        tableHtml += `<td>${jobTitleAndComp}</td>`

        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`
        tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`
    });
    tableHtml += "</tr>";


    if (isTableData) {
        table.innerHTML = tableHtml;

    } else {
        const newRow = table.insertRow()
        newRow.innerHTML = tableHtml
    }
}
function loadHTMLTable(data) {
    let table = document.querySelector('table .tbody');

    if (data.length == 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data Found</td></tr>"

        return;
    }

    let tableHtml = ""
    data.forEach(function ({ id, Name, Date_added, email, phoneNumber, jobTitleAndComp }) {

        tableHtml += "<tr>";
        tableHtml += `<td class="idhide">${id}</td>`
        tableHtml += `<td>${Name}</td>`
        tableHtml += `<td>${email}</td>`
        tableHtml += `<td>${phoneNumber}</td>`
        tableHtml += `<td>${jobTitleAndComp}</td>`

        tableHtml += `<td><button  class="delete-row-btn" data-id=${id}>Delete</td>`
        tableHtml += `<td><button onclick="hideedit()" class="edit-row-btn" data-id=${id}>Edit</td>`
        tableHtml += "</tr>";
    })

    table.innerHTML = tableHtml
}



///javascript start  for google contacts


function hidesidebar() {
    let x = document.querySelector('#sidebar');
    if (x.style.display === 'block') {
        x.style.display = 'none'
    } else {
        x.style.display = 'block'
    }
}



function showsuggestcontact(event) {
    event.stopPropagation()
    let x = document.querySelector('.suggestcontact')
    x.classList.add('active');
}


document.addEventListener('click', () => {

    let z = document.querySelector('.suggestcontact')
    z.classList.remove('active');
})



function hideandshowinput(event) {
    event.stopPropagation();


    let input = document.querySelector('#search-input')



    input.classList.add('active')

}

document.addEventListener('click', () => {
    toshow()
})

function toshow() {

    let input = document.querySelector('#search-input')
    input.classList.remove('active')
}

function raisesearch() {
    let input = document.querySelector('#search-input')
    input.value = ''
    let cross = document.querySelector('.fa-times')
    cross.style.display = 'none'
}



function showcontact() {
    let x = document.querySelector('.contactus');
    let y = document.querySelector('table')
    y.style.display = 'none'
    x.classList.add('active');
}



function hideContact() {
    let x = document.querySelector('.contactus');
    let y = document.querySelector('table')
    y.style.display = 'block'
    x.classList.remove('active')
}

function hidecontacts(event) {
    event.stopPropagation()
    let x = document.querySelector('.contactus');
    x.style.display = 'none'

}



function hideedit() {
    let x = document.querySelector('#update-row');
    let y = document.querySelector('#contentsection')
    x.style.display = 'block'
    y.style.display = 'none'
}

//for show and hide cross

function showcross(event) {
    event.stopPropagation();


    let input = document.querySelector('#search-input')
    let cross = document.querySelector('.fa-times')
    if (input.value.length > 0) {
        cross.style.display = 'block'
    }
    else {
        cross.style.display = 'none'
    }
}

let searchbtn = document.querySelector('.fa-search')

searchbtn.onclick = function () {
    let searchValue = document.querySelector('#search-input').value;
    fetch('http://localhost:5300/search/' + searchValue)
        .then(res => res.json({ success: true }))
        .then(data => loadHTMLTable(data['data']))
}




// ///this is the second divs
// document.addEventListener('DOMContentLoaded', () => {
//     fetch('http://localhost:4000/getAllDivsdata')
//         .then(res => res.json())
//         .then(data => loadHTMLDataWithDivs(data['data']))

// })


let addbtn = document.querySelector('#add-btn-input')
document.querySelector('table .secondtbody').addEventListener('click', (event) => {
    if (event.target.className === "delete-row-button") {
        deleteRowById(event.target.dataset.id)

    }

    if (event.target.className === "edit-row-button") {
        editRowById(event.target.dataset.id)
    }
})



function deleteRowById(id) {
    fetch('http://localhost:5300/deleteDivs/' + id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })

}

let editbtn = document.querySelector('#edit-btn')
function editRowById(id) {
    let updateSection = document.querySelector('#edit-row');
    updateSection.hidden = false;
    document.querySelector('#edit-btn').dataset.id = id;
}


editbtn.onclick = function () {
    let editBtn = document.querySelector('#edit-btn');
    let nameUpdateInput = document.querySelector('#edit-name-input');
    console.log(nameUpdateInput.dataset.id)
    fetch('http://localhost:5300/updateDivsdata', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: editBtn.dataset.id,
            name: nameUpdateInput.value
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                location.reload()
            }
        })







}



addbtn.addEventListener('click', () => {
    let nameInput = document.querySelector('.name-input')

    let name = nameInput.value;
    alert(name)
    nameInput.value = ""

    fetch('http://localhost:5300/insertDivsdata', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: name })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']))


})



function insertRowIntoTable(data) {
    fetch('http://localhost:5300/deleteDivs/' + id, {
        method: 'DELETE',

    })
        .then(res => res.json())
        .then(data => console.log(data))
}



function loadHTMLDataWithDivs(data) {
    let table = document.querySelector('table .secondtbody');
    if (data.length == 0) {
        table.innerHTML = "<tr class='secondtr'> <td class='no-data' colspan='5'>No Data</td></tr > "
        return;
    }

    let tableHTML = ""
    console.log(data)
    data.forEach(function ({ id, name }) {

        tableHTML += `<tr class="secondtr">`
        tableHTML += `<td>${id}</td>`
        tableHTML += `<td>${name}</td>`

        tableHTML += `<td><button class="delete-row-button" data-id=${id}><i class="fa fa-trash" aria-hidden="true"></i></button></td>`
        tableHTML += `<td><button class="edit-row-button" data-id=${id}><i class="fa fa-pencil" aria-hidden="true"></i></button></td>`

    });

    table.innerHTML = tableHTML
}




//lable start script

function creatlable() {

    let showlableinput = document.querySelector('.savelable')

    showlableinput.style.display = 'block'
}

function hidelables() {
    let showlableinput = document.querySelector('.savelable')
    showlableinput.style.display = 'none'

}