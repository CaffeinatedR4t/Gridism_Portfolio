package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"gridism-backend/handlers"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// Load .env file (non-fatal if missing — production may use real env vars)
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, reading environment variables directly")
	}

	// Determine port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Set up router
	mux := http.NewServeMux()
	mux.HandleFunc("/api/contact", handlers.ContactHandler)
	mux.HandleFunc("/api/health", handlers.HealthHandler)

	// Parse allowed origins from env
	allowedOrigins := []string{"http://localhost:3000"}
	if origins := os.Getenv("ALLOWED_ORIGINS"); origins != "" {
		allowedOrigins = strings.Split(origins, ",")
		for i, o := range allowedOrigins {
			allowedOrigins[i] = strings.TrimSpace(o)
		}
	}

	// Set up CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	handler := c.Handler(mux)

	log.Printf("🚀 Gridism Backend running on http://localhost:%s", port)
	log.Printf("📬 Contact endpoint: POST /api/contact")
	log.Printf("❤️  Health endpoint:  GET  /api/health")
	log.Printf("🌐 Allowed origins:  %v", allowedOrigins)

	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
