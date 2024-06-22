window.onload = function() {
    populateSortby();

    document.getElementById("search-container").addEventListener("click", searchClicked);
    document.getElementById("search").addEventListener("blur", restoreSearch);
    document.getElementById("search").addEventListener("input", populateResults);
    document.getElementById("order-container").addEventListener("click", revealDropdown);
    document.getElementById("order-container").addEventListener("mouseleave", hideDropdown);
    document.getElementById("sortby-container").addEventListener("click", revealDropdown);
    document.getElementById("sortby-container").addEventListener("mouseleave", hideDropdown);
    document.getElementById("next").addEventListener("click", nextPage);
    document.getElementById("prev").addEventListener("click", prevPage);
}

function searchClicked() {
    this.firstElementChild.style.display = "none";
    this.lastElementChild.style.borderBottomLeftRadius = "0.5em";
    this.lastElementChild.style.borderTopLeftRadius = "0.5em";
}

function restoreSearch() {
    this.parentElement.firstElementChild.removeAttribute("style");
    this.parentElement.lastElementChild.removeAttribute("style");
}

let firstClick = true;
function revealDropdown() {
    let children = this.children;

    if (firstClick) {
        if (this == document.getElementById("order-container")) {
            this.firstElementChild.style.borderBottomRightRadius = "0";

            let bars = document.getElementsByClassName("vert-bar");
            bars.item(bars.length - 1).classList.add("inactive");

            let currWidth = this.getBoundingClientRect().width;
            this.style.width = (currWidth + 2.0) + "px"
        
        } else if (this == document.getElementById("sortby-container")) {
            let bars = document.getElementsByClassName("vert-bar");

            for (let i = 0; i < bars.length; i++) {
                bars.item(i).classList.add("inactive");
            }

            let currWidth = this.getBoundingClientRect().width;
            this.style.width = (currWidth + 4.0) + "px"
        }
    
        firstClick = false;
        for (let i = 0; i < children.length; i++) {
            let current = children[i];
            current.classList.remove("inactive");
            if (i == 0) {
                current.classList.add("revealed-top");
            } else if (i == children.length - 1) {
                current.classList.add("revealed-bottom");
            } else {
                current.classList.add("revealed-middle");
            }

            current.onclick = () => {
                let bars = document.getElementsByClassName("vert-bar");

                for (let i = 0; i < bars.length; i++) {
                    bars.item(i).classList.remove("inactive");
                }

                if (children.length > 2) {
                    if (current === children[children.length - 1]) {
                        children[children.length - 2].setAttribute("class", "option revealed-bottom");
                    }
                    children[0].setAttribute("class", "option revealed-middle");
                } else if (children.length <= 2) {
                    children[0].setAttribute("class", "option revealed-bottom");
                    children[0].removeAttribute("style");
                }
                    
                current.setAttribute("class", "option active revealed-top");

                this.insertBefore(current, children[0]);

                this.removeAttribute("style");
                for (let i = 0; i < this.children.length; i++) {
                    this.children[i].removeAttribute("style");
                    if (i == 0) {
                        this.children[i].setAttribute("class", "option active");
                        this.children[i].setAttribute("selected", "selected");
                    } else {
                        this.children[i].setAttribute("class", "option inactive");
                    }
                }
            }
        }
    } else {
        firstClick = true;
    }
}

function hideDropdown() {
    firstClick = true;

    let bars = document.getElementsByClassName("vert-bar");

    for (let i = 0; i < bars.length; i++) {
        bars.item(i).classList.remove("inactive");
    }

    this.removeAttribute("style");

    if (!this.children[1].classList.contains("inactive")) {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].removeAttribute("style");
            if (i == 0) {
                this.children[i].setAttribute("class", "option active");
                this.children[i].setAttribute("selected", "selected");
            } else {
                this.children[i].setAttribute("class", "option inactive");
            }
        }
    }
}

function populateSortby() {
    let sortby = document.getElementById("sortby-container");

    let url = new URL(window.location.href + "/fields");
    fetch(url)
        .then(response => response.text())
        .then(body => {
            let names = body.split(",");
            for (let i = 1; i < names.length; i++) {
                let button = document.createElement("button");
                
                let name = names[i].replace(/"|\[|\]/g, "");
                button.innerHTML = name;
                button.id = name;
                button.value = name;
                button.classList.add("option");
                if (i != 1) {
                    button.classList.add("inactive");
                }
                sortby.appendChild(button);
            }
        });
}

function fetchResults(parent) {
    let sortbySelected = document.getElementById("sortby-container").firstElementChild.value;
    let orderSelected = document.getElementById("order-container").firstElementChild.value;

    let url = new URL(window.location.href + "/responses");
    url.searchParams.append("query", parent.value);
    url.searchParams.append("sortby", sortbySelected);
    url.searchParams.append("order", orderSelected);

    if (parent.value != "") {
        // TODO: this
        let encoded = encodeURI(url);
        console.log(encoded);
        return fetch(encoded).then(response => response.json());
    }
}

function showLoading() {
    
    let resultsContainer = document.getElementById("results-container");
    resultsContainer.firstElementChild.style.display = "none";

    let loading = document.getElementById("loading");
    loading.classList.remove("inactive");
}

function hideLoading() {
    let resultsContainer = document.getElementById("results-container");
    resultsContainer.firstElementChild.removeAttribute("style");

    let loading = document.getElementById("loading");
    loading.classList.add("inactive");
}

let pageMap = new Map();
let results;
let currentPageNum = 0;
async function populateResults() {
    showLoading();
    results = await fetchResults(this);
    hideLoading();

    createPageNums();
    
    if (results != undefined && results.length > 0) {
        if (currentPageNum === 0) {
            currentPageNum = 1;
        }

        let pointer = 0;
        for (let i = 0; i < Math.ceil(results.length / 3.0); i++) {
            pageMap.set(i + 1, createResults(pointer, pointer + 3));
            pointer += 3;
        }
    } else {
        currentPageNum = 0;
        pointer = 0;

        if (pageMap.size === 0) {
            let noResults = document.getElementById("no-results");
            pageMap.set(currentPageNum, noResults);
        } else {
            let newMap = new Map();
            newMap.set(currentPageNum, pageMap.get(currentPageNum));
            pageMap = newMap;

            let pages = document.getElementById("pages");
            let newPages = document.createElement("div");

            newPages.id = "pages";
            pages.replaceWith(newPages);
        }
    }

    let container = document.getElementById("results-container");
    let div = pageMap.get(currentPageNum);

    if (!container.firstElementChild.isEqualNode(div)) {
        container.firstElementChild.replaceWith(div);
    }
} 

function createResults(startIndex, endIndex) {
    let resultsDiv = document.createElement("div");
    resultsDiv.id = "results";

    for (let i = startIndex; i < endIndex; i++) {
        if (results[i] === undefined) {
            break;
        }

        let result = JSON.parse(results[i]);
        delete result._id;
        delete result._class;

        let resultDiv = document.createElement("div");
        resultDiv.classList.add("result");

        for (let key in result) {
            let text = document.createElement("p");
            text.innerHTML = `<span>${key}</span>: ${result[key]}`;
            resultDiv.appendChild(text);
        }

        resultsDiv.appendChild(resultDiv);
            
        if (resultsDiv.children.length < 4) {
            let divider = document.createElement("div");
            divider.classList.add("divider");
            resultsDiv.appendChild(divider);
        }
    }

    return resultsDiv;
}

function createPageNums() {
    let numPages = (results != null) ? Math.ceil(results.length / 3) : 0;
    let pages = document.getElementById("pages");

    currentPageNum = 1;

    if (numPages >= 5) {
        let pageIcons = [];

        pageIcons.push("1");
        pageIcons.push("2");
        pageIcons.push("3");
        pageIcons.push("...");
        pageIcons.push(numPages);

        for (let i = 0; i < pageIcons.length; i++) {
            let newElement;

            if (pageIcons[i] === "...") {
                newElement = document.createElement("span");

                newElement.innerHTML = pageIcons[i];
            } else {
                newElement = document.createElement("button");

                newElement.innerHTML = pageIcons[i];
                newElement.id = "page-" + pageIcons[i];

                if (Number(pageIcons[i]) === currentPageNum) {
                    newElement.classList.add("active-page");
                }

                newElement.onclick = () => {
                    replacePage(Number(pageIcons[i]));
                }
            }

            pages.appendChild(newElement)
        }
    } else {
        for (let i = 0; i < numPages; i++) {
            let pageElement = document.createElement("button");
            pageElement.innerHTML = i + 1;
            pages.appendChild(pageElement);
        }
    }
}

function replacePage(pageNum) { 
    let oldActiveButton = document.getElementsByClassName("active-page");
    oldActiveButton[0].classList.remove("active-page");

    updatePageNums((pageNum > currentPageNum));
    
    let newActiveButton = document.getElementById("page-" + pageNum);
    newActiveButton.classList.add("active-page");

    let container = document.getElementById("results-container");
    container.firstElementChild.replaceWith(pageMap.get(pageNum));

    currentPageNum = pageNum;
}

function updatePageNums(forwards) {
    let currentPageNumElement = document.getElementById("page-" + currentPageNum);

    if (forwards) {
        if (currentPageNumElement.nextElementSibling.innerHTML === "...") {
            if (currentPageNumElement.parentElement.childElementCount == 7) {
                let current = currentPageNumElement;
                for (let i = 2; i >= 0; i--) {
                    current.innerHTML = currentPageNum + i;
                    current.id = "page-" + current.innerHTML;
                    current = current.previousElementSibling;
                }
            } else {
                let prevReplacement = document.createElement("span");
                let nextElement = document.createElement("button");
                let nextNextElement = document.createElement("button");
    
                prevReplacement.innerHTML = "...";
                nextElement.innerHTML = currentPageNum + 1;
                nextNextElement.innerHTML = currentPageNum + 2;
                nextElement.id = "page-" + nextElement.innerHTML;
                nextNextElement.id = "page-" + nextNextElement.innerHTML;
    
                nextElement.onclick = () => {
                    replacePage(Number(pageIcons[i]));
                }
    
                nextNextElement.onclick = () => {
                    replacePage(Number(pageIcons[i]));
                }
    
                currentPageNumElement.previousElementSibling.replaceWith(prevReplacement);
                currentPageNumElement.insertAdjacentElement("afterend", nextElement);
                nextElement.insertAdjacentElement("afterend", nextNextElement);
            }
        }
    } else {
        if (currentPageNumElement.nextElementSibling.innerHTML === "...") {

        }
    }
}

function nextPage() {
    if (currentPageNum + 1 < Math.ceil(results.length / 3) + 1) {
        replacePage(currentPageNum + 1)
    }
}

function prevPage() {
    if (currentPageNum - 1 > 0) {
        replacePage(currentPageNum - 1);
    }
}