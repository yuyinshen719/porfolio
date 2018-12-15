const TypeWriter = function(txtElement, words, wait = 2000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function(){
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting){
        // Remove char
         this.txt = fullTxt.substring(0, this.txt.length - 1);
    }
    else{
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }


    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Type speed
    let typeSpeed = 50;

    if(this.isDeleting){
        typeSpeed /= 2;   //typeSpeed = typeSpeed/2
    }

    // If word is complete
    if(!this.isDeleting && this.txt ===fullTxt){
        // Make a pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    } 
    else if(this.isDeleting && this.txt === ''){  // when it's finishing deleting; switch to the next word
        this.isDeleting = false;
        // Move to the next
        this.wordIndex++; // Inclement the word index by 1
        // Pause before start typing
        typeSpeed = 50;
    }
    
    setTimeout(() => this.type(), typeSpeed)
}


// Init on DOM Load
document.addEventListener('DOMContentLoaded',init);

// Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);

}