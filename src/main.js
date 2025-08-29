import './style.css'
import { essentials } from '../data'

let allItems = essentials.map((item, index) => ({ //.map will create a new array and apply to each function in the original array and it will take 2 parameters = item - the current element in the array, and index - the current position of the element which is always starting with 0. the arrow function will take each of the item and index and return a new object, {} - this means it will return object literal
  ...item, // this will copy the properties of item into the new object. it is called the spread operator
  id: index, // This will give each item a unique Id and it will be added to the new object
  active: false // This is use for tracking state, whether the item is selected or active
}))

function renderCards(data) {
  let containerHTML = ''
  data.forEach((item) => {
  containerHTML += `
    <div class="size-full bg-neutral-50 dark:bg-neutral-700 p-4 rounded-xl flex flex-col  dark:text-neutral-50">
      <div class="flex gap-x-3 mb-3">
        <img src="${item.image}" alt="devlens" class="h-8 w-8">
        <div>
          <h2 class="font-bold text-neutral-900 dark:text-neutral-50">${item.title}</h2>
          <p class="text-[18px] text-neutral-900 dark:text-neutral-50">${item.paragraph}</p>
        </div>
      </div>
      <div class="flex-1"></div>
      
      <div class="flex items-center justify-between mt-4">
        <button class="bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 px-4 py-1 border rounded-full font-medium hover:text-gray-100 dark:hover:text-gray-700 hover:bg-red-500 focus:ring-2 focus:outline-none focus:ring-red-500 cursor-pointer">Remove</button>

        <button type="button" data-id=${item.id} class="js-toggleBtn relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 ${item.active ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-400'}">
          <span class="inline-block h-4 w-4 transform rounded-full bg-neutral-50 transition-transform ${item.active ? 'translate-x-6' : 'translate-x-1'}"></span>
        </button>
      </div>
    </div>
    `
  })
  document.querySelector('.container-grid').innerHTML = containerHTML;
  ToggleButtons()
  RemoveButtons()
}

function RemoveButtons() {
  const removeBtn = document.querySelectorAll('.container-grid button:first-of-type')

  removeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('div.flex.flex-col').remove()
    })
  })
}

function ToggleButtons() {
  const toogleBtns = document.querySelectorAll('.js-toggleBtn')

  toogleBtns.forEach(btn => {
    btn.addEventListener('click', () => { 
      const id = parseInt(btn.dataset.id) // This is to access data attributes on HTML. parseInt convert is to number to match it with allItems.id
      const item = allItems.find(el => el.id === id) //FInd the item in allItems with the same id as the button's data-id
      item.active = !item.active
      renderCards(allItems)
    })
  })
}

const filterBtns = document.querySelectorAll('.js-filter-btn')
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Reset styles for all buttons
    filterBtns.forEach(button => {
      button.classList.remove("bg-red-500", "text-white", "focus:outline-2", "focus:outline-offset-2", "focus:outline-red-500")
      button.classList.add("bg-neutral-50", "dark:bg-neutral-500", "text-neutral-900", "dark:text-neutral-50")
    })

    // Apply active red state to clicked button
    btn.classList.remove("bg-neutral-50", "dark:bg-neutral-500", "text-neutral-900", "dark:text-neutral-50")
    btn.classList.add("bg-red-500", "text-white", "focus:outline-2", "focus:outline-offset-2", "focus:outline-red-500")

    // Filter logic
    const filterType = btn.textContent.trim().toLowerCase() //.trim() removes extra spaces
    let filtered = allItems
    if (filterType === 'active') {
      filtered = allItems.filter(item => item.active) //.filter() creates a new array with only the items that match a condition.
    } else if (filterType === 'inactive') {
      filtered = allItems.filter(item => !item.active)
    }
    renderCards(filtered)
  })
})

const themeToggleBtn = document.getElementById('js-theme-toggle')
const themeIcon = document.getElementById('js-theme-icon')
let isDark = localStorage.getItem('theme') === 'dark'

// This will apply saved theme on page load
if (isDark) {
  document.documentElement.classList.add('dark')
  themeIcon.src = "images/icon-sun.svg"
} else {
  document.documentElement.classList.remove('dark')
  themeIcon.src = "images/icon-moon.svg"
}

themeToggleBtn.addEventListener('click', () => {
  isDark = !isDark
  if (isDark) {
    // Switch to dark
    themeIcon.src = "images/icon-sun.svg"
    document.documentElement.classList.add('dark') //This refers to the root HTML element of the page.
    localStorage.setItem('theme', 'dark')
  } else {
    // Switch to light
    themeIcon.src = "images/icon-moon.svg"
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
})
renderCards(allItems)