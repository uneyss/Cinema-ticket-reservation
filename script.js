const contanier = document.querySelector('.container')
const count = document.querySelector('#count')
const amount = document.querySelector('#amount')
const select = document.querySelector('#movie')
const movie_Text = document.querySelector('#movieText')
const seats = document.querySelectorAll('.seat:not(.reserved)')

getFromLocalStorage()
calculateTotal()

// Event Listeners
contanier.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected')
        calculateTotal()

    }
})

select.addEventListener('change', function(e){
    calculateTotal()
})

// Calculate
function calculateTotal(){
    const selectedSeats = contanier.querySelectorAll('.seat.selected')
    let selectedSeatCount = selectedSeats.length
    let text = select.options[select.selectedIndex].text

    const selectedSeatsArr = []
    const seatsArr = []

    selectedSeats.forEach((seat) => {
        selectedSeatsArr.push(seat)
    })
    
    seats.forEach((seat) => {
        seatsArr.push(seat)
    })


    let selectedSeatIndexs = selectedSeatsArr.map((seat) => {
        return seatsArr.indexOf(seat)
    })

    count.innerText = selectedSeatCount
    amount.innerText = selectedSeatCount * select.value
    movie_Text.innerText = text

    console.log('Selected Seat Count :', selectedSeatCount)
    console.log('Selected Seats :', selectedSeats)

    console.log('Selected Seats Array :', selectedSeatsArr)
    console.log(' Seats Array :', seatsArr)
    saveToLocalStorage(selectedSeatIndexs)
}

// Local Storage
function getFromLocalStorage(){
    const selectedSeatsLs = JSON.parse(localStorage.getItem('SelectedSeats'))

    if (selectedSeatsLs !=null && selectedSeatsLs.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeatsLs.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    console.log('Selected Seats Local Storage :', selectedSeatsLs)

    const selectedMovieIndexLs = localStorage.getItem('SelectedMovie')

    if(selectedMovieIndexLs != null){
        select.selectedIndex = selectedMovieIndexLs
    }
    console.log('Selected Movie Index Local Storage :', selectedMovieIndexLs)
}

function saveToLocalStorage(indexs){
    localStorage.setItem('SelectedSeats', JSON.stringify(indexs))
    localStorage.setItem('SelectedMovie', select.selectedIndex)

    
}