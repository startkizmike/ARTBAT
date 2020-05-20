build-app:
	docker build -t upwork/artbat .

run-app:
	docker run --restart always -p 3600:3000 -d upwork/artbat

stop-app:
	docker ps -f "ancestor=upwork/artbat" -q | xargs docker stop
