const loadPhones = (searchText, dataLimit) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displyPhones(data.data, dataLimit));
}
const displyPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-item');
    phoneContainer.textContent = '';
    // disply 10 phones only
    const showPhone = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showPhone.classList.remove('d-none');
    }
    else {
        showPhone.classList.add('d-none');
    }

    // disply no phones found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }

    // disply all phones
    phones.forEach(phone => {

        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `

                    <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                                content. This content is a little bit longer.</p>
                                <button onclick= "loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary"data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                        </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneDiv);

    });
    // stop spainer or loder
    toggleSpainer(false);
}
const procesSearch = (dataLimit) => {
    toggleSpainer(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}
document.getElementById('btn-search').addEventListener('click', function () {
    procesSearch(10);
})

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        procesSearch();
    }
});

const toggleSpainer = isloading => {
    const stopLoder = document.getElementById('loder');
    if (isloading) {
        stopLoder.classList.remove('d-none')
    }
    else {
        stopLoder.classList.add('d-none')
    }
}
document.getElementById('btn-show-all').addEventListener('click', function () {
    procesSearch();
})

const loadPhoneDetails = id => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => displyPhoneDetails(data.data));

}

const displyPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phnoeModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information'}</p>
    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth: 'No Bluetooth Information'}</p>
    
    `
}

loadPhones('apple');