const getProfile = document.createElement('button');
getProfile.setAttribute('id', 'getProfile_btn');
getProfile.innerText = 'Get Profile';

document.body.append(getProfile);


const getProfileAction = document.querySelector('#getProfile_btn');
getProfileAction.onclick = function getProfileDetails() {
  fetch('https://uinames.com/api/?ext')
    .then((resp) => resp.json())
    .then((data) => {
      const person = data;
      console.log(person);
      const infoDiv = document.getElementById('popup');
      console.log('infoDiv: ', infoDiv);
      if (infoDiv.innerHTML) {
        infoDiv.innerHTML = '';
      }
      const div = document.createElement('div');
      div.setAttribute('id', 'info');
      const keys = Object.keys(person);
      for (const key of keys) {
        const p = document.createElement('p');
        p.setAttribute('id', key);
        if (person[key]) {
          if (key === 'birthday') {
            const t = document.createTextNode(`${key.toUpperCase()}: ${Object.values(person[key])[0]}`);
            p.append(t);
          }
          // else if (key === 'credit_card') {
          //   const ccV = Object.values(person[key]);
          //   const ti = document.createTextNode(`${key.toUpperCase()}: expiration: ${ccV[0]} number: ${ccV[1]}, pin: ${ccV[2]}, security: ${ccV[3]}`);
          //   p.append(ti);
          // }
          else if (key === 'photo') {
            const pp = document.createElement('img');
            pp.id = 'profile_picture';
            pp.setAttribute('src', `${person[key]}`);
            p.append(pp);
          } else if (key === 'name') {
            const t = document.createTextNode(`${key.toUpperCase()}: ${person[key]} ${data.surname}`);
            p.append(t);
          } else if (key === 'surname') {} else {
            const t = document.createTextNode(`${key.toUpperCase()}: ${person[key]}`);
            p.append(t);
          }
        }
        div.append(p);
      }
      document.getElementById('popup').appendChild(div);
    });
};
