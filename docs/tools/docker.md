---
title: Docker
description: Containers for reproducible environments - personal working notes.
domain: Tools
category: Engineering
order: 7
tags:
  - docker
  - containers
  - devops
status: practiced
created: 2026-08-19
updated: 2026-08-19
---

# Docker

> Personal working notes.

## What it is

Packaging an application together with its dependencies into an image that
runs the same way anywhere a container runtime exists.

## Why I use it

For AI work specifically, it is how I get a disposable environment. Agents
that run shell commands should not run them on my machine, and a container is
the cheapest available boundary. [OpenHands](/tools/openhands) and
[Dify](/tools/dify) both rely on this.

## Commands I keep forgetting

```bash
# Build and tag
docker build -t basebox:local .

# Run, mapping a port and mounting the working directory
docker run --rm -it -p 5173:5173 -v "$(pwd)":/app basebox:local

# Shell into a running container
docker exec -it <container> /bin/sh

# What is actually running
docker ps

# Reclaim disk space - this removes stopped containers and unused images
docker system prune -a
```

Compose:

```bash
docker compose up -d
docker compose logs -f <service>
docker compose down -v      # -v also removes named volumes
```

A minimal `compose.yaml` for reference:

```yaml
services:
  app:
    build: .
    ports:
      - "5173:5173"
    environment:
      NODE_ENV: development
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: dev
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

On Windows, the same run command in PowerShell - note `${PWD}` rather than
`$(pwd)`:

```powershell
docker run --rm -it -p 5173:5173 -v "${PWD}:/app" basebox:local

# Containers using the most disk
docker ps -a --format "{{.Names}} {{.Size}}" | Sort-Object
```

## What I have learned

- **Layer order is the whole story for build speed.** Copy the manifest and
  install dependencies before copying the source, so a source edit does not
  reinstall everything.

  ```dockerfile
  COPY package*.json ./
  RUN npm ci
  COPY . .          # source changes invalidate only from here down
  ```

- **`host.docker.internal` reaches the host** from inside a container. This is
  the fix for a containerised app that cannot see a service on `localhost` —
  it cost me an hour in
  [Dify + LM Studio](/experiments/dify-lm-studio).
- **Named volumes survive `down`, anonymous ones do not.** `-v` on `down`
  removes named volumes too, which is occasionally what you want and
  occasionally a disaster.

## Gotchas

- `docker system prune -a` is not gentle. It removes all unused images, and
  re-pulling them is slow.
- On Windows, bind-mount performance is noticeably worse than on Linux. For
  large `node_modules`, keep them in a volume rather than a bind mount.

## Related topics

- [OpenHands](/tools/openhands)
- [Dify](/tools/dify)
