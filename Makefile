lint:
	npx eslint .
build:
	npm run build
test:
	npm test
test-watch:
	npm test-watch
test-coverage:
	npm test -- --coverage
publish:
	npm publish