const synth = window.speechSynthesis;

const textForm      = document.querySelector('form');
const textInput     = document.querySelector('#text-input');
const voiceSelect   = document.querySelector('#voice-select');
const rate          = document.querySelector('#rate');
const rateValue     = document.querySelector('#rate-value');
const pitch         = document.querySelector('#pitch');
const pitchValue    = document.querySelector('#pitch-value');
const body          = document.querySelector('body');         
//init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    
    //loop through voices and create an option for each
    voices.forEach(voice => {
        // create option element
    const option = document.createElement('option');

    //fill option with voice and language
    option.textContent = voice.name + '(' +voice.lang +')';

    //set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
    });
};

getVoices();

if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//speak 
const speak = () => {
    //add background animation
    body.style.background = '#141414 url(../img/wave2.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';


    //check if speaking
    if(synth.speaking) {
        console.error('Already speaking...');
        return;
    }

    if(textInput.value !== '') {
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //speak end
        speakText.onend = e => {
            body.style.background = '#141414';
            console.log('Done speaking...');
        }

        //speak error
        speakText.onerror = e => {
            console.error('something went wrong');
        }

        //selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        console.log(voiceSelect.selectedOptions);
        //loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //speak
        synth.speak(speakText);
    }
};

//EVENT LISTENERS

// Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate Value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// pitch Value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

//voice select change
voiceSelect.addEventListener('change', e => speak());