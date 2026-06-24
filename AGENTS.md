# AGENTS.md

## Cursor Cloud specific instructions

This is a minimal single-product Go CLI (`hello-golang`). It prints `Hello Go` and exits — there are **no services to run**, no database, no web server, and no external/runtime dependencies (stdlib only).

- Go toolchain: project targets Go 1.22 (`go.mod`, `Dockerfile`). `go1.22.x` is available on the VM.
- There are no third-party modules and no `go.sum`; `go mod tidy` is effectively a no-op but is the safe dependency-refresh step.
- Standard commands (mirroring CI in `.github/workflows/push.yaml`), run from repo root:
  - Lint/vet: `go vet ./...`
  - Test: `go test` (CI uses `GOOS=linux GOARCH=amd64 go test`)
  - Build: `go build -o /main main.go`
  - Run: `go run main.go`
- Docker (`Dockerfile`) and Docker Hub credentials (`DOCKER_USERNAME`, `DOCKER_ACCESS_TOKEN`) are only used by the CI `deploy` job on tag pushes; they are not needed for local development.
