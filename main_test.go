package main

import (
	"io"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
)

func TestIndexPageShowsDimForm(t *testing.T) {
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/", nil)

	newServer().ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("want status %d, got %d", http.StatusOK, rec.Code)
	}

	body := rec.Body.String()
	for _, want := range []string{
		"Моя нейросеть — Дим",
		`<form method="post" action="/">`,
		`name="question"`,
		"Отправить запрос",
	} {
		if !strings.Contains(body, want) {
			t.Fatalf("page does not contain %q", want)
		}
	}
}

func TestQuestionSubmissionRendersRequestForDim(t *testing.T) {
	form := url.Values{"question": {"Как задать вопрос нейросети?"}}
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/", strings.NewReader(form.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	newServer().ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("want status %d, got %d", http.StatusOK, rec.Code)
	}

	body := rec.Body.String()
	for _, want := range []string{
		"Дим получил ваш запрос",
		"Как задать вопрос нейросети?",
	} {
		if !strings.Contains(body, want) {
			t.Fatalf("page does not contain %q", want)
		}
	}
}

func TestUnknownPathReturnsNotFound(t *testing.T) {
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/missing", nil)

	newServer().ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Fatalf("want status %d, got %d", http.StatusNotFound, rec.Code)
	}
}

func TestUnsupportedMethodReturnsMethodNotAllowed(t *testing.T) {
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPut, "/", io.Reader(nil))

	newServer().ServeHTTP(rec, req)

	if rec.Code != http.StatusMethodNotAllowed {
		t.Fatalf("want status %d, got %d", http.StatusMethodNotAllowed, rec.Code)
	}
	if allow := rec.Header().Get("Allow"); allow != "GET, POST" {
		t.Fatalf("want Allow header %q, got %q", "GET, POST", allow)
	}
}
