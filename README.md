# WS2024 S17 R3 - Hungary - Test Project

## Setup

Extend your [`hostfile`](<https://en.wikipedia.org/wiki/Hosts_(file)>) with the following line:

```sh
127.0.0.1 speedtest.ub2023.hu teams.ub2023.hu backend.ub2023.hu admin.ub2023.hu runner-app.ub2023.hu backend2.ub2023.hu pma.ub2023.hu db.ub2023.hu stage-planner.ub2023.hu
```

Run the project:

```sh
docker-compose up -d
```

---

## Submit

### Module A - Speedtest:

- HTML, CSS, JS
- Source: `www/speedtest`
- Deploy: `www/speedtest`
- URL: http://speedtest.ub2023.hu

### Module B - Teams Page:

- HTML, CSS, JS
- Source: `www/teams`
- Deploy: `www/teams`
- URL: http://teams.ub2023.hu

### Module C - Backend:

- Laravel
- Source: `www/backend-laravel`
- Deploy: `www/backend-laravel`
- Base URL: http://backend.ub2023.hu/api/V1

### Module C - Admin:

- Laravel
- Source: `www/admin-js-src`
- Deploy: `www/admin-js`
- URL: http://admin.ub2023.hu

### Module D - Runner App:

- Laravel
- Source: `www/runner-app-js-src`
- Deploy: `www/runner-app-js`
- URL: http://runner-app.ub2023.hu
