## Cursor Cloud specific instructions

This is a minimal Go 1.22 CLI application with zero external dependencies.

### Services

| Service | Command | Notes |
|---------|---------|-------|
| Application | `go run main.go` | Prints "Hello Go" and exits |

### Key commands

- **Run**: `go run main.go`
- **Test**: `go test ./...`
- **Lint/Vet**: `go vet ./...`
- **Build**: `go build -o hello-golang main.go`

### Notes

- Go 1.22+ is pre-installed in the VM environment.
- There are no external dependencies beyond the Go standard library (`go.mod` has no `require` directives).
- The CI pipeline (`.github/workflows/push.yaml`) runs `go test` and `go vet ./...` on every push.
- Docker deployment only triggers on tagged pushes—not needed for local development.
