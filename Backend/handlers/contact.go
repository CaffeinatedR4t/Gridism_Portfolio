package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"regexp"
	"strings"

	"gridism-backend/models"
	"gridism-backend/services"
)

// emailRegex validates email format.
var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)

// ContactHandler handles POST /api/contact form submissions.
func ContactHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Only accept POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(models.ContactResponse{
			Success: false,
			Message: "Method not allowed. Use POST.",
		})
		return
	}

	// Parse JSON body
	var form models.ContactForm
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()

	if err := decoder.Decode(&form); err != nil {
		log.Printf("Error decoding request body: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ContactResponse{
			Success: false,
			Message: "Invalid JSON payload.",
		})
		return
	}

	// Trim whitespace
	form.Name = strings.TrimSpace(form.Name)
	form.Email = strings.TrimSpace(form.Email)
	form.Company = strings.TrimSpace(form.Company)
	form.Social = strings.TrimSpace(form.Social)
	form.Message = strings.TrimSpace(form.Message)

	// Validate required fields
	var missingFields []string
	if form.Name == "" {
		missingFields = append(missingFields, "name")
	}
	if form.Email == "" {
		missingFields = append(missingFields, "email")
	}
	if form.Social == "" {
		missingFields = append(missingFields, "social")
	}
	if form.Message == "" {
		missingFields = append(missingFields, "message")
	}

	if len(missingFields) > 0 {
		log.Printf("Validation failed — missing fields: %v", missingFields)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ContactResponse{
			Success: false,
			Message: "Missing required fields: " + strings.Join(missingFields, ", "),
		})
		return
	}

	// Validate email format
	if !emailRegex.MatchString(form.Email) {
		log.Printf("Validation failed — invalid email: %s", form.Email)
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(models.ContactResponse{
			Success: false,
			Message: "Invalid email format.",
		})
		return
	}

	// Send email
	if err := services.SendContactEmail(form); err != nil {
		log.Printf("Failed to send contact email: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(models.ContactResponse{
			Success: false,
			Message: "Failed to send message. Please try again later.",
		})
		return
	}

	log.Printf("✅ Contact form submitted by %s (%s)", form.Name, form.Email)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(models.ContactResponse{
		Success: true,
		Message: "Message sent successfully",
	})
}

// HealthHandler handles GET /api/health.
func HealthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
