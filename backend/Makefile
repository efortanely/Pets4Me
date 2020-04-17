update:
	@./update.sh

test:
	@./run-tests.sh

fmt:
	@./envrun.sh black --exclude env .

drm:
	-@docker rm --force -v backend 2> /dev/null

dcreate: drm
	@docker run --env-file ../../pets4me-secret/.env-docker --name backend -d -P -p 5000:5000 -v $(PWD):/home/backend/workspace pets4me/backend bash -c "sudo /etc/init.d/postgresql start && sleep infinity"

dcreate-remote:
	@docker run --env-file ../../pets4me-secret/.env --name backend -d -P -v $(PWD):/home/backend/workspace pets4me/backend bash -c "sleep infinity"

dattach:
	@docker exec -it backend bash

drefresh:
	@docker exec -it backend ./envrun.sh python3 -m main --refresh

dnew: dcreate drefresh

drun:
	@docker exec -it backend ./envrun.sh python3 -m main

dupdate:
	@docker run -it --rm -v $(PWD):/home/backend/workspace pets4me/backend ./update.sh

dtest:
	@docker exec -it backend ./run-tests.sh

dfmt:
	@docker run -it --rm -v $(PWD):/home/backend/workspace pets4me/backend ./envrun.sh black --exclude env .

clean: drm
	rm -rf env
	rm -f  .coverage
	rm -f  .pylintrc
	rm -f  *.pyc
	rm -f  *.tmp
	@find -name __pycache__ -type d | xargs -t -n1 rm -rf
	rm -rf .mypy_cache

.PHONY: update test fmt drm dcreate dcreate-remote dattach drefresh dnew drun dupdate dtest dfmt clean

