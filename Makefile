project.log:
	git log > project.log

all:

update-and-test: update-deps test

update-deps: update-backend update-frontend

test: frontend-test backend-test
	./test-counter.sh

update-backend:
	cd backend/ && $(MAKE) update

update-frontend:
	cd frontend/ && $(MAKE) update

frontend-test:
	cd frontend/ && $(MAKE) test

backend-test:
	cd backend/ && $(MAKE) test

config:
	git config -l

docker:
	docker run -it -v $(PWD):/usr/python -w /usr/python gpdowning/python

pull:
	make clean
	@echo
	git pull
	git status

status:
	make clean
	@echo
	git branch
	git remote -v
	git status

python-test:
	cd 
	
