const cafelist= document.querySelector('#cafe-list');
const form=document.querySelector("#add-cafe-form");
// create element and render cafe
function rendercafe(doc){
    let li=document.createElement('li');
    let name=document.createElement('span');
    let city=document.createElement('span');
    let cross=document.createElement('div');
    // setting the document id from firestore
    li.setAttribute('data-id',doc.id);
    name.textContent=doc.data().name;
    city.textContent=doc.data().city;
    cross.textContent='x';
    //appending
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafelist.appendChild(li);
    //Deleting Data
    cross.addEventListener('click', (e)=>{
        e.stopPropagation(); //stopd the event from bubbling up
        let id=e.target.parentElement.getAttribute('data-id'); //to get the id
        db.collection('cafes').doc(id).delete();
    })
}


//Getting Data
db.collection('cafes').get().then((snapshot) =>{
    snapshot.docs.forEach(doc =>{
        console.log(doc.data());
        rendercafe(doc);
    })
    console.log(snapshot.docs);
})  

//Saving Data
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('cafes').add({
        name:form.name.value,
        city:form.city.value

    })
    //to clear the adding info
    form.name.value='';
    form.city.value='';
})