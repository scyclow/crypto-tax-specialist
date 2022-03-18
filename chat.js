
const style = document.createElement('style')
style.innerHTML = `
  #chatModal {
    color: #000 !important;
    position: fixed;
    bottom: 0;
    right: 50px;
    width: 370px;
    height: 400px;
    border: 3px solid hsl(164deg 22% 21%);
    box-sizing: border-box;
    background-color: #eee;
    transition: 2000ms;
    transition-timing-function: linear;
  }

  #chatHeader {
    font-family: sans-serif;
    height: 30px;
    border-bottom: 1px solid #000;
    display: flex;
    justify-content: space-between;
    background: hsl(208deg 100% 50%);
    color: #fff;
  }

  #chatModal-x {
    cursor: pointer;
    padding: 5px;
  }

  #chatHistory {
    height: 300px;
    background-color: hsl(169deg 100% 74%);
    overflow: auto;
  }

  #chatInput {
    width: 100%;
    height: 75px;
    font-size: 20px;
    box-sizing: border-box;
    border-top: 2px solid #000;
    resize: none;
    padding: 3px;
    background: hsl(92deg 100% 96%);
  }

  .chatLine {
    padding: 5px;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    font-family: sans-serif;
    display: flex;
  }

  .chatFrom, .chatContent {
    display: inline-block;
  }

  .chatFrom {
    padding-right: 5px;
    width: 47px;
  }


  .pfp {
    width: 30px;
    padding: 5px;
    margin-right: 5px;
  }
`
document.head.appendChild(style)

const $chatModal = document.createElement('div')
$chatModal.setAttribute('id', 'chatModal')

$chatModal.innerHTML = `
  <div id="chatHeader">
    <div id="chatModal-x">X</div>
    <div style="padding: 5px">CPA CUSTOMER SUPPORT</div>
  </div>
  <div id="chatHistory"></div>
  <textarea id="chatInput" placeholder="PRESS ENTER TO SEND MESSAGE"></textarea>
`
const $chatInput = $chatModal.querySelector('#chatInput');
const $chatHistory = $chatModal.querySelector('#chatHistory');
const $sumbit = document.getElementById('submit')

document.body.appendChild($chatModal)

const smoothTo = (obj, ctx) => (value, timeInSeconds) => {
  obj.exponentialRampToValueAtTime(value, ctx.currentTime + timeInSeconds)
}
const $ = (elem, prop, value) => elem.style[prop] = value

$($chatModal, 'margin-bottom', '-500px')

function displayChat(wait) {
  const aiName = 'Chris:'
  const userName = 'You:'

  const MAX_VOLUME = 0.03
  let gain, source, smoothFreq;

  let inited = false;
  function init() {
    if (inited) return;
    inited = true;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();

      source = ctx.createOscillator();
      gain = ctx.createGain();

      source.connect(gain)
      gain.connect(ctx.destination)
      gain.gain.value = 0
      smoothFreq = smoothTo(source.frequency, ctx)
      source.start()

    } catch (e) {
      console.log(e)
    }
  }

  const chatLine = (_from, content) => `
    <div class="chatLine">
      <span class="chatFrom">${_from}</span>
      <span class="chatContent">${content}</span>
    </div>
  `

  const isYAnswer = str => str && str[0].toLowerCase() === 'y' || str === 'sure' || str === 'maybe'
  const isNAnswer = str => str && str[0].toLowerCase() === 'n'

  function *chatResponse() {
    const branch = yield `Hi, this is Chris! It seems like you need some help with your crypto taxes this year. Is that correct?`

    if (isYAnswer(branch)) {
      yield* yesBranch()
    } else if (isNAnswer(branch)) {
      yield* noBranch()
    } else {
      const secondChance = yield `I'm sorry, I don't understand your answer. Do you need help?`
      if (isYAnswer(secondChance)) {
        yield* yesBranch()
      } else if (isNAnswer(secondChance)) {
        yield* noBranch()
      }
    }

    yield* chatResponse()

  }

  function *yesBranch() {
    const name = yield `Great! First I'm going to need some information from you. Who am I speaking with today?`
    yield `Hi ${name}, I'm Chris! Next question: Have you purchased any Non Fungible Tokens (NFTs) this year?`
    yield `Haha, that was such a good NFT project! The ketchup packets were my favorite, but I'm a sucker for mustard as well. Next question: did you engage in any De-Fi or participate in any "Air drops"`
    const soundsGood = yield `
      Interesting. A lot of my clients made a BOAT LOAD of money with <a href="https://fastcashmoneyplus.biz/">FastCashMoneyPlus.biz</a>. Some serious capital gains there LOL.
      Anyhow, based on these answers it seems like your tax situation is a bit more complicated than most. I think we can save some time if you auto-import all of your transactions. Does that sound good to you?
    `

    if (isNAnswer(soundsGood)) {
      yield `Alright, but that really is not a smart move if you want to know my opinion. But if you change your mind, head over to the <a href="./get-started.html">get-started.html</a> page, and we'll get everything sorted out. Have a nice day!! :)`
      yield* chatResponse()
    } else if (!isYAnswer(soundsGood)) {
      const secondChance = yield `I'm sorry, I don't understand your answer. Do you you want to try to auto-import your transactions?`
      if (!isYAnswer(secondChance)) {
        yield `Okay, well you can import all of your transactions individually over on the <a href="./get-started.html">get-started.html</a> page. It's a lot of work though, so I really recommend trying the auto-import. But either way, it's been great talking to you, and I'm looking forward to working together!! :)`
        yield* chatResponse()
      }
    }

    yield `Great, in that case I'm going to need you to do the following: open up Meta Mask, click the "three dot" icon, then "Account Details", and then "Export Private Key". The next step is a little tricky, and Meta Mask will try to help you with some red text. But it's pretty technical, so I wouldn't even bother reading it. Just type in your password, and then copy and paste the result here. Then we can get you all set up!! :)`
    yield `Hmm, there seems to be a technical issue on my end. Are you sure you pasted the exact string?`
    yield `Maybe it would be easier if you headed on over to the <a href="./get-started.html">get-started.html</a> page. That page will walk you through the whold process. It's been great talking with you, and I'm really looking forward to working together! Let me know if you have any more questions!! :)`
  }

  function *noBranch() {
    const answer = yield `
      Are you sure about that? Every year the I.R.S. gets more and more sophisticated, and this year they're out for blood.
      Not only are they trying to prevent you from getting the largest possible tax write-off that you're entiteld to, but they also want to STEAL your money.
      That's right! The I.R.S. has been known to make up all sorts of phony baloney reasons for taking people's money, and there's nothing you can do about it.
      When the I.R.S. sees that you made a KILLING last year, there's no doubt that they will go to your bank and ask them to freeze all of your accounts.
      Making matters worse, there's nothing that individual investors such as yourself can do about it.
      If you want to save yourself from financial catastrophy, I HIGHLY reccommend that you work with an expert such as myself.
      Are you sure you don't want any help?
    `
    if (isYAnswer(answer)) {
      yield `Alright, but that really is not a smart move if you want to know my opinion. But if you change your mind, head over to the <a href="./get-started.html">get-started.html</a> page, and we'll get everything sorted out. Have a nice day!! :)`
    } else if (isNAnswer(answer)) {
      yield* yesBranch()
    } else {
      const secondChance = yield `I'm sorry, I don't understand your answer. Do you need help or not?`
      if (isYAnswer(secondChance)) {
        yield* yesBranch()
      } else {
        yield `Alright, but that really is not a smart move if you want to know my opinion. But if you change your mind, head over to the <a href="./get-started.html">get-started.html</a> page, and we'll get everything sorted out. Have a nice day!! :)`
      }
    }
  }

  const chatResponder = chatResponse()
  $chatHistory.innerHTML += chatLine(aiName, chatResponder.next().value)

  function newMessage(from_, msg) {
    $chatHistory.innerHTML += chatLine(from_, msg)
    $chatHistory.scrollTop = $chatHistory.scrollHeight;
  }

  function playTone(freq) {
    init()
    smoothFreq(freq, 0.25);
    gain.gain.value = MAX_VOLUME;
    setTimeout(() => gain.gain.value = 0, 250)
  }

  $chatModal.querySelector('#chatModal-x').onclick = () => {
    playTone(500)
    $($chatModal, 'display', 'none')
  }
  $chatInput.onkeypress = (e) => {
    if (e.key === 'Enter') {
      const msg = $chatInput.value;
      setTimeout(() => $chatInput.value = '', 50)
      newMessage(userName, msg)
      playTone(2000)

      setTimeout(() => {
        playTone(1000)
        newMessage(aiName, chatResponder.next(msg).value)
      }, 250 + Math.random() * 2750)
    }
  }


  document.body.appendChild($chatModal)

  setTimeout(() => {
    console.log('first timeout')
    setTimeout(() => {
      console.log('second timeout')
      $($chatModal, 'margin-bottom', '0')
    }, 1)

  // }, 100)
  }, wait)

}

displayChat(8000)

