build-app:
	docker build -t upwork/artbat .

run-app:
	docker run --restart always -p 3600:3000 -d upwork/artbat
