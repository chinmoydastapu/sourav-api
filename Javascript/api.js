function loadData() {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(response => response.json())
        .then(data => showData(data.data.tools))
}

function showData(cards) {
    console.log(cards);
    const cardsContainer = document.getElementById('cards-container');
    for (const card of cards) {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <div class="col">
                <div class="card h-100">
                    <img src="${card.image}" class="card-img-top" alt="...">
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
    }
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
            <div class="modal-body">
                <div>
                    ${data.description}
                    <div>
                        pricing
                    </div>
                    <div>
                        <div>
                            Features
                            <ul>
                                Features
                            </ul>
                        </div>
                        <div>
                            Integration
                            <ul>
                                Integrations
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <img src="${data.image_link[0]}" class="img-fluid">
                    title
                    description
                </div>
            </div>
        </div>
    `;
}

loadData();