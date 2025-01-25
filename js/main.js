"use strict";

// IIFE - Immediately Invoked Functional Expression
(function () {
    // Data for volunteer opportunities
    const volunteerOpportunities = [
        {
            id: 1,
            title: "Community Garden Cleanup",
            description: "Help maintain and beautify our local community garden. No prior gardening experience required.",
            date: "2025-02-15",
            time: "09:00 AM - 12:00 PM",
            location: "Central Community Park"
        },
        {
            id: 2,
            title: "Senior Center Companionship",
            description: "Spend time with seniors, play games, and provide companionship.",
            date: "2025-02-22",
            time: "02:00 PM - 04:00 PM",
            location: "Sunset Senior Center"
        },
        {
            id: 3,
            title: "Food Bank Sorting",
            description: "Help sort and organize donations at our local food bank.",
            date: "2025-03-01",
            time: "10:00 AM - 01:00 PM",
            location: "City Food Bank Warehouse"
        }
    ];

    // Data for events
    const events = [
        {
            id: 1,
            title: "Beach Cleanup",
            date: "2025-02-15",
            time: "09:00 AM",
            category: "Environmental",
            description: "Join us to clean the beach and protect marine life."
        },
        {
            id: 2,
            title: "Community Workshop",
            date: "2025-02-20",
            time: "02:00 PM",
            category: "Education",
            description: "A workshop to educate children on basic skills."
        },
        {
            id: 3,
            title: "Food Drive Fundraiser",
            date: "2025-02-25",
            time: "06:00 PM",
            category: "Community Support",
            description: "Help raise funds and collect donations for the food bank."
        },
        {
            id: 4,
            title: "Tree Planting Event",
            date: "2025-03-01",
            time: "10:00 AM",
            category: "Environmental",
            description: "Join us in planting trees for a greener future."
        }
    ];

    // Display Home Page
    function DisplayHomePage() {
        console.log("Calling DisplayHomePage...");

        const getInvolvedButton = document.getElementById("getInvolvedBtn");
        getInvolvedButton.addEventListener("click", function () {
            location.href = "opportunities.html";
        });
    }

    // Display Opportunities Page
    function DisplayOpportunitiesPage() {
        console.log("Calling DisplayOpportunitiesPage...");

        const opportunitiesContainer = document.getElementById("opportunitiesContainer");
        volunteerOpportunities.forEach((opportunity) => {
            const card = document.createElement("div");
            card.className = "card mb-3";
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${opportunity.title}</h5>
                    <p class="card-text">${opportunity.description}</p>
                    <p class="card-text"><strong>Date:</strong> ${opportunity.date}</p>
                    <p class="card-text"><strong>Time:</strong> ${opportunity.time}</p>
                    <p class="card-text"><strong>Location:</strong> ${opportunity.location}</p>
                    <button class="btn btn-primary signUpBtn" data-id="${opportunity.id}">Sign Up</button>
                </div>
            `;
            opportunitiesContainer.appendChild(card);
        });

        const signUpButtons = document.querySelectorAll(".signUpBtn");
        signUpButtons.forEach((button) => {
            button.addEventListener("click", function (e) {
                const id = e.target.getAttribute("data-id");
                showSignUpModal(id);
            });
        });
    }

    // Show sign-up modal
    function showSignUpModal(opportunityId) {
        const opportunity = volunteerOpportunities.find(op => op.id == opportunityId);
        const modalTitle = document.getElementById("modalTitle");
        modalTitle.textContent = `Sign Up for ${opportunity.title}`;

        const modal = new bootstrap.Modal(document.getElementById("signUpModal"));
        modal.show();
    }

    function DisplayEventsPage() {
        console.log("Displaying Events Page...");
    
        const eventCalendar = document.getElementById("event-calendar");
        const categoryFilter = document.getElementById("category-filter");
    
        function displayEvents(filter) {
            
            eventCalendar.innerHTML = "";
    
            let filteredEvents = events;
            if (filter !== "all") {
                filteredEvents = events.filter(function (event) {
                    return event.category === filter;
                });
            }
    
            filteredEvents.forEach(function (event) {
                const eventCard = document.createElement("div");
                eventCard.className = "col-md-4 mb-4";
                eventCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text"><strong>Date:</strong> ${event.date}</p>
                            <p class="card-text"><strong>Time:</strong> ${event.time}</p>
                            <p class="card-text"><strong>Category:</strong> ${event.category}</p>
                            <p class="card-text">${event.description}</p>
                        </div>
                    </div>
                `;
                eventCalendar.appendChild(eventCard);
            });
        }
    
        // Show all events initially
        displayEvents("all");
    
        // Add an event listener to update events when the category changes
        categoryFilter.addEventListener("change", function () {
            const selectedCategory = categoryFilter.value;
            displayEvents(selectedCategory);
        });
    }
    
    function DisplayContactPage() {
        console.log("Calling DisplayContactPage...");
    
        // Form submission event handler
        contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Stop form from submitting

        // Collect input values
        const name = nameInput.value;
        const email = emailInput.value;
        const subject = subjectInput.value;
        const message = messageInput.value;

        // Validate inputs
        if (!name || !email || !subject || !message) {
        alert("Please fill out all the fields.");
        return;
        }

        if (!validateEmail(email)) {
        alert("Invalid email address. Please enter a valid email.");
        return;
    }

    // If all validations pass, show confirmation modal
    showConfirmationModal();
        });
        
        // Show confirmation modal
        function showConfirmationModal() {
            const modalHtml = `
                <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="confirmationModalLabel">Thank You!</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Your message has been submitted successfully. Redirecting to the Home Page in 5 seconds...</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    
            // Append modal to the body
            const modalContainer = document.createElement("div");
            modalContainer.innerHTML = modalHtml;
            document.body.appendChild(modalContainer);
    
            // Show modal
            const confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
            confirmationModal.show();
    
            // Redirect to Home Page after 5 seconds
            setTimeout(() => {
                confirmationModal.hide();
                window.location.href = "contact.html";
            }, 5000);
        }
    }
    
    // Add event listener for when the page loads
    window.addEventListener("load", function () {
        if (document.title === "Contact Us") {
            DisplayContactPage();
        }
    });

    function dynamicNavbar() {
        const navbar = document.querySelector('.navbar-nav');
        if (navbar) {
            const opportunitiesLink = navbar.querySelector('a[href="opportunities.html"]');
            if (opportunitiesLink) {
                opportunitiesLink.textContent = "Volunteer Now";
            }
    
            // Add Donate link
            const donateLink = document.createElement('li');
            donateLink.className = 'nav-item';
            donateLink.innerHTML = `
                <a class="nav-link" href="donate.html">Donate</a>
            `;
            navbar.appendChild(donateLink);
        }
    }
    
    // Call this function when the page loads
    window.addEventListener('load', dynamicNavbar);

    function HandleBackToTop() {
        console.log("Initializing Back to Top functionality...");
    
        // Select the button
        const backToTopButton = document.getElementById("backToTop");
    
        if (!backToTopButton) {
            console.error("Back to Top button not found in the DOM!");
            return;
        }
    
        // Scroll event to show or hide the button
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                console.log("Scroll position > 300. Showing Back to Top button.");
                backToTopButton.style.display = "block";
            } else {
                console.log("Scroll position <= 300. Hiding Back to Top button.");
                backToTopButton.style.display = "none";
            }
        });
    
        // Click event for smooth scrolling to the top
        backToTopButton.addEventListener("click", function () {
            console.log("Back to Top button clicked. Scrolling to the top.");
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    // Call the function when the DOM is loaded
    window.addEventListener("DOMContentLoaded", function () {
        HandleBackToTop();
    });

    
    

    function Start() {
        console.log("Starting App...");

        switch (document.title) {
            case "Home":
                DisplayHomePage();
                break;
            case "Opportunities":
                DisplayOpportunitiesPage();
                break;
            case "Events":
                DisplayEventsPage();
                break;
            case "About":
                DisplayAboutPage();
                break;
            case "Contact":
                DisplayContactPage();
                break;
        }
    }

    window.addEventListener("load", Start);
})();