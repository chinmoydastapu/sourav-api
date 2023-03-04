function loadData() {
    loading(true);

    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(response => response.json())
        .then(data => showData(data.data.tools))
}

function showData(cards) {
    // console.log(cards);
    const firstCards = cards.slice(0, 6);
    // console.log(firstCards);
    showCards(firstCards);

    document.getElementById('see-more-btn').addEventListener('click', function () {
        loading(true);
        const remainingCards = cards.slice(6, cards.length);
        showCards(remainingCards);
        document.getElementById('see-more-btn').classList.add('d-none');
    })
}

function openModal(id) {
    const url = (id < 10) ?
        `https://openapi.programming-hero.com/api/ai/tool/0${id}` :
        `https://openapi.programming-hero.com/api/ai/tool/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => modalData(data.data));
}

function modalData(data) {
    console.log(data);
    const cardModal = document.getElementById('card-modal');

    cardModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="cardModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body row row-cols-1 row-cols-lg-2">
                <div class="">
                    ${data.description}
                    <div class="d-flex gap-3 justify-content-around">
                        <div class="border">
                            ${data.pricing ? data.pricing[0].price !== "No cost" ? data.pricing[0].price : "Free of Cost" : 'Free of Cost'}
                        </div>
                        <div class="border">
                            ${data.pricing ? data.pricing[1].price !== "No cost" ? data.pricing[1].price : "Free of Cost" : 'Free of Cost'}
                        </div>
                        <div class="border">
                            ${data.pricing ? data.pricing[2].price !== "No cost" ? data.pricing[2].price : "Free of Cost" : 'Free of Cost'}
                        </div>                      
                    </div>
                    <div>
                        <div>
                            Features
                            <ul>
                                ${data.features[1] ? `<li>${data.features[1].feature_name}</li>` : ''}
                                ${data.features[2] ? `<li>${data.features[2].feature_name}</li>` : ''}
                                ${data.features[3] ? `<li>${data.features[3].feature_name}</li>` : ''}
                                ${data.features[4] ? `<li>${data.features[4].feature_name}</li>` : ''}
                            </ul>
                        </div>
                        <div>
                            Integration
                            <ul>
                                <li>${data?.integrations?.length > 0 ? data.integrations.join('<li>') : 'No data found'}
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="position-relative text-center">
                    <img src="${data.image_link[0]}" class="img-fluid w-100" style="height: 40vh;">

                    ${data.accuracy.score !== null ? `<button class="btn btn-danger disabled position-absolute top-0 end-0">${data.accuracy.score * 100}% Accuracy</button>` : ''}
                    
                    <h5 class="pt-3 pb-2">${data.input_output_examples ? data?.input_output_examples[0]?.input : 'Can you give any example?'}</h5>
                    <p>${data.input_output_examples ? data?.input_output_examples[0]?.output : 'No! Not yet! Take a break!!!'}</p>
                </div>
            </div>
        </div>
    `;
}

function loading(data) {
    if (data) {
        document.getElementById('spinner').classList.remove('d-none');
    } else {
        document.getElementById('spinner').classList.add('d-none');
    }
}

// ShowMore
function showCards(cards) {
    const cardsContainer = document.getElementById('cards-container');
    for (const card of cards) {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <div class="col">
                <div class="card h-100">
                    <img src="${card.image}" class="card-img-top"  alt="...">
                    <h4>Features</h4>
                    <ol type="1">
                        <li>${card.features[0]}</li>
                        <li>${card.features[1]}</li>
                        <li>${card.features[2]}</li>
                    </ol>
                    <hr class="container w-75 mx-auto">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">${card.name}</h5>
                            <p class="card-text">${card.published_in}</p>
                        </div>
                        <div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cardModal" onclick="openModal(${card.id})">X</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardsContainer.appendChild(cardDiv);
        loading(false);
    }
}

loadData();

// ${"<li>" + data.features[1].feature_name + "</li><li>" + data.features[2].feature_name + "</li><li>" + data.features[3].feature_name + "</li><li>" + data?.features[4]?.feature_name + "</li>"}