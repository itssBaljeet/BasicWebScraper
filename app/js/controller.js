// Global Var for Selected URL
let selectedURL;
// Global var for Selected Tag
let selectedTag;
let urls = JSON.parse(localStorage.getItem('urls'));

function loadUrls(parsedURL) {
    if (parsedURL !== null) {
        let list = document.getElementById('url-list');
        parsedURL.forEach(url => {
            let newListItem = document.createElement('li');
            newListItem.textContent = url;
            // Adds event listener to every element that listens for a click
            newListItem.addEventListener('click', function() {
                // Remove 'selected' class from all list items
                let listItems = document.querySelectorAll('#url-list li');
                listItems.forEach(item => item.classList.remove('selected'));
                // Add 'selected' class to the clicked item
                this.classList.add('selected');
                selectedURL = this.textContent;
                window.myAPI.send('selectedURL', selectedURL)
                newListItem.classList.add("selected")
            })
            list.appendChild(newListItem)
        })
    } else {
        urls = [];
    }
}

loadUrls(urls);

// Regex pattern that looks for most compenents that can be part of a URL.
const isURL = (testURL) => {
    let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?'+ // port
        '(\\/[-a-z\\d%_.~+]*)*'+ // path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if(urlPattern.test(testURL)) {
        console.log("Valid URL");
        return true;
    } else {
        console.log("Invalid URL");
        return false;
    }
}

// Takes signal from URL Submit button; Adds url to array and list item if valid URL
document.getElementById('url-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let newUrl = document.getElementById('url-input').value
    urls = JSON.parse(localStorage.getItem('urls'));

    if (urls === null){
        urls = [];
    }
    // Adds to url-list if url-input  not empty & is verified to be a url
    if (newUrl !== '' && isURL(newUrl)) {
        // Add url-input.value to array
        urls.push(newUrl);
        let list = document.getElementById('url-list')
        let newListItem = document.createElement('li')
        newListItem.textContent = newUrl
        newListItem.addEventListener('click', function(event) {
            // Remove 'selected class from all list items
            let listItems = document.querySelectorAll('#url-list li');
            listItems.forEach(item => item.classList.remove('selected'));
            // Add 'selected' class to the clicked item
            this.classList.add('selected');
            selectedURL = this.textContent;
            window.myAPI.send('selectedURL', selectedURL)
            newListItem.classList.add("selected")
        })
        list.appendChild(newListItem)
        document.getElementById('url-input').value = ''
    }
    localStorage.setItem('urls', JSON.stringify(urls));
  });

// Clears selected url from list and array; Signal from Clear Selected URL
document.getElementById('clear-selected').addEventListener('click', function(event) {
    event.preventDefault();
    // Gets index of URL inside urls array
    let index = urls.indexOf(selectedURL);
    // Sets listItems to an Array containing all list items. 
    let listItems = Array.from(document.querySelectorAll('li'));
    // Finds selectedURL inside of listItems; sets it to listItem
    let listItem = listItems.find(li => li.textContent.includes(selectedURL));
    // If listItem exists, remove it
    if (listItem) {
        listItem.remove();
    }
    // If index is not -1 (which means it IS in the array), start at the index and delete it
    if (index != -1) {
        urls.splice(index, 1)
    }
    localStorage.setItem('urls', JSON.stringify(urls));
})

// Clears all elements in localstorage, list, and array; Signal from Clear Urls button
document.getElementById('clear').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.clear();
    document.getElementById('url-list').innerHTML = '';
    urls = [];
}) 

// Go! button listener
document.getElementById('go-button').addEventListener('click', function(event) {
    event.preventDefault();
    
    let selectedOption = document.getElementById('operation').value;

    if (selectedOption === 'load') {
        window.myAPI.send('sendURL', selectedURL)
    } else if (selectedOption === 'scrape') {
        window.myAPI.send('scrape')
    } else if (selectedOption === 'save') {
        
    }
})

document.getElementById('tag-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let newTag = document.getElementById('tag-input').value
    let list = document.getElementById('tag-list')
    let newTListItem = document.createElement('li')
    newTListItem.textContent = newTag
    newTListItem.addEventListener('click', function() {
        let tListItems = document.querySelectorAll('#tag-list li');
        tListItems.forEach(item => item.classList.remove('selected'));
        this.classList.add('selected');
        selectedTag = this.textContent;
    })
    list.append(newTListItem)
    document.getElementById('tag-input').value = ''
})