.PHONY: help start stop build preview lint format check deploy clean install

# Default target
help:
	@echo "Cornerstone - Home Construction Tracker"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Development:"
	@echo "  start     Start development server"
	@echo "  stop      Stop development server"
	@echo "  preview   Preview production build locally"
	@echo ""
	@echo "Build:"
	@echo "  build     Build for production"
	@echo "  deploy    Build and push to trigger GitHub Pages deploy"
	@echo "  clean     Remove build artifacts"
	@echo ""
	@echo "Code Quality:"
	@echo "  lint      Check code with biome"
	@echo "  format    Format code with biome"
	@echo "  check     Lint + format in one step"
	@echo ""
	@echo "Setup:"
	@echo "  install   Install dependencies"

# Development
start:
	@pnpm dev

stop:
	@pkill -f "vite" || echo "No vite process found"

preview:
	@pnpm preview

# Build
build:
	@pnpm build

deploy: build
	@git add .
	@git commit -m "chore: Deploy" --allow-empty
	@git push

clean:
	@rm -rf dist node_modules/.vite

# Code Quality
lint:
	@pnpm lint

format:
	@pnpm format

check:
	@pnpm check

# Setup
install:
	@pnpm install
