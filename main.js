'use strict'
// for whole number style strings
// example: "4761"
Object.defineProperty(String.prototype, 'getNextWholeNumber', {
    get() {
        let digits = this.split('')
        let allDigits = '01234567890'
        digits.unshift('0')
        for (let [i, digit] of Object.entries(digits.reverse())) {
            digits[i] = allDigits[parseInt(digit) + 1]
            if (digit !== '9') break
        }
        return digits.reverse().slice(digits.findIndex(digit => digit !== '0')).join('')
    }
})
// for counting number style strings
// example: "4761"
Object.defineProperty(String.prototype, 'getPrevWholeNumber', {
    get() {
        let digits = this.split('')
        let allDigits = '09876543210'
        digits.unshift('0')
        for (let [i, digit] of Object.entries(digits.reverse())) {
            digits[i] = allDigits[allDigits.indexOf(digit) + 1]
            if (digit !== '0') break
        }
        return digits.reverse().slice(digits.findIndex(digit => digit !== '0')).join('')
    }
})
Node.prototype.setText = function(text) {
    this.textContent = text
    return this.textContent
}
if (!localStorage.getItem('ok')) localStorage.clear()
let div2 = document.createElement('div')
div2.setText(localStorage.getItem('div2') || '1')
let div = document.createElement('div')
div.setText(localStorage.getItem('div') || '0')
let button = document.createElement('button')
button.onclick = () => {
    for (let i = 0; i < parseInt(div2.textContent); i++) div.setText(div.textContent.getNextWholeNumber)
    if (localStorage.getItem('ok')) localStorage.setItem('div', div.textContent)
}
button.setText('Click')
let button2 = document.createElement('button')
button2.onclick = () => {
    if (parseInt(div.textContent) < 10) return
    for (let i = 0; i < 10; i++) div.setText(div.textContent.getPrevWholeNumber)
    div2.setText(div2.textContent.getNextWholeNumber)
    if (localStorage.getItem('ok')) localStorage.setItem('div', div.textContent)
    if (localStorage.getItem('ok')) localStorage.setItem('div2', div2.textContent)
}
button2.setText('Get 1 more point per click')
let div4 = document.createElement('div')
let div3 = document.createElement('div')
div3.setText('!!!Use Local Storage!!!')
let button3 = document.createElement('button')
button3.setText('Ok')
button3.onclick = () => {
    localStorage.setItem('ok', true)
    div4.remove()
}
let button4 = document.createElement('button')
button4.setText('No')
button4.onclick = () => div4.remove()
div4.append(div3, button3, button4)
document.body.append(div4, div, button, div2, button2)
Array.from(document.querySelectorAll('button')).forEach(elem => elem.style.cursor = 'pointer')
if (localStorage.getItem('ok')) div4.remove()