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
                    allPostpreviews(orderBy: _createdAt_ASC) {
                        title
                        subtitle
                        image {
                          url
                        }
                        description
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
        let listPostPreviews = document.getElementById("featured");
        if (!listPostPreviews)
            return;
        let htmlInsert = `
        <div class="card">
            <h2  style="font-weight:bold">${elem.title}</h2>
            <h5  style="font-weight:bold">${elem.subtitle}</h5>
            <div class="img"><img width="50%" style="border-radius: 10px;" src="${elem.image.url}"></div>
            <p>${elem.description}</p>
        </div>
        `
       listPostPreviews.insertAdjacentHTML('beforeend', htmlInsert)
    })
}