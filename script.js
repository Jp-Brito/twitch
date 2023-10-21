const lives = [
  ['jonvlogs', '00e7ebf9-89b9-41e1-b2bc-263b0ce805d0'],
  ['diegogelio_', '2211765a-e752-4812-9b53-84af4b9f9d31'],
  ['tiliaoficial', '236567d4-b236-47e6-aa2f-81e2d0af76c3'],
  ['meikodrj', '9581207b-7255-4616-bfd0-4471a2e9de9e'],
  ['maumauzk_ofc', '829be78d-edcf-4c69-a30a-d6d73003744f', 'maumauzk01'],
  ['cabritoz', 'e536cf88-fc55-4438-941b-b228ab82166d', 'cabritoz']
];
const tamanholist = lives.length

const livescontainer = document.getElementById("livesprofile");
async function createLives() {
  lives.forEach((item) => {

    if (item[2]) {
      fetch(`https://kick.com/api/v2/channels/${item[2]}`)
        .then(response => response.json())
        .then(data => {
          lives.push(data)
        })
    } else {

      let liveEmbed = new Twitch.Embed("twitch-embed", {
        channel: item[0],
        autoplay: false,
        layout: 'video'
      });
      lives.push(liveEmbed)
    }



    const ancora = document.createElement('a')
    if (item[2]) {
      ancora.href = `https://kick.com/${item[2]}`;
      ancora.classList.add('kick')
    } else {
      ancora.href = `https://www.twitch.tv/${item[0]}`;
      ancora.classList.add('twitch')
    }
    ancora.target = '_blank'
    livescontainer.appendChild(ancora);

    const img = document.createElement("img");
    img.classList.add('profile')
    img.setAttribute('id', item[0])
    img.setAttribute('src', `https://static-cdn.jtvnw.net/jtv_user_pictures/${item[1]}-profile_image-70x70.png`);
    ancora.appendChild(img);
  })
}
function atualizarLives() {
  location.reload();
}
function IsOnline() {
  const imgs = document.querySelectorAll('.profile')
  imgs.forEach((item, index) => {
    let calc = index + tamanholist
    if (lives[index][2]) {
      if (lives[calc]["livestream"]) {
        item.style.borderColor = '#00ff00'
      } else {
        item.style.borderColor = '#ff0000'
      }

    } else {
      if (lives[calc]._player._playerState.duration === Infinity) {
        item.style.borderColor = '#00ff00'
      } else {
        item.style.borderColor = '#ff0000'
      }
    }

  })
}

function carrego() {
  setTimeout(function () {
    document.querySelector('button').style.display = 'flex'
    document.getElementById('loader').style.display = 'none'
    document.querySelector('p').style.display = 'none'
    IsOnline()
  }, 2000);
}
createLives()
