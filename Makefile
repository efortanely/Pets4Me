project.log:
	git log > project.log

all:

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -f  *.pyc
	rm -f  *.tmp
	rm -rf __pycache__
	rm -rf .mypy_cache

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

versions:
	@echo  'shell uname -p'
	@echo $(shell uname -p)
	@echo
	@echo  'shell uname -s'
	@echo $(shell uname -s)
	@echo
	@echo "% which $(BLACK)"
	@which $(BLACK)
	@echo
	@echo "% $(BLACK) --version"
	@$(BLACK) --version
	@echo
	@echo "% which $(COVERAGE)"
	@which $(COVERAGE)
	@echo
	@echo "% $(COVERAGE) --version"
	@$(COVERAGE) --version
	@echo
	@echo "% which $(MYPY)"
	@which $(MYPY)
	@echo
	@echo "% $(MYPY) --version"
	@$(MYPY) --version
	@echo
	@echo "% which $(PYDOC)"
	@which $(PYDOC)
	@echo
	@echo "% $(PYDOC) --version"
	@$(PYDOC) --version
	@echo
	@echo "% which $(PYLINT)"
	@which $(PYLINT)
	@echo
	@echo "% $(PYLINT) --version"
	@$(PYLINT) --version
	@echo
	@echo "% which $(PYTHON)"
	@which $(PYTHON)
	@echo
	@echo "% $(PYTHON) --version"
	@$(PYTHON) --version
