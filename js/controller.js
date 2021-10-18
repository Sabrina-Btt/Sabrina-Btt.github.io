getAllPostPreviews();

function getAllPostPreviews() {
    const token = '99889c4615df0998580db3ff4e7a24';

    fetch(
        'https://graphql.datocms.com/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({
                query: `
                {
                    allPostpreviews(orderBy: _createdAt_DESC) {
                        title
                        subtitle
                        image {
                          url
                        }
                        description
                        relatedpost {
                          id
                        }
                    }
                }`
            }),
        }
    )
        .then(res => res.json())
        .then((res) => {
            
            if (res.data.allPostpreviews.length !== 0) {
                renderPostPreviews(res.data.allPostpreviews);
            } else {
                alert("Query Error! Could not get post previews from database!");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function renderPostPreviews(postPreviews) {
    postPreviews.map(elem => {
        console.log(elem);
        let listPostPreviews = document.getElementById("featured");
        if (!listPostPreviews)
            return;
        let htmlInsert = `
        <div class="card" onclick="getPost(${elem.relatedpost.id})">
            <h2  style="font-weight:bold">${elem.title}</h2>
            <h5  style="font-weight:bold">${elem.subtitle}</h5>
            <img class="post-img" src="${elem.image.url}">
            <p>${elem.description}</p>
        </div>
        `
       listPostPreviews.insertAdjacentHTML('beforeend', htmlInsert)
    })
}

function getPost(id){
    window.location.assign("../routes/post_page.html?id="+id);
 
}

