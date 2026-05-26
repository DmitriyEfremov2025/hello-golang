package main

import (
	"html/template"
	"log"
	"net/http"
	"strings"
)

const botName = "Дим"

var indexTemplate = template.Must(template.New("index").Parse(`<!doctype html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Нейросеть {{.BotName}}</title>
	<style>
		body {
			margin: 0;
			min-height: 100vh;
			display: grid;
			place-items: center;
			font-family: Arial, sans-serif;
			background: #f4f7fb;
			color: #182033;
		}
		main {
			width: min(92vw, 560px);
			padding: 32px;
			border-radius: 20px;
			background: #ffffff;
			box-shadow: 0 16px 45px rgba(24, 32, 51, 0.12);
		}
		h1 {
			margin: 0 0 12px;
			font-size: 34px;
		}
		p {
			margin: 0 0 24px;
			color: #526070;
		}
		label {
			display: block;
			margin-bottom: 10px;
			font-weight: 700;
		}
		textarea {
			box-sizing: border-box;
			width: 100%;
			min-height: 130px;
			padding: 14px;
			border: 1px solid #c9d3df;
			border-radius: 12px;
			font: inherit;
			resize: vertical;
		}
		button {
			margin-top: 16px;
			padding: 12px 18px;
			border: 0;
			border-radius: 12px;
			background: #2868f0;
			color: #ffffff;
			font: inherit;
			font-weight: 700;
			cursor: pointer;
		}
		.answer {
			margin-top: 22px;
			padding: 16px;
			border-radius: 12px;
			background: #eef4ff;
			color: #18345f;
		}
	</style>
</head>
<body>
	<main>
		<h1>Моя нейросеть — {{.BotName}}</h1>
		<p>Введите запрос, и {{.BotName}} получит его на обработку.</p>
		<form method="post" action="/">
			<label for="question">Запрос для {{.BotName}}</label>
			<textarea id="question" name="question" placeholder="Например: объясни, как работает нейросеть">{{.Question}}</textarea>
			<button type="submit">Отправить запрос</button>
		</form>
		{{if .Submitted}}
		<section class="answer" aria-live="polite">
			{{if .Question}}
			<strong>{{.BotName}} получил ваш запрос:</strong> {{.Question}}
			{{else}}
			<strong>{{.BotName}} ждёт запрос.</strong> Напишите вопрос в поле выше.
			{{end}}
		</section>
		{{end}}
	</main>
</body>
</html>`))

type pageData struct {
	BotName   string
	Question  string
	Submitted bool
}

func main() {
	addr := ":8080"
	log.Printf("listening on http://localhost%s", addr)
	log.Fatal(http.ListenAndServe(addr, newServer()))
}

func newServer() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/", handleIndex)
	return mux
}

func handleIndex(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	data := pageData{BotName: botName}

	switch r.Method {
	case http.MethodGet:
	case http.MethodPost:
		if err := r.ParseForm(); err != nil {
			http.Error(w, "не удалось прочитать запрос", http.StatusBadRequest)
			return
		}
		data.Question = strings.TrimSpace(r.FormValue("question"))
		data.Submitted = true
	default:
		w.Header().Set("Allow", http.MethodGet+", "+http.MethodPost)
		http.Error(w, "метод не поддерживается", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	if err := indexTemplate.Execute(w, data); err != nil {
		log.Printf("render index: %v", err)
	}
}
