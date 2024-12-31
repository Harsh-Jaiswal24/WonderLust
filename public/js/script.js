// const { func } = require("joi");

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false);
    });
})();


//scritp for filters 
document.addEventListener("DOMContentLoaded", () => {
  // Select all filter elements
  const filterElements = document.querySelectorAll(".filter");

  // Check if there's a filter stored in localStorage
  const storedFilter = localStorage.getItem("activeFilter");

  // If there's a stored filter, make it active on page load
  if (storedFilter) {
    const activeFilter = document.querySelector(`.filter[data-filter='${storedFilter}']`);
    if (activeFilter) {
      activeFilter.classList.add("active");
      activeFilter.style.opacity = 1;  // Set opacity to 1 for the active filter
    }
  }
  // Add event listener to each filter element 
  filterElements.forEach((filter) => {
    filter.addEventListener("click", function () {
      // Reset opacity and remove the active class from all filters
      filterElements.forEach((item) => {
        item.classList.remove("active");
        item.style.opacity = 0.5; // Reset opacity for all filters
      });

      // Set opacity to 1 and add active class for the clicked filter
      this.classList.add("active");
      this.style.opacity = 1;

      // Store the clicked filter in localStorage so it persists across page reloads
      const filterName = this.getAttribute('data-filter'); // Get the unique filter identifier
      localStorage.setItem("activeFilter", filterName); // Store in localStorage

      // Allow the filter to redirect to the appropriate URL
      window.location.href = this.getAttribute("data-url"); // Redirect to the filter page
    });
  });
});

//For taxes
const taxbtn= document.querySelector("#flexSwitchCheckChecked");
taxbtn.addEventListener("click", function(){
  console.log("WQsds")
    const showtax= document.getElementsByClassName("tax-info");
const notaxp= document.getElementsByClassName("notaxp");
//original price
for(no of notaxp){
  if(no.style.display!="none"){
        no.style.display="none";
  }else{
    no.style.display="inline";
  }
}
//taxprice
    for(show of showtax){
      if(show.style.display!="inline"){
    show.style.display="inline";
      }else{
        show.style.display="none"
      }
    }

})






