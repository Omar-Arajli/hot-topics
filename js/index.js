// GET THE REFERENCES
const container = document.querySelector('.dynamic-data');
const links = document.querySelectorAll('nav a');
let url = "partials/content-article.xml";

// load content and create markup:
function loadContent(urlFeed) {

    fetch(urlFeed)
        .then(function (rsp) {
            if (rsp.ok) {
                return rsp.text();
            }

            throw new Error(rsp.statusText);
        })
        .then(function (xmlString) {
            let contentType = 'text/xml';
            let parser = new DOMParser();
            let xmlDOM = parser.parseFromString(xmlString, contentType);


            let subjects = xmlDOM.querySelectorAll('subject');
            
            // This is the XML object:
            console.log(subjects);

            // Here is the place to create the markup content
            // using loaded XML object
            preContent = document.querySelectorAll('.portfolio-card');
            preContentArt = document.querySelectorAll('.subject');

            if (preContent != null){
                console.log(preContent);
                preContent.forEach(e => e.remove());
              
            }
            if (preContentArt != null){
                console.log(preContentArt);
                preContentArt.forEach(e => e.remove());
                    
            
            }

            for (let i = 0; i < subjects.length; i++) {


                let a = subjects[i];
                let b = a.children;
                let div = document.createElement('div');
                let h2 = document.createElement('h2');
                let img = document.createElement('img');
                let figCap = document.createElement('figcaption');
                let fig = document.createElement('figure');
                let p = document.createElement('p');
                let hr = document.createElement('hr');


                for (c of b) {

                    if (c.nodeName == "portfolio") {
                        div.setAttribute("class", c.textContent);
                        container.appendChild(div);
                    }
                    if (c.nodeName == "article") {
                        div.setAttribute("class", c.textContent);
                        container.appendChild(div);
                    }
                    
                    if (c.nodeName == "portfolio") {
                        div.setAttribute("class", c.textContent);
                        container.appendChild(div);
                    }

                    if (c.nodeName == "title") {
                        h2.innerText = c.textContent;
                        div.appendChild(h2);
                        container.appendChild(div);
                    }

                    if (c.nodeName == "img-href") {
                        img.setAttribute("src", c.textContent);
                        img.setAttribute("alt", c.textContent);
                        fig.appendChild(img);

                    }

                    if (c.nodeName == "img-caption") {
                        figCap.innerText = c.textContent;
                        fig.appendChild(figCap);
                        div.appendChild(fig);
                        container.appendChild(div);

                    }

                    if (c.nodeName == "content") {
                        p.innerText = c.textContent;
                        div.appendChild(p);
                        div.appendChild(hr);
                        container.appendChild(div);
                    }


                }

        }})
        .catch(function (err) {
            console.log(err.message);
        });

}


// CALL loadContent for the initial load: 
loadContent(url);

// This is the place where you update the URL value
function getUrl(e) {
    e.preventDefault();
    url = e.target.href;
    console.log(url);
    // Call the function loadContent to load the 
    // updated content:
    loadContent(url);
    
}

// Make the links event-target objects
for (let link of links) {
    link.addEventListener('click', getUrl);
}