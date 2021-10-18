function queryString(parameter) {  
    var loc = location.search.substring(1, location.search.length);   
    var param_value = false;   
    var params = loc.split("&");   
    for (i=0; i<params.length;i++) {   
        param_name = params[i].substring(0,params[i].indexOf('='));   
        if (param_name == parameter) {                                          
            param_value = params[i].substring(params[i].indexOf('=')+1)   
        }   
    }   
    if (param_value) {   
        return param_value;   
    }   
    else {   
        return undefined;   
    }   
}

var id = queryString("id");

getPostFromDB(id);


function getPostFromDB(id){
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
                    allPosts(filter: {id: {eq: ${id}}}) {
                        titulo
                        content {
                          ... on ImageRecord {
                            postimage {
                              url
                            }
                          }
                          ... on TextRecord {
                            posttext
                          }
                          ... on TitleRecord {
                            posttitle
                          }
                        }
                      }
                }`
            }),
        }
    )
    .then(res => res.json())
    .then((res) => {
        
        if (res.data.allPosts.length !== 0) {
            renderPosts(res.data.allPosts);
        } else {
            alert("Query Error! Could not get post previews from database!");
        }
    })
    .catch((error) => {
        console.log(error);
    });


}

function renderPosts(post){
    console.log(post[0].content)
    let renderPost = document.getElementById("featured");
    if (!renderPost)
            return;
    let htmlInsert = `
    <div class="card">
        <h1  style="font-weight:bold">${post[0].titulo}</h1>
        <h3 style="font-weight:bold">${post[0].content[0].posttitle}</h3>
        <p>${post[0].content[1].posttext}</p>
        <div class="img-container">
            <img class="post-img" src="${post[0].content[2].postimage.url}">
        </div>
        
    </div>
    `
    renderPost.insertAdjacentHTML('beforeend', htmlInsert)
}
