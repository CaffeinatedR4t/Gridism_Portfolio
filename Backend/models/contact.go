package models

// ContactForm represents the incoming contact form submission.
type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Company string `json:"company"`
	Social  string `json:"social"`
	Message string `json:"message"`
}

// ContactResponse represents the API response for contact form submissions.
type ContactResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
