update-deps:
	rm -r node_modules
	npm install --user

test:
	npm run s-test
	npx newman run https://www.getpostman.com/collections/4e9773806d80a3de47a6

run:
	REACT_APP_USE_LOCAL_BACKEND=1 npm run dev
