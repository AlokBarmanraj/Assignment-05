// input-search
const inputSearch = document.getElementById("input-search")

// all issues
const allIssuesCount = document.getElementById("all-issues-count");
// all btn
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

// all api card 
const allApiCard = document.getElementById("all-api-card");
// loading spinner
const loadingSpinner = document.getElementById("loading-spinner");
// modalDeals
const modalCard =document.getElementById("modal-card");


// labels
const createLabels = (arr) =>{

    const labels = arr.map ((el) =>`<span class="btn bg-[#FFF8DB] rounded-3xl text-[#D97706]">${el.toUpperCase()}</span>`);
    return (labels.join(" "));
}


// Search btn
document.getElementById ("search-btn").addEventListener("click", () =>{
    const searchValue = inputSearch.value.trim().toLowerCase();
    fetch (`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then ((res) => res.json())
    .then ((data) => {
        const allWords = data.data;
        // const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));
        displayApi(allWords);
        issuesLength(allWords);
    });

});




// issues length

const issuesLength = ( arr) => {
    allIssuesCount.innerText = `${arr.length} Issues`
}

// btn 
const allActiveBtn = (activeBtn) => {
    allBtn.classList.remove("btn-primary");
    openBtn.classList.remove("btn-primary");
    closedBtn.classList.remove("btn-primary");
    activeBtn.classList.add("btn-primary")
};


// btn function
// open btn
async function showOpenCard(){
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const openIssues =  data.data.filter(card => card.status ==="open");
    // console.log(openIssues);
    displayApi(openIssues);
    issuesLength(openIssues);
    allActiveBtn(openBtn);
}

// Closed btn
async function showClosedCard(){
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const closedIssues =  data.data.filter(card => card.status ==="closed");
    // console.log(closedIssues);
    displayApi(closedIssues);
    issuesLength(closedIssues);
    allActiveBtn(closedBtn);
}

allBtn.addEventListener ("click", () =>{
    loadAllCard()
    allActiveBtn(allBtn);
});
openBtn.addEventListener ("click", () =>{
    showOpenCard()
});
closedBtn.addEventListener ("click", () =>{
    showClosedCard()
});


// Dynamic upload all api card

async function loadAllCard (){
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const apiData = await res.json();
    loadingSpinner.classList.add("hidden");
    issuesLength(apiData.data);
    displayApi(apiData.data);
}
const displayApi = (cardApi) =>{
    allApiCard.innerHTML =" ";
    cardApi.forEach((card) => {
        const apiCard = document.createElement("div");
        // status color 
        let borderColor;
        let bgColor; 
        if(card.status === "closed"){
            borderColor = "border-t-[#A855F7]";
            bgColor = "bg-[#A855F7]";
        }
        else{
            borderColor = "border-t-[#00A96E]";
            bgColor = "bg-[#00A96E]";
        }

        apiCard.className =`bg-white p-5 shadow-2xl rounded-lg border-t-4 ${borderColor}`;

        apiCard.innerHTML =`
            <div onclick="loadModal(${card.id})" class="space-y-3">
                <div class="flex justify-between">
                    <div class="w-8 h-8 rounded-full ${bgColor} flex justify-center items-center">
                        <i class="fa-regular fa-circle-check text-white"></i>
                    </div>
                    <div class="btn bg-[#FEECEC] px-8 rounded-3xl">
                        <button class="text-[#EF4444]">${card.priority.toUpperCase()}</button>
                    </div>
                </div>

                <h3 class="text-xl font-semibold">${card.title}</h3>
                <p class="line-clamp-2 text-slate-500">${card.description}</p>
                <div class="flex gap-2">
                    <div class="">${createLabels(card.labels)}</div>
                </div>
                <hr class="border border-slate-300">
                <div>
                    <p class="text-slate-500"> #${card.id} by ${card.author}</p>
                    <p class="text-slate-500">${card.createdAt}</p>
                </div>
            </div>
        `  
        allApiCard.appendChild(apiCard)
        
    });
}
loadAllCard ();



// modal function
const loadModal = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const modalDeals = await res.json();
    mobileWordDetails(modalDeals.data);
};

const mobileWordDetails = (word) => {
    // console.log(word);
            let modalBtnStatusColor; 
        if(word.status === "closed"){
            modalBtnStatusColor = "bg-[#A855F7]";
        }
        else{
            modalBtnStatusColor = "bg-[#00A96E]";
        }
    modalCard.innerHTML =`
    
                            <h1 class="text-3xl font-bold">${word.title}</h1>
                        <div class="flex items-center gap-2">
                            <span class="btn text-white ${modalBtnStatusColor} rounded-3xl">${word.status.toUpperCase()}</span>
                            <p class="text-slate-500">. Opened by ${word.author}</p>
                            <p class="text-slate-500">. ${word.createdAt}</p>
                        </div>
                        <div class="flex gap-2">
                        <div class="">${createLabels(word.labels)}</div>
                        </div>
                        <p class="line-clamp-2 text-slate-500">${word.description}</p>
                        <div class="flex space-x-56 bg-[#F8FAFC] rounded-2xl p-4">
                            <div>
                                <p class="text-slate-500">Assignee:</p>
                                <h2 class="text-xl font-semibold">${word.assignee.toUpperCase()}</h2>
                            </div>
                            <div>
                                <p class="text-slate-500">Priority:</p>
                                <span class="btn text-white bg-[red] rounded-3xl">${word.priority.toUpperCase()}</span>
                            </div>

                        </div>
    `;
    document.getElementById ("my_modal_5").showModal()
}