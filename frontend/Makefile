update:
	rm -r node_modules
	npm install --user

test:
	npm run s-test
	npx newman run https://www.postman.com/collections/bd58e1f7fa355ce678df

run:
	REACT_APP_USE_LOCAL_BACKEND=1 npm run dev

run-remote:
	npm run dev

run-prod:
	PORT=8080 npm start

build:
	npm run build

dupdate:
	docker run -it --rm -v $(PWD):/workspace -w /workspace node npm install --user

drun:
	docker run -it --rm -e REACT_APP_USE_LOCAL_BACKEND=1 --net=host --name frontend --expose 3000 -P -p 3000:3000 -v $(PWD):/workspace -w /workspace node npm run dev

drun-remote:
	docker run -it --rm --net=host --name frontend --expose 3000 -P -p 3000:3000 -v $(PWD):/workspace -w /workspace node npm run dev

drun-prod:
	docker run -it --rm -e PORT=8080 --net=host --name frontend --expose 8080 -P -p 8080:8080 -v $(PWD):/workspace -w /workspace node npm start

dbuild:
	docker run -it --rm -v $(PWD):/workspace -w /workspace node npm run build

.PHONY: update test run run-remote run-prod build dupdate drun drun-remote drun-prod dbuild
